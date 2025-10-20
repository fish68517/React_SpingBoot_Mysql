# Developer Onboarding Guide

Welcome to the project! This guide will walk you through the necessary steps to get your development environment set up.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:
*   [Node.js](https://nodejs.org/) (v20.18.1 or later recommended)
*   [npm](https://www.npmjs.com/) (usually comes with Node.js)
*   [Git](https://git-scm.com/)

## 1. Clone the Repository

First, clone the project repository to your local machine:

```bash
git clone <your-repository-url>
cd <repository-folder>
```

## 2. Backend Setup

The backend is a Node.js server using Express.

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Firebase Admin credentials:**
    *   Go to your [Firebase Project Settings](https://console.firebase.google.com/).
    *   Navigate to the **Service accounts** tab.
    *   Click on **"Generate new private key"**. This will download a JSON file.
    *   Rename the downloaded file to `serviceAccountKey.json`.
    *   Place this `serviceAccountKey.json` file inside the `backend` directory.

    **Important:** This file is listed in `.gitignore` and should never be committed to the repository.

## 3. Frontend Setup

The frontend is a React Native application built with Expo.

1.  **Navigate to the frontend directory:**
    ```bash
    cd ../frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Create the environment variables file:**
    *   In the `frontend` directory, create a new file named `.env`.
    *   Add the following content to the `.env` file:

    ```
    EXPO_PUBLIC_API_KEY="YOUR_API_KEY"
    EXPO_PUBLIC_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
    EXPO_PUBLIC_PROJECT_ID="YOUR_PROJECT_ID"
    EXPO_PUBLIC_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
    EXPO_PUBLIC_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
    EXPO_PUBLIC_APP_ID="YOUR_APP_ID"
    EXPO_PUBLIC_API_URL="http://<your-local-ip-address>:4000"
    ```

4.  **Populate the environment variables:**
    *   **Firebase Keys:**
        *   Go to your [Firebase Project Settings](https://console.firebase.google.com/).
        *   Under the "General" tab, scroll down to "Your apps".
        *   Select your web app (or create one if you haven't).
        *   You will find the `apiKey`, `authDomain`, `projectId`, etc. Copy these values into your `.env` file.
    *   **API URL:**
        *   Replace `<your-local-ip-address>` with your computer's local IP address. This allows the mobile app to connect to your local backend server.
        *   On macOS/Linux, you can find this by running `ifconfig | grep "inet "`.
        *   On Windows, you can find this by running `ipconfig`.

    **Important:** The `.env` file is listed in `.gitignore` and should never be committed to the repository.

## 4. Running the Application

You'll need to run both the backend and frontend servers simultaneously.

1.  **Start the Backend Server:**
    *   Open a terminal window, navigate to the `backend` directory, and run:
    ```bash
    node index.js
    ```
    You should see a message indicating the server is running on port 4000.

2.  **Start the Frontend App:**
    *   Open a second terminal window, navigate to the `frontend` directory, and run:
    ```bash
    npx expo start
    ```
    *   This will open the Expo developer tools in your browser. You can then choose to run the app on an iOS simulator or Android emulator.

## 5. Running the App on an iOS Simulator (macOS only)

This project uses a **custom development build**. You must follow these steps to run the app on the simulator.

1.  **Configure Xcode Command Line Tools:**
    *   Open a terminal and run the following command. This ensures your command line knows where to find Xcode. You may be prompted for your password.
    ```bash
    sudo xcode-select -s /Applications/Xcode.app/Contents/Developer
    ```

2.  **Build and Install the Development App (One-time setup):**
    *   Make sure your iOS Simulator is open (you can open it from Xcode via `Xcode > Open Developer Tool > Simulator`).
    *   In a terminal, navigate to the `frontend` directory and run:
    ```bash
    npx expo run:ios
    ```
    *   This command builds the native code of your app and installs it on the simulator. This can take several minutes. You only need to re-run this command if you add new native libraries or change native configurations.

3.  **Start the Servers and Run the App (Daily Workflow):**
    *   **Terminal 1: Start the Backend:**
        ```bash
        cd backend
        node index.js
        ```
    *   **Terminal 2: Start the Frontend:**
        ```bash
        cd frontend
        npx expo start # Add the '-c' flag to clear cache if you have issues
        ```
    *   Once the Expo development server starts, press `i` in the terminal. This will open your app in the already running simulator.

## 6. Running the App on an Android Emulator

This project uses a **custom development build**. You must follow these steps to run the app on the emulator.

1.  **Set up Android Studio:**
    * Download and install [Android Studio](https://developer.android.com/studio).
    * Open Android Studio, go to `Tools > SDK Manager`. Under the "SDK Platforms" tab, make sure a recent Android version (e.g., Android 13.0 "Tiramisu") is installed.
    * Go to the "SDK Tools" tab and ensure `Android SDK Build-Tools`, `NDK (Side by side)`, and `Android Emulator` are checked and installed.

2.  **Create an Android Virtual Device (AVD):**
    * In Android Studio, go to `Tools > Device Manager`.
    * Click `Create device`.
    * Choose a device definition (e.g., Pixel 7 Pro) and click `Next`.
    * Select a system image. It is recommended to choose one that includes **Google Play Services**. Download it if necessary, then click `Next`.
    * Click `Finish` to create the AVD.

3.  **Build and Install the Development App (One-time setup):**
    * Start your Android emulator from the Device Manager in Android Studio by clicking the "play" icon next to your AVD.
    * In a terminal, navigate to the `frontend` directory and run:
    ```bash
    npx expo run:android
    ```
    * This command builds the native code of your app and installs it on the running emulator. This can take several minutes. You only need to re-run this command if you add new native libraries or change native configurations.

4.  **Start the Servers and Run the App (Daily Workflow):**
    * **Terminal 1: Start the Backend:**
        ```bash
        cd backend
        node index.js
        ```
    * **Terminal 2: Start the Frontend:**
        ```bash
        cd frontend
        npx expo start # Add the '-c' flag to clear cache if you have issues
        ```
    * Once the Expo development server starts, press `a` in the terminal. This will open your app in the already running emulator.

You can now make changes to your JavaScript/TypeScript code and see them hot-reload in the emulator.

You are now ready to start developing!
