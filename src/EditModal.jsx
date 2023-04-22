import { useEffect, useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Button,
  ModalFooter,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { MODAL, RECOGNITION_STATE } from './constants'
import { useSpeechRecognition } from './hooks/useSpeechRecognition';

export const EditModal = ({ mode, value, addItem, editItem, isOpen, onClose }) => {
  const [textValue, setTextValue] = useState(value?.item || '')
  const [ start, stop, transcript, recognitionState ] = useSpeechRecognition()
  const handleChange = (event) => setTextValue(event.target.value)
  const handleSaveClick = () => {
    mode === MODAL.ADD ? addItem(textValue) : editItem(value.index, textValue)
    setTextValue('')
  }
  useEffect(() => {
    if (recognitionState === RECOGNITION_STATE.IN_PROGRESS) setTextValue(transcript)
  }, [transcript])

  const isRecording = recognitionState === RECOGNITION_STATE.IN_PROGRESS

  const handleStartRecord = () => {
    start()
    setTextValue('')
  }
  const handleStopRecord = () => {
    stop()
  }
  const handleRecordClick = () => {
    isRecording ? handleStopRecord() : handleStartRecord()
  }

  const handleCloseModal = () => {
    isRecording && handleStopRecord()
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={handleCloseModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{mode} item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputGroup>
            <Input
              placeholder='Type or record'
              value={textValue}
              onChange={handleChange}
              disabled={isRecording}
            />
            <InputRightElement width='4.5rem'>
              <Button mr={2} h='1.75rem' size='sm' onClick={handleRecordClick}>
                {recognitionState === RECOGNITION_STATE.IDLE ? 'Record' : 'Stop'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </ModalBody>

        <ModalFooter>
          <Button mr={3} variant='ghost' onClick={handleCloseModal}>
            Close
          </Button>
          <Button
            colorScheme='blue'
            mr={3}
            onClick={handleSaveClick}
            isLoading={isRecording}
            loadingText='Recording...'
          >
            {mode}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
