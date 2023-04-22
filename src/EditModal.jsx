import { useState } from 'react'
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
} from '@chakra-ui/react'
import { MODAL } from './constants'

export const EditModal = ({ mode, value, addItem, editItem, isOpen, onClose }) => {
  const [textValue, setTextValue] = useState(value?.item || '')
  const handleChange = (event) => setTextValue(event.target.value)
  const handleSaveClick = () => {
    mode === MODAL.ADD ? addItem(textValue) : editItem(value.index, textValue)
    setTextValue('')
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{mode} item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder='Type or record'
            value={textValue}
            onChange={handleChange}
          />
        </ModalBody>

        <ModalFooter>
          <Button variant='ghost' onClick={onClose}>
            Close
          </Button>
          <Button
            colorScheme='blue'
            mr={3}
            onClick={handleSaveClick}
          >
            {mode}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
