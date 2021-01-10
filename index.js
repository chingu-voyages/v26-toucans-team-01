console.log('Connected');

let slider = document.getElementById("monthly-payment-slider");

slider.oninput = function() {
    let output = document.getElementById("monthly-payment-amt");
    output.innerHTML = `$ ${slider.value}`;
}

