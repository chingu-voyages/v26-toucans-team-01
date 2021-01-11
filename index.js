console.log('Connected');

let slider = document.getElementById("monthly-payment-slider");

slider.oninput = function() {
    let output = document.getElementById("monthly-payment-amt");
    output.innerHTML = `$ ${slider.value}`;
}

var H; //home price
var DA; //down payment amount
var DP; //down payment percentage
var M; //monthly mortgage payment
var P; //principle / initial amount borrowed
var I; //monthly interest rate
var N; //number of payments months

//these calculations need to run when the following elements change:
// home price, down payment amount, interest rate, length of loan
function updateInputs() {
  H = parseFloat(document.getElementById("home-price").value);
  DA = parseFloat(document.getElementById("down-payment-amt").value);
  P = H-DA;
  I = parseFloat(document.getElementById("interest-rate").value) / 100 / 12;
  N = parseInt(document.getElementById("length-of-loan").value) * 12;

  //need to check H so that we do not attempt to divide by zero
  if (H > 0) {
    calcMonthlyPayment(P, N, I);
    calcDownPayPercent(H, DA);
  }
}

//these calculations need to run when the following elements change:
// monthly payment
function updateMP() {
    M = parseFloat(document.getElementById("monthly-payment").value);
    if (M >0) {
      calcHouseValue(M, N, I, DA);
      DP = calcDownPayPercent(H, DA);
    }
}

//these calculations need to run when the following elements change:
// down payment percentage
function updateDP() {
  DP = parseFloat(document.getElementById("down-payment-pct").value);
  calcDownPayAmount(H, DP);
  updateInputs();
}

function calcMonthlyPayment(p, n, i) {
  M = p * i * (Math.pow(1 + i, n)) / (Math.pow(1 + i, n) - 1);
  document.getElementById("monthly-payment").value = M.toFixed(2);
}

function calcHouseValue(m, n, i, da) {
  H = (m / i / (Math.pow(1 + i, n))) *  (Math.pow(1 + i, n) - 1) + da;
  document.getElementById("home-price").value = H.toFixed(2);
}

function calcDownPayAmount(h, dp) {
  DA = h*(dp/100);
  document.getElementById("down-payment-amt").value = DA.toFixed(2);
}

function calcDownPayPercent(h, da) {
  DP = (da/h)*100;
  document.getElementById("down-payment-pct").value = DP.toFixed(3);
}

function chartResults() {
  //TBD
}

// Event Listeners for user input

//variables to hold input elements followed by event listener 
//home price
const homePriceInput = document.getElementById('home-price');
const homePriceSliderInput = document.getElementById('home-price-slider');

homePriceInput.addEventListener('change',eventHandler);
homePriceInput.addEventListener('change',eventHandler);
//down payment
const downPaymentAmountInput = document.getElementById('down-payment-amt');
const downPaymentPercentInput = document.getElementById('down-payment-pct');

downPaymentAmountInput.addEventListener('change',eventHandler);
downPaymentPercentInput.addEventListener('change',eventHandler);
//loan length and interest
const loanLengthInput = document.getElementById('length-of-loan');
const interestRateInput = document.getElementById('interest-rate');

loanLengthInput.addEventListener('change',eventHandler);
interestRateInput.addEventListener('change',eventHandler);
// payment
const monthlyPaymentInput = document.getElementById('monthly-payment');
const monthlyPaymentSliderInput = document.getElementById('monthly-payment-slider');
const monthlyPaymentStickyInput = document.getElementById('monthly-payment-sticky');

monthlyPaymentInput.addEventListener('change',eventHandler);
monthlyPaymentSliderInput.addEventListener('change',eventHandler);
monthlyPaymentStickyInput.addEventListener('change',eventHandler);
//
const principleInterestInput = document.getElementById('principal-and-interest');
const homeownerInsuranceInput = document.getElementById('homeowners-insurance');
const propertyTaxInput = document.getElementById('property-tax');
const hoaFeeInput = document.getElementById('hoa-fees');

principleInterestInput.addEventListener('change',eventHandler);
homeownerInsuranceInput.addEventListener('change',eventHandler);
propertyTaxInput.addEventListener('change',eventHandler);
propertyTaxInput.addEventListener('change',eventHandler);
hoaFeeInput.addEventListener('change',eventHandler);


// event hander to test input return value
function eventHandler(event) {
   console.log(event.target.value);
}







