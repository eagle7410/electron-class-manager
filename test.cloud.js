const Clouds = require('./libs/Clouds');

void async function () {
	try {
		/**
		 *
		 * @type {GoogleDrive}
		 */
		const driveGoogle = Clouds.getCloud(Clouds.types.google);


		await driveGoogle.connectInit({
			"access" : {
			"access_token": "ya29.GlvWBL7XfSvYMvuL_vd-ayzzNoVsLSM7owgofd9AkOz0y0fBDiYhKqtAB_CqqtVunJDGygc8fGiw7MUJuvkSH4C5TkT0VjvSNIatlo6BE2oRTwHBJdW47Iz1iI69",
					"refresh_token": "1/Z0SkbaEgtI5kkSiBkVjI0bE8CdEZ1rx4OLSHDZYqAx0",
					"token_type": "Bearer",
					"expiry_date": 1506808504118
			},
			"installed": {
				"client_id": "536275102901-ogs42bb1l0tu35jhocsgps5ng1h4tcd8.apps.googleusercontent.com",
				"project_id": "fresh-arcade-181417",
				"auth_uri": "https://accounts.google.com/o/oauth2/auth",
				"token_uri": "https://accounts.google.com/o/oauth2/token",
				"auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
				"client_secret": "mNPIwZaox7lwqwuFW5HAcg54",
				"redirect_uris": [
					"urn:ietf:wg:oauth:2.0:oob",
					"http://localhost"
				]
			}
		});

	} catch (e) {
		console.error(e);
	} finally {
		process.exit();
	}
}();
