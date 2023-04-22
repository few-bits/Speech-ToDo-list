import { useState } from 'react';
import { Heading, Container, OrderedList, IconButton, useDisclosure } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { Item } from './Item'
import { MODAL } from './constants'
import { EditModal } from './EditModal'

export const ToDo = () => {
  const list = [
    'Consectetur adipiscing elit',
    'Consectetur adipiscing elit',
    'Integer molestie lorem at massa',
    'Facilisis in pretium nisl aliquet',
  ]
  const [ modalMode, setModalMode ] = useState(MODAL.OFF)
  const [ modalValue, setModalValue ] = useState(null)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const addItem = () => {
    setModalMode(MODAL.ADD)
    setModalValue(null)
    onOpen()
  }

  const editItem = (value) => {
    setModalMode(MODAL.EDIT)
    setModalValue(value)
    onOpen()
  }

  return (
    <Container>
      <Heading>ToDo</Heading>
      <IconButton aria-label='Add item' icon={<AddIcon />} onClick={addItem} />
      <OrderedList>
        {list.map((item, index) => (
          <Item
            key={`item_${index}`}
            index={index}
            value={item}
            editItem={() => editItem(item)}
          />
        ))}
      </OrderedList>
      <EditModal mode={modalMode} value={modalValue} isOpen={isOpen} onClose={onClose}/>
    </Container>
  )
}