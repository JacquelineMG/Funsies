/* eslint-disable indent */
/* eslint-disable no-undef */

$(document).ready(function() {
  let allFunsies;
  let filteredFunsies;

  // Set default show completed toggle to true
  let showCompleted = true;
  $('#show-completed').prop('checked', true);

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
        <input type="checkbox" id="${funsie.id}-checkbox" ${funsie.is_done ? "checked" : ""}>
        <label for="${funsie.id}-checkbox" ${funsie.is_done ? 'class="done"' : ''}>${funsie.title}</label>
      </span>
      <select name="categories[${funsie.id}]" id="${funsie.id}-categories">
      `;

    const categories = {
      watch: "📺 WATCH",
      read: "📖 READ",
      eat: "🍽️ EAT",
      buy: "💰 BUY"
    };

    const categoriesEntries = Object.entries(categories);
    const categoriesOpt = categoriesEntries.map(([key, value], index) => (`<option value="${index + 1}" class="${key}" ${funsie.category_id === index + 1 ? "selected" : ""}>${value}</option>`));
    element += categoriesOpt.join("\n");

    element += `
      </select>
      </fieldset>
      `;

    const $funsie = $(element);
    const selector = $funsie.find("select");
    selector.addClass(categoriesEntries[selector.val() - 1][0]);
    selector.on("change", function(event) {
      $(this).removeClass();
      $(this).addClass(categoriesEntries[event.target.value - 1][0]);
    });

    const checkBox = $funsie.find("input");
    const doneStyle = $funsie.find("label");
    checkBox.on("click", function() {
      $(doneStyle).toggleClass("done");
    });

    return $funsie;
  };

  /**
   * Loop through all funsies to create a list of all elements
   * @param {array} funsies - Array of funsie objects
  */
  const renderFunsies = function(funsies) {
    let finalFunsies = [];

    // Empty list to not reduplicate data
    $('#funsies-container').empty();

    // Sort funsies by recency and completion
    let sortedFunsies = sortFunsies(funsies);

    // Check status of show completed toggle
    if (!showCompleted) {
      for (const funsie of sortedFunsies) {
        if (!funsie.is_done) {
          finalFunsies.push(funsie);
        }
      }
    } else {
      finalFunsies = sortedFunsies;
    }

    for (const funsie of finalFunsies) {
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
        filteredFunsies = data;
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
  $('#show-completed').on('change', function() {
    showCompleted = !showCompleted;
    renderFunsies(filteredFunsies);
  });

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
});
