# Place Sharing App

## About

This application is a MERN stack application which is build with TypeScript.

**API:** https://share-place-mern.herokuapp.com/api

**APP:** https://share-place-mern.netlify.app/

**The direcrory structure of the project:**

> backend

- **src:** Main folder

  - **controller:**: Contains all functions which handle all the requests and return responses

  - **middlewares:** Contains couple of express middleware functuins. i.e. authentication middleware, CORS middleware, error handling middleware etc.

  - **models:** Contains models corresponding to collections in the database and custom http-error model.

  - **routes:** Contains all the api routes

  - **uploads:** Contains static assets (images).

  - **utils:** Contains a utility function which returns coordinates of provided address.

> fontend

- **src:** Main folder

  - **components:** Contains all common stateles and functional components.

  - **contex:** Contains auth context which stores authentication related information and functions; token, userId, login and logout functions.

  - **hooks:** Contains custom hooks. `auth-hook` handles all authentication process. `form-hook` handles all form actions. `http-hooks` handles all api calls.

  - **models:** Contains interfaces and types

  - **pages:** Contains all pages which is shown in individual routes.

  - **utils:** Contains form validation functions.

## Installation and Launching

> Backend

```bash
cd backend
npm install
npm run watch
npm run start // Run in seperate terminal
```

> Frontend

```bash
cd frontend
npm install
npm run start
```
