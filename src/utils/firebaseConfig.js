import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
 
// Initialize Firebase
const app = initializeApp ({
    apiKey: "AIzaSyAFwPVbJoqmyMiIl_tMxv9KpjE-zJ2a2wI",
    authDomain: "hocflutter-92cd4.firebaseapp.com",
    projectId: "hocflutter-92cd4",
    storageBucket: "hocflutter-92cd4.appspot.com",
    messagingSenderId: "9563750400",
    appId: "1:9563750400:web:1be7a0dce409bf5f9318e5",
    measurementId: "G-SQ4FN6S3QQ"
});
 
// Firebase storage reference
const storage = getStorage(app);
export default storage;