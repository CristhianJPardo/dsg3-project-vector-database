import './App.css';
import { useState } from 'react';
import Button from '@mui/material/Button';

function App() {
  const [text, setSetText] = useState("")
  const [msgFromBackend, setMsgFromBackend] = useState("")
  const [inputToBeProcessed, setInputToBeProcessed] = useState("")
  const [processedText, setProcessedText] = useState("")

  const onClickFirstButton = (e) => {
    e.preventDefault();
    setSetText("Hemos seteado el texto al dar click")
  }
  const onClickSecondButton = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/")
      .then((response) => response.json())
      .then((msg) => {
        setMsgFromBackend(msg.msg)
      })
  }

  const onClickOnThirdButton = (e) => {
    e.preventDefault();
    fetch("http://127.0.0.1:8000/data", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ "text": inputToBeProcessed })
    })
      .then((response) => response.json())
      .then((msg) => {
        setProcessedText(msg.msg)
      })
  }

  return (
    <div className="App">
      <div className='caja-gris'>
        <p>Hola Mundo!</p>
      </div>
      <div className='caja-gris'>
        <form>
          <input
            value={text}
            onChange={(e) => setSetText(e.target.value)}
          />
          <Button id='first-button' onClick={(e) => onClickFirstButton(e)} variant="outlined">
            Setear texto
          </Button>

        </form>
        <div>
          {text}
        </div>
      </div>

      <div className='caja-gris'>
        <p>Traer datos desde el back</p>
        <button id='second-button' onClick={(e) => onClickSecondButton(e)}>
          Data from back
        </button>
        <p>
          {msgFromBackend}
        </p>
      </div>

      <div className='caja-gris'>
        <p>Enviar datos para ser procesados por el back</p>
        <input
          value={inputToBeProcessed}
          onChange={(e) => setInputToBeProcessed(e.target.value)}
        />
        <button id='third-button' onClick={(e) => onClickOnThirdButton(e)}>
          Process data in backend
        </button>
        <p>
          {inputToBeProcessed}
        </p>
        <p>
          Texto procesado
        </p>
        <p>
          {processedText}
        </p>
      </div>
    </div>
  );
}

export default App;
