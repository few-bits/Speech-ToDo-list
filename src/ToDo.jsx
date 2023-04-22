import { useState } from 'react';
import { Heading, Container, OrderedList, IconButton, useDisclosure } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { Item } from './Item'
import { APP_NAME, MODAL } from './constants'
import { EditModal } from './EditModal'
import { useLocalStorage } from './hooks/useLocalStorage'

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

  return (
    <Container>
      <Heading>Speech ToDo</Heading>
      <IconButton aria-label='Add item' icon={<AddIcon />} onClick={showModalAdd} />
      <OrderedList>
        {list.map((item, index) => (
          <Item
            key={`item_${index}`}
            value={item}
            editItem={() => showModalEdit({index, item})}
            deleteItem={() => deleteItem(index)}
          />
        ))}
      </OrderedList>
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
    </Container>
  )
}