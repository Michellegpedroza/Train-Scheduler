// Firebase configuration
const config = {
  apiKey: `AIzaSyChhNoN4QVyMHSNyymOzPLe1vohU8unqtU`,
  authDomain: `trainscheduler-b8011.firebaseapp.com`,
  databaseURL: `https://trainscheduler-b8011.firebaseio.com`,
  projectId: `trainscheduler-b8011`,
  storageBucket: `trainscheduler-b8011.appspot.com`,
  messagingSenderId: `190167280474`,
  appId: `1:190167280474:web:ef4175a8d34e29908c6163`,
  measurementId: `G-ME42QM4Q95`
}
// Initialize Firebase
firebase.initializeApp(config)

//Variable to reference the firestore db
let database = firebase.firestore()

//Submit Button click event to gather new train info
document.getElementById(`submit`).addEventListener(`click`, e => {
  e.preventDefault()
  //Gathering input values into variables
  let name = document.getElementById(`trainName`).value
  let destination = document.getElementById(`destination`).value
  let firstTime = document.getElementById(`firstTrainTime`).value
  let frequency = document.getElementById(`frequency`).value

  //Object for new trains
  let newTrain = {
    name: name,
    destination: destination,
    firstTime: firstTime,
    frequency: frequency
  }

  //Storing the new train object into the Firestore database
  database
    .collection(`trains`)
    .doc(newTrain.name)
    .set(newTrain)

  //Reset form
  document.getElementById(`trainName`).value = ``
  document.getElementById(`destination`).value = ``
  document.getElementById(`firstTrainTime`).value = ``
  document.getElementById(`frequency`).value = ``

  //Validating  form Inputs
  if (name == `` ||
    destination == `` ||
    firstTime == `` ||
    frequency == ``) {
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
        document.getElementById(`tableBody`).innerHTML = ``
        docs.forEach(train => {

          // calculate the frequency time
          let differenceInTime = moment().diff(moment.unix(firstTime), "minutes");
          let remainder = moment().diff(moment.unix(firstTime), "minutes") % frequency;
          let minsAway = frequency - remainder;

          // calculate arrival time
          let nextArrival = moment().add(minsAway, "m").format("hh:mm A");

          let { name, destination, firstTime, frequency } = train.data()
          let trainElem = document.createElement(`tr`)
          trainElem.innerHTML = `
              <th scope="row"> ${name} </th>
              <td> ${destination} </td>
              <td> ${frequency} </td>
              <td> ${nextArrival}  </td>
              <td> ${minsAway} </td>
            `
          document.getElementById(`tableBody`).append(trainElem)
        })
      })
  }
})

// pass original date in seconds (unix) and rate in minutes
// const getNext = (original, rate) => {
//   const rateInSeconds = rate * 60
//   const now = moment().unix()
//   let lapse = original
//   while (lapse < now) {
//     lapse += rateInSeconds
//   }
//   return moment((lapse + rate), 'X').format('MMMM, Do YYYY hh:mm a')
// }

