let fname;
let lname;
let belt;
let question;
let answer;
const FORMDIV = document.getElementById("form");

function submitAction() {
    fname = document.getElementById("fname").value;
    lname = document.getElementById("lname").value;
    belt = document.getElementById("belt").value;

    console.log(fname + " " + lname + " " + belt);
}

