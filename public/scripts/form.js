/* eslint-disable indent */
/* eslint-disable no-undef */

$(document).ready(function() {
  $(document).on('click', "#add-funsie", (event) => {
    event.preventDefault();
    
    const form = document.getElementById('new-funsie-form');
    
    // slide form down when "add funsie" is clicked
    $("#new-funsie-form")
    .slideDown()
    .show();
    form.style.display = 'flex';
  });

  // slide form up when cancel button is clicked
  $(document).on('click', "#cancel-button", () => {
    $("#new-funsie-form")
      .slideUp();
  });
});