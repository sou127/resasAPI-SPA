# Using RESAS API to Plot Prefectures' Poulation Graph

This project was created using the [RESAS API](https://opendata.resas-portal.go.jp/).

## How to run on local machine

After cloning the repository, run the following command:

Install [Recharts](https://recharts.org/en-US)

`npm install recharts`

After that, run the following command.

`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## Using environment variables

Place the RESAS API KEY in .env file in the base directory of the project

REACT_APP_RESAS_API_KEY=**Place Your API KEY here** <br>
REACT_APP_PREF_URL="https://opendata.resas-portal.go.jp/api/v1/prefectures" <br>
REACT_APP_POPU_URL="https://opendata.resas-portal.go.jp/api/v1/population/composition/perYear?prefCode=" <br>

## Deploying the project

Build the project using the following command:

`npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### Deployment

Drag and drop the `build` folder in your netlify account to deploy the projecy.
