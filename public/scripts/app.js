// Client facing scripts here


$(document).ready(function() {
  for (let i = 1; i < 10; i++) {
    let count = i
    let categories = `${count}-categories`
    const category = ($(`#${categories}`).val())
    $(`#${categories}`).removeClass().addClass(`colour${category}`);

     $(`#${categories}`).on( "change", function() {
      cat = ($(`#${categories}`).val())

      $(`#${categories}`).removeClass().addClass(`colour${cat}`);
    });
  }
});
