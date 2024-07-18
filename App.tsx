import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context'
import HomeScreen from './screens/HomeScreen';
import { SafeAreaView } from 'react-native';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <SafeAreaView>
          <HomeScreen />
        </SafeAreaView>
      </SafeAreaProvider>

    </QueryClientProvider>
  );
};

export default App;