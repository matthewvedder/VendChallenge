# Parking Session Tracker
Demo: https://vend-challenge.netlify.app/

## Overview

The Parking Session Tracker is a React application utilizing Typescript and Firebase Firestore to track and manage parking sessions. It offers real-time updates, data validation, and a seamless user interface.

## My Objectives

- To create a solid user experience using 'don't make me think' principles (I love that book by the way). 
- To showcase how I might structure an app like this so that the codebase is a delight to iterate on as more views and features are built out
- To deploy a demo of the app so y'all could try to break it (please let me know if you do)
- To showcase an adept understanding of design patterns and best practices
- To illustrate how I approach unit testing on the front end where rapid UI changes often lead to unsustainable test suites

## Some things I didn't get to
- Abstract calls to database out of components and writes tests with mock calls to Firestore
- Error messages for backend errors
- Add a locations field to index page and locations select input to form

## Choices of note
- Build a separate Form component outside of Create view to easily add an Edit view
- Use a Create view instead of a Create Modal on Index view so that we can send a user a link to create a parking session and to maintain some mobile friendliness. I was on the fence about this because both were good choices.
- Fetch parking sessions by 'createdAt' order
- Allow users to complete parking sessions with one click in the Index view
- Add a freindly empty data message to get started on parking-sessions Index view. Here is a picture in case you don't get to see it. It's not super pretty, but a good UX I think.
  ![image](https://github.com/matthewvedder/VendChallenge/assets/16331910/9025f390-602d-4e69-95aa-a9a9ca0cfd56)


## What this needs to be production ready

### Security
- Front end has hard coded api key and other params for Firestore. Needs to use env variables.
- Firestore needs security rule restricting reads to our web app
- Firestore needs security rule restricting writes to our application server (after building API)
- Firestore needs security rule for restricting reads and writes to authenticated users (after building Auth)
- Data validation on the back end using Joi or Class Validator


### Error handling
- There is currently no error handling for when Firestore returns an error or is unavailable. This is a huge UX no no.

### Authenication
- We really need user authentication in order to show users the appropriate parking sessions, and for security as well.

### Environments
- Need dev, staging, and prod environments for Firestore, front end, and API once built. Staging and prod would use continuous deployment.

## Bonus Tasks (Outline)

- **Simple Styling**: I added some very basic layout styling just for functionality. My next step would be to ask our designer for design files and implement the styles from these. Really I would have done this before I started building the UI though.
- **Backend API**: NodeJS API would handle writes to Firestore. Write this using REST architecture. Configure Firestore security rules to only accept writes from the API servers.
- **Authentication**: Implementation using Firebase Auth for secure access with Firebase JS SDK. https://firebase.google.com/docs/auth/web/start.
- **Data Validation**: Use Joi or Class Validator for type safety and security in data models. This would resctrict which fields we allow to be written to the database.
- **Pagination**: To manage parking sessions in real life, both API and frontend would include pagination. Fire store supports this natively. Right now there is just front end pagination as the call to fetch parking sessions fetches the entire collection.
- **Testing**: I added unit tests for utlity functions like formatting and validations. By abstracting these out of the components we make them reusable and testable. Next I would pull the calls to Firestore out of the components, mock the calls, and test them as well.
- **Deployment**: I deployed this using Netlify for the purposes of the coding challenge, but in real life I would probably use Firebase deployment or some other Google Cloud utility based on Vend's tech stack.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Deployment
`npm run build`
`netlify deploy`
enter './build' as publish directory
