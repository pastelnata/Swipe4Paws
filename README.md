## Swipe4Paws

Application designed to help people across Denmark find their perfect pet for adoption. It features animals from shelters all over the country, making it easier to connect potential adopters with animals in need of a home.

## Key features

- **Discover Animals for Adoption:** Browse a variety of pets from shelters across Denmark, with descriptions for each animal and the shelter contact.
- **Favorites:** Save your favorite animals and keep track of the ones you're interested in.
- **Find Shelters:** Read more about the shelters we showcase.
- **Swipe Feature:** Discover your perfect pet in a fun and engaging way by swiping through animals, helping you connect with your ideal companion faster.

## Tools Used

- **HTML:** For structuring the content.
- **CSS:** For styling the website.
- **TypeScript:** For interactive elements and functionality.
- **Angular Framework:** This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.5.
- **Docker:** For containerization of backend services.
- **PostgreSQL:** For the backend database.

## Project Setup & Running Locally

### Prerequisites

- **Docker:** Install [Docker](https://www.docker.com/get-started) on your local machine.
- **Node.js and npm:** Ensure you have [Node.js](https://nodejs.org/) installed.
- **Angular CLI:** You can install the Angular CLI globally using: npm install -g @angular/cli

### Running the Project with Docker

- **.env File:** Create an .env file in the project's root directory. Further instructions are in the file: .example.env
- **Start the application using Docker:** Once the .env file is set up and filled in with the correct values, run the following command in the terminal: docker-compose up --build

### Accessing the Application:

- **Frontend (Angular):** open your browser at: http://localhost:4200/
- **Backend (express):** accessible on http://localhost:3000/. . You can test the API by navigating to: http://localhost:3000/pets (To fetch all pets from the database)

### Stopping the Applicaion:

- **To stop the containers and clean up, run:** docker-compose down


## Project Developed By:

- [Rita Braunschweig](https://github.com/pastelnata)
- [Hubert Sylwesiuk](https://github.com/sduhubert)
- [Dominik Bosy](https://github.com/Dobos23)
- [Sandra Gallmayer](http://github.com/Condesgall).
- [Alina Kristell](https://github.com/alikrist)
- [Jakub Smilowski](https://github.com/JakubSmilowski)

## Development server

Run ng serve for a dev server. Navigate to http://localhost:4200/. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run ng generate component component-name to generate a new component. You can also use ng generate directive|pipe|service|class|guard|interface|enum|module.

## Build

Run ng build to build the project. The build artifacts will be stored in the dist/ directory.

## Running unit tests

Run ng test to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run ng e2e to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use ng help or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.