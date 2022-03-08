import { Box, Flex, Text } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
};

const HeaderContainer = ({ children }: Props) => {
  return (
    <Flex
      align='center'
      justify='space-between'
      wrap='wrap'
      w='100%'
      p={8}
      bg='teal.400'
      color='white'>
      {children}
    </Flex>
  );
};

const MenuLinks = () => {
  return <Box></Box>;
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
