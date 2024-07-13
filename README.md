# TaskManagerApp

TaskManagerApp is a mobile application for managing tasks, viewing a leaderboard, and more. This app is built using React Native and Firebase.

## Features

- User authentication (Sign Up, Log In)
- Task management (Add, Edit, View, Delete tasks)
- Leaderboard to view top users
- Task details with additional information

## Installation

### Prerequisites

Make sure you have the following installed on your local development environment:

- Node.js (https://nodejs.org/)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- Firebase account and project setup

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/TaskManagerApp.git
   cd TaskManagerApp
   ```

2. **Install dependencies:**

   Using npm:
   ```bash
   npm install
   ```

   Using yarn:
   ```bash
   yarn install
   ```

3. **Set up Firebase:**

   Create a Firebase project and set up authentication and Firestore. Follow the Firebase documentation for setup: https://firebase.google.com/docs.

4. **Configure Firebase:**

   Edit a file firebase.js in the config folder with your Firebase configuration:

   ```bash
   import { initializeApp } from "firebase/app";
   import { getAnalytics } from "firebase/analytics";
   import { getAuth } from "firebase/auth";
   import { getFirestore } from "firebase/firestore";
   import { getStorage } from "firebase/storage";
   
   // Add your Firebase configuration here
   const firebaseConfig = {
     apiKey: "xxxxx",
     authDomain: "xxxxx",
     projectId: "xxxxx",
     storageBucket: "xxxxx",
     messagingSenderId: "xxxxx",
     appId: "xxxxx",
     measurementId: "xxxxx",
   };

   // Initialize Firebase
   export const FIREBASE_APP = initializeApp(firebaseConfig);
   export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
   export const FIREBASE_DB = getFirestore(FIREBASE_APP);
   export const FIREBASE_STORAGE = getStorage(FIREBASE_APP);
   export const analytics = getAnalytics(FIREBASE_APP);
   ```
5. **Run the app::**

   ```bash
   expo start
   ```
   OR
   ```bash
   npx expo start
   ```
## Configuration

### Firebase
Ensure you have enabled Email/Password authentication in the Firebase console and have set up Firestore with the required collections and documents.

### Environment Variables
If you are using environment variables, ensure they are correctly set up in a '__.env__' file.

## Usage

- **Sign Up**: Create a new account.
- **Log In**: Access your account.
- **Add Task**: Create new tasks.
- **Edit Task**: Modify existing tasks.
- **View Task Details**: View detailed information about tasks.
- **Leaderboard**: View the leaderboard to see top users.

## Screens

- **Home**: Main dashboard with task overview.
- **Task**: Detailed view of tasks.
- **Leaderboard**: View top users.
- **AddTask**: Form to add a new task.
- **EditTask**: Form to edit an existing task.
- **TaskDetail**: View detailed task information.
- **LogIn**: User login screen.
- **SignUp**: User sign-up screen.

## Navigation

The app uses **React Navigation** for navigation between screens. The main navigators are:

- **Stack Navigator**: For authentication and main app screens.
- **InsideStack Navigator**: For authenticated user screens.

## Download
You can download the latest APK from the link below:
- Download [TaskManagerApp APK](https://drive.google.com/file/d/1DXgexmlNoIUiHZOjAudsukcsSmTiUMIE/view?usp=drive_link)
