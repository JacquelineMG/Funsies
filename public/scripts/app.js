/* eslint-disable indent */
/* eslint-disable no-undef */

$(document).ready(function() {
  let allFunsies;
  let filteredFunsies;

  /**
   * Create individual funsie element (checkbox, name, & select category)
   * @param {object} funsie - Object containing info about individual funsie
   * @return {object} $funsie - jQuery object containing HTML to create element
  */
  const createFunsieElement = function(funsie) {
    let element = `
      <fieldset id="${funsie.id}">
      <span>
        <input type="checkbox" id="${funsie.id}-checkbox">
        <label for="${funsie.id}-checkbox">${funsie.title}</label>
      </span>
      <select name="categories" id="${funsie.id}-categories">
      `;

    switch (funsie.category_id) {
      case 1:
        element += `
          <option value="watch" class="watch" selected>📺 WATCH</option>
          <option value="read" class="read">📖 READ</option>
          <option value="eat" class="eat">🍽️ EAT</option>
          <option value="buy" class="buy">💰 BUY</option>
          `;
        break;
      case 2:
        element += `
          <option value="watch" class="watch">📺 WATCH</option>
          <option value="read" class="read" selected>📖 READ</option>
          <option value="eat" class="eat">🍽️ EAT</option>
          <option value="buy" class="buy">💰 BUY</option>
          `;
        break;
      case 3:
        element += `
          <option value="watch" class="watch">📺 WATCH</option>
          <option value="read" class="read">📖 READ</option>
          <option value="eat" class="eat" selected>🍽️ EAT</option>
          <option value="buy" class="buy">💰 BUY</option>
          `;
        break;
      case 4:
        element += `
          <option value="watch" class="watch">📺 WATCH</option>
          <option value="read" class="read">📖 READ</option>
          <option value="eat" class="eat">🍽️ EAT</option>
          <option value="buy" class="buy" selected>💰 BUY</option>
          `;
    }

    element += `
      </select>
      </fieldset>
      `;

    const $funsie = $(element);
    return $funsie;
  };

  /**
   * Loop through all funsies to create a list of all elements
   * @param {array} funsies - Array of funsie objects
  */
  const renderFunsies = function(funsies) {
    // Empty list to not reduplicate data
    $('#funsies-container').empty();

    for (const funsie of funsies) {
      const $funsie = createFunsieElement(funsie);
      $('#funsies-container').append($funsie);
    }
  };

  /** Load funsies after successful AJAX request */
  const loadFunsies = function() {
    $.ajax({
      type: 'GET',
      url: 'http://localhost:8080/api/items'
    }).then(function(data) {
      // Save default to apply different filters
      if (!allFunsies) {
        allFunsies = data;
      }

      renderFunsies(data);
    });
  };

  /**
   * Filter list and return funsies only of a specific category
   * @param {array} funsies - Array of funsie objects
   * @param {number} category - Number from 1-4 representing a category id
   * @return {array} filteredFunsies - Filtered array of funsie objects
  */
  const filterByCategory = function(funsies, category) {
    let filteredFunsies = [];

    for (const funsie of funsies) {
      if (funsie.category_id === category) {
        filteredFunsies.push(funsie);
      }
    }

    return filteredFunsies;
  };

  /**
   * Sorts funsies into an object of two arrays: completed vs. uncompleted
   * Helper function to @func sortFunsies
   * @param {array} funsies - Array of funsie objects
   * @return {object} completionStatus - Object with two properties, each containing one array
  */
  // const sortByCompletion = function(funsies) {
  //   const completionStatus = {
  //     completed: [],
  //     uncompleted: []
  //   };

  //   for (const funsie of funsies) {
  //     if (funsie.is_done) {
  //       completionStatus[completed].push(funsie);
  //     } else {
  //       completionStatus[uncompleted].push(funsie);
  //     }
  //   }

  //   return completionStatus;
  // };

  // /**
  //  * Sorts funsies by most recent to least recent
  //  * Helper function to @func sortFunsies
  //  * @param {array} funsies - Array of funsie objects
  //  * @return {array} sorted - Array of funsie objects, sorted by recency
  // */
  // const sortByRecency = function(funsies) {
  //   const sorted = [];

  //   if ()

  //   return sorted;
  // };


  /**
   * Sort funsies by two criteria:
   *  1. Most recent to least recent
   *  2. Completed funsies at bottom
   * @param {array} funsies - Array of funsie objects
   * @return {array} sortedFunsies - Sorted array of funsie objects
  */
  const sortFunsies = function(funsies) {
    // Seperate completed vs. uncompleted funsies
    // const sortedByCompletion = sortByCompletion(funsies);
    // const completed = sortedByCompletion.completed;
    // const uncompleted = sortedByCompletion.uncompleted;

    // Sort each list of funsies by recency
    const compareFn = function(a, b) {
      // a is complete, b is uncompleted, so a is less than b
      if (a.is_done > b.is_done) {
        return -1;
      }

      // b is complete, a is uncompleted, so b is less than a
      if (b.is_done > a.is_done) {
        return 1;
      }

      // both a and b are completed / uncompleted
      // a was created before b, so b is less than a
      if (a.created_date > b.created_date) {
        return 1;
      }

      // both a and b are completed / uncompleted
      // b was created before a, so a is less than b
      if (b.created_date > a.created_date) {
        return -1;
      }

      // both created simultaneously and both complete/incomplete, so they are equal
      return 0;
    };

    const sortedFunsies = funsies.sort(compareFn);
    // const sortedCompleted = completed.sort(compareFn);
    // const sortedUncompleted = sortByRecency(uncompleted);

    // // Amalgamate the two sorted lists together
    // const sortedFunsies = [...sortedCompleted, ...sortedUncompleted];

    return sortedFunsies;
  };

  // Initial funsies on page-load
  loadFunsies();

  // FILTERS
  $('#nav-watch').on('click', function(event) {
    event.preventDefault();

    $('h2').empty();
    $('h2').append('📺 WATCH');

    filteredFunsies = filterByCategory(allFunsies, 1);
    renderFunsies(filteredFunsies);
  });

  $('#nav-read').on('click', function(event) {
    event.preventDefault();

    $('h2').empty();
    $('h2').append('📖 READ');

    filteredFunsies = filterByCategory(allFunsies, 2);
    renderFunsies(filteredFunsies);
  });

  $('#nav-eat').on('click', function(event) {
    event.preventDefault();

    $('h2').empty();
    $('h2').append('🍽️ EAT');

    filteredFunsies = filterByCategory(allFunsies, 3);
    renderFunsies(filteredFunsies);
  });

  $('#nav-buy').on('click', function(event) {
    event.preventDefault();

    $('h2').empty();
    $('h2').append('💰 BUY');

    filteredFunsies = filterByCategory(allFunsies, 4);
    renderFunsies(filteredFunsies);
  });

  // Change background colour on drop down box to match selected value's colour
  // Won't work without ids on drop down boxes, so probably not a long-term solution
  for (let i = 1; i < 100; i++) {
    let count = i;
    let categories = `${count}-categories`;
    const category = ($(`#${categories}`).val());
    $(`#${categories}`).removeClass().addClass(`colour${category}`);

    $(`#${categories}`).on("change", function() {
      cat = ($(`#${categories}`).val());
      console.log(cat);

      $(`#${categories}`).removeClass().addClass(`colour${cat}`);
    });
  }
});
