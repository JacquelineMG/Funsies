// Client facing scripts here


// Change background colour on drop down box to match selected value's colour
// Won't work without ids on drop down boxes, so probably not a long-term solution

$(document).ready(function() {
  for (let i = 1; i < 100; i++) {
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
