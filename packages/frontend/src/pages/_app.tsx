import "styles/global.css";
import type { AppProps } from "next/app";
import { Auth0Provider } from "@auth0/auth0-react";
import { ChakraProvider } from "@chakra-ui/react";
import ErrorBoundary from "src/components/ErrorBoundary";

if (process.env.NODE_ENV === "development") {
  require("mocks/index");
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ErrorBoundary>
      <Auth0Provider
        domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN ?? ""}
        clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID ?? ""}
        redirectUri={process.env.NEXT_PUBLIC_AUTH0_REDIERCT_URL ?? ""}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </Auth0Provider>
    </ErrorBoundary>
  );
};

export default MyApp;
