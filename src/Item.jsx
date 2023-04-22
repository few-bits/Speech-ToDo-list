import { Box, ButtonGroup, Flex, ListItem, Spacer, IconButton } from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'

export const Item = ({ value, editItem, deleteItem }) => {
  return (
    <ListItem>
      <Flex>
        <Box p='2'>
          {value}
        </Box>
        <Spacer />
        <Box p='2'>
          <ButtonGroup>
            <IconButton aria-label='Edit item' icon={<EditIcon />} onClick={editItem}/>
            <IconButton aria-label='Delete item' icon={<DeleteIcon />} onClick={deleteItem} />
          </ButtonGroup>
        </Box>
      </Flex>
    </ListItem>
  )
}