import { useEffect, useRef } from 'react'
import styled from 'styled-components'
import WaveSurfer from 'wavesurfer.js'

const AudioPlayer = ({ audioUrl }) => {
  const waveformRef = useRef(null)
  const wavesurfer = useRef(null)

  useEffect(() => {
    if (waveformRef.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: '#3498DB',
        progressColor: '#FF5500',
        cursorColor: '#2C3E50',
        barWidth: 2,
        barRadius: 3,
        responsive: true,
        height: 100,
      })

      wavesurfer.current.load(audioUrl)

      return () => wavesurfer.current.destroy()
    }
  }, [audioUrl])

  return (
    <PlayerContainer>
      <WaveformContainer ref={waveformRef} />
      <Controls>
        <PlayButton onClick={() => wavesurfer.current.playPause()}>
          Play/Pause
        </PlayButton>
      </Controls>
    </PlayerContainer>
  )
}

const PlayerContainer = styled.div`
  background-color: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const WaveformContainer = styled.div`
  margin-bottom: 1rem;
`

const Controls = styled.div`
  display: flex;
  justify-content: center;
`

const PlayButton = styled.button`
  background-color: #3498DB;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #2980B9;
  }
`

export default AudioPlayer 