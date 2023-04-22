import {useEffect, useState} from "react";
import {RECOGNITION_STATE} from "../constants.js";

const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const speechRecognition = new SpeechRecognition();
speechRecognition.continuous = true;
speechRecognition.interimResults = false;
export const useSpeechRecognition = () => {
  const start = () => speechRecognition.start()
  const stop = () => speechRecognition.stop()
  const [ transcript, setTranscript ] = useState('')
  const [ recognitionState, setRecognitionState ] = useState(RECOGNITION_STATE.IDLE)

  useEffect(() => {
    const listenStart = (event) => {
      setRecognitionState(RECOGNITION_STATE.IN_PROGRESS)
    }
    const listenStop = (event) => {
      setRecognitionState(RECOGNITION_STATE.IDLE)
    }
    const listenResult = (event) => {
      setTranscript(event.results[0][0].transcript)
    }
    speechRecognition.addEventListener('start', listenStart)
    speechRecognition.addEventListener('end', listenStop)
    speechRecognition.addEventListener('result', listenResult)

    return () => {
      speechRecognition.removeEventListener('start', listenStart)
      speechRecognition.removeEventListener('end', listenStop)
      speechRecognition.removeEventListener('result', listenResult)
    }
  }, [])
  return [
    start,
    stop,
    transcript,
    recognitionState,
  ]
}