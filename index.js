const express = require('express')
const app = express()
const firebase = require('firebase')
const port = 3000

firebase.initializeApp({
    apiKey: "AIzaSyD0TP7PnIPGS12yE1_plnnsHT7-lNk2gjw",
	authDomain: "smartangkot.firebaseapp.com",
	databaseURL: "https://smartangkot.firebaseio.com",
	projectId: "smartangkot",
	storageBucket: "smartangkot.appspot.com",
	messagingSenderId: "1052207778717",
	appId: "1:1052207778717:web:553fafdd3044fe3f"
})



app.get('/penumpang/:idAngkot', (req, res) => {
    res.type("json");
    const db = firebase.firestore()
    var awalan = String(req.params.idAngkot);
    db.collection("penumpang").where("angkot", "==", awalan).get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            if(!Boolean(doc.data().naik)) {
                console.log(doc.data().id)
                res.json(String(doc.data().id))
            }
        })
    })
})

app.get('/naik/:idPenumpang', (req, res) => {
    res.type("json");
    const db = firebase.firestore()
    var awalan = String(req.params.idPenumpang);
    var datab = db.collection("penumpang").doc(awalan)
    datab.get().then(doc => {
        if (!doc.data().naik) {
            datab.update({ naik: true })
            res.json("naik")
            if (!doc.data().turun) {
                datab.update({ turun: true })
                res.json("turun")
            }
        }
    })    
})

app.get('/angkot/:idAngkot', (req, res) => {
    res.type("json");
    const db = firebase.firestore()
    var awalan = String(req.params.idAngkot);
    var datab = db.collection("angkot").doc(awalan)
    datab.get().then(doc => {
        if (!doc.data().status) {
            datab.update({ status: true })
            res.json("on")
        } else {
            datab.update({ status: false })
            res.json("off")
        }
    })    
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))