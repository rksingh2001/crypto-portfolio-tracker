import firebase from "firebase/compat/app";
import { getAuth } from "firebase/auth";
import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  getFirestore,
  getDoc
} from "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGEING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
});

const db = getFirestore();
export const portfoliosRef = collection(db, 'portfolios');
getDocs(portfoliosRef)
  .then((snapshot) => {
    let books = [];
    console.log(snapshot);
    snapshot.docs.forEach((doc) => {
      books.push({ ...doc.data(), id: doc.id });
    })
    console.log(books);
  })
  .catch(err => {
    console.log(err.message);
  })

export const setDocument = async (UUID, data) => {
  await setDoc(doc(db, "portfolios", UUID), {
    coins: data
  });
}

// Gets the last saved data and add the new element if not already exists
// If it already exists it should update by taking average
export const updateDocument = async (UUID, coinUUID, buyPrice, totalBought) => {
  const docRef = doc(db, "portfolios", UUID);
  const docSnap = await getDoc(docRef);
  
  let data;
  if (docSnap.exists()) {
    data = docSnap.data();
  } else {
    console.log("In updateDocument: No such document!");
  }

  if (data.coins[coinUUID]) { 
    // buyPrice is the average price
    buyPrice = (buyPrice*totalBought + data.coins[coinUUID].buyPrice*data.coins[coinUUID].totalBought)/(totalBought + data.coins[coinUUID].totalBought);
    totalBought += data.coins[coinUUID].totalBought;
    data.coins[coinUUID] = {
      "buyPrice": buyPrice,
      "totalBought": totalBought
    }
  } else {
    data.coins[coinUUID] = {
      "buyPrice": buyPrice,
      "totalBought": totalBought
    }
  }

  await updateDoc(docRef, data)
}

export const auth = getAuth(app);
export default app;