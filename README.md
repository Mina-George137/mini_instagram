# Mini Instagram
using Node.js, Flutter &amp; React

## Back-End
[deployed on vercel]

### Project Description
This project is a RESTful API for managing users and their media. The API is built using Node.js, Express.js, and MongoDB. It includes features such as user registration, login, asset upload, deletion, and retrieval, as well as user authentication and authorization.

### Architecture
The architecture of this app is a server-side Node.js application that uses Cloudinary for managing media assets and a MongoDB database for managing user data and media. The app follows the Model-View-Controller (MVC) design pattern, where the main components are:

* Model: for example The mediaModel schema represents the Model component of the MVC architecture. It handles the creation, storage, retrieval, and deletion of media assets, storing the assets in the MongoDB database, and handling the interaction with the Cloudinary media service.
* Controller: The various functions and routes defined in the file represent the Controller component of the MVC architecture. They handle the user's requests, such as uploading, deleting, and managing media assets, and send appropriate responses.
* View: The View component of the MVC architecture is not directly represented in this code snippet, as it typically involves generating user-facing HTML, CSS, or JSON responses, and is handled by the front-end application or framework in the context of a full-stack application.
* In addition, the Node.js application uses various middleware and packages to support the functionality, such as the express package for handling routes, the cloudinary package for handling Cloudinary services, and the mongoose package for handling database operations with the MongoDB database.

Overall, this app is a server-side Node.js, express and MongoDB application that uses Cloudinary for media storage and management, and a MongoDB database for managing user data and media assets, following the Model-View-Controller (MVC) design pattern.

### Project Structure
The project follows a modular structure, with different modules for handling authentication, user management, asset management, and utility functions. Here's a brief overview of the project structure:

* DB/: Contains configuration files for the application,the Mongoose models and the database connection.
* src/middlewares/: Contains middleware functions for handling request validation, authentication, and authorization.
* src/routes/: Contains the Express routes for the application.
* src/services/: Contains utility functions for sending welcome emails.
* src/modules/: containing the source code for user and media.

### Dependencies
The following dependencies are required to run the project:

* bcryptjs: A library to help you hash passwords.
* body-parser: Middleware to parse incoming request bodies.
* cloudinary: A cloud-based image and video management service.
* cors: Middleware to enable Cross-Origin Resource Sharing (CORS).
* dotenv: Loads environment variables from a .env file into process.env.
* express: A web application framework for Node.js.
* joi: A data validation library.
* jsonwebtoken: A JSON Web Token implementation for Node.js.
* mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js.
* multer: Middleware to handle file uploads.
* nodemailer: A module for sending emails from Node.js.
* nodemon: A utility that will monitor for any changes in your source code and automatically restart your server.

### Why to use CDN like Cloudinary?
Cloudinary is a cloud-based image and video management service that provides a set of tools for uploading, storing, managing, and delivering media files. Using Cloudinary as a Content Delivery Network (CDN) for media files in this project has several advantages over storing media files directly in MongoDB:

* Scalability: Cloudinary can handle large volumes of media files and provide fast and reliable delivery to users, even during periods of high traffic.
* Cost-effective: Storing large media files directly in MongoDB can quickly consume a lot of storage space and lead to increased hosting costs. Cloudinary provides a more cost-effective solution by storing and delivering media files on their own infrastructure.
* Image and video optimization: Cloudinary provides several image and video optimization features, such as automatic format conversion, resizing, cropping, and compression. These features can help improve the performance of the application and reduce the amount of data that needs to be transferred between the server and the client.
* Ease of use: Cloudinary provides a simple and intuitive API for uploading, managing, and delivering media files. This can help simplify the development process and reduce the amount of time and effort required to implement media management functionality in the application.

Overall, using Cloudinary as a CDN for media files in this project can help improve the performance, scalability, and security of the application, while also reducing hosting costs and simplifying the development process.

### API Documentation
#### User Management

* Get All Users
GET /user/allUsers
Allows administrators to view all users in the system.

* Add User
POST /user/add
Allows administrators to add a new user to the system.

* Get User By ID
GET /user/:id
Allows administrators to view a specific user by ID.

* Update User
PATCH /user/:id
Allows administrators to update a specific user by ID.

* Delete User
DELETE /user/:id
Allows administrators to delete a specific user by ID.

#### Authentication
* Register
POST /user/register
Allows new users to register with the application.

* Login
POST /user/login
Allows users to log in to the application.

* Logout
POST /user/logout
Allows users to log out of the application.

#### Media Management

* Upload Media
POST /media/upload
Allows authenticated users to upload a media file.

* Get All Media
GET /media
Allows authenticated users to retrieve all media files.

* Get Media By ID
GET /media/:id
Allows authenticated users to retrieve a specific media file by ID.

* Delete Media
DELETE /media/:id
Allows authenticated users to delete a specific media file by ID.

* Like Media
POST /media/:id
Allows authenticated users to like a specific media file by ID.

* Unlike Media
PATCH /media/:id
Allows authenticated users to unlike a specific media file by ID.

----------------------------------------------------------------------------------------------------------------------------
## Front-End/React

This project is a media-sharing app built using React, Vite, and various other libraries. 
The main purpose of this app is to allow users to upload and view media files.

### Assumptions
* All media files in the database are visible to anyone in the system. 
* The project does not implement login pages. This means that there is no way for users to authenticate themselves or manage their sessions. So as a result the API functions use a static token for authentication. This is not a best practice for production systems, as it can lead to security vulnerabilities. However, it has been assumed for the purpose of simplicity and ease of development and testing (like testing the authentication and authorization at the BE).
* It is recommended to implement proper authentication and authorization mechanisms in a production system to ensure the security and privacy of user data. This can include implementing login pages, user-specific tokens.

### Architecture
the architecture of this app is a client-server model. The client side of the application.

* The client-side code utilizes the Axios library to send HTTP requests to the server. The getUsers(), getMedia(), addMedia(), likeMedia(), unlikeMedia(), and deleteMedia() functions are used to interact with the server API for different resources such as users, media, and user interactions.

* The server-side of the application is not visible in the provided code, but it can be inferred that it exposes an API for the client to consume. The API endpoints include /user/allUsers, /media/, /media/upload, /media/:id, and are secured using a token-based authentication mechanism. The token is passed in the Authorization header of each request and is used to validate the user's access to the requested resources.

### The app has the following components:

* MediaPlayer: This component is responsible for rendering the media files. It uses the useEffect hook to fetch the media files from the server and display them using the CardComponent.
* CardComponent: This component is responsible for rendering a single media file. It receives the media file as a prop and displays it using an img tag.
* ImageUploader: This component is responsible for allowing users to upload media files. It uses a file input to allow users to select a media file and an img tag to display a preview of the selected file. When the file input changes, it calls the addMedia function to upload the file to the server.
* api_manager: This module contains the addMedia function, which is responsible for sending a POST request to the server to upload the media file. It uses the axios library to send the request and includes the Authorization header with a bearer token. As well as deletion of media, like and unlike functions

### The app also uses the following libraries:

* axios: A library for making HTTP requests.
* react: A JavaScript library for building user interfaces.
* react-dom: A library for rendering React components in the DOM.
* eslint: A linter for enforcing code style and consistency.
* eslint-plugin-react: An ESLint plugin for React.
* eslint-plugin-react-hooks: An ESLint plugin for React Hooks.
* eslint-plugin-react-refresh: An ESLint plugin for React Refresh.
* vite: A build tool for modern web projects.
* @vitejs/plugin-react: A Vite plugin for React.
* bootstrap: A CSS framework for building responsive and mobile-first projects.
* js-cookie: A library for working with cookies in JavaScript.

### The app is built using the following technologies:
* JavaScript
* React
* Vite
* HTML
* CSS

----------------------------------------------------------------------------------------------------------------------------
## Flutter
This project is a media-sharing app built using Flutter, Dart, and various other libraries. 
The main purpose of this app is to allow users to upload and view media files.

### Assumptions
* All media files in the database are visible to anyone in the system.
* The project does not implement login pages. This means that there is no way for users to authenticate themselves or manage their sessions. So as a result, the API functions use a static token for authentication. This is not a best practice for production systems, as it can lead to security vulnerabilities. However, it has been assumed for the purpose of simplicity and ease of development and testing (like testing the authentication and authorization at the BE).
* It is recommended to implement proper authentication and authorization mechanisms in a production system to ensure the security and privacy of user data. This can include implementing login pages, and user-specific tokens.

### Components
* MediaPlayer: This widget is responsible for rendering the media files. It uses the FutureBuilder widget to fetch the media files from the server and display them using the CardComponent.
* CardComponent: This widget is responsible for rendering a single media file. It receives the media file as a parameter and displays it using an Image widget.
* ImageUploader: This widget is responsible for allowing users to upload media files. It uses a RaisedButton widget to trigger the file picker and an Image widget to display a preview of the selected file. When the file picker is triggered, it calls the addMedia function to upload the file to the server.
* api_manager: This module contains the addMedia function, which is responsible for sending a POST request to the server to upload the media file. It uses the http library to send the request and includes the Authorization header with a bearer token. It also includes the deletion of media and like and unlike functions.

### Libraries
* http: A library for making HTTP requests.
* provider: Used to manage app state and dependencies.
* image_picker: Used to allow users to select and upload images.
* dio: Used to make HTTP requests to the server.
* fluttertoast: Used to display notifications to the user.


