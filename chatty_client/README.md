# ChattyApp Project

Chatty is a simple communication application. (6th week of my bootcamp)

Chatty will allow users to communicate with each other without having to register accounts. It will use React as well as modern tools for Node including Webpack and Babel.

Stack:
- Webpack with Babel, JSX, ES6, webpack dev server (comes with boilerplate)
- WebSockets using Node package ws on the server-side, and native WebSocket on client side
- ReactJS

## Final product

!["screenshot of ChattyApp"](https://github.com/MatthewYiHe/chatApp/blob/master/docs/ChattyApp_1.png?raw=true)
!["screenshot of ChattyApp"](https://github.com/MatthewYiHe/chatApp/blob/master/docs/ChattyApp_2.png?raw=true)


## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command, from both chatApp and chatApp/chatty_server.
3. Start the web server using the `npm start` command, from both chatApp and chatApp/chatty_server. The app will be served at <http://localhost:3000/>.
4. Go to <http://localhost:3000/> in your browser.


### Dependencies

- babel-core
- babel-loader
- babel-preset-es2015
- babel-preset-react
- css-loader
- node-sass
- sass-loader
- sockjs-client
- style-loader
- webpack
- webpack-dev-server
- react
- react-dom
- uuid


### Dependencies for WebSockets server
- express
- ws