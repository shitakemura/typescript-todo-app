import { Stack, HStack, Text } from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";
import { useCallback } from "react";

type Props = {
  children: React.ReactNode;
};

const HeaderContainer = ({ children }: Props) => {
  return (
    <HStack
      align='center'
      justify='space-between'
      w='full'
      p={8}
      bg='teal.400'
      color='white'>
      {children}
    </HStack>
  );
};

const MenuLinks = () => {
  const { isAuthenticated, logout } = useAuth0();
  const handleLogout = useCallback(() => {
    logout({ returnTo: process.env.NEXT_PUBLIC_AUTH0_REDIRECT_URL ?? "" });
  }, [logout]);

  return (
    <Stack>
      {isAuthenticated ? (
        <Text
          fontWeight='bold'
          _hover={{ textDecoration: "underline" }}
          onClick={handleLogout}>
          Logout
        </Text>
      ) : null}
    </Stack>
  );
};

const Header = () => {
  return (
    <HeaderContainer>
      <Text fontSize={24} fontWeight='bold'>
        Todo App
      </Text>
      <MenuLinks />
    </HeaderContainer>
  );
};

export default Header;
