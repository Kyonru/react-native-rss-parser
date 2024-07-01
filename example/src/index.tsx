import React from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { EpisodesListScreen } from './screens/episodes';

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <EpisodesListScreen />
    </QueryClientProvider>
  );
}
