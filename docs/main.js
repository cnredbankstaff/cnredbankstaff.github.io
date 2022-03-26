
const CLIENT_ID = '357661536225-h5vavu1fs1bm9rpvljinphekdvfhjuh0.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDx_b0RIzWYc8j6z1219chXTwyUNucrDOc';

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/spreadsheets.readonly";

let authorizeButton = document.getElementById('authorize_button');
let viewButton = document.getElementById('view_answers');
let backButton = document.getElementById('view_question');




let fname;
let lname;
let belt;
let question;
let option1;
let option2;
let dateObj = new Date();
let date = `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()}`
const FORMDIV = document.getElementById("form");




function handleClientLoad() {
    gapi.load('client:auth2', initClient);
}

function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

function initClient() {
    gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        //gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
    }, function(error) {
        appendPre(JSON.stringify(error, null, 2));
    });
}

function updateSigninStatus(isSignedIn) {
    if (isSignedIn) {
      authorizeButton.style.display = 'none';
      updateData();
    } else {
      authorizeButton.style.display = 'block';
    }
}



function updateData() {
    gapi.client.sheets.spreadsheets.values.get({
      spreadsheetId: '18riOJtSjAPxuKJ8rxOR2Tqeyc95UJ4XnIWZpViLOgwc',
      range: 'Sheet1!A2:E',
    }).then(function(response) {
      var range = response.result;
      if (range.values.length > 0) {
        appendPre('Current Date Q:');
        for (i = 0; i < range.values.length; i++) {
          var row = range.values[i];
          // Print columns A and E, which correspond to indices 0 and 4.
          if (row[0] === new Date().toLocaleDateString()) {
            question = row[2];
            option1 = row[3];
            option2 = row[4];

            document.getElementById("question_label").innerText = question;
            document.getElementById("option1").innerHTML = option1;
            document.getElementById("option2").innerHTML = option2;
          }
        }
      } else {
        appendPre('No data found.');
      }
    }, function(response) {
      appendPre('Error: ' + response.result.error.message);
    });
}





function submitAction() {
    fname = document.getElementById("fname").value;
    lname = document.getElementById("lname").value;
    belt = document.getElementById("belt").value;
    answer = document.getElementById("answer").value;

    console.log(fname + " " + lname + " " + belt + "" + answer);
}

window.onload = function() {
    document.getElementById("date").innerHTML = date;
}
