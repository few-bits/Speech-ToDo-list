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
import {MODAL} from "./constants.js";

export const EditModal = ({ mode, value, isOpen, onClose }) => {
  if (mode === MODAL.OFF) return null

    return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{mode} item</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input placeholder='Type or record' defaultValue={value} />
        </ModalBody>

        <ModalFooter>
          <Button variant='ghost' onClick={onClose}>
            Close
          </Button>
          <Button colorScheme='blue' mr={3}>{mode}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}