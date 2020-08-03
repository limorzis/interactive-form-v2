
/*-----------------------------
  GLOBAL VARIABLES & FUNCTIONS
 -----------------------------*/

document.getElementById("name").focus();
const submit = document.querySelector("button");

function createErrorMessage(inputName, inputErrorMsg) {
	inputErrorMsg.className = "error-message";
	inputErrorMsg.textContent = "Required";
	inputName.after(inputErrorMsg);
	inputErrorMsg.style.display = 'none';
}

function emptyInput(target, event, inputName, inputErrorMsg) {
	target.addEventListener(event, () => { 
		if (inputName.value === '') {
			invalidInput(inputName, inputErrorMsg)
			inputErrorMsg.textContent = "Required";
		}
	})
}

function invalidInput(inputName, inputErrorMsg) {
	inputName.className = "error";
	inputErrorMsg.style.display = "block";
}

function validatedInput(inputName, inputErrorMsg) {
	inputName.classList.remove("error");
	inputErrorMsg.style.display = "none";
}


/*------------------
  INPUT VALIDATIONS
 ------------------*/

// NAME -------------------------------------------------
let name = document.getElementById("name");
const nameErrorMsg = document.createElement('p');
createErrorMessage(name, nameErrorMsg);

name.addEventListener('keyup', () => {
	if (name.value != '') {
		validatedInput(name, nameErrorMsg)
	}
});
emptyInput(name, 'focusout', name, nameErrorMsg)
emptyInput(submit, 'click', name, nameErrorMsg)

// EMAIL -------------------------------------------------
let email = document.getElementById("mail");
const emailErrorMsg = document.createElement('p');
createErrorMessage(email, emailErrorMsg);

function isValidEmail(email) { return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email); }
email.addEventListener('keyup', () => {
	if (isValidEmail(email.value) === true || email.value === '') {
		validatedInput(email, emailErrorMsg)
	} else if (isValidEmail(email.value) === false) {
		invalidInput(email, emailErrorMsg)
		emailErrorMsg.textContent = "Not a valid email";
	}
});

emptyInput(email, 'focusout', email, emailErrorMsg)
emptyInput(submit, 'click', email, emailErrorMsg)


// JOB ROLE -------------------------------------------------
const otherTitleInput = document.getElementById("other-title");
otherTitleInput.style.display = 'none';

title.addEventListener("change", () => {
	let title = document.getElementById("title").value;
    if (title === "other") {
        otherTitleInput.style.display = 'block';
    } else {
		otherTitleInput.style.display = 'none';
    }
});


// T-SHIRT INFO -------------------------------------------------
let design = document.getElementById("design");
let color = document.getElementById("colors-js-puns")
color.style.display = 'none';
let colorOptions = document.getElementById("color").getElementsByTagName("option")

design.addEventListener('change', () => {
	design[0].style.display = 'none';
	color.style.display = 'block';
	if (design.value === "js puns") {
		colorOptions[0].style.display = 'block';
		colorOptions[1].style.display = 'block';
		colorOptions[2].style.display = 'block';
		colorOptions[3].style.display = 'none';
		colorOptions[4].style.display = 'none';
		colorOptions[5].style.display = 'none';
		colorOptions[0].selected = 'selected'
	}
	else if (design.value === "heart js") {
		colorOptions[0].style.display = 'none';
		colorOptions[1].style.display = 'none';
		colorOptions[2].style.display = 'none';
		colorOptions[3].style.display = 'block';
		colorOptions[4].style.display = 'block';
		colorOptions[5].style.display = 'block';
		colorOptions[3].selected = 'selected'
	}
});


// SELECT ACTIVITIES -------------------------------------------------
const activities = document.querySelector(".activities");
const activitiesErrorMsg = document.createElement('p');
const activitiesLegend = activities.querySelector("legend");
createErrorMessage(activitiesLegend, activitiesErrorMsg);
activitiesErrorMsg.innerText = "You must select at least one activity";

// Total cost
const total = document.createElement('p');
let totalCost = 0;
total.innerText = `Total: $${totalCost}`;
activities.appendChild(total);
activities.className = "error";
const activityList = document.querySelectorAll('input[type="checkbox"]');

// Variables for activities at overlapping times
let activityTuesdayMornA = activityList[1];
let activityTuesdayMornB = activityList[3];
let activityTuesdayAftA = activityList[2];
let activityTuesdayAftB = activityList[4];

activityList.forEach((activity) => {
	activity.addEventListener ('click', () => {
		// Disable activities at overlapping times
		if (activityTuesdayMornA.checked === true) {
			activityTuesdayMornB.disabled = true;
		} else {
			activityTuesdayMornB.disabled = false;
		}

		if (activityTuesdayMornB.checked === true) {
			activityTuesdayMornA.disabled = true;
		} else {
			activityTuesdayMornA.disabled = false;
		}

		if (activityTuesdayAftA.checked === true) {
			activityTuesdayAftB.disabled = true;
		} else {
			activityTuesdayAftB.disabled = false;
		}

		if (activityTuesdayAftB.checked === true) {
			activityTuesdayAftA.disabled = true;
		} else {
			activityTuesdayAftA.disabled = false;
		}
		// Add up the cost of selected activities and display the total
		let activityCost = activity.getAttribute("data-cost")
		if (activity.checked === true) {
			totalCost += parseInt(activityCost)
			activity.className="selected"
		} else {
			totalCost -= parseInt(activityCost)
			activity.className=""
		}
		console.log(totalCost)
		total.innerText = `Total: $${totalCost}`
		if (totalCost != 0) {
			activities.classList.remove("error")
			activitiesErrorMsg.style.display = "none";
		} else {
			activities.classList.add("error")
		}
	})
})

submit.addEventListener('click', () => { 
	if (totalCost === 0) {
		activities.className = "error";
		activitiesErrorMsg.style.display = "block";
	}
})


// PAYMENT INFO -------------------------------------------
let creditCard = document.getElementById("credit-card");
let paypal = document.getElementById("paypal");
paypal.style.display = 'none';
let bitcoin = document.getElementById("bitcoin");
bitcoin.style.display = 'none';
let payment = document.getElementById("payment");
payment[0].style.display = 'none';
payment[1].selected  = 'selected';

payment.addEventListener("change", () => {
	let payment = document.getElementById("payment").value;
    if (payment === "paypal") {
    	creditCard.style.display = 'none';
        paypal.style.display = 'block';
        bitcoin.style.display = 'none';
    } else if (payment === "bitcoin") {
		creditCard.style.display = 'none';
		paypal.style.display = 'none';
		bitcoin.style.display = 'block';
    } else {
    	creditCard.style.display = 'block';
		paypal.style.display = 'none';
		bitcoin.style.display = 'none';
    }
});


// CREDIT CARD NUMBER -------------------------------------------
let ccNum = document.getElementById("cc-num");
const ccNumErrorMsg = document.createElement('p');
createErrorMessage(ccNum, ccNumErrorMsg)
function isValidCardNumber(cardNumber) { return /^(\d{13,16})$/.test(cardNumber); }
function isNumerical(cardNumber) {return /^[0-9]+$/.test(cardNumber);} 

ccNum.addEventListener('keyup', () => {
	let cardNumber = ccNum.value;
	if (isValidCardNumber(cardNumber) === true) {
		validatedInput(ccNum, ccNumErrorMsg)
	} else if (isValidCardNumber(cardNumber) === false) {
		invalidInput(ccNum, ccNumErrorMsg);
		if (isNumerical(cardNumber) === false) {
			ccNumErrorMsg.innerText = 'Card number must only be digits';
		} else if (ccNum.value.length != 0 && ccNum.value.length < 13 || ccNum.value.length > 16) {
			ccNumErrorMsg.innerText = "Card number should be 13 to 16 digits"
		} else if (ccNum.value.length === 0) {
			ccNumErrorMsg.style.display = 'none';
		} else {
			ccNumErrorMsg.innerText = "Card number must only contain numbers"
		}
	}
});

emptyInput(ccNum, 'focusout', ccNum, ccNumErrorMsg)
emptyInput(submit, 'click', ccNum, ccNumErrorMsg)
submit.addEventListener('click', () => { 
		if (isValidCardNumber(ccNum.value) === false) {
			invalidInput(ccNum, ccNumErrorMsg)
		}
})


// ZIP CODE -------------------------------------------------
const zip = document.getElementById("zip");
const zipErrorMsg = document.createElement('p');
createErrorMessage(zip, zipErrorMsg);
function isValidZipCode(zipCode) { return /^(\d{5})$/.test(zipCode); }

zip.addEventListener('keyup', () => {
	let zipCode = zip.value;
	if (zipCode.length === 0) {
		zipErrorMsg.style.display = 'none';
	} else if (isValidZipCode(zipCode) === false) {
		invalidInput(zip, zipErrorMsg)
		if (isNumerical(zipCode) === false) {
			zipErrorMsg.innerText = 'Zip code must only be digits';
		} else if (zipCode.length != 5) {
			zipErrorMsg.innerText = "Zip code must be 5 numbers";
		}
	} else if (isValidZipCode(zipCode) === true) {
		validatedInput(zip, zipErrorMsg)
	}
});

emptyInput(zip, 'focusout', zip, zipErrorMsg); 
emptyInput(submit, 'click', zip, zipErrorMsg);


// CVV -------------------------------------------------
const cvv = document.getElementById("cvv");
const cvvErrorMsg = document.createElement('p');
createErrorMessage(cvv, cvvErrorMsg);
function isValidCvv(cvv) { return /^(\d{3})$/.test(cvv); }

cvv.addEventListener('keyup', () => {
	let cvvValue = cvv.value;
	if (cvvValue.length === 0) {
		cvvErrorMsg.style.display = 'none';
	} else if (isValidCvv(cvvValue) === false) {
		invalidInput(cvv, cvvErrorMsg)
		if (isNumerical(cvvValue) === false) {
			cvvErrorMsg.innerText = 'CVV must only be digits';
		} else if (cvvValue.length != 3) {
			cvvErrorMsg.innerText = "CVV must be 3 numbers";
		} else {
			cvvErrorMsg.innerText = "CVV code must only contain numbers";
		}
	} else if (isValidCvv(cvvValue) === true) {
		validatedInput(cvv, cvvErrorMsg)
	}
});

emptyInput(cvv, 'focusout', cvv, cvvErrorMsg); 
emptyInput(submit, 'click', cvv, cvvErrorMsg);


/*------------------
  FINAL SUBMISSION
 ------------------*/

let form = document.querySelector("form")
let submissionMessage = document.createElement("h3")
submissionMessage.style.paddingLeft = '20px';
submissionMessage.style.display = 'none';
form.appendChild(submissionMessage);

submit.addEventListener('click', () => {
	event.preventDefault()
	if (payment.value != "credit card" && payment.value != "select method") {
		ccNum.classList.remove("error")
		cvv.classList.remove("error")
		zip.classList.remove("error")
	}

	let inputErrors = document.getElementsByClassName("error");
	console.log(inputErrors)
	if (inputErrors.length > 0) {
		event.preventDefault()
		submissionMessage.style.display = 'inline-block'
		submissionMessage.innerText = "Please correct the errors above."
	} else {
		event.preventDefault()
		submissionMessage.style.display = 'inline-block'
		submissionMessage.innerText = "You're all set! We'll see you there."
	}
})

