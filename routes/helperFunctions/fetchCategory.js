'use strict';

const fetch = require('node-fetch');

const yelp = require('yelp-fusion');
const client = yelp.client('tBdsUQE8RCcOfHvyQM_4pRHS_xuN0uOzNHwVMyMyLpDHEYqbYYABAvsnno4VOnIG0mcvNuAccWuRUeWF3kLigiJaEp2_R12Zn_EPfVWFnyR1U47NkRGFheq3MyO3ZHYx')


// helper function
const { urlEncode } = require('./urlEncode')


///////////////////////////////////////////////////////////////////////////

const toWatch = async function(input) {
  const title = urlEncode(input)

  const url = `https://imdb-search2.p.rapidapi.com/${title}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '02f1e4e396mshf4d0b21c733446bp12fe4cjsn159bedb15bbe',
      'X-RapidAPI-Host': 'imdb-search2.p.rapidapi.com'
    }
  };


  //PROMISES

  // return fetch(url, options)
  //   .then(response => {
  //     return response.json()
  //   })
  //   .catch(error => console.error(error));


  //TRY/CATCH WITH AWAIT

  // const response = await fetch(url, options);
  //   try {
  //     const response = await fetch(url, options);
  //     const result = await response.json();
  //     console.log(result)
  //   } catch (error) {
  //     console.error(error);
  //   }
};

// CALL FUNCTION
// console.log(toWatch('bambi '));


///////////////////////////////////////////////////////////////////////////



const toEat = function(input) {
  client.search({
    term: `${input}`,
    location: "Victoria, BC"
  }).then(response => {
    console.log(response.jsonBody.businesses[0].name);
  }).catch(error => {
    console.log(error);
  });
};

// CALL FUNCTION
// toEat("Ocean")


///////////////////////////////////////////////////////////////////////////

const toRead = async function(input) {
  const url = `https://book-finder1.p.rapidapi.com/api/search?title=${input}`;
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': '02f1e4e396mshf4d0b21c733446bp12fe4cjsn159bedb15bbe',
      'X-RapidAPI-Host': 'book-finder1.p.rapidapi.com'
    }
  };

  // PROMISES WITH CATCH
  return fetch(url, options)
    .then(response => {
      return response.json();
    })
    .catch(error => console.error(error));


  //TRY/CATCH WITH AWAIT

  // try {
  //   const response = await fetch(url, options);
  //   const result = await response.json();
  //   const details = await result.results[0];
  //   const title = await details.title
  //   console.log(title);
  // } catch (error) {
  //   console.error(error);
  // }

};

// CALL FUNCTION
// toRead('harry potter and the half blood prince')


///////////////////////////////////////////////////////////////////////////

// const toBuy = function(input) {

// };


// module.exports = { toWatch, toEat, toRead, toBuy}
