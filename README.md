# firebase-auth-node

[![Build Status](https://travis-ci.org/kundkingan/firebase-auth-node.svg?branch=master)](https://travis-ci.org/kundkingan/firebase-auth-node)
[![Build Status](https://scrutinizer-ci.com/g/kundkingan/firebase-auth-node/badges/build.png?b=master)](https://scrutinizer-ci.com/g/kundkingan/firebase-auth-node/build-status/master)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/kundkingan/firebase-auth-node/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/kundkingan/firebase-auth-node/?branch=master)
[![codecov](https://codecov.io/gh/kundkingan/firebase-auth-node/branch/master/graph/badge.svg)](https://codecov.io/gh/kundkingan/firebase-auth-node)
[![Maintainability](https://api.codeclimate.com/v1/badges/8926b3a80e23331392e7/maintainability)](https://codeclimate.com/github/kundkingan/firebase-auth-node/maintainability)

#### simple firebase auth for backend node

## Features

- **super easy** API for signing in with email/password
- Get the id token of the user that signed in



## Install

```
npm install firebase-auth-node
```

## Requirements

1. Go to https://firebase.google.com/ and create a project

2. Get the firebase config for NodeJS and save as a JSON file, guide here https://firebase.google.com/docs/web/setup
```json
{
	"apiKey": "",
	"authDomain": "",
	"projectId": ""
}
```

3. Get the service key of your firebase project and save as a JSON file, guide here https://firebase.google.com/docs/admin/setup#add_firebase_to_your_app
```json
{
  "type": "",
  "project_id": "",
  "private_key_id": "",
  "private_key": "",
  "client_email": "",
  "client_id": "",
  "auth_uri": "",
  "token_uri": "",
  "auth_provider_x509_cert_url": "",
  "client_x509_cert_url": ""
}
```
4. Open up authentication for your project and add sign in method email/password

5. Add an account to the authentication


## Usage

```js
let serviceKey = require('./firebase-config/firebase.service-key.json'); // The service key of the firebase project
let firebaseConfig = require('./firebase-config/firebase.config.json'); // The config for the firebase project
let FirebaseAuthNode = require('firebase-auth-node');

let firebaseAuth = new FirebaseAuthNode(firebaseConfig, serviceKey)
```

## API

### `firebaseAuth = new FirebaseAuthNode(firebaseConfig, serviceKey, nameOfAdmin)`

Initialize the firebase config and service key to firebase and firebase-admin. 

nameOfAdmin is optional and is used if you have multiple instances of firebase admin.

### `firebaseAuth.signIn(email, password)`

Tries to sign with the provided email and password, if success it will return an object with the idToken and uid of the user. The type of `email` and `password` is string, if not an error is thrown. This function returns a Promise that you need to handle.

### `firebaseAuth.authToken(idToken)`

Uses firebase-admin to check if the id token of an user you provide is an valid token. The type of `idToken` is string, if not an error is thrown. This function returns a Promise that you need to handle.
