console.log('Connected');

//Get input elements
const homePriceInput = document.getElementById('home-price-input');
const homePriceSliderInput = document.getElementById('home-price-slider');
const downPaymentAmountInput = document.getElementById('down-payment-amt');
const downPaymentPercentInput = document.getElementById('down-payment-pct');
const loanLengthInput = document.getElementById('length-of-loan');
const interestRateInput = document.getElementById('interest-rate');
const monthlyPaymentInput = document.getElementById('monthly-payment-input');
const monthlyPaymentSliderInput = document.getElementById('monthly-payment-slider');
const monthlyPaymentStickyInput = document.getElementById('monthly-payment-sticky-input');
const principleInterestInput = document.getElementById('principal-and-interest');
const homeownerInsuranceInput = document.getElementById('homeowners-insurance');
const propertyTaxInput = document.getElementById('property-tax');
const hoaFeeInput = document.getElementById('hoa-fees');
const totalMonthlyPayment = document.getElementById('total-monthly-payment');
const ctx = document.getElementById('myChart').getContext('2d');

//Initialize derived elements
var calculatedPrinciple = 0;// = homePriceInput.value - downPaymentAmountInput.value;
var calculatedInterest = 0;// = interestRateInput.value/100/12;
var calculatedLoanLength = 0;// = loanLengthInput.value*12;
var additionalCosts = 0;// = homeownerInsuranceInput.value + propertyTaxInput.value + hoaFeeInput.value;

/**
 * Calculate and update value of down-payment-pct
 *
 * @param {number} homePrice input value of home-price-input
 * @param {number} downPaymentAmount input value of down-payment-amt
 */
function calculateDownPayPercent(homePrice, downPaymentAmount = 139200) {
  //check homePrice to avoid divide by zero error
  if (homePrice > 0) {
    downPaymentPercentInput.value = parseFloat((downPaymentAmount/homePrice)*100).toFixed(3);
  } else {
    downPaymentPercentInput.value = 0.000;
  }
  return downPaymentPercentInput.value;
}

/**
 * Calculate and update value of down-payment-amount
 *
 * @param {number} homePrice input value of home-price-input
 * @param {number} downPaymentPercent input value of down-payment-pct
 */
function calculateDownPayAmount(homePrice, downPaymentPercent) {
  downPaymentAmountInput.value = parseFloat(homePrice*(downPaymentPercent/100)).toFixed(2);
  return downPaymentAmountInput.value;
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
    principleInterestInput.value = parseFloat(calcPrinciple * calcInterest * (Math.pow(1 + parseFloat(calcInterest), calcLoanLength)) / (Math.pow(1 + parseFloat(calcInterest), calcLoanLength) - 1)).toFixed(2);
  } else if (calcLoanLength > 0) {
    principleInterestInput.value = parseFloat(calcPrinciple / calcLoanLength).toFixed(2);
  } else {
    principleInterestInput.value = parseFloat(calcPrinciple).toFixed(2);
  }
  chartResults(principleInterestInput.value, homeownerInsuranceInput.value, propertyTaxInput.value, hoaFeeInput.value);
  return principleInterestInput.value;
}

/**
 * Calculate and update value of monthly-payment-input (including slider and sticky)
 *
 * @param {number} principleAndInterest input value of principal-and-interest
 * @param {number} addCosts global variable additionalCosts
 */
function calculateMonthlyPayment(principleAndInterest, addCosts){
  monthlyPaymentInput.value = parseFloat(parseFloat(principleAndInterest) + parseFloat(addCosts)).toFixed(2);
  monthlyPaymentSliderInput.value = monthlyPaymentInput.value
  monthlyPaymentStickyInput.value = monthlyPaymentInput.value;
  totalMonthlyPayment.innerHTML = monthlyPaymentInput.value;
  return monthlyPaymentInput.value;
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
  homePriceInput.value = parseFloat((monthlyPayment / calcInterest / (Math.pow(1 + parseFloat(calcInterest), calcLoanLength))) * (Math.pow(1 + parseFloat(calcInterest), calcLoanLength) - 1) + parseFloat(downPaymentAmount)).toFixed(2);
  homePriceSliderInput.value = homePriceInput.value;
  return homePriceInput.value;
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
function checkForUndefined() {
  homePriceInput.value = homePriceInput.value ? homePriceInput.value : 0.00;
  downPaymentAmountInput.value = downPaymentAmountInput.value ? downPaymentAmountInput.value : 0.00;
  downPaymentPercentInput.value = downPaymentPercentInput.value ? downPaymentPercentInput.value : 0.00;
  //loanLengthInput.value = loanLengthInput.value ? loanLengthInput.value : 0;
  interestRateInput.value = interestRateInput.value ? interestRateInput.value : 0.000;
  monthlyPaymentInput.value = monthlyPaymentInput.value ? monthlyPaymentInput.value : 0.00;
  principleInterestInput.value = principleInterestInput.value ? principleInterestInput.value : 0.00;
  homeownerInsuranceInput.value = homeownerInsuranceInput.value ? homeownerInsuranceInput.value : 0.00;
  propertyTaxInput.value = propertyTaxInput.value ? propertyTaxInput.value : 0.00;
  hoaFeeInput.value = hoaFeeInput.value ? hoaFeeInput.value : 0.00;
}

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

window.onload = function() {
  homePriceInput.value = 696000;
  downPaymentAmountInput.value = 139200;
  downPaymentPercentInput.value = 20;
  interestRateInput.value = 2.830;
  homeownerInsuranceInput.value = 66;
  propertyTaxInput.value = 458;
  hoaFeeInput.value = 0;

  deriveLoanVariablesAfterUpdate(homePriceInput.value, downPaymentAmountInput.value, interestRateInput.value, loanLengthInput.value);
  calculateDownPayPercent(homePriceInput.value, downPaymentAmountInput.value);
  calculatePrincipleAndInterest(calculatedPrinciple, calculatedLoanLength, calculatedInterest);
  deriveAdditionalCostsAfterUpdate(homeownerInsuranceInput.value, propertyTaxInput.value, hoaFeeInput.value)
  calculateMonthlyPayment(principleInterestInput.value, additionalCosts);

}


// [key: if value changes --> return updated value(s)]
// Home Price --> Down Payment Percent; Principal+Interest; Monthly Payment
homePriceInput.addEventListener('input',function() {
  //checkForUndefined();
  let updatedHomePrice = parseFloat(homePriceInput.value).toFixed(2);
  homePriceSliderInput.value = updatedHomePrice;
  deriveLoanVariablesAfterUpdate(updatedHomePrice, downPaymentAmountInput.value, interestRateInput.value, loanLengthInput.value);
  calculateDownPayPercent(updatedHomePrice, downPaymentAmountInput.value);
  calculatePrincipleAndInterest(calculatedPrinciple, calculatedLoanLength, calculatedInterest);
  calculateMonthlyPayment(principleInterestInput.value, additionalCosts);
});

homePriceSliderInput.addEventListener('input',function() {
  let updatedHomePrice = parseFloat(homePriceSliderInput.value).toFixed(2);
  homePriceInput.value = updatedHomePrice;
  deriveLoanVariablesAfterUpdate(updatedHomePrice, downPaymentAmountInput.value, interestRateInput.value, loanLengthInput.value);
  calculateDownPayPercent(updatedHomePrice, downPaymentAmountInput.value);
  calculatePrincipleAndInterest(calculatedPrinciple, calculatedLoanLength, calculatedInterest);
  calculateMonthlyPayment(principleInterestInput.value, additionalCosts);
});

// Down Payment Amount --> Down Payment Percent; Principal+Interest; Monthly Payment
downPaymentAmountInput.addEventListener('input',function() {
  //checkForUndefined();
  let updatedDownPaymentAmount = parseFloat(downPaymentAmountInput.value).toFixed(2);
  deriveLoanVariablesAfterUpdate(homePriceInput.value, updatedDownPaymentAmount, interestRateInput.value, loanLengthInput.value);
  calculateDownPayPercent(homePriceInput.value, updatedDownPaymentAmount);
  calculatePrincipleAndInterest(calculatedPrinciple, calculatedLoanLength, calculatedInterest);
  calculateMonthlyPayment(principleInterestInput.value, additionalCosts);
});

// Down Payment Percent --> Down Payment Amount; Principal+Interest; Monthly Payment
downPaymentPercentInput.addEventListener('input',function() {
  //checkForUndefined();
  let updatedDownPayPercent = parseFloat(downPaymentPercentInput.value).toFixed(2);
  calculateDownPayAmount(homePriceInput.value, updatedDownPayPercent);
  calculatePrincipleAndInterest(calculatedPrinciple, calculatedLoanLength, calculatedInterest);
  calculateMonthlyPayment(principleInterestInput.value, additionalCosts);
});

// Length of Loan --> Principal+Interest; Monthly Payment
loanLengthInput.addEventListener('input',function() {
  //checkForUndefined();
  let updatedLoanLength = parseFloat(loanLengthInput.value).toFixed(2);
  deriveLoanVariablesAfterUpdate(homePriceInput.value, downPaymentAmountInput.value, interestRateInput.value, updatedLoanLength);
  calculatePrincipleAndInterest(calculatedPrinciple, calculatedLoanLength, calculatedInterest);
  calculateMonthlyPayment(principleInterestInput.value, additionalCosts);
});

// Interest Rate -->  Principal+Interest; Monthly Payment
interestRateInput.addEventListener('input',function() {
  //checkForUndefined();
  let updatedInterestRate = parseFloat(interestRateInput.value).toFixed(6);
  deriveLoanVariablesAfterUpdate(homePriceInput.value, downPaymentAmountInput.value, updatedInterestRate, loanLengthInput.value);
  calculatePrincipleAndInterest(calculatedPrinciple, calculatedLoanLength, calculatedInterest);
  calculateMonthlyPayment(principleInterestInput.value, additionalCosts);
});

// Monthly Payment --> Home Price; Down Payment Percent; Principal+Interest; Property Tax
monthlyPaymentInput.addEventListener('input',function() {
  //checkForUndefined();
  let updatedMonthlyPayment = parseFloat(monthlyPaymentInput.value).toFixed(2);
  monthlyPaymentSliderInput.value = updatedMonthlyPayment;
  monthlyPaymentStickyInput.value = updatedMonthlyPayment;
  totalMonthlyPayment.innerHTML = updatedMonthlyPayment;
  calculateHomePrice(updatedMonthlyPayment, calculatedLoanLength, calculatedInterest, downPaymentAmountInput.value);
  deriveLoanVariablesAfterUpdate(homePriceInput.value, downPaymentAmountInput.value, interestRateInput.value, loanLengthInput.value);
  calculateDownPayPercent(homePriceInput.value, downPaymentAmountInput.value);
  calculatePrincipleAndInterest(calculatedPrinciple, calculatedLoanLength, calculatedInterest);
  //TBD: calculatePropertyTax();
});
monthlyPaymentSliderInput.addEventListener('input',function() {
  let updatedMonthlyPayment = parseFloat(monthlyPaymentSliderInput.value).toFixed(2);
  monthlyPaymentInput.value = updatedMonthlyPayment;
  monthlyPaymentStickyInput.value = updatedMonthlyPayment;
  calculateHomePrice(updatedMonthlyPayment, calculatedLoanLength, calculatedInterest, downPaymentAmountInput.value);
  deriveLoanVariablesAfterUpdate(homePriceInput.value, downPaymentAmountInput.value, interestRateInput.value, loanLengthInput.value);
  calculateDownPayPercent(homePriceInput.value, downPaymentAmountInput.value);
  calculatePrincipleAndInterest(calculatedPrinciple, calculatedLoanLength, calculatedInterest);
  //TBD: calculatePropertyTax();
});

// Insurance, Taxes, or HOA --> Monthly Payment
homeownerInsuranceInput.addEventListener('input',function() {
  //checkForUndefined();
  let updatedHomeInsurance = parseFloat(homeownerInsuranceInput.value).toFixed(2);
  deriveAdditionalCostsAfterUpdate(updatedHomeInsurance, propertyTaxInput.value, hoaFeeInput.value)
  calculateMonthlyPayment(principleInterestInput.value, additionalCosts);
  chartResults(principleInterestInput.value, homeownerInsuranceInput.value, propertyTaxInput.value, hoaFeeInput.value);
});
propertyTaxInput.addEventListener('input',function() {
  //checkForUndefined();
  let updatedPropertyTax = parseFloat(propertyTaxInput.value).toFixed(2);
  deriveAdditionalCostsAfterUpdate(homeownerInsuranceInput.value, updatedPropertyTax, hoaFeeInput.value)
  calculateMonthlyPayment(principleInterestInput.value, additionalCosts);
  chartResults(principleInterestInput.value, homeownerInsuranceInput.value, propertyTaxInput.value, hoaFeeInput.value);
});
hoaFeeInput.addEventListener('input',function() {
  //checkForUndefined();
  let updatedHoaFee = parseFloat(hoaFeeInput.value).toFixed(2);
  deriveAdditionalCostsAfterUpdate(homeownerInsuranceInput.value, propertyTaxInput.value, updatedHoaFee)
  calculateMonthlyPayment(principleInterestInput.value, additionalCosts);
  chartResults(principleInterestInput.value, homeownerInsuranceInput.value, propertyTaxInput.value, hoaFeeInput.value);
});


// const inputElements = document.getElementsByTagName("input");
// for (i=0; i<inputElements.length; i++) {
//   inputElements[i].addEventListener('focusout', checkForUndefined);
// }

//The following elements should not allow user edits:
//monthlyPaymentStickyInput.addEventListener('input',updateMP);
//principleInterestInput.addEventListener('input',updateInputs);

// event handler to test input return value
function eventHandler(event) {
      console.log(event.target.value);
}
