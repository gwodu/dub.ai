import { useState, useRef } from 'react'
import styled from 'styled-components'
import { FaMicrophone, FaStop } from 'react-icons/fa'

const AudioRecorder = ({ onRecordingComplete }) => {
  const [isRecording, setIsRecording] = useState(false)
  const mediaRecorder = useRef(null)
  const audioChunks = useRef([])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaRecorder.current = new MediaRecorder(stream)
      
      mediaRecorder.current.ondataavailable = (event) => {
        audioChunks.current.push(event.data)
      }

      mediaRecorder.current.onstop = () => {
        const audioBlob = new Blob(audioChunks.current, { type: 'audio/wav' })
        const audioUrl = URL.createObjectURL(audioBlob)
        onRecordingComplete(audioUrl)
        audioChunks.current = []
      }

      mediaRecorder.current.start()
      setIsRecording(true)
    } catch (error) {
      console.error('Error accessing microphone:', error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorder.current && isRecording) {
      mediaRecorder.current.stop()
      setIsRecording(false)
      mediaRecorder.current.stream.getTracks().forEach(track => track.stop())
    }
  }

  return (
    <RecorderContainer>
      <RecordButton
        onClick={isRecording ? stopRecording : startRecording}
        $isRecording={isRecording}
      >
        {isRecording ? <FaStop /> : <FaMicrophone />}
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </RecordButton>
    </RecorderContainer>
  )
}

const RecorderContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`

const RecordButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${props => props.$isRecording ? '#E74C3C' : '#1ED760'};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${props => props.$isRecording ? '#C0392B' : '#1DB954'};
  }
`

export default AudioRecorder 