import * as React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, InMemoryCache, ApolloProvider as ApolloClientProvider } from '@apollo/client';
import App from '../../../App';

const client = new ApolloClient({
  uri: 'https://your-graphql-endpoint.com/graphql', // Replace with your GraphQL endpoint
  cache: new InMemoryCache(),
});

interface ApolloProviderProps {
  children: React.ReactNode;
}

const ApolloProvider: React.FunctionComponent<ApolloProviderProps> = ({ children }) => {
  return <ApolloClientProvider client={client}>{children}</ApolloClientProvider>;
};

ReactDOM.render(
  <ApolloProvider>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

export default ApolloProvider;