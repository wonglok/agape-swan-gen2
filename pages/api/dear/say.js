//https://github.com/bornfree/talking_avatar

import _ from 'lodash'
import * as sdk from 'microsoft-cognitiveservices-speech-sdk'
// const sdk = require('microsoft-cognitiveservices-speech-sdk')
const blendShapeNames = [
  'eyeBlinkLeft',
  'eyeLookDownLeft',
  'eyeLookInLeft',
  'eyeLookOutLeft',
  'eyeLookUpLeft',
  'eyeSquintLeft',
  'eyeWideLeft',
  'eyeBlinkRight',
  'eyeLookDownRight',
  'eyeLookInRight',
  'eyeLookOutRight',
  'eyeLookUpRight',
  'eyeSquintRight',
  'eyeWideRight',
  'jawForward',
  'jawLeft',
  'jawRight',
  'jawOpen',
  'mouthClose',
  'mouthFunnel',
  'mouthPucker',
  'mouthLeft',
  'mouthRight',
  'mouthSmileLeft',
  'mouthSmileRight',
  'mouthFrownLeft',
  'mouthFrownRight',
  'mouthDimpleLeft',
  'mouthDimpleRight',
  'mouthStretchLeft',
  'mouthStretchRight',
  'mouthRollLower',
  'mouthRollUpper',
  'mouthShrugLower',
  'mouthShrugUpper',
  'mouthPressLeft',
  'mouthPressRight',
  'mouthLowerDownLeft',
  'mouthLowerDownRight',
  'mouthUpperUpLeft',
  'mouthUpperUpRight',
  'browDownLeft',
  'browDownRight',
  'browInnerUp',
  'browOuterUpLeft',
  'browOuterUpRight',
  'cheekPuff',
  'cheekSquintLeft',
  'cheekSquintRight',
  'noseSneerLeft',
  'noseSneerRight',
  'tongueOut',
  'headRoll',
  'leftEyeRoll',
  'rightEyeRoll',
]

// const _ = require('lodash')

let SSML = `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" xml:lang="en-GB">
<voice name="en-GB-ElliotNeural">
    <mstts:viseme type="FacialExpression"/>
    __TEXT__
</voice>
</speak>`

const key = process.env.AZURE_KEY
const region = process.env.AZURE_REGION

/**
 * Node.js server code to convert text to speech
 * @returns stream
 * @param {*} key your resource key
 * @param {*} region your resource region
 * @param {*} text text to convert to audio/speech
 * @param {*} filename optional - best for long text - temp file for converted speech/audio
 */
const textToSpeech = async (text) => {
  // convert callback function to promise
  return new Promise((resolve, reject) => {
    //

    let ssml = SSML.replace('__TEXT__', text)

    const speechConfig = sdk.SpeechConfig.fromSubscription(key, region)
    speechConfig.speechSynthesisOutputFormat = 5 // mp3

    let audioConfig = null

    // if (filename) {
    let randomString = Math.random().toString(36).slice(2, 7)

    // let filename = `./public/speech-${randomString}.mp3`
    // audioConfig = sdk.AudioConfig.fromAudioFileOutput(filename)
    // audioConfig = sdk.AudioConfig.fromAudioFileOutput(filename)
    // }

    let blendData = []
    let timeStep = 1 / 60
    let timeStamp = 0

    // const synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig)
    const synthesizer = new sdk.SpeechSynthesizer(speechConfig)

    // Subscribes to viseme received event
    synthesizer.visemeReceived = function (s, e) {
      // `Animation` is an xml string for SVG or a json string for blend shapes
      var animation = JSON.parse(e.animation)

      _.each(animation.BlendShapes, (blendArray) => {
        let blend = {}
        _.each(blendShapeNames, (shapeName, i) => {
          blend[shapeName] = blendArray[i]
        })

        blendData.push({
          time: timeStamp,
          blendshapes: blend,
        })
        timeStamp += timeStep
      })
    }

    synthesizer.speakSsmlAsync(
      ssml,
      (result) => {
        resolve({
          blendData,
          durationMS: timeStamp,
          audioData: `data:audio/mp3;base64,${Buffer.from(result.audioData).toString('base64')}`,
          filename: `/speech-${randomString}.mp3`,
        })

        synthesizer.close()
      },
      (error) => {
        synthesizer.close()
        reject(error)
      },
    )
  })
}

export default function Say(req, res) {
  let data = JSON.parse(req.body)
  textToSpeech(data.text).then(
    (result) => {
      res.json(result)
    },
    (err) => {
      console.log(err)
      res.status(406).json({
        error: 'error',
      })
    },
  )
}
