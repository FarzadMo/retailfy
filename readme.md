# Retailfy

Retailfy is a retail shop where people can buy or sell various items on it.

[View website]()

## Overview

 *  Users are able to post (sell) as well as search for their desired itesm, by creating an account first and then sign in.  


 *  The app is a full-stack web application created with MySQL, Node, Express.js, Sequelize.js, React and Redux. 
 
       * Used Express to manage the server and routes.
       * Used Node and MySQL to query and routed data in the app.
       * Used React and Redux to generate the frontend and manage the state across the frontend.
       * Used Sequelize.js to talk to the database which provides easy access to MYSQL.
       * Used express-fileupload middleware to upload images.
       * Used express-session to handle sessions in Node.js.
       * Used bcrypt npm package to hash passwords.
    
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
      *  Express-fileupload – used to upload images.
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
![image](https://user-images.githubusercontent.com/49765334/68970897-59304780-07b6-11ea-8586-146700118dc1.png)

### Sign in and Sign up page
![image](https://user-images.githubusercontent.com/49765334/68971004-8e3c9a00-07b6-11ea-8e1b-f91068952a4d.png)

### Post ad page
![image](https://user-images.githubusercontent.com/49765334/68971077-b9bf8480-07b6-11ea-8bfc-367da48c1468.png)

### My ad page
![image](https://user-images.githubusercontent.com/49765334/68971118-d3f96280-07b6-11ea-8c5f-afcaad67cb41.png)

### Detail page

![image](https://user-images.githubusercontent.com/49765334/68971211-07d48800-07b7-11ea-8559-c59a19701cfe.png)

### Contributors
   ##### S. Lotfi 
   ##### F. Moghbl
  
