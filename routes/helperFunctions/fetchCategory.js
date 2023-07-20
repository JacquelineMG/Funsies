'use strict';

const fetch = require('node-fetch');

// OpenAIApi configuration
// Adapted from https://platform.openai.com/docs/quickstart


const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  organization: process.env.OPENAI_ORG_ID,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const apiKey = "Bearer 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";


const generatePropmt = function(i) {
  if (i.legth === 0 || i.trim().length === 0) {
    return `Say 'uncategorized'`;
  }
  return `Categorize ${i} as a book, movie, television, restaurant or product.`;
};

// Use openai to categorize user input

const categorizeItem = async function(item) {
  let resultTrim = [];
  const url = `https://api.openai.com/v1/completions`;
  const options = {
    body: JSON.stringify({"model": "text-davinci-003", "prompt": generatePropmt(item), "temperature": 0, "max_tokens": 7}),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${apiKey}`,
    },
  }
  try {
    const response = await fetch(url, options);
    const results = await response.json();
    const result = results.choices[0].text
    resultTrim = result.trim().split(' ');
    return resultTrim;
  } catch (error) {
    console.error(error);
  }
};


// Use response from openai to assign a category id to user input

const getCatId = function(input) {
  categorizeItem(input)
    .then((result) => {
      console.log(result)
      if(result.includes("Movie" || "Television")) {
        console.log("To Watch");
      } else if(result.includes("Restaurant")) {
        console.log("To Eat");
      } else if(result.includes("Book")) {
        console.log("To Read");
      } else if(result.includes("Product")) {
        console.log("To Buy");
      } else {
        console.log("Uncategorized");
      }
    })
  .catch((error) => console.error(error));
};

getCatId("Harry Potter")






module.exports = { getCatId };













