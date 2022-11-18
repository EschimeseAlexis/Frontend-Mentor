let nameInput = document.getElementById("name");
let numberInput = document.getElementById("number");
let monthInput = document.getElementById("month");
let yearInput = document.getElementById("year");
let cvcInput = document.getElementById("cvc");

let nameField = document.querySelector(".main-cards-front-infos-footer-owner");
let numberField = document.querySelector(".main-cards-front-infos-number");
let dateField = document.querySelector(".main-cards-front-infos-footer-date");
let cvcField = document.querySelector(".main-cards-back-cvc");

let errorName = document.querySelector(".error-message-name");
let errorNumber = document.querySelector(".error-message-number");
let errorDate = document.querySelector(".error-message-date");
let errorCvc = document.querySelector(".error-message-cvc");

let buttonConfirm = document.querySelector(".input-confirm");
let buttonReset = document.querySelector(".input-confirm-restart");

let form = document.querySelector(".main-form");
let completed = document.querySelector(".main-completed");

const nameInputHandler = function(e) {
    nameField.innerText = e.target.value;
}

const numberInputHandler = function(e) {
    let tmpValue = '';
    for (let i = 0; i < e.target.value.length; i++) {
        if (!(e.target.value.charAt(i) === ' ')) {
            tmpValue += e.target.value.charAt(i);
        }
    }
    e.target.value = tmpValue;
    numberField.innerText = fillStringWithZerosAndSpaces(e.target.value, 16, 4);
}

const cvcInputHandler = function(e) {
    cvcField.innerText = fillStringWithZeros(e.target.value, 3);
}

const monthInputHandler = function(e) {
    dateField.innerText = fillStringWithZeros(e.target.value, 2) + dateField.innerText.substring(2);
}

const yearInputHandler = function(e) {
    dateField.innerText = dateField.innerText.substring(0, 3) + fillStringWithZeros(e.target.value, 2);
}

const fillStringWithZeros = function(string, size) {
    while (string.length < size) {
        string += '0';
    }
    return string;
}

const fillStringWithZerosAndSpaces = function(string, size, spaceInterval) {
    string = fillStringWithZeros(string, size);
    let acc = 0;
    let tmpStr = "";
    for (let i = 0; i < string.length; i++) {
        tmpStr += string.charAt(i);
        acc += 1;
        if (acc === spaceInterval) {
            tmpStr += ' ';
            acc = 0;
        }
    }
    return tmpStr;
}

const confirmInputs = function () {
    let letterMessage = "Wrong format, letters only";
    let numberMessage = "Wrong format, numbers only";
    let letterRegex = /^[A-Za-z\s]+$/;
    let numberRegex = /^[\d\s]+$/;
    let dateRegex = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/;


    let condName = confirmInput(nameField, nameInput, errorName, letterMessage, letterRegex, 3);
    let condNumber = confirmInput(numberField, numberInput, errorNumber, numberMessage, numberRegex, 16);
    let condMonth = confirmInput(dateField, monthInput, errorDate, numberMessage, dateRegex, 2);
    let condYear = confirmInput(dateField, yearInput, errorDate, numberMessage, dateRegex, 2);
    let condCvc = confirmInput(cvcField, cvcInput, errorCvc, numberMessage, numberRegex, 3);

    if (condName && condNumber && condMonth && condYear && condCvc) {
        toggleForm();
    }
}

const toggleForm = function() {
    maskForm()
}

const maskForm = function () {
    form.classList.toggle("hidden");
    completed.classList.toggle("main-completed-visible");
    completed.classList.toggle("hidden");
}

const confirmInput = function (field, input, errorField, formatMessage, regex, minInputLength) {
    if (input.value === '') {
        input.classList.add("border-red");
        errorField.innerText = "Can't be blank";
        return false;
    } else if (!field.innerText.match(regex)) {
        input.classList.add("border-red");
        errorField.innerText = formatMessage;
        return false;
    } else if (input.value.length < minInputLength) {
            input.classList.add("border-red");
            errorField.innerText = "Input not completed";
            return false;
    } else {
        input.classList.remove("border-red");
        errorField.innerText = "";
    }
    return true;
}

nameInput.addEventListener('input', nameInputHandler);
numberInput.addEventListener('input', numberInputHandler);
monthInput.addEventListener('input', monthInputHandler);
yearInput.addEventListener('input', yearInputHandler);
cvcInput.addEventListener('input', cvcInputHandler);

buttonConfirm.addEventListener('click', confirmInputs);
buttonReset.addEventListener('click', toggleForm);