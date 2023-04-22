import { Text, ButtonGroup, IconButton, HStack } from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'

export const Item = ({ value, editItem, deleteItem }) => {
  return (
    <HStack>
      <Text
        w='100%'
        p='8px'
        borderRadius='lg'
      >
        {value}
      </Text>
      <ButtonGroup>
        <IconButton aria-label='Edit item' icon={<EditIcon />} onClick={editItem}/>
        <IconButton aria-label='Delete item' icon={<DeleteIcon />} onClick={deleteItem} />
      </ButtonGroup>
    </HStack>
  )
}