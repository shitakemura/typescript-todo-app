import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  useDisclosure,
  Text,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

const Login = () => {
  const { onClose } = useDisclosure();
  const handleClickLogin = () => {};

  return (
    <Stack>
      <Modal onClose={onClose} isOpen={true} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Welcome to the Todo App</ModalHeader>
          <ModalBody>
            <Text mb='1rem'>Loginボタンからログインしてください。</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleClickLogin}>Login</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default Login;
