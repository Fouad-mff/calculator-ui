# Web Calculator Application (Frontend)

This project contains the user interface (UI) for the calculator application, built using pure HTML, CSS, and JavaScript. It serves as the client that sends expressions to the Backend API for calculation.

---

## Technology Stack

* HTML5 (Structure)
* CSS3 (Styling, using Grid for button layout)
* JavaScript (Event handling and sending asynchronous requests via Fetch API)

---

## Getting Started

### Dependencies

IMPORTANT: This frontend application requires the backend service to be running.

* Backend Project Link: https://github.com/Fouad-mff/calculator-api.git

### Local Setup

1.  Deploy the Backend First Ensure the `calculator-api-1.0-SNAPSHOT.war` is successfully deployed on your Wildfly server.
2.  Clone this Repository
    git clone https://github.com/Fouad-mff/calculator-ui.git
3.  Build and Deploy the Frontend:

    cd calculator-ui
    mvn clean install

---

## Accessing the Application

Once both projects are deployed on Wildfly (running on the default port 8080), access the application via:

`http://localhost:8080/calculator-ui-1.0-SNAPSHOT/`

### API Communication Details

The JavaScript logic in 'script.js' sends the expression to the backend service at:

http://localhost:8080/calculator-api-1.0-SNAPSHOT/api/calculate?expression=...