console.log('Connected to Advanced Options');

let advancedOptionsBttn = document.getElementById('advanced-options-button');
let hideOptionsBttn = document.getElementById('hide-advanced-options');

advancedOptionsBttn.addEventListener('click', function () {
  let advancedBttnWrapper = document.getElementById('advanced-section-wrapper');
  if (
    advancedBttnWrapper.style.display == 'none' ||
    advancedBttnWrapper.style.display === ''
  ) {
    advancedBttnWrapper.style.display = 'block';
    advancedOptionsBttn.style.display = 'none';
  } else {
    advancedBttnWrapper.style.display = 'none';
    advancedOptionsBttn.style.display = 'block';
  }
});

hideOptionsBttn.addEventListener('click', function () {
  // TBD ...
});
