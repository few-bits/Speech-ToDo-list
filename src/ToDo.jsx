import { useState } from 'react';
import { Heading, useDisclosure, VStack, Button } from '@chakra-ui/react'
import { AddIcon, DeleteIcon } from '@chakra-ui/icons'
import { APP_NAME, MODAL } from './constants'
import { EditModal } from './EditModal'
import { useLocalStorage } from './hooks/useLocalStorage'
import {List} from "./List.jsx";

export const ToDo = () => {
  const [ list, setList] = useLocalStorage(APP_NAME, [])
  const [ modalMode, setModalMode ] = useState(MODAL.ADD)
  const [ modalValue, setModalValue ] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const showModalAdd = () => {
    setModalMode(MODAL.ADD)
    setModalValue(null)
    onOpen()
  }

  const showModalEdit = (value) => {
    setModalMode(MODAL.EDIT)
    setModalValue(value)
    onOpen()
  }

  const addItem = (value) => {
    const nextList = [...list, value]
    setList(nextList)
    onClose()
  }

  const editItem = (index, value) => {
    const nextList = [...list]
    nextList[index] = value
    setList(nextList)
    onClose()
  }

  const deleteItem = (index) => {
    const nextList = [...list]
    nextList.splice(index, 1)
    setList(nextList)
    onClose()
  }

  const clearAll = () => {
    setList([])
  }

  return (
    <VStack p={4} minH='100vh' pb={28}>
      <Heading
        p='5'
        fontWeight='extrabold'
        size='xl'
        bgGradient='linear(to-l, teal.300, blue.500)'
        bgClip='text'
      >
        Speech ToDo list
      </Heading>
      <Button
        leftIcon={<AddIcon />}
        colorScheme='blue'
        variant='solid'
        onClick={showModalAdd}
      >
        Add item
      </Button>
      <List
        items={list}
        showModalEdit={showModalEdit}
        deleteItem={deleteItem}
      />
      {list.length && (
        <Button
          leftIcon={<DeleteIcon />}
          variant='solid'
          onClick={clearAll}
        >
          Clear all
        </Button>
      )}
      {isOpen && (
        <EditModal
          mode={modalMode}
          value={modalValue}
          addItem={addItem}
          editItem={editItem}
          isOpen={isOpen}
          onClose={onClose}
        />
      )}
    </VStack>
  )
}