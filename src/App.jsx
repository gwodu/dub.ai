import { useState } from 'react'
import styled from 'styled-components'
import AudioRecorder from './components/AudioRecorder'
import LanguageSelector from './components/LanguageSelector'
import AudioPlayer from './components/AudioPlayer'

function App() {
  const [recordedAudio, setRecordedAudio] = useState(null)
  const [translatedAudio, setTranslatedAudio] = useState(null)
  const [selectedLanguage, setSelectedLanguage] = useState('es')
  const [isLoading, setIsLoading] = useState(false)
  
  const handleTranslation = async () => {
    if (!recordedAudio) return
    setIsLoading(true)
    
    try {
      // TODO: Implement actual translation
      // For now, just simulate translation by using the same audio
      setTimeout(() => {
        setTranslatedAudio(recordedAudio)
        setIsLoading(false)
      }, 2000)
    } catch (error) {
      console.error('Translation error:', error)
      setIsLoading(false)
    }
  }

  return (
    <AppContainer>
      <Header>
        <h1>Audio Dubber</h1>
      </Header>
      <MainContent>
        <AudioRecorder onRecordingComplete={setRecordedAudio} />
        
        <LanguageSelector 
          selectedLanguage={selectedLanguage}
          onLanguageChange={setSelectedLanguage}
        />

        {recordedAudio && (
          <AudioSection>
            <h2>Original Audio</h2>
            <AudioPlayer audioUrl={recordedAudio} />
          </AudioSection>
        )}

        {translatedAudio && (
          <AudioSection>
            <h2>Translated Audio</h2>
            <AudioPlayer audioUrl={translatedAudio} />
          </AudioSection>
        )}

        <TranslateButton 
          onClick={handleTranslation}
          disabled={!recordedAudio || isLoading}
        >
          {isLoading ? 'Translating...' : 'Translate Audio'}
        </TranslateButton>
      </MainContent>
    </AppContainer>
  )
}

const AppContainer = styled.div`
  min-height: 100vh;
  background-color: #F5F5F5;
`

const Header = styled.header`
  background-color: #FF5500;
  color: white;
  padding: 1rem;
  text-align: center;
`

const MainContent = styled.main`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem 1rem;
`

const AudioSection = styled.section`
  margin: 2rem 0;
  
  h2 {
    color: #2C3E50;
    margin-bottom: 1rem;
  }
`

const TranslateButton = styled.button`
  background-color: #3498DB;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    background-color: #2980B9;
  }
`

export default App
