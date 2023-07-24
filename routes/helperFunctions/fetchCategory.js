'use strict';

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const fetch = require('node-fetch');

// OpenAIApi configuration

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  organization: process.env.OPENAI_ORG_ID,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const apiKey = `${process.env.OPENAI_API_KEY}`;


const generatePropmt = function(i) {
  if (i.legth === 0 || i.trim().length === 0) {
    return `Say 'uncategorized'`;
  }
  return `Categorize ${i} as a book, movie, television, restaurant or product.`;
};

// Use openai to categorize user input

const categorizeItem = async function(item) {

  const url = `https://api.openai.com/v1/completions`;
  const options = {
    body: JSON.stringify({"model": "text-davinci-003", "prompt": generatePropmt(item), "temperature": 0, "max_tokens": 7}),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
  };

  try {
    const response = await fetch(url, options);
    const results = await response.json();
    if (!results.id) {
      const result = 'undefined';
      return result;
    } else {
      const result = await results.choices[0].text;
      const resultTrim = result.trim().split(' ');
      return resultTrim;
    }

  } catch (error) {
    console.error(error);
  }
};


// Use response from openai to assign a category id to user input
// Change returns to category_id or other that works better with DB

const getCatId = async function(input) {
  try {
    const result = await categorizeItem(input);
    if (result.includes("Movie")) {
      return "To Watch";
    } else if (result.includes("Television")) {
      return "To Watch";
    } else if (result.includes("Restaurant")) {
      return "To Eat";
    } else if (result.includes("Book")) {
      return "To Read";
    } else {
      return "To Buy";
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = { getCatId };













