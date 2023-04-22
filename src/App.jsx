import { ChakraProvider } from '@chakra-ui/react'
import { ToDo } from './ToDo';

function App() {
  return (
    <ChakraProvider>
      <ToDo/>
    </ChakraProvider>
  )
}

export default App
