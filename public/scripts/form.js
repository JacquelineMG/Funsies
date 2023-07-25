/* eslint-disable indent */
/* eslint-disable no-undef */

$(document).ready(function() {
  let formDown = false;

  $(document).on('click', "#add-funsie", (event) => {
    event.preventDefault();
    const form = document.getElementById('new-funsie-form');

    // slide form down when "add funsie" is initially clicked
    // slide form up when "add funsie" is clicked a second time
    if (formDown) {
      formDown = false;
      $("#new-funsie-form")
        .slideUp();
    } else {
      formDown = true;
      $("#new-funsie-form")
        .slideDown()
        .show();
        form.style.display = 'flex';
    }
  });

  // slide form up when cancel button is clicked
  $(document).on('click', "#cancel-button", () => {
    formDown = false;
    $("#new-funsie-form")
      .slideUp();
  });
});
