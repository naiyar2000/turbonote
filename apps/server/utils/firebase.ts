import admin from "firebase-admin";

//for json file(uncomment below line to running locally)
// import serviceAccount from '../firebase-service-account.json'


//for utf8 encoded file(for storing and retrieving config json from github secrets)
import fs from 'fs';
const serviceAccount = JSON.parse(
  fs.readFileSync('../firebase-service-account.json', 'utf8')
);


if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
  });
}

export const auth = admin.auth();
