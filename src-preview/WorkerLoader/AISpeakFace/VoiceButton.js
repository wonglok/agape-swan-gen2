import { useEffect, useState } from 'react'

export const VoiceButton = ({ onVoiceText = () => {} }) => {
  const [Vocal, setVocal] = useState(false)

  useEffect(() => {
    import('@untemps/react-vocal').then((r) => {
      let Vocal = r.default
      setVocal(
        <Vocal
          onResult={onVoiceText}
          style={{
            //
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: `100%`,
            height: `100%`,
          }}
        />,
      )
    })
  }, [])

  return <>{Vocal}</>
}
