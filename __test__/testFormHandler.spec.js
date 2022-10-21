/*
Test if the handleSubmit function exists.
*/
// Import the js file to test.
import {handleSubmit} from '../src/client/js/formHandler'
// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests. 
describe('Testing the submit functionality.', () => {
  // The test() function has two arguments - a string description, and an actual test as a callback function.  
  test('Testing the existence of the handleSubmit() function.', () => {
    // Define the input for the function, if any, in the form of variables/array.
    // Define the expected output, if any, in the form of variables/array.
    // The expect() function, in combination with a Jest matcher, is used to check if the function produces the expected output.
    // The general syntax is `expect(myFunction(arg1, arg2, ...)).toEqual(expectedValue);`, where `toEqual()` is a matcher.
    expect(handleSubmit).toBeDefined();
  })});

/*
Test the resolvePolarity function.
*/
import {resolvePolarity} from '../src/client/js/formHandler'
describe('Testing the resolve polarity functionality.', () => {  
  test('Testing the resolvePolarity() function expression with a valid input value.', () => {
    const input = 'P+';
    // console.log(resolvePolarity(input)); // Debug code.
    expect(resolvePolarity(input)).toEqual('Strong positive');
  })

  test('Testing the resolvePolarity() function expression with an invalid/blank input value.', () => {
    const input = '';
    // console.log(resolvePolarity(input)); // Debug code.
    expect(resolvePolarity(input)).toEqual('Unresolved');
  })
});

/*
Test the resolvePolarityColor function.
*/
import {resolvePolarityColor} from '../src/client/js/formHandler'
describe('Testing the resolve polarity color functionality.', () => {  
  test('Testing the resolvePolarityColor() function expression with a valid input value.', () => {
    const input = 'P+';
    // console.log(resolvePolarityColor(input)); // Debug code.
    expect(resolvePolarityColor(input)).toEqual('darkgreen');
  })

  test('Testing the resolvePolarityColor() function expression with an invalid/blank input value.', () => {
    const input = '';
    // console.log(resolvePolarityColor(input)); // Debug code.
    expect(resolvePolarityColor(input)).toEqual('grey');
  })
});