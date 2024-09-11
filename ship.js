// JavaScript Document

// Modal elements for displaying booking summary and messages
var modal = document.getElementById("myModal");  // Modal popup
var span = document.getElementsByClassName("close")[0];  // Close button for modal
var btn = document.getElementById("myBtn");  // Generic button, potentially unused in this snippet

// Function to handle charter booking calculations and display a summary
function charterBooking() {
    var totalCost = 0;  // Initialize total cost
    var extrasCost = 0;  // Initialize extras cost
    // Retrieve values from input fields for booking details
    var checkInDate = document.getElementById("checkInDate").value;
    var guestAmount = document.getElementById("guestAmount").value;
    var bookingPurpose = document.getElementById("bookingPurpose").value;
    var cruiseDuration = document.getElementById("cruiseDuration").value;
    var cruiseType = this.dataset.value;  // Retrieve cruise type from dataset
    var boatCost = this.dataset.price;  // Retrieve boat cost from dataset
    var extraOptions = [];  // Initialize an array to store selected extras
    var myForm = document.getElementsByClassName("extrasCheckbox");  // Get all checkboxes for extras

    // Loop through all extras checkboxes to calculate total extras cost
    for (var i = 0; i < myForm.length; i++) {
        if (myForm[i].type == "checkbox" && myForm[i].checked) {
            extraOptions.push(myForm[i].value);  // Add checked extras to the list
            extrasCost += Number(myForm[i].dataset.price);  // Add extras cost
        }
    }

    // Calculate the total cost including boat cost and extras
    totalCost = Number(cruiseDuration * boatCost + extrasCost);
   
	

    // Scroll to output section and display the booking summary
    document.getElementById("outputDate").scrollIntoView();
    outPutSummary(checkInDate, cruiseDuration, guestAmount, cruiseType, extrasCost, totalCost, bookingPurpose, extraOptions, boatCost);
}

// Function to display the booking summary to the user
function outPutSummary(checkInDate, cruiseDuration, guestAmount, cruiseType, extrasCost, totalCost, bookingPurpose, extraOptions, boatCost) {
 

    // Update the HTML elements with the calculated and inputted booking details
    document.getElementById("outputDate").innerHTML = checkInDate;
    document.getElementById("durationOutput").innerHTML = cruiseDuration;
    document.getElementById("cruiseOutput").innerHTML = cruiseType;
    document.getElementById("purposeOutput").innerHTML = bookingPurpose;
    document.getElementById("guestOutput").innerHTML = guestAmount;
    document.getElementById("extrasOutput").innerHTML = "$" + extrasCost;
    document.getElementById("optionsOutput").innerHTML = extraOptions.join(", ");  // Join extras array into a comma-separated string
    document.getElementById("totalOutput").innerHTML = "$" + totalCost;  // Display the total cost
}

// Function to validate and check customer details before submission
function checkDetails(event) {
    // Prevent the form from submitting and refreshing the page
    event.preventDefault();

    // Check if terms and conditions checkbox is checked
    var termsCheckbox = document.getElementById("termsCheckbox");
    var errorMessage = document.getElementById("termsError");

    if (!termsCheckbox.checked) {
        // Display error message if terms are not accepted
        errorMessage.style.display = 'block';
        errorMessage.innerText = "Please accept the terms and conditions.";
        return;  // Stop further processing
    } else {
        // Hide the error message if checkbox is checked
        errorMessage.style.display = 'none';
    }



    // Retrieve input values for customer details
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
    var extrasCost = parseFloat(document.getElementById("extrasOutput").innerText.replace('$', ''));  // Remove currency symbol for number conversion
    var totalCost = parseFloat(document.getElementById("totalOutput").innerText.replace('$', ''));  // Remove currency symbol for number conversion
    var bookingPurpose = document.getElementById("purposeOutput").innerText;
    var extraOptions = document.getElementById("optionsOutput").innerText.split(", ");  // Convert options back to array

    // Push data to Airtable
    pushData(firstname, lastname, cellphone, email, driversLicence, age, comments, checkInDate, cruiseDuration, cruiseType, bookingPurpose, guestAmount, extrasCost, extraOptions, totalCost);
}

// Function to push data to Airtable
function pushData(firstname, lastname, cellphone, email, driversLicence, age, comments, checkInDate, cruiseDuration, cruiseType, bookingPurpose, guestAmount, extrasCost, extraOptions, totalCost) {
   

    // Initialize Airtable with API key
    var Airtable = require('airtable');
    var base = new Airtable({
        apiKey: 'pat0yqkc62q5nkQv6.a1beaa95e0e7de0e58c6639ef2bb9d647d9e16a69ebffe342e9db1b98e8897c1'
    }).base('appxt1ddAlNkHN4c7');

    console.log("Creating a record....");

    // Create a new record in the "Cruise" table in Airtable
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
        "Extras": extraOptions.join(", "),  // Join extras into a string
		"Extras Cost": extrasCost,  // Push extras cost to Airtable
        "Total Cost": totalCost  // Push total cost to Airtable
    }, {
        typecast: true  // Ensure data types are correct for Airtable fields
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

    // Refresh the page after a delay of 5 seconds
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
