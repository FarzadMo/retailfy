# Retailfy

Retailfy is a retail shop where people can buy or sell various items on it.

[View website](https://retailfy.herokuapp.com/)

## Overview

 *  Users are able to post (sell) as well as search for their desired itesm, by creating an account first and then sign in.  


 *  The app is a full-stack web application created with MySQL, Node, Express.js, Sequelize.js, React and React-Redux. 
 
       * Used Express to manage the server and routes.
       * Used Node and MySQL to query and routed data in the app.
       * Used React and Redux to generate the frontend and manage the state across the frontend.
       * Used Sequelize.js to talk to the database which provides easy access to MYSQL.
       * Used Multer middleware to upload images.
       * Used express-session to handle sessions in Node.js.
       * Used bcrypt npm package to hash passwords.
       * Used Radium to make the website responsive.
    
## Instructions
### App Setup
1.	Create the React app by using create-react-app, and install the associated dependencies mentioned in the package.json.
1.	Make a package.json file by running npm init from the command line in the backend.
2.	Create a server.js file.
3.	Install the Express npm package: npm install express express-fileupload express-session
4.	Install other associated packages mentioned in the package.json in the backend.
5.	Install MySQL npm package: npm install mysql2.
6.	Require the following npm packages inside of the server.js file:
      *  Express
      *  Multer – used to upload images.
      *  Express-session - used to handle sessions in Node.js.
      *  Fs - used to work with file system.
      *  bcrypt - used to hash passwords
      
### DB Setup
1.	Inside the models directory, create schema.sql and seeds.sql.
2.	Write SQL queries in schema.sql. 
3.	Write insert queries to populate the user, and ad table with some entries.

### Config Setup
1.	Create a folder named config.
2.	Install sequelize package : npm install -g sequelize sequelize-cli
3.	Create a config.json file inside config directory using  sequelize init config command line – change config.json to config.js- install dotenv module –require and config dotenv in config.js –create .env file in the root directory of your project. Add environment-specific variables on new lines in the form of NAME=VALUE
4.	Create a metadata.js 

### Model setup
1.	create a folder named models.
2.	In models, make  the following files: 
      *  Index.js: Create an index.js file using Sequelize-CLI – sequelize init model
      *  ad.js: define the ad (advertisement) table using sequelize with the following fields: title, location, description, image, price, category, and contactEmail, active- add afterCreate hook to update the user and rename the name of the uploaded  image by a user.
      *  User.js: define the category table using sequelize with the following fields: firstname, lastname, email, and password.
 
**Note:** associate tables using foreign key: a user hasMany Ads. An ad belongsTo a user. 

### Routes setup
1. Create a folder named  routes.  
2. In routes, make  the following files and folders: 
      *  index.js: create a set of routes to render all the routes with /api url.
      *  Inside the API folder there is an index.js to create a tree of various routes as follows:
      *  user.js: create an user on the user table using a post route with /api/users.
      *  retailRoutes.js : create a set of routes to create a post, and search for them based on category, and Id
      *  image.js: create a route to create and post an image.
      *  auth.js: create a set of routes to authenticate a user and handle the log out

### Client setup
1.	Create the frontend using React and Redux.
      *  Create the main parts of the frontend using React.js.
      *  Handling the state for authentication using Redux.

### Main page
![image](https://user-images.githubusercontent.com/49765334/70502854-ecc41200-1aef-11ea-8a64-6f05438f20a8.png)

### Sign in and Sign up page
![image](https://user-images.githubusercontent.com/49765334/70502888-082f1d00-1af0-11ea-89d7-392184739290.png)

### Post ad page
![image](https://user-images.githubusercontent.com/49765334/70503034-72e05880-1af0-11ea-9c0b-62c947367cc0.png)

### My ad page
![image](https://user-images.githubusercontent.com/49765334/70502929-2e54bd00-1af0-11ea-9db4-3470e0afda51.png)


### Detail page

![image](https://user-images.githubusercontent.com/49765334/70502989-547a5d00-1af0-11ea-974c-a9ef5b4a516e.png)

### Contributors
   ##### S. Lotfi 
   ##### F. Moghbl
  
