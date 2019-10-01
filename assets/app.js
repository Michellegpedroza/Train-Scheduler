// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: `AIzaSyCotr9_bOZ82TFN-UXVVHirjULjjopSfh0`,
  authDomain: `train-scheduler-99335.firebaseapp.com`,
  databaseURL: `https://train-scheduler-99335.firebaseio.com`,
  projectId: `train-scheduler-99335`,
  storageBucket: ``,
  messagingSenderId: `176382154081`,
  appId: `1:176382154081:web:2f7cdbbaf30243f6b9e120`,
  measurementId: `G-FDCB73XSZX`
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)
firebase.analytics()





// pass original date in seconds (unix) and rate in minutes
const getNext = (original, rate) => {

  const rateInSeconds = rate * 60

  const now = moment().unix()

  let lapse = original

  while (lapse < now) {
    lapse += rateInSeconds
  }

  return moment((lapse + rate), 'X').format('MMMM, Do YYYY hh:mm a')
}