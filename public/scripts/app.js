/* eslint-disable indent */
/* eslint-disable no-undef */

$(document).ready(function() {
  let allFunsies;
  let filteredFunsies;

  /**
   * Sort funsies by two criteria:
   *  1. Most recent to least recent
   *  2. Completed funsies at bottom
   * @param {array} funsies - Array of funsie objects
   * @return {array} sortedFunsies - Sorted array of funsie objects
  */
  const sortFunsies = function(funsies) {
    const compareFn = function(a, b) {
      // a is complete, b is uncompleted, so a comes after b
      if (a.is_done > b.is_done) {
        return 1;
      }

      // b is complete, a is uncompleted, so b comes after a
      if (b.is_done > a.is_done) {
        return -1;
      }

      // both a and b are completed / uncompleted
      // a was created before b, so b comes after a
      if (a.created_date > b.created_date) {
        return -1;
      }

      // both a and b are completed / uncompleted
      // b was created before a, so a comes after b
      if (b.created_date > a.created_date) {
        return 1;
      }

      // both created simultaneously and both complete/incomplete, so they are equal
      return 0;
    };

    const sortedFunsies = funsies.sort(compareFn);
    return sortedFunsies;
  };

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
      <select name="categories" data-catergory-id=${funsie.id} class="${funsie.id}-categories">
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

    // Sort funsies by recency and completion
    const sortedFunsies = sortFunsies(funsies);

    for (const funsie of sortedFunsies) {
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
   * @return {array} categorizedFunsies - Filtered array of funsie objects
  */
  const filterByCategory = function(funsies, category) {
    let categorizedFunsies = [];

    for (const funsie of funsies) {
      if (funsie.category_id === category) {
        categorizedFunsies.push(funsie);
      }
    }

    return categorizedFunsies;
  };

  // Initial funsies on page-load
  loadFunsies();

  // FILTERS
  $('#nav-watch').on('click', function(event) {
    event.preventDefault();
    $('h2').empty().append('📺 WATCH');

    filteredFunsies = filterByCategory(allFunsies, 1);
    renderFunsies(filteredFunsies);
  });

  $('#nav-read').on('click', function(event) {
    event.preventDefault();
    $('h2').empty().append('📖 READ');

    filteredFunsies = filterByCategory(allFunsies, 2);
    renderFunsies(filteredFunsies);
  });

  $('#nav-eat').on('click', function(event) {
    event.preventDefault();
    $('h2').empty().append('🍽️ EAT');

    filteredFunsies = filterByCategory(allFunsies, 3);
    renderFunsies(filteredFunsies);
  });

  $('#nav-buy').on('click', function(event) {
    event.preventDefault();
    $('h2').empty().append('💰 BUY');

    filteredFunsies = filterByCategory(allFunsies, 4);
    renderFunsies(filteredFunsies);
  });

  $('#nav-all').on('click', function(event) {
    event.preventDefault();
    $('h2').empty().append('🍭 ALL');

    renderFunsies(allFunsies);
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

  // Add new funsie to DB
  $('#new-funsie-form').on('submit', function(event) {
    event.preventDefault();

    // Serialize the form data
    const $formData = $('#new-funsie-form');
    const data = $formData.serialize();

    // Create an AJAX POST request that sends the form data to the server
    $.ajax({
      type: 'POST',
      url: 'http://localhost:8080/api/items',
      data,
      success: function() {
        loadFunsies();
      },
      error: function(error) {
        console.log(error);
      }
    });

    $('#funsie-name').val('');
  });

  
  // Edit funsie category
  
    /**
   * Adds a istener for specific tags for elements that may not yet exist.
   * @param scope a reference to an element to look for elements in (i.e. document)
   * @param selector the selector in [class] (i.e. a.someBtn)
   * @param event and event (i.e. click)
   * @param callback a function reference to execute on an event
   */
  const addLiveListener = function (scope, tagName, event, callback) {
    // Set up interval to check for new items that do not have listeners yet. This will execute every 1/10 second and apply listeners to
    setInterval(function() {
      const elements = scope.getElementsByTagName(tagName);
      for (const element of elements) {
          element.addEventListener(event, callback);
      }
    }, 1000);
  };

  addLiveListener(document, "select", "change", (event) => {
    const itemId = event.target.getAttribute("data-catergory-id");
    const categoryName =  event.target.value;
    // console.log('categoryName:', categoryName, 'itemId:', itemId);
  });
  
});
