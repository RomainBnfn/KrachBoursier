// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

const firebaseConfig = {
  apiKey: 'AIzaSyD_L06tM2kSnMzRLqhCaZ3atpQorPIE318',
  authDomain: 'rbkrash-v0.firebaseapp.com',
  databaseURL:
    'https://rbkrash-v0-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'rbkrash-v0',
  storageBucket: 'rbkrash-v0.appspot.com',
  messagingSenderId: '740382564363',
  appId: '1:740382564363:web:7f919245331c8f42b7a70e',
};

export const environment = {
  production: false,
  useEmulators: false,
  firebase: {
    config: firebaseConfig,
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
