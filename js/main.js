/* On Page Load */
// focus on the first textfield (Name)
document.getElementById('name').focus();

/* Job Role Section */
// initially hide the text field of the 'Other' option
// if selected value is other
  // show the text field
// else of value is not other
  // hide the text field
var jobRole = document.getElementById('title');
var other = document.getElementById('other-title');
other.style.display = 'none';
jobRole.addEventListener('click', (e) => {
  if (e.target.value == 'other') {
    other.style.display = 'block';
  } else if (e.target.value != 'other'){
    other.style.display = 'none';
  }
});

/* T-Shirt Info Section */
// hide the Color menu and label initially (as theme hasn't been selected yet)
// if the currently selected theme is not the same theme from previous click
  // if previous theme was 'Select Theme'
    // remove the error indication
  // if current theme is simply 'Select Theme'
    // hide the Color menu and label
  // else
    // show the Color menu and label
  // loop through options in the Color drop down menu
    // if option does not contain the theme as a substring
      // hide it
    // else if option contains the theme as a substring
      // show it
      // add option to a list of shown options
  // if theme is not 'Select Theme'
    // show the first option in the list of shown items as the
    // displayed value in drop down list
var designMenu = document.getElementById('design');
var colorMenu = document.getElementById('color');
var colorSection = document.getElementById('colors-js-puns');
colorSection.style.display = 'none';
var previousTheme = designMenu.options[designMenu.selectedIndex].text;
designMenu.addEventListener('click', (e) => {
  var theme = e.target.options[e.target.selectedIndex].text;
  if (previousTheme != theme) {
    if (previousTheme == 'Select Theme') {
      $('.shirt .error').remove();
    }
    previousTheme = theme;
    if (theme == 'Select Theme') {
      colorSection.style.display = 'none';
    } else {
      colorSection.style.display = 'block';
    }
    var themeName = theme.substring(8);
    var colorOptions = colorMenu.children;
    var shownGroup = [];
    for (let i = 0; i < colorOptions.length; i++) {
      let currentOption = colorOptions[i];
      if (currentOption.text.indexOf(themeName) < 0) {
        currentOption.style.display = 'none';
      } else if (currentOption.text.indexOf(themeName) >= 0) {
        currentOption.style.display = 'block';
        shownGroup.push(currentOption);
      }
    }
    if (theme != 'Select Theme') {
      colorMenu.selectedIndex = Array.from(colorOptions).indexOf(shownGroup[0]);
    }
  }
});

/* Register for Activities Section */
// check if the activity has a competing time slot with other activities
// add/remove the cost of this activity to the total cost
document.addEventListener('click', (e) => {
  if (e.target.type == 'checkbox') {
    var activity = e.target.parentElement;
    checkForCompetingActivities(activity.textContent);
    addToRunningTotal(activity);
  }
});
// loop through all the activities
  // if this activity is at the same time as the selected activity
  // and is not the selected activity
    // if this activity is hidden already
      // show it
    // else
      // hide it
function checkForCompetingActivities(selectedActivity) {
  var time = selectedActivity.substring(selectedActivity.indexOf('—') + 1);
  var activityList = document.querySelectorAll('.activities label');
  for (let i = 0; i < activityList.length; i++) {
    if (activityList[i].textContent.indexOf(time) >= 0 && activityList[i].textContent != selectedActivity) {
      if (activityList[i].style.display == 'none') {
        activityList[i].style.display = 'block';
      } else {
        activityList[i].style.display = 'none';
      }
    }
  }
}
// if current list of selected activities does not contain selected activity
  // add selected activity to the list
  // add the cost of the selected activity to the total cost
// else if current list of selected activites contains selected activity
  // remove selected activity from list
  // remove cost of selected activity from total cost
// append the current total cost under all the activities
var totalCost = 0;
var listOfActivites = [];
var costElement = document.createTextNode("");
function addToRunningTotal(selectedActivity) {
  var activ = selectedActivity.textContent;
  var cost = parseInt(activ.substring(activ.indexOf('$')+1));
  if (listOfActivites.indexOf(selectedActivity) < 0) {
    listOfActivites.push(selectedActivity);
    totalCost += cost;
  } else if (listOfActivites.indexOf(selectedActivity) >= 0) {
    listOfActivites.pop(listOfActivites.indexOf(selectedActivity));
    totalCost -= cost;
  }
  var costString = 'Total: $' + totalCost;
  costElement.nodeValue = costString;
  document.querySelector('.activities').appendChild(costElement);
}

/* Payment Info Section */
// show the credit card payment fields by default
// hide paypal and bitcoin paragraphs by default
// if selected payment method is not 'Select Payment Method'
  // display the payment info of this payment method
var paymentMenu = document.getElementById('payment');
paymentMenu.selectedIndex = Array.from(paymentMenu.children).indexOf(paymentMenu.children[1]);
var p = document.querySelectorAll('p')
var paypal = p[0];
var bitcoin = p[1];
paypal.style.display = 'none';
bitcoin.style.display = 'none';
paymentMenu.addEventListener('click', (e) => {
  var paymentMethod = e.target.options[e.target.selectedIndex].text;
  displayPaymentInfo(paymentMethod);
});
// if payment method is by Credit Card
  // show payment info for Credit Card
// else if payment method is by PayPal, Bitcoin
  // hide payment info for Credit Card
// else if payment method is just 'Select Payment Method'
  // hide payment info for Credit Card
function displayPaymentInfo(paymentMethod) {
  if (paymentMethod == 'Credit Card') {
    document.querySelector('#credit-card').style.display = 'block';
    paypal.style.display = 'none';
    bitcoin.style.display = 'none';
  } else if (paymentMethod == 'PayPal') {
    document.querySelector('#credit-card').style.display = 'none';
    paypal.style.display = 'block';
    bitcoin.style.display = 'none';
  } else if (paymentMethod == 'Bitcoin') {
    document.querySelector('#credit-card').style.display = 'none';
    paypal.style.display = 'none';
    bitcoin.style.display = 'block';
  } else if (paymentMethod == 'Select Payment Method') {
    document.querySelector('#credit-card').style.display = 'none';
    paypal.style.display = 'none';
    bitcoin.style.display = 'none';
  }
}

/* Form Validation Section */
// remove all error indications
// check if all forms are valid
// if not all forms are valid
  // prevent page from loading
var allFormsValid;
document.querySelector('button').addEventListener('click', (e) => {
  allFormsValid = true;
  $('.error').remove();
  validateForms();
  if (allFormsValid == false) {
    e.preventDefault();
  }
});
// if there isn't at least one activity chosen
  // indicate this
// if there isn't a payment method selected
  // indicate this
// loop through all typed forms
  // if name field and is blank
      // indicate this
  // else if email field and wrong format
    // indicate this
  // else if payment form is Credit Card and wrong format
    // if card number field
      // if card number field is not empty
        // change to the string to a more specific error indication
      // indicate this
    // else if zip code field
      // if zip code field is not empty
        // change to the string to a more specific error indication
          // indicate this
    // else if cvv code field
      // if cvv code field is not empty
        // change to the string to a more specific error indication
          // indicate this
function validateForms() {
  var typedForms = document.querySelectorAll('input');
  var designMenu = document.getElementById('design');
  var designLabel = document.querySelector('.shirt').lastElementChild;
  var designChoice = designMenu.options[designMenu.selectedIndex].text;
  var paymentMethod = document.getElementById('payment');
  var paymentForm = paymentMethod.options[paymentMethod.selectedIndex].text;
  if (designChoice == 'Select Theme') {
    addErrorIndication('Please select a theme', designLabel);
  }
  if ($("[type=checkbox]:checked").length < 1) {
     var activityList = document.querySelectorAll('.activities label')
     var str = 'Please select at least one activity';
     addErrorIndication(str, activityList[activityList.length-1]);
  }
  if (paymentForm == 'Select Payment Method') {
    addErrorIndication('Please select a payment method', paymentMenu);
  }
  for (let i = 0; i < typedForms.length; i++) {
    var currentForm = typedForms[i];
    if (currentForm.id == 'name' && currentForm.value.length < 1) {
      var str = 'Please enter a name';
      addErrorIndication(str, currentForm);
    } else if (currentForm.id == 'mail' && checkFormat(currentForm) == false) {
      var str = 'Please enter an email address';
      addErrorIndication(str, currentForm);
    } else if (paymentForm == 'Credit Card' && checkFormat(currentForm) == false) {
      if (currentForm.id == 'cc-num') {
        var str = 'Please enter a credit card number';
        if (currentForm.value.length > 0) {
          str = 'Please enter a number that is between 13 and 16 digits long';
        }
        addErrorIndication(str, currentForm);
      } else if (currentForm.id == 'zip') {
        var str = 'Please enter a zip number';
        if (currentForm.value.length > 0) {
          str = 'Please enter a number that is exactly 5 digits long';
        }
        addErrorIndication(str, currentForm);
      } else if (currentForm.id == 'cvv') {
        var str = 'Please enter a CVV number';
        if (currentForm.value.length > 0) {
          str = 'Please enter a number that is exactly 3 digits long';
        }
        addErrorIndication(str, currentForm);
      }
    }
  }
}
// live input checker for email field
// remove error each time key is pressed
// if the format of the email address is wrong
  // if the length of the email address is greater than 1
    // set error indicator text to be more specific
  // indicate this
var email = document.getElementById('mail');
email.setAttribute('onkeypress', 'emailCheck()');
function emailCheck() {
  $('.error').remove();
  if (checkFormat(email) == false) {
    var str;
    if (email.value.length > 0) {
      str = 'Please enter a valid email address';
    } else {
      str = 'Please enter an email address';
    }
    addErrorIndication(str, email);
  }
}
// check if form matches a regular expression based on its id and text content
function checkFormat(form) {
  var emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  var creditCardFormat = /^[0-9]{13,16}$/;
  var zipFormat = /^[0-9]{5}$/;
  var cvvFormat = /^[0-9]{3}$/;
  if (form.id == 'mail' && form.value.match(emailFormat)) {
    return true;
  } else if (form.id == 'cc-num' && form.value.match(creditCardFormat)) {
    return true;
  } else if (form.id == 'zip' && form.value.match(zipFormat)) {
    return true;
  } else if (form.id == 'cvv' && form.value.match(cvvFormat)) {
    return true;
  }
  return false;
}
// since there is an error, make allFormsValid false
// create a paragraph element with a class of error, and errorIndication text
// make the text colour red
// insert the paragraph after the invalid form
function addErrorIndication(errorIndication, elem) {
  allFormsValid = false;
  var errorPara = document.createElement("p");
  var node = document.createTextNode(errorIndication);
  errorPara.appendChild(node);
  errorPara.className = 'error';
  errorPara.style.color = 'red';
  elem.parentNode.insertBefore(errorPara, elem.nextSibling);
}
