// JavaScript Document

function charterBooking(){
	var totalCost = 0;
	var extrasCost = 0;
	alert("charter booking function starting")
	var checkInDate = document.getElementById("checkInDate").value;
	alert(checkInDate);
	var guestAmount = document.getElementById("guestAmount").value;
	alert(cruiseDuration);
	var cruisePurpose =document.getElementsByClassName("cruisePurpose")
	var cruiseDuration = this.dataset.price;
	var cruiseType = this.dataset.price;
	alert(cruiseType + cruiseDuration);
	totalCost += Number(cruiseType + cruiseDuration);
	extraOptions = [];
	var myForm = document.getElementsByClassName("extrasCheckbox")
	for (i = 0; i < myForm.length; i++) {
		if (myForm[i].type == "checkbox") {
			if (myForm[i].checked) {
				extraOptions.push(myForm[i].value);
				extrasCost += Number(myForm[i].dataset.price);
				alert(extraOptions);
				alert(extrasCost);
			}
		}
	}
	totalCost = Number(cruiseType + cruiseDuration + extrasCost);
	alert("total cost" + totalCost);
	document.getElementById("outputDate").scrollIntoView();
	outPutSummary(checkInDate, cruiseDuration, guestAmount, cruiseType, extrasCost, totalCost, cruisePurpose,extraOptions);
}


function pushData(){
	alert("Push data function");
	var Airtable = require('airtable');
	var base = new Airtable({
		apiKey: 'pat0yqkc62q5nkQv6.a1beaa95e0e7de0e58c6639ef2bb9d647d9e16a69ebffe342e9db1b98e8897c1'
	}).base('appxt1ddAlNkHN4c7');
	console.log("Creating a record....");
	base('Cruise').create({
		"First Name": "Max",
		"Last Name": "Fleet"
	}, {
		typecast: true
	}, function(err, record) {
		if (err) {
			console.error(err);
			return;
		}
		console.log("Record created: " + record.getId());
	});
}
// Add event listeners to exercise to room card by using a for loop
var tiles = document.getElementsByClassName('card');
for (var i = 0; i < tiles.length; i++) {
	// If a tile is clicked, it calls the selectExercise function
	tiles[i].addEventListener('click', charterBooking);
}

function outPutSummary(checkInDate, cruiseDuration, guestAmount, cruiseType, extrasCost, totalCost, cruisePurpose, extraOptions) {
	document.getElementById("outputDate").innerHTML = checkInDate;
	document.getElementById("durationOutput").innerHTML = cruiseDuration;
	document.getElementById("cruiseOutput").innerHTML = cruiseType;
	document.getElementById("purposeOutput").innerHTML = cruisePurpose;
	document.getElementById("guestOutput").innerHTML = guestAmount;
	document.getElementById("extrasOutput").innerHTML = extrasCost;
	document.getElementById("optionsOutput").innerHTML = extraOptions;
	document.getElementById("totalOutput").innerHTML = totalCost;
	
}

function checkDetails(){}