
//const text = userInput;

const urlEncode = function(input) {
 let urlString = input.trim().toLowerCase();
 urlString = urlString.replace(/\s/g, '%20');
 return urlString;
}

module.exports = { urlEncode }

