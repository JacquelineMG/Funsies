/* eslint-disable indent */
/* eslint-disable no-undef */

$(document).ready(function() {
  let allFunsies = [];
  let filteredFunsies = [];

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
      renderFunsies(data);
    });
  };

  // Initial funsies on page-load
  loadFunsies();
});
