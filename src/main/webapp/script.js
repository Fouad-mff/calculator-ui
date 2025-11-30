/* * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/JSP_Servlet/JavaScript.js to edit this template
 */

/*
 * Author: Merad Fouad
 * Description: Logic for handling calculator input and calling the REST API.
 */

// Global variable referencing the calculator's text input field.
const display = document.getElementById('resultDisplay');

// Function to append a character (number or operator) to the display.
function appendToDisplay(value) {
    // Prevent adding operators (+, *, /) at the start if the display is empty.
    if (display.value === '' && ['+', '*', '/'].includes(value)) {
        return; 
    }
    // Append the new value to the current display content.
    display.value += value;
}

// Function to clear the display (C button).
function clearDisplay() {
    display.value = '';
}

/**
 * Main function: called when the '=' button is pressed
 */
function calculate() {
    const expression = display.value;
    
    // If the expression is empty when '=' is pressed, display '0' and exit.
    if (expression === '') {
        display.value = '0';
        return;
    }
    
    // Replace the user multiplication 'x' and division '÷' symbols
    // with standard machine symbols '*' and '/' required by exp4j.
    const safeExpression = expression.replace(/x/g, '*').replace(/÷/g, '/');

    // Encode the expression for the URL
    // encodeURIComponent converts special characters (like +, /, *) into URL-safe formats (%2B, %2F, %2A).
    const encodedExpression = encodeURIComponent(safeExpression);
    
    // BACKEND API URL
    // This URL includes the server address, the Backend WAR's Context Path, the JAX-RS Application/Resource path,
    // and the encoded expression as a query parameter.
    const apiURL = `http://localhost:8080/calculator-api-1.0-SNAPSHOT/api/calculate?expression=${encodedExpression}`;

    // Initiate the asynchronous REST service call using the Fetch API.
    fetch(apiURL)
        .then(response => {
            // Check if the HTTP status code indicates success.
            if (!response.ok) {
                // Error Handling for statuses like 400 (Bad Request) or 500 (Internal Server Error).
                return response.text().then(errorMessage => {
                    // Throw an error that will be caught by the final .catch block.
                    throw new Error(errorMessage || 'Calculation error or invalid expression.');
                });
            }
            // Success: Retrieve the body of the response as plain text.
            return response.text(); 
        })
        .then(result => {
            // Success: Display the numerical result received from the Backend.
            display.value = result;
        })
        .catch(error => {
            // Failure: This block catches connection errors thrown above (400,500,...).
            console.error('API Error:', error.message);
            // Display a simple error message to the user.
            display.value = 'Error!'; 
        });
}