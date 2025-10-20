
// In a real app, you would use a library like 'react-native-config'
// to manage environment variables. For this example, we'll use a simple object.

const dev = {
  useMocks: true, // Switch to false to use real Firebase services
};

const prod = {
  useMocks: false,
};

// In a real app, you would determine the environment (e.g., based on __DEV__)
export const environment = dev;
