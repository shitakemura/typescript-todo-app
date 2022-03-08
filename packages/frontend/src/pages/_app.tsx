import "@/styles/global.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

if (process.env.NODE_ENV === "development") {
  const mockServer = () => import("@/mocks/index");
  mockServer();
}

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}
