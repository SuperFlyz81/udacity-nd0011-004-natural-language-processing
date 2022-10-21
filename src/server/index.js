/*
Server index.js
*/

/*
Global variables
*/
const express = require('express');
const dotenv = require('dotenv');
/* Use node-fetch Node module to enable server-side fetching.
This is required since the native fetch browser API was only integrated into Node with Node version 18 (and we are running an older version of Node).
See https://www.npmjs.com/package/node-fetch for full details. */
const fetch = require('node-fetch');
const FormData = require('form-data');

/*
Express server setup
*/
const app = express();

/*
Dependencies and middleware
*/
// Here we are configuring Express to use body-parser as middleware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// Cors for cross-origin allowance.
const cors = require('cors');
app.use(cors());

/*
Global code
*/
// Initialize the main project folder.
app.use(express.static('dist'));

// Set the Express server port.
const port = 8081;

// Spin up the Express server.
app.listen(port, () => console.log(`Express server listening on port: ${port}`));

// Configure local environment variables (for API key retrieval from the local .env file that is never uploaded to GitHub).
dotenv.config();
// console.log(`Your API key is ${process.env.API_KEY}`); // Debug code.

/*
Routes
*/
app.get('/', (req, res) => {
  res.sendFile('dist/index.html');
})

app.get('/getdata', (req, res) => {
  let projectData = {}; // Empty JS object that acts as an API endpoint for all your Express server routes.
  const formData = new FormData(); // Instantiate a new FormData object to provide parameters to the MeaningCloud Sentiment Analysis web API.

  /* This Express server GET route receives a URL value in the form of a URL parameter (as called from the fetch browser API call in client\formHandler.js).
  For more information on passing and retrieving URL parameters to an Express server, see:
  https://www.digitalocean.com/community/tutorials/use-expressjs-to-get-url-and-post-parameters */
  // console.log('URL to check sentiment for: ' + req.query.url); // Debug code.

  // Create parameters for the MeaningCloud Sentiment Analysis web API.
  formData.append('key', process.env.API_KEY);
  formData.append('url', req.query.url);
  formData.append('lang', 'auto');
  
  // Configure request options for the MeaningCloud Sentiment Analysis web API.
  const requestOptions = {
      method: 'POST',
      body: formData,
      redirect: 'follow'
  };

  /* Try to get data from the MeaningCloud Sentiment Analysis web API using chained node-fetch promises.
  For more details on the node-fetch Node module, see the comment in the Global variables section above.
  
  For example code on getting data from the MeaningCloud Sentiment Analysis web API,
  see the "JavaScript (fetch)" tab at https://learn.meaningcloud.com/developer/sentiment-analysis/2.1/dev-tools */
  fetch('https://api.meaningcloud.com/sentiment-2.1', requestOptions)
    .then(response => (
      response.json()
    ))
    .then(response => {
      /* For a full list of response values returned by the MeaningCloud Sentiment Analysis web API, see the following URL:
      https://learn.meaningcloud.com/developer/sentiment-analysis/2.1/doc/response */
      
      // console.log(response.status); // Debug code.

      projectData.msg = response.status.msg;

      // If the sentiment analysis could be completed successfully.
      if (response.status.msg === 'OK') {
        // console.log(response.score_tag + '\n' + response.subjectivity + '\n' + response.sentence_list[0].text); // Debug code.
        
        projectData.score_tag = response.score_tag;
        projectData.subjectivity = response.subjectivity;

        // Include the first 10 sentences as a text snippet. Or, if the analysed text contains less than 10 sentences, include all sentences in the text snippet.
        let sentenceCount = response.sentence_list.length <= 10 ? response.sentence_list.length : 10;
        sentenceCount--; // Subtract one from the sentence count since your for loop below is zero based.

        projectData.text = '';

        for (let i = 0; i <= sentenceCount; i++) {
          projectData.text += response.sentence_list[i].text + ' ';
        }

        // console.log(projectData.text); // Debug code.
      } 
      
      /* If the sentiment analysis could be completed successfully,
      then the following data from MeaningCloud Sentiment Analysis web API will be sent back to the calling client side fetch:
      - status.msg
      - response.score_tag
      - response.subjectivity
      - response.[first 10 senctences] text snippet
      Otherwise, only the status.msg (containing a data retrieval error message from the API) will be sent back to the calling client side fetch.*/
      // console.log(projectData); // Debug code.
      res.send(projectData);
    })
    .catch(error => console.log('error', error));
});