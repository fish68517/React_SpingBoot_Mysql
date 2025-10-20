
# Developer Guide

This guide will help you get up and running, understand the project structure, and start contributing.

## File Structure

The project is divided into a `frontend` (a React Native mobile app) and a `backend` (Firebase services).

### Frontend

The `frontend` directory contains all the code for the mobile application.

```
frontend/
├── app/                  # React Navigation screens
│   └── index.tsx         # Main entry point for the app's UI
├── assets/               # Images and other static assets
├── components/           # Reusable UI components
├── models/               # Data models for the application
│   ├── user.js           # Defines the User data structure
│   └── item.js           # Defines the Item data structure
├── services/             # For connecting to backend services (like Firebase)
│   ├── auth.js           # Mock authentication service
│   ├── items.js          # Mock item management service
│   ├── index.js          # Service factory (switches between mock and real services)
│   └── firebase.js       # Firebase initialization
├── env.js                # Environment configuration (e.g., to enable/disable mock services)
└── ...
```

**Relevant Files:**

*   **`frontend/app/index.tsx`**: This is where the main UI of the application lives. You will modify this file to build out the different screens of the app (Login, Home, Create Post, etc.).
*   **`frontend/models/user.js` and `frontend/models/item.js`**: These files define the shape of the `User` and `Item` data. This is important for ensuring consistency across the app.
*   **`frontend/services/auth.js` and `frontend/services/items.js`**: These are *mock* services. They simulate the behavior of a real backend, allowing you to build and test UI components without needing a full Firebase setup.
*   **`frontend/services/index.js`**: This file acts as a "service factory." It imports both the mock and real services and provides the correct one to the application based on the `env.js` configuration.
*   **`frontend/env.js`**: This file allows you to easily switch between using mock services and real Firebase services.
*   **`frontend/firebase.js`**: This file initializes the Firebase app. You will use the `auth` and `firestore` objects exported from this file when you implement the real services.

### Backend

The `backend` directory contains the configuration for your Firebase project.

```
backend/
├── firestore.rules     # Security rules for your Firestore database
├── firestore.indexes.json # Indexing for Firestore queries
└── ...
```

*   **`backend/firestore.rules`**: This is a critical file for securing your application's data. You will write rules here to control who can read, write, and update data in your Firestore database.

## Development Workflow: Mocking vs. Real Services

To allow for parallel development, this project is set up to use mock services. This means you can build the entire user interface without having to wait for the backend functionality to be complete.

### When to Use Mock Services

If you are working on a **UI task**, you should use the **mock services**. This includes:

*   Building the sign-in, sign-up, and forgot password screens.
*   Building the "Create Item" form.
*   Displaying a list of items.

### How to Use Mock Services

1.  Open the `frontend/env.js` file.
2.  Make sure the `useMocks` variable is set to `true`.
3.  In your React components, import the services from `frontend/services/index.js`.

```javascript
// Example: In your login screen component
import { auth } from '../services';

// Now you can use the mock auth functions
auth.signInWithEmailAndPassword(email, password)
  .then(user => console.log('Signed in!', user))
  .catch(error => console.error(error));
```

### When to Implement and Use Real Services

If you are working on a **backend integration task**, you will need to implement and use the **real Firebase services**. This includes:

*   Wiring up the UI to Firebase Authentication.
*   Implementing the logic to create, read, and update items in Firestore.
*   Implementing file uploads to Firebase Storage.

### How to Implement and Use Real Services

1.  **Create the real service files.** For example, you might create `frontend/services/firebaseAuth.js` and `frontend/services/firebaseItems.js`.
2.  **Implement the Firebase logic** in these new files. You will import `firebase` from `frontend/firebase.js` to interact with Firebase.
3.  **Update the service factory.** In `frontend/services/index.js`, import your new real services and update the exports.
4.  **Switch to real services.** In `frontend/env.js`, set `useMocks` to `false`.

## Task Implementation Guide

Here is a breakdown of how to approach the tasks you've been given.

### Authentication

**Task 1: Build Authentication Screens (UI Developer)**

1.  **Use mock services:** Make sure `useMocks` is `true` in `frontend/env.js`.
2.  **Build the UI:** In `frontend/app/index.tsx`, create the UI for the sign-in, sign-up, and forgot password screens.
3.  **Use mock functions:** Wire up your buttons to the mock functions in `frontend/services/auth.js`. For example, your "Sign Up" button should call `auth.createUserWithEmailAndPassword`.

**Task 2: Integrate Firebase Authentication (Backend Developer)**

1.  **Create `frontend/services/firebaseAuth.js`**: In this file, import `auth` from `frontend/firebase.js` and implement the real authentication logic using functions like `createUserWithEmailAndPassword`, `signInWithEmailAndPassword`, and `sendPasswordResetEmail`.
2.  **Update `frontend/services/index.js`**: Import your new `firebaseAuth.js` and update the `auth` export to use the real service when `useMocks` is false.
3.  **Test:** Set `useMocks` to `false` in `frontend/env.js` and test your implementation with the UI.

**Task 3 & 4: Email Verification and Secure Session**

These tasks can be worked on after the basic authentication is in place. You will use `sendEmailVerification` from Firebase and `expo-secure-store` for session management.

### Security Rules

**Task 1: Secure Firestore & Test**

1.  **Write rules:** Open `backend/firestore.rules` and write the security rules. Initially, you can restrict access to authenticated users only.
2.  **Test rules:** Use the Firebase Emulator Suite to test your rules. Write tests that simulate authenticated and unauthenticated requests to ensure your rules are working correctly.

### Create Post

**Task 1: Build "Create Item" Screen (UI Developer)**

1.  **Use mock services:** Make sure `useMocks` is `true`.
2.  **Build the form:** In `frontend/app/index.tsx`, create the form for creating a new item. Use `react-native-image-picker` for image selection.
3.  **Use mock functions:** Your "Submit" button should call the `createItem` function from the mock `items` service (`frontend/services/items.js`).

**Task 2 & 3: Implement Create Item Logic & Data Fetching (Backend Developer)**

1.  **Create `frontend/services/firebaseItems.js`**: In this file, import `firestore` and `storage` from `frontend/firebase.js`.
2.  **Implement create logic:** Write the function to upload the image to Firebase Storage and then save the item data (including the image URL) to Firestore.
3.  **Implement data fetching:** Use `onSnapshot` from the Firestore SDK to listen for real-time updates to the "items" collection.
4.  **Update `frontend/services/index.js`**: Import your new `firebaseItems.js` and update the `items` export.
5.  **Test:** Set `useMocks` to `false` and test the full create item and data fetching flow.


