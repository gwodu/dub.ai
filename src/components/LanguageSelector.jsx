import styled from 'styled-components'

const LANGUAGES = [
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
]

const LanguageSelector = ({ selectedLanguage, onLanguageChange }) => {
  return (
    <SelectorContainer>
      <label htmlFor="language">Target Language:</label>
      <Select
        id="language"
        value={selectedLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
      >
        {LANGUAGES.map(lang => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
      </Select>
    </SelectorContainer>
  )
}

const SelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem 0;

  label {
    color: #2C3E50;
    font-weight: 500;
  }
`

const Select = styled.select`
  padding: 0.5rem;
  border: 2px solid #3498DB;
  border-radius: 4px;
  font-size: 1rem;
  color: #2C3E50;
  background-color: white;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #2980B9;
  }
`

export default LanguageSelector 