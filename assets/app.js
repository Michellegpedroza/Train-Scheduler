// Firebase configuration
const config = {
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
firebase.initializeApp(config)

//Variable to reference the firestore db
let database = firebase.firestore()


//Submit Button click event to gather new train info
document.getElementById(`submit`).addEventListener(`click`, function (e) {
  // console.log(`hello`)
  e.preventDefault()
  let nameInput = document.getElementById(`trainName`).value
  let destinationInput = document.getElementById(`destination`).value
  let trainTimeInput = document.getElementById(`firstTrainTime`).value
  let frequencyInput = document.getElementById(`frequency`).value

  //Validating  form Inputs
  if (nameInput == `` &&
    destinationInput == `` &&
    trainTimeInput == `` &&
    frequencyInput == ``) {
    document.getElementById(`alert`).innerHTML = `
          <div class="alert alert-warning alert-dismissible fade show text-center" role="alert">
              <strong>Please enter valid train data.</strong> 
              <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">&times;</span>
              </button>
          </div> 
          `
  } else {

  }
})

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