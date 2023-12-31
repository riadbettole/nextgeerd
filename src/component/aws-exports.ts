import { Amplify, Auth } from 'aws-amplify';

Amplify.configure({
  Auth: {
    region: 'eu-north-1',

    userPoolId: 'eu-north-1_86SlHWTLw',
    userPoolWebClientId: "3ods4ng49inu9pueh082je89u3",

    oauth: {
      domain: 'azureadgeerd.auth.eu-north-1.amazoncognito.com',
      scope: [
        'phone',
        'email',
        'openid',
      ],
      // redirectSignIn: 'https://main.d2qvh428tc0nf9.amplifyapp.com/',
      redirectSignIn: 'http://localhost:3000/',
      // redirectSignOut:'https://main.d2qvh428tc0nf9.amplifyapp.com/',
      redirectSignOut:'http://localhost:3000/',
      responseType: 'code',
    },
  },
});


const awsExports = Auth.configure();

export default awsExports;