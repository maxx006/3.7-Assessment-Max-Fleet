// JavaScript Document
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var btn = document.getElementById("myBtn");

function charterBooking() {
    var totalCost = 0;
    var extrasCost = 0;
    alert("charter booking function starting");
    var checkInDate = document.getElementById("checkInDate").value;
    var guestAmount = document.getElementById("guestAmount").value;
    var bookingPurpose = document.getElementById("bookingPurpose").value;
    var cruiseDuration = document.getElementById("cruiseDuration").value;
    var cruiseType = this.dataset.value;
    var boatCost = this.dataset.price;

    var extraOptions = [];
    var myForm = document.getElementsByClassName("extrasCheckbox");

    for (var i = 0; i < myForm.length; i++) {
        if (myForm[i].type == "checkbox" && myForm[i].checked) {
            extraOptions.push(myForm[i].value);
            extrasCost += Number(myForm[i].dataset.price);
        }
    }

    totalCost = Number(cruiseDuration * boatCost + extrasCost);
    alert("Total cost: " + totalCost);

    document.getElementById("outputDate").scrollIntoView();
    outPutSummary(checkInDate, cruiseDuration, guestAmount, cruiseType, extrasCost, totalCost, bookingPurpose, extraOptions, boatCost);
}

function outPutSummary(checkInDate, cruiseDuration, guestAmount, cruiseType, extrasCost, totalCost, bookingPurpose, extraOptions, boatCost) {
    alert("output summary function");
    document.getElementById("outputDate").innerHTML = checkInDate;
    document.getElementById("durationOutput").innerHTML = cruiseDuration;
    document.getElementById("cruiseOutput").innerHTML = cruiseType;
    document.getElementById("purposeOutput").innerHTML = bookingPurpose;
    document.getElementById("guestOutput").innerHTML = guestAmount;
    document.getElementById("extrasOutput").innerHTML = "$" + extrasCost;
    document.getElementById("optionsOutput").innerHTML = extraOptions.join(", ");
    document.getElementById("totalOutput").innerHTML = "$" + totalCost;
}

// Function to check details and validate before submission
function checkDetails(event) {
    // Prevent form submission
    event.preventDefault();

    // Check if terms and conditions are accepted
    var termsCheckbox = document.getElementById("termsCheckbox");
    var errorMessage = document.getElementById("termsError");

    if (!termsCheckbox.checked) {
        // Show error message
        errorMessage.style.display = 'block';
        errorMessage.innerText = "Please accept the terms and conditions.";
        return;  // Stop further processing
    } else {
        // Hide the error message if checkbox is checked
        errorMessage.style.display = 'none';
    }

    alert("customer details function");
    var firstname = document.getElementById("firstNameInput").value;
    var lastname = document.getElementById("lastNameInput").value;
    var cellphone = document.getElementById("phoneNumberInput").value;
    var email = document.getElementById("emailInput").value;
    var driversLicence = document.getElementById("driversLicenceInput").value;
    var age = document.getElementById("ageInput").value;
    var comments = document.getElementById("commentsInput").value;

    // Retrieve data already displayed in the summary
    var checkInDate = document.getElementById("outputDate").innerText;
    var cruiseDuration = document.getElementById("durationOutput").innerText;
    var guestAmount = document.getElementById("guestOutput").innerText;
    var cruiseType = document.getElementById("cruiseOutput").innerText;
    var extrasCost = parseFloat(document.getElementById("extrasOutput").innerText.replace('$', ''));
    var totalCost = parseFloat(document.getElementById("totalOutput").innerText.replace('$', ''));
    var bookingPurpose = document.getElementById("purposeOutput").innerText;
    var extraOptions = document.getElementById("optionsOutput").innerText.split(", ");

    pushData(firstname, lastname, cellphone, email, driversLicence, age, comments, checkInDate, cruiseDuration, cruiseType, bookingPurpose, guestAmount, extrasCost, extraOptions, totalCost);
}

// Function to push data to Airtable
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
        "Extras": extraOptions.join(", "),
		"Extras Cost": extrasCost,
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

    // Display modal and handle its closing
    modal.style.display = "block";
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
    span.onclick = function() {
        modal.style.display = "none";
    };

    // Refresh the page after a delay
    setTimeout(function() {
        location.reload();
    }, 5000);
    console.log("End Function.");
}

// Add event listeners to exercise to room card by using a for loop
var tiles = document.getElementsByClassName('card');
for (var i = 0; i < tiles.length; i++) {
    // Ensure charterBooking is called on click
    tiles[i].addEventListener('click', charterBooking);
}

// Event listener for the submit button to call checkDetails
document.getElementById("submitButton").addEventListener('click', checkDetails);
