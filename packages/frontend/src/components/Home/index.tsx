import { VStack } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import Header from "src/components/Header";
import TodoList from "src/components/todo/TodoList";
import Login from "../Login";

const Home = () => {
  const accessToken = "";

  if (!accessToken) {
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
