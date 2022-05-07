
const CLIENT_ID = '357661536225-h5vavu1fs1bm9rpvljinphekdvfhjuh0.apps.googleusercontent.com';
const API_KEY = 'AIzaSyDx_b0RIzWYc8j6z1219chXTwyUNucrDOc';

// Array of API discovery doc URLs for APIs used by the quickstart
const DISCOVERY_DOCS = ["https://sheets.googleapis.com/$discovery/rest?version=v4"];

// Authorization scopes required by the API; multiple scopes can be
// included, separated by spaces.
const SCOPES = "https://www.googleapis.com/auth/spreadsheets";

let authorizeButton = document.getElementById('authorize_button');
let viewButton = document.getElementById('view_answers');
let backButton = document.getElementById('view_question');




let fname;
let lname;
let belt;
let question;
let option1;
let option2;
let correctAnswer;
let answered = false;
let doneText = document.getElementById("doneText");
let answer;
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
        console.log(JSON.stringify(error, null, 2));
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
    range: 'Sheet1!A2:F',
  }).then(function(response) {
    var range = response.result;
    if (range.values.length > 0) {
      for (i = 0; i < range.values.length; i++) {
        var row = range.values[i];
        correctAnswer = row[5];
        // console.log(row[1]);
        // console.log(row[2]);
        // console.log("weeknum " + weekNum);
        // console.log(range.values.length);
        // console.log(response);
        // its not pulling the updated spreadsheet
        // Print columns A and E, which correspond to indices 0 and 4.
        if (row[1] == weekNum) {
          question = row[2];
          option1 = row[3];
          option2 = row[4];
          // console.log(question + " " + option1 + " " + option2);

          document.getElementById("question_label").innerHTML = question;
          document.getElementById("option1").innerHTML = option1;
          document.getElementById("option2").innerHTML = option2;
          break;
        } else {
          question = "No Question";
          option1 = "No Option 1";
          option2 = "No Option 2";
      
          document.getElementById("question_label").innerHTML = question;
          document.getElementById("option1").innerHTML = option1;
          document.getElementById("option2").innerHTML = option2;
        }
      }
    }
  }, function(response) {
    console.log('Error: ' + response.result.error.message);
  });
}

function spreadsheetUpdate() {
  gapi.client.sheets.spreadsheets.values.get({
    spreadsheetId: '1bilf2_IUbhUbA-Gh5AuQ-KJI0tYfQy4J53Ofq2hU6Ik',
    range: 'Sheet1!A:E',
  }).then(function(response) {
    console.log(response);
    for(i = 0; i < response.result.values.length; i++){
      var row = response.result.values;
      if(row[i] !== undefined && row[i + 1] === undefined) {
        console.log(row[i] + " " + row[i + 1] + " test works");
        gapi.client.sheets.spreadsheets.values.update({
          spreadsheetId: '1bilf2_IUbhUbA-Gh5AuQ-KJI0tYfQy4J53Ofq2hU6Ik',
          range: 'Sheet1!A'+ (i + 2) + ':E' + (i + 2),
          valueInputOption: 'USER_ENTERED',
          resource: {
              values: [
                  [weekNum, fname, lname, belt, answer]
              ]
          }
        }).then(function(response) {
          console.log(response);
          answered = true;
          console.log("worked");
        });
        break;
      }
    }
  })
}


function submitAction() {
  fname = document.getElementById("fname").value;
  lname = document.getElementById("lname").value;
  belt = document.getElementById("belt").value;

    if(document.getElementById("option1Button").checked) {
      // assign answer to the label with the id of option1
      answer = document.getElementById("option1").innerHTML;
      // console.log(answer);
    } else {
      answer = document.getElementById("option2").innerHTML;
    }

  console.log(fname + " " + lname + " " + belt + " " + answer);
  spreadsheetUpdate();
}

window.onload = function() {
    document.getElementById("date").innerHTML = date;
    var interval = setInterval(function(){
      if(answered === true) {
        doneText.style.visiblity = "visible";
        console.log("also worked");
        clearInterval(interval);
      }
    },500);
}


function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return weekNo;
}

var weekNum = getWeekNumber(new Date());