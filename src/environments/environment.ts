// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyAQcKt_qR6iqyrgC1UmXnqrmZBHrm7q0Wg",
    authDomain: "authgi4.firebaseapp.com",
    databaseURL: "https://authgi4-default-rtdb.firebaseio.com",
    projectId: "authgi4",
    storageBucket: "authgi4.appspot.com",
    messagingSenderId: "949028331080",
    appId: "1:949028331080:web:5a33098d59398e89ac827d",
    measurementId: "G-SNE7DHP7KM"
  }
};

// Use this to initialize the firebase App
const firebaseApp = firebase.initializeApp(environment.firebaseConfig);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
