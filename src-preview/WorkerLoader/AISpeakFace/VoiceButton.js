import { useEffect, useState } from 'react'

export const VoiceButton = ({ onVoiceText = () => {} }) => {
  const [Vocal, setVocal] = useState(false)

  useEffect(() => {
    import('@untemps/react-vocal').then((r) => {
      let Vocal = r.default
      setVocal(<Vocal onResult={onVoiceText} />)
    })
  }, [])

  return <>{Vocal}</>
}
