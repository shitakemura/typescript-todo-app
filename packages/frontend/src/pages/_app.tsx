import "@/styles/global.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import ErrorBoundary from "src/components/ErrorBoundary";

if (process.env.NODE_ENV === "development") {
  require("mocks/index");
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ErrorBoundary>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ErrorBoundary>
  );
};

export default MyApp;
