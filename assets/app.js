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
document.getElementById(`submit`).addEventListener(`click`, e => {
  e.preventDefault()
  //Gathering input values into variables
  let nameInput = document.getElementById(`trainName`).value
  let destinationInput = document.getElementById(`destination`).value
  let trainTimeInput = document.getElementById(`firstTrainTime`).value
  let frequencyInput = document.getElementById(`frequency`).value

  //Object for new trains
  const newTrain = {
    name: nameInput,
    destination: destinationInput,
    firstTime: trainTimeInput,
    frequency: frequencyInput
  }

  //Storing the new train object into the Firestore database
  database
    .collection(`trains`)
    .doc(newTrain.name)
    .set(newTrain)

  //Reset form
  document.getElementById(`trainName`).value = ""
  document.getElementById(`destination`).value = ""
  document.getElementById(`firstTrainTime`).value = ""
  document.getElementById(`frequency`).value = ""

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
    //Add new row to the schedule with new train info
    database
      .collection(`trains`)
      .onSnapshot(({ docs }) => {
        docs.forEach(train => {
          let { name, destination, firstTime, frequency } = train.data()
          let trainElem = document.createElement(`tr`)
          trainElem.innerHTML = `
              <th scope="row"> ${name} </th>
              <td> ${destination} </td>
              <td> ${frequency} </td>
              <td> nextArrival  </td>
              <td> minsAway </td>
            `
          document.getElementById(`tableBody`).append(trainElem)
        })
      })
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