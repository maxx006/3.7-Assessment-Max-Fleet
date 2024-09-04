// JavaScript Document

function charterBooking(){
	var totalCost = 0;
	var extrasCost = 0;
	var checkInDate = document.getElementById("checkInDate").value;
	var guestAmount = document.getElementById("guestAmount").value;
	var bookingPurpose =document.getElementById("bookingPurpose").value;
	var cruiseDuration = document.getElementById("cruiseDuration").value;
	var cruiseType =this.dataset.value;
	var boatCost =this.dataset.price;
	totalCost += Number(cruiseDuration*boatCost+extrasCost);
	extraOptions = [];
	var myForm = document.getElementsByClassName("extrasCheckbox")
	
	if(document.getElementById("checkInDate").validity.valueMissing){
		alert("date not selected");
		document.getElementById("checkInDate").scrollIntoView();
		//add an inline error message here 
		return;
	}
	
	if (document.getElementById("cruiseDuration").validity.rangeUnderflow ||
		document.getElementById("cruiseDuration").validity.rangeOverflow ||
		document.getElementById ("cruiseDuration").validity.valueMissing) {
			alert("Select duration of cruise");
			document.getElementById("cruiseDuration").scrollIntoView();
			//add in inline message here 
			return;
	}
	
	
	
	
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
	totalCost = Number(cruiseDuration*boatCost + extrasCost);
	alert("total cost" + totalCost);
	document.getElementById("outputDate").scrollIntoView();
	outPutSummary(checkInDate, cruiseDuration, guestAmount, cruiseType, extrasCost, totalCost, bookingPurpose,extraOptions,boatCost);
}


function outPutSummary(checkInDate, cruiseDuration, guestAmount, cruiseType, extrasCost, totalCost, bookingPurpose, extraOptions, boatCost) {
	document.getElementById("outputDate").innerHTML = checkInDate;
	document.getElementById("durationOutput").innerHTML = cruiseDuration;
	document.getElementById("cruiseOutput").innerHTML = cruiseType;
	document.getElementById("purposeOutput").innerHTML = bookingPurpose;
	document.getElementById("guestOutput").innerHTML = guestAmount;
	document.getElementById("extrasOutput").innerHTML = extrasCost;
	document.getElementById("optionsOutput").innerHTML = extraOptions;
	document.getElementById("totalOutput").innerHTML = totalCost;
	
}

function checkDetails(){}

function pushData(){
	alert("Push data function");
	var Airtable = require('airtable');
	var base = new Airtable({
		apiKey: 'pat0yqkc62q5nkQv6.a1beaa95e0e7de0e58c6639ef2bb9d647d9e16a69ebffe342e9db1b98e8897c1'
	}).base('appxt1ddAlNkHN4c7');
	console.log("Creating a record....");
	base('Cruise').create({
		"First Name": firstNameInput,
		"Last Name": lastNameInput
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