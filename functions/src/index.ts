import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import * as cors from 'cors';
const corsHandler = cors({origin: true});
admin.initializeApp()
//const db = admin.firestore();
exports.createEducator = functions.https.onRequest(async (request, response) => {
    // tslint:disable-next-line: no-empty
    corsHandler(request, response, () => {});
    response.set('Access-Control-Allow-Origin', "*")
    response.set('Access-Control-Allow-Methods', 'GET, POST')

   if (request.method !== "POST") {
       response.status(400).send("what are you trying baby?");
       return 0;
   }
   
   const email = request.body.email;
   const pass = request.body.pass;
   
   await admin.auth().createUser({
       email: email,
       emailVerified: true,
       password: pass,
   })
       .then( async (userRecord) => {
           // See the UserRecord reference doc for the contents of userRecord.
/*            console.log("Conductor " + email + "Creado" );
           await db.collection("users").doc(userRecord.uid).set({role:'educator'}).catch(err=>{
              console.log(err)
           }) */
           response.send({"uid":userRecord.uid});
           return 1;
       })
       .catch(function(error) {
           response.send("Error: "+error);
           console.log("Error creating new user:", error);
           return 1;
       });
        response.send("Error: ");
   return 1;
});

exports.createStudent = functions.https.onRequest(async (request, response) => {
    // tslint:disable-next-line: no-empty
    corsHandler(request, response, () => {});
    response.set('Access-Control-Allow-Origin', "*")
    response.set('Access-Control-Allow-Methods', 'GET, POST')

   if (request.method !== "POST") {
       response.status(400).send("what are you trying baby?");
       return 0;
   }
   
   const email = request.body.email;
   const pass = request.body.pass;
   
   await admin.auth().createUser({
       email: email,
       emailVerified: true,
       password: pass,
   })
       .then( async (userRecord) => {
           // See the UserRecord reference doc for the contents of userRecord.
           console.log("Conductor " + email + "Creado" );
/*            await db.collection("users").doc(userRecord.uid).set({role:'student'}).catch(err=>{
              console.log(err)
           }) */
           response.send({"uid":userRecord.uid});
           return 1;
       })
       .catch(function(error) {
           response.send("Error: "+error);
           console.log("Error creating new user:", error);
           return 1;
       })
       response.send("Error: ");
       return 1
});