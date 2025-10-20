// Mock implementation for authentication functions
export const auth = {
  // Simulate a successful sign-up
  createUser: (email, password) => Promise.resolve({ user: { uid: 'mock-uid', email, emailVerified: false } }),

  // Simulate a successful sign-in
  signIn: (email, password) => Promise.resolve({ user: { uid: 'mock-uid', email, emailVerified: true } }),

  // Simulate sending a password reset email
  sendPasswordReset: (email) => Promise.resolve(),

  // Simulate sending a verification email
  emailVerification: (user) => Promise.resolve(),
};
