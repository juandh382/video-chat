# Resumen

Este es un ejemplo básico de como funcionaría la video llamada para MediLine, tiene un index que solo renderiza el componente Form (Padre) quien tiene todos los datos del usuario que se va a conectar y una vez que tiene los mismos los pasa a VideoCall junto con un callback del useState que permite la renderización del hijo de manera condicional.\
En el hijo VideoCall con los datos recibidos del padre Form, se obtiene el token dinámico desde el servicio montado en Node.js en heroku, este token se pasa junto con todos los datos recibidos al componente AgoraUIKit quien es el encargado de establecer la llamada.\
El componente de AgoraUIKit tiene muchos callbacks y métodos, use varios para loguearlos en consola y ver cuales nos pueden ser útiles, pueden buscar en la consola la cadena MediLine y les mostrará los que envian los callbacks.\
Deje documentación y links de cada callback o funcion usada de agora para que puedan ver los links de la documentación oficial. \

# Summary

This is a basic example of how the video call would work for MediLine, it has an index that only renders the Form component (Parent) which has all the data of the user that is going to connect and once it has them, it passes them to VideoCall together with a useState callback that allows conditional rendering of the child.\
In the VideoCall child with the data received from the parent Form, the dynamic token is obtained from the service mounted in Node.js on heroku, this token is passed along with all the data received to the AgoraUIKit component, which is in charge of establishing the call. \
The AgoraUIKit component has many callbacks and methods, use several to log them in the console and see which ones can be useful, you can search the console for the MediLine string and it will show you the ones that send the callbacks.\
Leave documentation and links of each callback or function used now so that they can see the links of the official documentation.

# Video call using the Agora UI Kit

In order to get the video call component working on the project you must install with

## npm i agora-react-uikit

## In the componente App there is some considerations about the variables:

## For rtcProps you must set the following properties:

appId: The App ID of your Agora project.\
channel: The channel name for the AgoraRTC session. qeue_id + timestamp when the call start.\
token: The token for authentication. We use the AGORA_TOKEN_SERVICE hosted on heroku.\
uid: The user ID for this client - we get this id from gateway/user/getAllPublicUsers login is the email and id is the id.

## For callbacks you must set the following properties:

EndCall: The callback function for ending the call.

## Token get url sintax is

Base url https://agora-access-token-nodejs.herokuapp.com/rtc/:channel/:role/uid/:uid/ \
:channel is the channel name\
:role is the role of the user (publisher or subscriber)\
:uid is the user id

### Example: https://agora-access-token-nodejs.herokuapp.com/rtc/test/publisher/uid/123456/

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
