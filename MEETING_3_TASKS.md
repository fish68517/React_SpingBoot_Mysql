# Project Tasks

This document outlines the tasks for the upcoming features: Search, Filters, Geohash, Chat, and Claims.

## Global Task: Custom Logger

### Description

Create a custom logger to ensure that logs are only shown in the development environment. This will prevent verbose logging in production and help keep the production environment clean.

### Implementation

1.  **Create a logger utility file.**
    *   Create a new file: `frontend/utils/logger.js`.
2.  **Implement the custom logger.**
    *   In `frontend/utils/logger.js`, create a logger that conditionally logs based on the environment. You can use the `__DEV__` global variable provided by React Native.

3.  **Use the custom logger.**
    *   In any file where you need to log, import the custom logger.
    ```javascript
    import logger from '../utils/logger';

    logger.log('This is a development log.');
    ```

---

## Search, Filters, and Geohash

### Backend Tasks

#### 1. Geohash on Item Creation

*   **Description:** When a new item is created, extract the GPS coordinates from the uploaded image's EXIF metadata, compute its geohash, and store it in Firestore.
*   **Implementation:**
    1.  **Install libraries:** In the `backend` directory, run `npm install ngeohash exif-parser multer`.
    2.  **Update the `POST /posts` endpoint:** In `backend/routes/posts.js`, you'll need to handle multipart/form-data to get the image file. Use a middleware like `multer`.
    3.  **Extract EXIF data and create geohash:**

        

#### 2. Implement Radius Search

*   **Description:** Create an endpoint that returns items within a certain radius of a given location.
*   **Implementation:**
    1.  **Create a new search endpoint:** In `backend/routes/posts.js`, add a new route, e.g., `GET /posts/search`.
    2.  **Implement the search logic:** This will involve calculating the geohash bounds for the search area and querying Firestore.

        
    3. **Create a geohash utility:** Create `backend/utils/geohash.js` to contain the logic for calculating geohash ranges. You will need to find or create a library to help with this.

#### 3. Add Filtering Logic

*   **Description:** Extend the search endpoint to filter by `category` and `date`.
*   **Implementation:**
    1.  **Update the search endpoint:** In `backend/routes/posts.js`, modify the `/search` endpoint to accept `category` and `date` query parameters.
    2.  **Add filters to the Firestore query:**

        
    3.  **Update Firestore indexes:** In `backend/firestore.indexes.json`, add new composite indexes to support these queries.

### Frontend Tasks

#### 1. Build Search & Filter UI

*   **Description:** Create UI components for filtering items.
*   **Implementation:**
    1.  **Add UI elements:** In `frontend/components/HomeScreen.tsx`, add components for category selection (e.g., dropdown), a date picker, and a "Near Me" toggle.

#### 2. Map View Implementation

*   **Description:** Integrate a map to display search results.
*   **Implementation:**
    1.  **Add a map library:** `npx expo install react-native-maps`
    2.  **Add the map component:** In `frontend/components/HomeScreen.tsx`, embed a `MapView` component.
    3.  **Display items as pins:** Use the data from the search results to render `Marker` components on the map.

#### 3. Connect UI to API & Display Results

*   **Description:** Fetch data from the new search endpoint and display it.
*   **Implementation:**
    1.  **Create a new service function:** In `frontend/services/items.js`, add a function to call the `GET /posts/search` endpoint.
    2.  **Call the service:** In `frontend/components/HomeScreen.tsx`, call the new service function when filters are applied.
    3.  **Update state:** Update the component's state with the results and re-render the list and map.

---

## Chat and Claims Workflow

### Backend Tasks

#### 1. Data Model for Claims & Chat

*   **Description:** Define the data structures for claims and chats in Firestore.
*   **Data Structure:**
    *   **Claims:** A subcollection on each `item`. Each document in the subcollection represents a claim.
    *   **Chats:** A top-level collection. Each document is a chat session and contains a `messages` subcollection.

#### 2. Claims Workflow API

*   **Description:** Create endpoints to manage the claims process.
*   **Implementation:**
    1.  **Create a new route file:** `backend/routes/claims.js`.
    2.  **Define the endpoints:**
        *   `POST /claims`: Creates a new claim. Requires `itemId` and the answer to the secret question.
        *   `PUT /claims/:claimId`: Approves or denies a claim.
    3.  **Add the route to `index.js`:** `app.use('/claims', claimsRouter);`

#### 3. Chat API

*   **Description:** Create endpoints for real-time chat.
*   **Implementation:**
    1.  **Create a new route file:** `backend/routes/chats.js`.
    2.  **Define the endpoints:**
        *   `POST /chats/:chatId/messages`: Sends a message.
        *   `GET /chats/:chatId/messages`: Retrieves messages.
    3.  **Add the route to `index.js`:** `app.use('/chats', chatsRouter);`

#### 4. Implement Security

*   **Description:** Add security rules for the new collections and add a secret question to items.
*   **Implementation:**
    1.  **Add secret question:** In the `POST /items` endpoint in `backend/routes/posts.js`, add a field for `secretQuestion`.
    2.  **Update Firestore rules:** In `backend/firestore.rules`, add rules for the `claims` and `chats` collections to restrict access to authorized users.

### Frontend Tasks

#### 1. Claiming UI

*   **Description:** Build the UI for the item claiming process.
*   **Implementation:**
    1.  **Add "Claim" button:** In the item detail view, add a button that initiates the claiming process.
    2.  **Create a claim modal/screen:** This screen should prompt the user to answer the secret question.
    3.  **Create a claim management view:** For the item owner, create a view to see incoming claims and approve/deny them.

#### 2. Inbox and Chat UI

*   **Description:** Create an inbox to view all chats and a chat screen for messaging.
*   **Implementation:**
    1.  **Create an "Inbox" screen:** This will be a new tab in the app, listing all of the user's chats.
    2.  **Create a "Chat" screen:** This screen will display messages in a chat and allow the user to send new messages. Use a library like `react-native-gifted-chat` to simplify this.
    3.  **Use Firestore listeners:** Use `onSnapshot` from the Firebase SDK to listen for real-time updates to chats.

#### 3. API and State Integration

*   **Description:** Connect the new UI components to the backend services.
*   **Implementation:**
    1.  **Create new service files:** `frontend/services/claims.js` and `frontend/services/chats.js`.
    2.  **Implement API calls:** Add functions to these files to interact with the `/claims` and `/chats` endpoints.
    3.  **Manage state:** Use a state management library or React's Context API to manage the state of claims and chats throughout the application.
