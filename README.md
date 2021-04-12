## Routescanner interview
Routescanner interview repo

## Building the application
Before you can run the client application, the application has to be build. You can choose between an optimized production build, that will be run on the production environment, or a development build that uses the Webpack Development Server (WDS). The WDS watches changes to the codebase and refreshes the front-end application when you change any of the files that are used in the application.

To build a production version of the front-end application run:

    npm run build

To run a development version of the front-end application, that uses the Webpack Development Server, run:

    npm run build-dev

Regardless of the type of build you choose, Webpack will put all the files inside the `/dist` directory. When you change between a `build` and `build-dev` it is recommended you first flush the `/dist` directory before running a new build.

## Running the application

To run mock (express) server:
npm run express

To run frontend separately:
npm run dev

To run server and frontend in production mode:
npm run start
