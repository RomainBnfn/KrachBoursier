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
  production: true,
  useEmulators: false,
  firebase: {
    config: firebaseConfig,
  },
};
