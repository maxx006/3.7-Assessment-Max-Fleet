// JavaScript Document
function charterBooking() {
	var totalCost = 0;
	var extrasCost = 0;
	var checkInDate = document.getElementById("checkInDate").value;
	var guestAmount = document.getElementById("guestAmount").value;
	var bookingPurpose = document.getElementById("bookingPurpose").value;
	var cruiseDuration = document.getElementById("cruiseDuration").value;
	var cruiseType = document.getElementById("cruiseType").value;
	var pricePerHour = this.dataset.price;
	totalCost += Number(cruiseDuration * pricePerHour + extrasCost);
	extraOptions = [];
	var myForm = document.getElementsByClassName("extrasCheckbox")
	if (document.getElementById("checkInDate").validity.valueMissing) {
		alert("date not selected");
		document.getElementById("checkInDate").scrollIntoView();
		//add an inline error message here 
		return;
	}
	if (document.getElementById("cruiseDuration").validity.rangeUnderflow || document.getElementById("cruiseDuration").validity.rangeOverflow || document.getElementById("cruiseDuration").validity.valueMissing) {
		alert("Select duration of cruise");
		document.getElementById("cruiseDuration").scrollIntoView();
		//add 
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
	totalCost = Number(cruiseDuration * pricePerHour + extrasCost);
	alert("total cost" + totalCost);
	document.getElementById("outputDate").scrollIntoView();
	outPutSummary(checkInDate, cruiseDuration, guestAmount, cruiseType, extrasCost, totalCost, bookingPurpose, extraOptions, pricePerHour);
}

function outPutSummary(checkInDate, cruiseDuration, guestAmount, cruiseType, extrasCost, totalCost, bookingPurpose, extraOptions, pricePerHour) {
	document.getElementById("outputDate").innerHTML = checkInDate;
	document.getElementById("durationOutput").innerHTML = cruiseDuration;
	document.getElementById("cruiseOutput").innerHTML = cruiseType;
	document.getElementById("purposeOutput").innerHTML = bookingPurpose;
	document.getElementById("guestOutput").innerHTML = guestAmount;
	document.getElementById("extrasOutput").innerHTML = "$" + extrasCost;
	document.getElementById("optionsOutput").innerHTML = extraOptions;
	document.getElementById("totalOutput").innerHTML = "$" + totalCost;
	checkDetails(checkInDate, cruiseDuration, guestAmount, cruiseType, extrasCost, totalCost, bookingPurpose, extraOptions);
}

function checkDetails(checkInDate, cruiseDuration, cruiseType, bookingPurpose, guestAmount, extrasCost, extraOptions, totalCost) {
	alert("customer details function");
	var firstname = firstNameInput.value;
	var lastname = lastNameInput.value;
	var cellphone = phoneNumberInput.value;
	var email = emailInput.value;
	var driversLicence = driversLicenceInput.value;
	var age = ageInput.value;
	var comments = commentsInput.value;
	outputcheckDetails.innerHTML = firstname + " " + lastname + " " + cellphone + " " + email + " " + driversLicence + " " + age + " " + comments;
	pushData(firstname, lastname, cellphone, email, driversLicence, age, comments, checkInDate, cruiseDuration, cruiseType, bookingPurpose, guestAmount, extrasCost, extraOptions, totalCost);
}

function pushData(firstname, lastname, cellphone, email, driversLicence, age, comments, checkInDate, cruiseDuration, cruiseType, bookingPurpose, guestAmount, extrasCost, extraOptions, totalCost) {
	alert("Push data function");
	var Airtable = require('airtable');
	var base = new Airtable({
		apiKey: 'pat0yqkc62q5nkQv6.a1beaa95e0e7de0e58c6639ef2bb9d647d9e16a69ebffe342e9db1b98e8897c1'
	}).base('appxt1ddAlNkHN4c7');
	console.log("Creating a record....");
	base('Cruise').create({
		"First Name": firstname,
		"Last Name": lastname,
		"Phone Number": cellphone,
		"Email": email,
		"Drivers Licence": driversLicence,
		"Age": age,
		"Comments": comments,
		"Date of Hire": checkInDate,
		"Cruise Time": cruiseType,
		"Hours on Cruise": cruiseDuration,
		"Cruise Purpose": bookingPurpose,
		"Amount of Guests": guestAmount,
		"Extras": extraOptions,
		"Total Cost": totalCost
	}, {
		typecast: true
	}, function(err, record) {
		if (err) {
			console.error(err);
			return;
		}
		console.log("Record created: " + record.getId());
	});
	// When the user clicks the button, open the modal
	alert("modal is about to pop up");
	modal.style.display = "block";
	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
 	if (event.target == modal) {
		modal.style.display = "none";
 		}
	}
	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
 	modal.style.display = "none";
	}
	// Refresh the page after a delay of 3 seconds
	setTimeout(function(){
	location.reload();
	}, 5000); // 5000 milliseconds = 5 seconds
    console.log("End Function.");
}

// Add event listeners to exercise to room card by using a for loop
var tiles = document.getElementsByClassName('card');
for (var i = 0; i < tiles.length; i++) {
	// If a tile is clicked, it calls the outputSummary function
	tiles[i].addEventListener('click', charterBooking, outPutSummary);
}