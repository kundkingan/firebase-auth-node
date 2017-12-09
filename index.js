'use strict';

let firebase = require('firebase');
let admin = require('firebase-admin');

/** Class representing a firebase authentication */
class FirebaseAuth {
	/**
	 * Creates a firebaseAuth
	 * @params {Object} firebaseConfig - The config for firebase
	 * @params {Object} serviceKey - The service account for firebase
	 */
	constructor(firebaseConfig, serviceKey, nameOfAdmin) {
		this.firebase = firebase;
		this.admin = admin;
		this.firebase.initializeApp(firebaseConfig);

		if (nameOfAdmin)
			this.admin.initializeApp({ credential: this.admin.credential.cert(serviceKey) }, nameOfAdmin);
		else
			this.admin.initializeApp({ credential: this.admin.credential.cert(serviceKey) });
	}

	/**
	 * Signing in an user and tries to get their id token.
	 *
	 * @param  {String} email - Email for the account
	 * @param  {String} password - Password for the account
	 * @promise {Object} Returns an object with idToken and uid of the user
	 * @rejects {Object} Returns an object with errors if rejected
	 */
	signIn(email, password) {
		return this.firebase.auth().signInWithEmailAndPassword(email, password)
			.then((user) => {
				return this.firebase.auth().currentUser.getIdToken(true)
					.then((idToken) => {
						return { idToken: idToken, uid: user.uid };
					})
					.catch((error) => {
						throw { code: error.code, message: error.message };
					});
			})
			.catch((error) => {
				throw { code: error.code, message: error.message };
			});
	}

	/**
	 * Verify the id token of an user.
	 *
	 * @promise {Boolean} Returns true if successful
	 * @rejects {Object} Returns an object with errors if rejected
	 */
	authToken(idToken) {
		return this.admin.auth().verifyIdToken(idToken)
			.then(() => {
				return true;
			}).catch((error) => {
				throw { code: error.code, message: error.message };
			});
	}
}

module.exports = FirebaseAuth;
