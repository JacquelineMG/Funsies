/* eslint-disable indent */
/* eslint-disable no-undef */

$(document).ready(function() {
  // hide form initially
  $("#new-funsie-form").hide();
  $(document).on('click', "#add-funsie", (event) => {
    event.preventDefault();

    // slide form down when "add funsie" is clicked
    $("#new-funsie-form")
      .slideDown()
      .show();
  });

  // slide form up when cancel button is clicked
  $(document).on('click', "#cancel-button", () => {
    $("#new-funsie-form")
      .slideUp();
  });
});