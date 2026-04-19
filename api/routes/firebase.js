var express = require('express');
var router = express();
require('dotenv').config();
var firebaseApp = require('@firebase/app');
var firebaseAuth = require('@firebase/auth');
var firestore = require('@firebase/firestore/lite');
var calculator = require('../calculations/calculate');

const config = {
    apiKey: process.env.FIREBASE_API,
    authDomain: "sleepobserver.firebaseapp.com",
    projectId: "sleepobserver",
    storageBucket: "sleepobserver.appspot.com",
    messagingSenderId: "927945134920",
    appId: "1:927945134920:web:7aa4003f3cabaa1146597d",
    measurementId: "G-1247QDB0TX",
};

firebaseApp.initializeApp(config);
const auth = firebaseAuth.getAuth();

router.post('/userLogin', async function(req, res) {
    const {mail, password} = req.body;

    await firebaseAuth.signInWithEmailAndPassword(auth, mail, password)
    .then(async (response) => {
        const uid = response.user.uid;
        const collectionReference = firestore.collection(firestore.getFirestore(), "user_data");
        const docSnap = await firestore.getDocs(collectionReference)
        .then((docs) => {
            docs.forEach((doc) => {
                if(doc.id == uid){
                    res.send(uid);
                }
            })
        });
    })
    .catch((err) => {
        console.log(err);
        res.send(err.code);
    });

});

router.post('/userSignup', async function(req, res) {
    const {mail, password} = req.body;

    await firebaseAuth.createUserWithEmailAndPassword(auth, mail, password)
    .then(async (response) => {
        const uid = response.user.uid;
        res.send(uid);
    })
    .catch((err) => {
        console.log(err);
        res.send(err.code);
    })
});

router.post('/getUserInfo', async function(req, res) {
    const {uid} = req.body;

    const collectionRef = firestore.collection(firestore.getFirestore(), 'user_data');
    await firestore.getDocs(collectionRef)
    .then((docs) => {
        docs.forEach((doc) => {
            if(doc.id === uid){
                res.send(JSON.stringify(doc.data()));
            }
        });
    });

});

router.get('/userLogout', function(req, res) {
    firebaseAuth.signOut(auth)
    .then((response) => {
        res.send("OK");
        console.log("Response: " + response);
    }).catch((err) => {
        console.log("Error: " +err);
        res.send({
            result: "ERROR",
            details: err
        });
    });
});

router.post('/getCalculatedData', async function(req, res) {
    const {uid} = req.body;

    const collectionRef = firestore.collection(firestore.getFirestore(), 'watch_data');
    await firestore.getDocs(collectionRef)
    .then((docs) => {
        docs.forEach((doc) => {
            if(doc.id == uid){
                const data = doc.data();
                res.send(calculator(data.acceleration, data.bpm, data.thermometer, data.microphone, data.timestamp));
            }
        });
    }).catch((err) => {
        console.log(err)
        res.send({
            result: "FETCH ERROR",
            details: err
        });
    });
});

module.exports = router;