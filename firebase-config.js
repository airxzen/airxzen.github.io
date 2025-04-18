// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDvdNi1aqZDTlnpHCRAMer3zidIQKpRCd4",
  authDomain: "mcbingogaia.firebaseapp.com",
  databaseURL: "https://mcbingogaia-default-rtdb.firebaseio.com",
  projectId: "mcbingogaia",
  storageBucket: "mcbingogaia.appspot.com",
  messagingSenderId: "1056499163511",
  appId: "1:1056499163511:web:084d1a9e38f2e9136ec172",
  measurementId: "G-VY2TKHM701"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();
