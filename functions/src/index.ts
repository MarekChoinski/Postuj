import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';


admin.initializeApp(functions.config().firebase);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
    response.send("Hello from Firebase!");
});


exports.postCreated = functions.firestore
    .document('posts/{id}')
    .onCreate(doc => {



        const post = doc.data();
        const notification = {
            authorId: post!.authorId,
            content: post!.content,
            createdAt: post!.createdAt,
            id: post!.id,
            likedBy: post!.likedBy,
            likes: post!.likes,
        };

        return loadUsers().then((users: any) => {
            const tokens = [];
            for (const user of users) {
                tokens.push(user.pushToken);
            }

            const payload = {
                notification: notification,
            };

            console.log("idzie push");


            return admin.messaging().sendToDevice(tokens, payload);
        });

    });

function loadUsers() {
    const dbRef = admin.database().ref('/users');
    const defer = new Promise((resolve, reject) => {
        dbRef.once('value', (snap) => {
            const data = snap.val();
            const users = [];
            for (const property in data) {
                users.push(data[property]);
            }
            resolve(users);
        }, (err: any) => {
            reject(err);
        }).catch((e: any) => console.log(e));
    }).catch((e: any) => console.log(e)
    );
    return defer;
}