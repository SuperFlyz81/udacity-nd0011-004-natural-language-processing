/*
Client index.js
*/

/*
Imports
*/
// See https://www.w3schools.com/js/js_modules.asp for details on JavaScript module exports and import.
import {validateURL} from './js/validateInput';
import {handleSubmit} from './js/formHandler';

/* Comment out the inline JavaScript stylesheets imports below when deploying to production,
and uncomment the main.css stylesheet line at the top of the src/client/views/index.html file
to use the minified main.css stylesheet for production rather than the "slow performing" inline stylesheets below. */
import './styles/theme.scss';
import './styles/style.scss';
import './styles/header.scss';
import './styles/content.scss';
import './styles/footer.scss';

/*
Exports
*/
export {
  validateURL,
  handleSubmit
 };