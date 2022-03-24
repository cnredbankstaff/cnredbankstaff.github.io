let fname;
let lname;
let belt;
let question;
let option1;
let option2;
let dateObj = new Date();
let date = `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()}`
const FORMDIV = document.getElementById("form");

function submitAction() {
    fname = document.getElementById("fname").value;
    lname = document.getElementById("lname").value;
    belt = document.getElementById("belt").value;
    answer = document.getElementById("answer").value;

    console.log(fname + " " + lname + " " + belt + "" + answer);
}

window.onload = function() {
    document.getElementById("option1").innerHTML = option1;
    document.getElementById("option2").innerHTML = option2;
    document.getElementById("date").innerHTML = date;
}
