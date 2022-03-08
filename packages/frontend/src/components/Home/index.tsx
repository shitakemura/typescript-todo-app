import { Spinner, Stack, VStack } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import Header from "src/components/Header";
import TodoList from "src/components/todo/TodoList";
import Login from "../Login";
import { useAuth0 } from "@auth0/auth0-react";

const Home = () => {
  const { isLoading, isAuthenticated, error } = useAuth0();

  if (isLoading) {
    return (
      <Stack w='full' h='100vh' justifyContent='center' alignItems='center'>
        <Spinner
          thickness='4px'
          emptyColor='gray.200'
          color='teal.500'
          size='xl'
        />
      </Stack>
    );
  }

  if (error) return <div>{error.message}</div>;

  if (!isAuthenticated) {
    return <Login />;
  } else {
    return (
      <VStack>
        <Header />
        <RecoilRoot>
          <TodoList />
        </RecoilRoot>
      </VStack>
    );
  }
};

export default Home;
