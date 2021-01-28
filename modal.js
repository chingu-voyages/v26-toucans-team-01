//Developers modal
// Get the modal
var modalDevs = document.getElementById("developers-modal");

// Get the button that opens the modal
var btnDevs = document.getElementById("developers-modal-link");

// Get the <span> element that closes the modal
var spanDev = document.getElementsByClassName("close-dev")[0];

// When the user clicks the button, open the modal 
btnDevs.onclick = function() {
  modalDevs.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
spanDev.onclick = function(event) {
event.preventDefault();
  modalDevs.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalDevs) {
    modalDevs.style.display = "none";
  }
}

//Contact modal
// Get the modal
var modalContact = document.getElementById("contact-modal");

// Get the button that opens the modal
var btnContact = document.getElementById("contact-modal-link");

// Get the <span> element that closes the modal
var spanContact = document.getElementsByClassName("close-contact")[0];

// When the user clicks the button, open the modal 
btnContact.onclick = function() {
  modalContact.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
spanContact.onclick = function(event) {
event.preventDefault();
  modalContact.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modalContact) {
    modalContact.style.display = "none";
  }
}
