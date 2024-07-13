# TaskManagerApp

TaskManagerApp is a mobile application for managing tasks, viewing a leaderboard, and more. This app is built using React Native and Firebase.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Screens](#screens)
- [Navigation](#navigation)
- [License](#license)

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
