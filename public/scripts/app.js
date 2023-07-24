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
      <select name="categories[${funsie.id}]" id="${funsie.id}-categories">
      `;

    const categories = {
      watch: "📺 WATCH",
      read: "📖 READ",
      eat: "🍽️ EAT",
      buy: "💰 BUY"
    };

    console.log({funsie})
    const categoriesEntries = Object.entries(categories)
    const categoriesOpt = categoriesEntries.map(([key, value], index) => (`<option value="${index + 1}" class="${key}" ${funsie.category_id === index + 1? "selected" : ""}>${value}</option>`));
    element += categoriesOpt.join("\n")

    element += `
      </select>
      </fieldset>
      `;

    const $funsie = $(element);
    const selector = $funsie.find("select")
    selector.addClass(categoriesEntries[selector.val() - 1][0]);
    selector.on("change", function(event) {
      $(this).removeClass();
      $(this).addClass(categoriesEntries[event.target.value - 1][0]);
    })

    const checkBox = $funsie.find("input")
    const doneStyle = $funsie.find("label");
    checkBox.on("click", function(event) {
      $(doneStyle).toggleClass("done");
    } )


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

  // Add new funsie to DB
  $('#new-funsie-form').on('submit', function(event) {
    event.preventDefault();
    const $formData = $('#new-funsie-form');
    // serialize the form data
    const data = $formData.serialize();

    // create an AJAX POST request that sends the form data to the server
    $.post("/api/items", data)
      .then(res => {
        loadFunsies();
        $('#funsie-name').val('');
      })
      .catch(err => {
        console.log(err);
      });

  });


});
