console.log('Connected');
//# //Represents the lines removed for the simpleVersion.html

//Get input elements
const homePriceInputElem = document.getElementById('home-price-input');
//#const homePriceSliderInputElem = document.getElementById('home-price-slider');
const downPaymentAmountInputElem = document.getElementById('down-payment-amt');
const downPaymentPercentInputElem = document.getElementById('down-payment-pct');
const loanAmountInputElem = document.getElementById('loan-amount-input');
const loanLengthInputElem = document.getElementById('length-of-loan');
const interestRateInputElem = document.getElementById('interest-rate');
//#const monthlyPaymentInputElem = document.getElementById('monthly-payment-input');
//#const monthlyPaymentSliderInputElem = document.getElementById('monthly-payment-slider');
//#const monthlyPaymentStickyInputElem = document.getElementById('monthly-payment-sticky-input');
const totalMonthlyPaymentElem = document.getElementById('total-monthly-payment');
const principleInterestInputElem = document.getElementById('principal-and-interest');
const principleInterestStaticElem = document.getElementById('principal-interest');
const homeownerInsuranceInputElem = document.getElementById('homeowners-insurance');
const propertyTaxInputElem = document.getElementById('property-tax');
const hoaFeeInputElem = document.getElementById('hoa-fees');

const ctx = document.getElementById('myChart').getContext('2d');

var homePriceInput = Number(formatCurrencyIn(homePriceInputElem.value));
//#var homePriceSliderInput = Number(homePriceSliderInputElem.value);
var downPaymentAmountInput = Number(formatCurrencyIn(downPaymentAmountInputElem.value));
var downPaymentPercentInput = Number(formatPercentageIn(downPaymentPercentInputElem.value));
var loanAmountInput = Number(formatCurrencyIn(loanAmountInputElem.value));
var loanLengthInput = Number(loanLengthInputElem.value);
var interestRateInput = Number(formatPercentageIn(interestRateInputElem.value));
var monthlyPaymentInput ;//Number(formatCurrencyIn(monthlyPaymentInputElem.value));
//#var monthlyPaymentSliderInput = Number(monthlyPaymentSliderInputElem.value);
//#var monthlyPaymentStickyInput = Number(formatCurrencyIn(monthlyPaymentStickyInputElem.value));
var principleInterestInput = Number(formatCurrencyIn(principleInterestInputElem.value));
var homeownerInsuranceInput = Number(formatCurrencyIn(homeownerInsuranceInputElem.value));
var propertyTaxInput = Number(formatCurrencyIn(propertyTaxInputElem.value));
var hoaFeeInput = Number(formatCurrencyIn(hoaFeeInputElem.value));

//Initialize derived elements
var calculatedPrinciple = 0;// = homePriceInput.value - downPaymentAmountInput.value;
var calculatedInterest = 0;// = interestRateInput.value/100/12;
var calculatedLoanLength = 0;// = loanLengthInput.value*12;
var additionalCosts = 0;// = homeownerInsuranceInput.value + propertyTaxInput.value + hoaFeeInput.value;


//window.onload = function() {
  homePriceInputElem.value = parseFloat(240000.00).toFixed(2);
  downPaymentPercentInputElem.value = parseFloat(20.00).toFixed(2);
  interestRateInputElem.value = parseFloat(2.950).toFixed(3);
  updateInput();
  calculateDownPayAmount(homePriceInput, downPaymentPercentInput);
  deriveLoanVariablesAfterUpdate(homePriceInput, downPaymentAmountInput, interestRateInput, loanLengthInput);
  calculateLoanAmount(homePriceInput, downPaymentAmountInput);
  calculatePrincipleAndInterest(calculatedPrinciple, calculatedLoanLength, calculatedInterest);
  deriveAdditionalCostsAfterUpdate(homeownerInsuranceInput, propertyTaxInput, hoaFeeInput)
  calculateMonthlyPayment(principleInterestInput, additionalCosts);
  updateOutput();

// }

function updateInput(){
  homePriceInput = Number(formatCurrencyIn(homePriceInputElem.value));
  //#homePriceSliderInput = Number(homePriceSliderInputElem.value);
  downPaymentAmountInput = Number(formatCurrencyIn(downPaymentAmountInputElem.value));
  downPaymentPercentInput = Number(formatPercentageIn(downPaymentPercentInputElem.value));
  loanAmountInput = Number(formatCurrencyIn(loanAmountInputElem.value));
  loanLengthInput = Number(loanLengthInputElem.value);
  interestRateInput = Number(formatPercentageIn(interestRateInputElem.value));
  //#monthlyPaymentInput = Number(formatCurrencyIn(monthlyPaymentInputElem.value));
  //#monthlyPaymentSliderInput = Number(monthlyPaymentSliderInputElem.value);
  //#monthlyPaymentStickyInput = Number(formatCurrencyIn(monthlyPaymentStickyInputElem.value));
  principleInterestInput = Number(formatCurrencyIn(principleInterestInputElem.value));
  homeownerInsuranceInput = Number(formatCurrencyIn(homeownerInsuranceInputElem.value));
  propertyTaxInput = Number(formatCurrencyIn(propertyTaxInputElem.value));
  hoaFeeInput = Number(formatCurrencyIn(hoaFeeInputElem.value));
}

function updateOutput(){
  homePriceInputElem.value = formatCurrencyOut(homePriceInput);
  //#homePriceSliderInputElem.value = homePriceInput;
  downPaymentAmountInputElem.value = formatCurrencyOut(downPaymentAmountInput);
  downPaymentPercentInputElem.value = formatPercentageOut(downPaymentPercentInput);
  loanAmountInput = formatCurrencyOut(loanAmountInputElem.value);
  loanLengthInputElem.value = loanLengthInput;
  interestRateInputElem.value = formatPercentageOut(interestRateInput);
  //#monthlyPaymentInputElem.value = formatCurrencyOut(monthlyPaymentInput);
  //#monthlyPaymentSliderInputElem.value = monthlyPaymentInput;
  //#monthlyPaymentStickyInputElem.value = formatCurrencyOut(monthlyPaymentInput);
  totalMonthlyPaymentElem.value = formatCurrencyOut(monthlyPaymentInput);
  principleInterestInputElem.value = formatCurrencyOut(principleInterestInput);
  principleInterestStaticElem.value = formatCurrencyOut(principleInterestInput);
  homeownerInsuranceInputElem.value = formatCurrencyOut(homeownerInsuranceInput);
  propertyTaxInputElem.value = formatCurrencyOut(propertyTaxInput);
  hoaFeeInputElem.value = formatCurrencyOut(hoaFeeInput);
}

function allowOnlyNumericInput() {
  let input = this.value;
  let checkString = "$%.,1234567890";

  if(input) {
    for(i=0; i<input.length; i++) {
      if(!checkString.includes(input.charAt(i))) {
        input = input.replace(input.charAt(i),'');
        this.value = input;
      }

      updateInput();
    }
  }
}

/**
 * Calculate and update value of down-payment-pct
 *
 * @param {number} homePrice input value of home-price-input
 * @param {number} downPaymentAmount input value of down-payment-amt
 */
function calculateDownPayPercent(homePrice, downPaymentAmount) {
  //check homePrice to avoid divide by zero error
  if (homePrice > 0) {
    downPaymentPercentInput = parseFloat((downPaymentAmount/homePrice)*100).toFixed(3);
  } else {
    downPaymentPercentInput = 0.000;
  }
  downPaymentPercentInputElem.value = formatPercentageOut(downPaymentPercentInput);
  return downPaymentPercentInput;
}

/**
 * Calculate and update value of down-payment-amount
 *
 * @param {number} homePrice input value of home-price-input
 * @param {number} downPaymentPercent input value of down-payment-pct
 */
function calculateDownPayAmount(homePrice, downPaymentPercent) {
  downPaymentAmountInput = parseFloat(homePrice*(downPaymentPercent/100)).toFixed(2);
  downPaymentAmountInputElem.value = formatCurrencyOut(downPaymentAmountInput);
  return downPaymentAmountInput;
}

/**
 * Calculate and update value of principal-and-interest
 *
 * @param {number} calcPrinciple global variable calculatedPrinciple
 * @param {number} calcLoanLength global variable calculatedLoanLength
 * @param {number} calcInterest global variable calculatedInterest
 */
function calculatePrincipleAndInterest(calcPrinciple, calcLoanLength, calcInterest) {
  if (calcInterest > 0 && calcLoanLength > 0) {
    principleInterestInput = parseFloat(calcPrinciple * calcInterest * (Math.pow(1 + parseFloat(calcInterest), calcLoanLength)) / (Math.pow(1 + parseFloat(calcInterest), calcLoanLength) - 1)).toFixed(2);
  } else if (calcLoanLength > 0) {
    principleInterestInput = parseFloat(calcPrinciple / calcLoanLength).toFixed(2);
  } else {
    principleInterestInput = parseFloat(calcPrinciple).toFixed(2);
  }
  chartResults(principleInterestInput, homeownerInsuranceInput, propertyTaxInput, hoaFeeInput);
  principleInterestInputElem.value = formatCurrencyOut(principleInterestInput);
  principleInterestStaticElem.value = formatCurrencyOut(principleInterestInput);
  return principleInterestInput;
}

/**
 * Calculate and update value of monthly-payment-input (including slider and sticky)
 *
 * @param {number} principleAndInterest input value of principal-and-interest
 * @param {number} addCosts global variable additionalCosts
 */
 function calculateMonthlyPayment(principleAndInterest, addCosts){
   monthlyPaymentInput = parseFloat(parseFloat(principleAndInterest) + parseFloat(addCosts)).toFixed(2);
//   monthlyPaymentInputElem.value = formatCurrencyOut(monthlyPaymentInput);
//   monthlyPaymentSliderInputElem.value = monthlyPaymentInput
//   monthlyPaymentStickyInputElem.value = formatCurrencyOut(monthlyPaymentInput);
   totalMonthlyPaymentElem.value = formatCurrencyOut(monthlyPaymentInput);
   return monthlyPaymentInput;
 }

/**
 * Calculate and update value of home-price-input (including slider)
 *
 * @param {number} monthlyPayment input value of home-price-input
 * @param {number} calcLoanLength global variable calculatedLoanLength
 * @param {number} calcInterest global variable calculatedInterest
 * @param {number} downPaymentAmount input value of down-payment-amt
 */
function calculateHomePrice(monthlyPayment, calcLoanLength, calcInterest, downPaymentAmount) {
  homePriceInput = parseFloat((monthlyPayment / calcInterest / (Math.pow(1 + parseFloat(calcInterest), calcLoanLength))) * (Math.pow(1 + parseFloat(calcInterest), calcLoanLength) - 1) + parseFloat(downPaymentAmount)).toFixed(2);
  homePriceInputElem.value = formatCurrencyOut(homePriceInput);
  homePriceSliderInputElem.value = homePriceInput;
  return homePriceInput;
}

function calculateLoanAmount(homePrice, downPaymentAmount) {
  loanAmountInput = parseFloat(homePrice - downPaymentAmount).toFixed(2);
  loanAmountInputElem.value = formatCurrencyOut(loanAmountInput);
  return loanAmountInput;
}

/**
 * Update derived global variable with relevant user updates
 *
 * @param {number} homePrice input value of home-price-input
 * @param {number} downPaymentAmount input value of down-payment-amt
 * @param {number} interestRate input value of interest-rate
 * @param {number} loanLength input value of length-of-loan
  */
function deriveLoanVariablesAfterUpdate(homePrice, downPaymentAmount, interestRate, loanLength) {
  calculatedPrinciple = homePrice - downPaymentAmount;
  calculatedInterest = interestRate/100/12;
  calculatedLoanLength = loanLength*12;
}

/**
 * Update derived global variable with relevant user updates
 *
 * @param {number} homeInsurance input value of homeowners-insurance
 * @param {number} propertyTax input value of property-tax
 * @param {number} hoaFee input value of hoa-fees
 */
function deriveAdditionalCostsAfterUpdate(homeInsurance, propertyTax, hoaFee) {
  additionalCosts = 0;
  additionalCosts = homeInsurance ? parseFloat(homeInsurance) + parseFloat(additionalCosts) : additionalCosts;
  additionalCosts = propertyTax ? parseFloat(propertyTax) + parseFloat(additionalCosts) : additionalCosts;
  additionalCosts = hoaFee ? parseFloat(hoaFee) + parseFloat(additionalCosts) : additionalCosts;
}

/**
 * Check for NaN values due to user removing input; apply default to avoid broken calculations
 */
// function checkForUndefined() {
//   homePriceInput = homePriceInput ? homePriceInput : 0.00;
//   downPaymentAmountInput = downPaymentAmountInput ? downPaymentAmountInput : 0.00;
//   downPaymentPercentInput = downPaymentPercentInput ? downPaymentPercentInput : 0.00;
//   //loanLengthInput = loanLengthInput ? loanLengthInput : 0;
//   interestRateInput = interestRateInput ? interestRateInput : 0.000;
//   monthlyPaymentInput = monthlyPaymentInput ? monthlyPaymentInput : 0.00;
//   principleInterestInput = principleInterestInput ? principleInterestInput : 0.00;
//   homeownerInsuranceInput = homeownerInsuranceInput ? homeownerInsuranceInput : 0.00;
//   propertyTaxInput = propertyTaxInput ? propertyTaxInput : 0.00;
//   hoaFeeInput = hoaFeeInput ? hoaFeeInput : 0.00;
// }

/**
 * Enable chart display of Monthly Payment cost breakdown
 */
function chartResults(pni, hi, pt, hoa) {
  let myChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: [
        'Principal and Interest',
        'Homeowner Insurance',
        'Property Tax',
        'HOA Fees',
      ],
      datasets: [
        {
          label: 'Mortgage Payment',
          data: [pni, hi, pt, hoa],
          backgroundColor: ['#90ee90', '#2adece', '#dd3b79', '#ff766b'],
          borderWidth: 1,
        },
      ],
    },
  });
}

// Event Listeners for user input

function formatCurrencyIn(num) {
  num = num.toString().replace(/\$|\,/g, '');
  return num;
}

function formatPercentageIn(num) {
  num = num.toString().replace(/\%|\,/g, '');
  return num;
}

function formatCurrencyOut(num) {
    num = num.toString().replace(/\$|\,/g, '');
    if (isNaN(num)) {
        num = "0";
    }
    sign = (num == (num = Math.abs(num)));
    num = Math.floor(num * 100 + 0.50000000001);
    cents = num % 100;
    num = Math.floor(num / 100).toString();
    if (cents < 10) {
        cents = "0" + cents;
    }
    for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
        num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3));
    }
    return (((sign) ? '' : '-') + '$ ' + num + '.' + cents);
}

function formatPercentageOut(num) {
    num = num.toString().replace(/\%|\,/g, '');
    if (isNaN(num)) {
        num = "0";
    }
    num = Math.floor(num * 1000 + 0.50000000001);
    decimal = num % 1000;
    num = Math.floor(num / 1000).toString();
    if (decimal < 100 && decimal > 9) {
        decimal = "0" + decimal;
    }else if (decimal < 10) {
        decimal = "00" + decimal;
    }
    return (num +"." + decimal + ' %');
}

const inputElements = document.getElementsByTagName("input");
for (i=0; i<inputElements.length; i++) {
  inputElements[i].addEventListener('focusout', updateOutput);
  inputElements[i].addEventListener('input', allowOnlyNumericInput);
}

const selectElements = document.getElementsByTagName("select");
for (i=0; i<selectElements.length; i++) {
  selectElements[i].addEventListener('focusout', updateOutput);
  selectElements[i].addEventListener('change', allowOnlyNumericInput);
}

// [key: if value changes --> return updated value(s)]
// Home Price --> Down Payment Percent; Principal+Interest; Monthly Payment
homePriceInputElem.addEventListener('input',function() {
  //checkForUndefined();
  let updatedHomePrice = parseFloat(homePriceInput).toFixed(2);
  //#homePriceSliderInput = updatedHomePrice;
  deriveLoanVariablesAfterUpdate(updatedHomePrice, downPaymentAmountInput, interestRateInput, loanLengthInput);
  calculateDownPayPercent(updatedHomePrice, downPaymentAmountInput);
  calculateLoanAmount(updatedHomePrice, downPaymentAmountInput);
  calculatePrincipleAndInterest(calculatedPrinciple, calculatedLoanLength, calculatedInterest);
  calculateMonthlyPayment(principleInterestInput, additionalCosts);
  //updateOutput();
});

// homePriceSliderInputElem.addEventListener('input',function() {
//   updateInput();
//   let updatedHomePrice = parseFloat(homePriceSliderInput).toFixed(2);
//   homePriceInput = updatedHomePrice;
//   deriveLoanVariablesAfterUpdate(updatedHomePrice, downPaymentAmountInput, interestRateInput, loanLengthInput);
//   calculateDownPayPercent(updatedHomePrice, downPaymentAmountInput);
//   //calculateLoanAmount(updateHomePrice, downPaymentAmountInput);
//   calculatePrincipleAndInterest(calculatedPrinciple, calculatedLoanLength, calculatedInterest);
//   calculateMonthlyPayment(principleInterestInput, additionalCosts);
//   //updateOutput();
// });

// Down Payment Amount --> Down Payment Percent; Principal+Interest; Monthly Payment
downPaymentAmountInputElem.addEventListener('input',function() {
  //checkForUndefined();
  let updatedDownPaymentAmount = parseFloat(downPaymentAmountInput).toFixed(2);
  deriveLoanVariablesAfterUpdate(homePriceInput, updatedDownPaymentAmount, interestRateInput, loanLengthInput);
  calculateDownPayPercent(homePriceInput, updatedDownPaymentAmount);
  calculateLoanAmount(homePriceInput, updatedDownPaymentAmount);
  calculatePrincipleAndInterest(calculatedPrinciple, calculatedLoanLength, calculatedInterest);
  calculateMonthlyPayment(principleInterestInput, additionalCosts);
  //updateOutput();
});

// Down Payment Percent --> Down Payment Amount; Principal+Interest; Monthly Payment
downPaymentPercentInputElem.addEventListener('input',function() {
  //checkForUndefined();
  let updatedDownPayPercent = parseFloat(downPaymentPercentInput).toFixed(2);
  calculateDownPayAmount(homePriceInput, updatedDownPayPercent);
  calculateLoanAmount(homePriceInput, downPaymentAmountInput);
  calculatePrincipleAndInterest(calculatedPrinciple, calculatedLoanLength, calculatedInterest);
  calculateMonthlyPayment(principleInterestInput, additionalCosts);
  //updateOutput();
});

// Length of Loan --> Principal+Interest; Monthly Payment
loanLengthInputElem.addEventListener('change',function() {
  //checkForUndefined();
  console.log("input on change = "+loanLengthInput);
  let updatedLoanLength = parseInt(loanLengthInput);
  console.log("after parse =     "+updatedLoanLength);
  deriveLoanVariablesAfterUpdate(homePriceInput, downPaymentAmountInput, interestRateInput, updatedLoanLength);
  console.log("after calculate = "+calculatedLoanLength);
  calculatePrincipleAndInterest(calculatedPrinciple, calculatedLoanLength, calculatedInterest);
  calculateMonthlyPayment(principleInterestInput, additionalCosts);
  //updateOutput();
});

// Interest Rate -->  Principal+Interest; Monthly Payment
interestRateInputElem.addEventListener('input',function() {
  //checkForUndefined();
  let updatedInterestRate = parseFloat(interestRateInput).toFixed(6);
  deriveLoanVariablesAfterUpdate(homePriceInput, downPaymentAmountInput, updatedInterestRate, loanLengthInput);
  calculatePrincipleAndInterest(calculatedPrinciple, calculatedLoanLength, calculatedInterest);
  calculateMonthlyPayment(principleInterestInput, additionalCosts);
  //updateOutput();
});

// // Monthly Payment --> Home Price; Down Payment Percent; Principal+Interest; Property Tax
// monthlyPaymentInputElem.addEventListener('input',function() {
//   //checkForUndefined();
//   updateInput();
//   let updatedMonthlyPayment = parseFloat(monthlyPaymentInput).toFixed(2);
//   monthlyPaymentSliderInput = updatedMonthlyPayment;
//   monthlyPaymentStickyInput = updatedMonthlyPayment;
//   totalMonthlyPayment.innerHTML = updatedMonthlyPayment;
//   calculateHomePrice(updatedMonthlyPayment, calculatedLoanLength, calculatedInterest, downPaymentAmountInput);
//   deriveLoanVariablesAfterUpdate(homePriceInput, downPaymentAmountInput, interestRateInput, loanLengthInput);
//   calculateDownPayPercent(homePriceInput, downPaymentAmountInput);
//   calculatePrincipleAndInterest(calculatedPrinciple, calculatedLoanLength, calculatedInterest);
//   //TBD: calculatePropertyTax();
//   //updateOutput();
// });
// monthlyPaymentSliderInputElem.addEventListener('input',function() {
//   updateInput();
//   let updatedMonthlyPayment = parseFloat(monthlyPaymentSliderInput).toFixed(2);
//   monthlyPaymentInput = updatedMonthlyPayment;
//   monthlyPaymentStickyInput = updatedMonthlyPayment;
//   calculateHomePrice(updatedMonthlyPayment, calculatedLoanLength, calculatedInterest, downPaymentAmountInput);
//   deriveLoanVariablesAfterUpdate(homePriceInput, downPaymentAmountInput, interestRateInput, loanLengthInput);
//   calculateDownPayPercent(homePriceInput, downPaymentAmountInput);
//   calculatePrincipleAndInterest(calculatedPrinciple, calculatedLoanLength, calculatedInterest);
//   //TBD: calculatePropertyTax();
//   //updateOutput();
// });
//
// Insurance, Taxes, or HOA --> Monthly Payment
homeownerInsuranceInputElem.addEventListener('input',function() {
  //checkForUndefined();
  let updatedHomeInsurance = parseFloat(homeownerInsuranceInput).toFixed(2);
  deriveAdditionalCostsAfterUpdate(updatedHomeInsurance, propertyTaxInput, hoaFeeInput)
  calculateMonthlyPayment(principleInterestInput, additionalCosts);
  chartResults(principleInterestInput, homeownerInsuranceInput, propertyTaxInput, hoaFeeInput);

  //homeownerInsuranceInputElem.value = formatCurrencyOut(homeInsurance);
  //updateOutput();
});
propertyTaxInputElem.addEventListener('input',function() {
  //checkForUndefined();
  let updatedPropertyTax = parseFloat(propertyTaxInput).toFixed(2);
  deriveAdditionalCostsAfterUpdate(homeownerInsuranceInput, updatedPropertyTax, hoaFeeInput)
  calculateMonthlyPayment(principleInterestInput, additionalCosts);
  chartResults(principleInterestInput, homeownerInsuranceInput, propertyTaxInput, hoaFeeInput);

  //propertyTaxInputElem.value = formatCurrencyOut(propertyTax);
  //updateOutput();
});
hoaFeeInputElem.addEventListener('input',function() {
  //checkForUndefined();
  let updatedHoaFee = parseFloat(hoaFeeInput).toFixed(2);
  deriveAdditionalCostsAfterUpdate(homeownerInsuranceInput, propertyTaxInput, updatedHoaFee)
  calculateMonthlyPayment(principleInterestInput, additionalCosts);
  chartResults(principleInterestInput, homeownerInsuranceInput, propertyTaxInput, hoaFeeInput);

  //hoaFeeInputElem.value = formatCurrencyOut(hoaFee);
  //updateOutput();
});

//Note: The following elements should not allow user edits:
//monthlyPaymentStickyInput.addEventListener('input',updateMP);
//principleInterestInput.addEventListener('input',updateInputs);

// event handler to test input return value
// function eventHandler(event) {
//       console.log(event.target.value);
// }

// Advanced Options Button

function myFunction() {
    if (document.getElementById('tag-line')) {

      if (document.getElementById('tag-line').style.display == 'none') {
        document.getElementById('tag-line').style.display = 'block';
        document.getElementById('adv-options').style.display = 'none';

      }
      else {
        document.getElementById('tag-line').style.display ='none';
        document.getElementById('adv-options').style.display = 'block';

      }
      }
    }
