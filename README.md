# IV1201-frontend

This repository contains the frontend code for the recruitment application.

## How to run

### Prerequisites

Node and npm must be installed on the local system.

### Steps

- Start by cloning this repository to the local system.
- In the root of the repository, run: <pre><code>npm i</code></pre> to install the Node packages needed.
- After this, setup the environment variables needed by the application. This is done by creating a .env file in the same directory as the .env-template and copying over the contents of the template and giving all those variables a value.
- The frontend needs a running backend for it to work fully. See the readme for https://github.com/IV1201-Group12/IV1201-backend for instructions on setting this up.
- To run the application, run: <pre><code>npm run dev</code></pre> in the root of the repository to run it in development mode. There are other scripts defined in package.json for other purposes.

## Testing

The app is tested using Playwright for acceptance tests. The acceptance tests are performed for all browsers that should be supported. The tests are also performed with an actual backend and database instance in the CI pipeline.

## Design

This repository implements frontend with client side rendering using React.

### Layers

The applications code follows a layered architecture and below are descriptions of the layers used.

#### Startup

The startup consists of the src/main.jsx file which attaches the root component App.jsx to the DOM. The root component defines the UI tree and handles navigation, contexts and global UI fragments.

#### Pages

The app is divided into pages. Any UI element that shall be shown in the application must be contained in a page. Each page corresponds to a path in the URL. The page components are meant to combine other smaller components into one view for the user.

#### Components

The components layer contains the building blocks for the UI. The components can be reused in different pages as well which is the case for the footer and the navbar who are global to the entire application.

#### QueryHooks

This layer is used as an abstraction for displaying data queried from the backend API conditionally. It contains definitions for custom hooks that can be used for this purpose and is implemented using the ReactQuery framework.

#### Api

This layer uses Axios to package api requests that can be used by the queryhooks to fetch data from API endpoints. This consititutes the interface to the backend.

#### Context

This layer is used to contain contextual components, e.g. authorization. It can be used to keep track of the applications current context. For example if the user is logged in or not.

#### Locales

This layer is used to implement localization. It contains variables with translations for the different UI strings used in the interface.
