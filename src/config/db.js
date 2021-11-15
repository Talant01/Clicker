import { getFirestore } from '@firebase/firestore'
import { initializeApp } from 'firebase/app'
const firebaseConfig = {
  apiKey: 'AIzaSyCv_62GrqwP1FF2r_iwhf3fpf-RDaz3MP4',
  authDomain: 'clicker-f944d.firebaseapp.com',
  projectId: 'clicker-f944d',
  storageBucket: 'clicker-f944d.appspot.com',
  messagingSenderId: '299778615464',
  appId: '1:299778615464:web:6ffbb13e66e5948960ba9d',
  measurementId: 'G-3QKDFD33DT',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
export default db