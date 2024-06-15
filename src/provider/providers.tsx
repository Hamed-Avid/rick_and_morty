"use client";

import client from "@/lib/client";
import { ApolloProvider } from "@apollo/client";

export function Provider({ children }: React.PropsWithChildren) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
