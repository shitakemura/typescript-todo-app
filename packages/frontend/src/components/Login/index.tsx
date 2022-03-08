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
import { useAuth0 } from "@auth0/auth0-react";
import { useCallback } from "react";

const Login = () => {
  const { isLoading, loginWithRedirect } = useAuth0();
  const { onClose } = useDisclosure();

  const handleClickLogin = useCallback(() => {
    loginWithRedirect();
  }, [loginWithRedirect]);

  if (isLoading) return null;

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
