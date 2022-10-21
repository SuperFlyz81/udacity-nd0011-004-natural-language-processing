/*
Form handler
*/

/*
Function expressions
*/
const resolvePolarity = (scoreTag) => {
  let polarity = '';

  switch(scoreTag) {
    case 'P+':
      polarity = 'Strong positive';
      break;
    case 'P':
      polarity = 'Positive';
      break;
    case 'NEU':
      polarity = 'Neutral';
      break;
    case 'N':
      polarity = 'Negative';
      break;
    case 'N+':
      polarity = 'Strong negative'
      break;
    case 'NONE':
      polarity = 'Without polarity'
      break;
    default:
      polarity = 'Unresolved'
  }

  return polarity;
}

const resolvePolarityColor = (scoreTag) => {
  let color = '';

  switch(scoreTag) {
    case 'P+':
      color = 'darkgreen';
      break;
    case 'P':
      color = 'green';
      break;
    case 'NEU':
      color = 'goldenrod';
      break;
    case 'N':
      color = 'red';
      break;
    case 'N+':
      color = 'darkred'
      break;
    case 'NONE':
      color = 'blue'
      break;
    default:
      color = 'grey'
  }

  return color;
}

const retrieveData = async (formUrl) => {
  // console.log('Running retrieveData function (i.e. Express server GET request)'); // Debug code.

  document.getElementById('results').innerHTML = 'Processing. Please wait...';

  // Try to get data using the fetch browser API, while also passing a URL parameter (named url with the formUrl function parameter's value) to the Express server's GET route.
  const response = await fetch('http://localhost:8081/getdata?url=' + formUrl);

  // Assign the fetched data (in JSON format) to a variable.
  const data = await response.json();

  // If sentiment analysis could be completed successfully.
  if (data.msg === 'OK') {
    // Update the UI by assigning the fetched data to DOM elements.
    // console.log(data.score_tag + '\n' + data.subjectivity + '\n' + data.text); // Debug code.
    let resultHTML =  `<span style="font-family:'Sarpanch', sans-serif; font-size: 2rem;">Sentiment analysis</span>
                      
                      <span style="font-size: 0.875rem">Polarity (positive, negative, neutral, etc.):</span>
                      <span style="color: ${resolvePolarityColor(data.score_tag)}; font-size: 1.5rem">${resolvePolarity(data.score_tag)}</span>

                      <span style="font-size: 0.875rem">Subjectivity (objective or subjective):</span>
                      <span style="color: var(--on-background); font-size: 1.5rem">${data.subjectivity.charAt(0).toUpperCase() + data.subjectivity.slice(1).toLowerCase()}</span>

                      <span style="font-size: 0.875rem">Text snippet (first 10 sentences):</span>
                      <span style="color: var(--on-background)"><em>"${data.text}"</em></span>`

    /* Remove the whitespace from the template literal above and replace all '\n' newline characters with '<br>' HTML tags.
    Taken from: https://stackoverflow.com/questions/70253343/how-to-remove-extra-space-in-template-literals */
    resultHTML = resultHTML.split('\n')
    .map(s => s.trim())
    .join('<br>');

    // console.log(resultHTML); // Debug code.

    // Update the UI.
    document.getElementById('results').innerHTML = resultHTML;
  } else {
    /* Otherwise, if code execution has reached this point, it means that data was returned back from the MeaningCloud Sentiment Analysis web API, but it was invalid data.
    This can happen if, for example, the user enters a URL that doesn't exist.
    If this is the case, throw and error, which will be caught by the calling handledSubmit() function below, and displayed in the UI.*/
    throw data.msg + '. Please ensure that the URL you entered exists and then try again.';
  }
}

/*
Main functions
*/
function handleSubmit(event) {
  event.preventDefault();

  // Get URL input element value.
  const formURL = document.getElementById('url').value;
  
  try {
    // Validate URL that was entered in the form field.
    Client.validateURL(formURL);

    // console.log('Form submitted'); // Debug code.
    // console.log(formURL); // Debug code.

    // Use retrieveData function expression to fetch data from the local Express server and then update UI.
    retrieveData(formURL)
      .catch(error => {
        // This arrow callback function runs when the retrieveData async function returns a rejected promise with an error (side note, for the receiveData async function, we are only interested in errors, hence the use of .catch() instead of .then() above)
        /* Appropriately handle any errors that might occur during the get (for example, when a non existing URL is entered, or when the Express server is not running or is inaccessible).
        Catches errors in both fetch(), response.json(), and manually thrown errors in the retrieveData async function, as well as any other errors that might occur in the that function. */
        document.getElementById('results').innerHTML = `${error}`;
      });
  }
  catch(error) {
    // Update the UI with any validation or API data retrieval errors.
    document.getElementById('results').innerHTML = `${error}`;
  }
}

/*
Exports
*/
// See https://www.w3schools.com/js/js_modules.asp for details on JavaScript module exports and import.
export {
  handleSubmit,
  resolvePolarity, // Only exporting this for Jest testing.
  resolvePolarityColor, // Only exporting this for Jest testing.
};