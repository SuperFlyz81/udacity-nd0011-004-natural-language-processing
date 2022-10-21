/*
Test the validateURL function.
*/
import {validateURL} from '../src/client/js/validateInput'
describe('Testing the validate URL functionality.', () => {  
  test('Testing the validateURL() function with valid input value: google.com', () => {
    const input = 'google.com';
    // console.log(validateURL(input)); // Debug code.
    /* For some reason you must wrap the function you want to test (validateURL in our case) 
    in a function expression when testing for a thrown error using Jest's .toThrow() method.
    See the green TIP section at: https://jestjs.io/docs/expect#tothrowerror for a confirmation of this. */
    expect(() => {validateURL(input);}).not.toThrow();
  })

  test('Testing the validateURL() function with valid input value: www.google.com', () => {
    const input = 'www.google.com';
    expect(() => {validateURL(input);}).not.toThrow();
  })

  test('Testing the validateURL() function with valid input value: http://google.com', () => {
    const input = 'http://google.com';
    expect(() => {validateURL(input);}).not.toThrow();
  })

  test('Testing the validateURL() function with valid input value: http://www.google.com', () => {
    const input = 'http://www.google.com';
    expect(() => {validateURL(input);}).not.toThrow();
  })

  test('Testing the validateURL() function with valid input value: https://google.com', () => {
    const input = 'https://google.com';
    expect(() => {validateURL(input);}).not.toThrow();
  })

  test('Testing the validateURL() function with valid input value: https://www.google.com', () => {
    const input = 'https://www.google.com';
    expect(() => {validateURL(input);}).not.toThrow();
  })

  test('Testing the validateURL() function with invalid input value: "" (blank value entered).', () => {
    const input = '';
    expect(() => {validateURL(input);}).toThrowError(/^The URL is blank. Please enter a valid URL and try again.$/); // Test the exact error message, as per: https://jestjs.io/docs/expect#tothrowerror
  })

  test('Testing the validateURL() function with invalid input value: asdfasdfasdf (random text entered).', () => {
    const input = 'asdfasdfasdf';
    expect(() => {validateURL(input);}).toThrowError(/^Invalid URL entered. Please enter a valid URL and try again.$/); // Test the exact error message, as per: https://jestjs.io/docs/expect#tothrowerror
  })

  test('Testing the validateURL() function with invalid input value: google (missing domain extension).', () => {
    const input = 'google';
    expect(() => {validateURL(input);}).toThrowError(/^Invalid URL entered. Please enter a valid URL and try again.$/); // Test the exact error message, as per: https://jestjs.io/docs/expect#tothrowerror
  })
});