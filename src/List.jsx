import { Box, StackDivider, VStack, Image } from '@chakra-ui/react'
import { Item } from './Item'
import img from '/empty.svg'

export const List = ({ items, showModalEdit, deleteItem}) => {
  if (!items.length) {
    return (
      <Box maxW='80%'>
        <Image mt='20px' w='98%' maxW='350' src={img} alt='No items' />
      </Box>
    )
  }
  return (
    <VStack
      divider={<StackDivider />}
      borderColor='gray.100'
      borderWidth='2px'
      p='5'
      borderRadius='lg'
      w='100%'
      maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '30vw' }}
      alignItems='stretch'
    >
      {items.map((item, index) => (
        <Item
          key={`item_${index}`}
          value={item}
          editItem={() => showModalEdit({index, item})}
          deleteItem={() => deleteItem(index)}
        />
      ))}
    </VStack>
  )
}