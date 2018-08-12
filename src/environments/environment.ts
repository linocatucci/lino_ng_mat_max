// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyDrJ0fFsTKyEGuu-SAEkufennxfnX3wMOI',
    authDomain: 'lino-fitness-tracker.firebaseapp.com',
    databaseURL: 'https://lino-fitness-tracker.firebaseio.com',
    projectId: 'lino-fitness-tracker',
    storageBucket: 'lino-fitness-tracker.appspot.com',
    messagingSenderId: '421561490864'
  }
};
