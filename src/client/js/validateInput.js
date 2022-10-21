/*
Validate input
*/

/*
Main functions
*/
function validateURL(url) {
  // console.log('Running validateURL ', url); // Debug code.

  // Validate that URL is not blank.
  if (!url) {
    throw 'The URL is blank. Please enter a valid URL and try again.';
  }

  /* Validate the URL using a regular expression.
  Taken from: https://stackoverflow.com/questions/8667070/javascript-regular-expression-to-validate-url
  Note that I added a "?" after the "(?:(?:(?:https?|ftp):)?\/\/)" group at the beginning of the regex to make that group optional.
  I.e., entering "https://", "http://", or "ftp://" at the beginning of the URL is now optional.*/
  if (!(/^(?:(?:(?:https?|ftp):)?\/\/)?(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(url))) {
    throw 'Invalid URL entered. Please enter a valid URL and try again.';
  }
}

/*
Exports
*/
// See https://www.w3schools.com/js/js_modules.asp for more details in JavaScript modules.
export {validateURL};