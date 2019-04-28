# Create a simple RESTful CRUD with NodeJS and MongoDB.

Hi, Welcome to my project.
Here, you will find example code to create a RESTful service, using the following frameworks

* NodeJS as the server
* MongoDB as database
* SwaggerUI for NodeJS as the user interface to invoke the REST operations

Our CRUD service allow you to

* create a simple object ( product)
* list products
* get a product by id
* update a product
* delete a product


With Mongoose framework, you will see that the code to read/write objects in database is extremely simple and concise :).

## Online live demo

Visit [Live demo](https://prawinn555-nodejsdemo.glitch.me/), powered by Glitch

## Code

From [Github](https://github.com/prawinn555/nodejsdemo)


## Installation


### Prerequisites

* Install NodeJS
* create a free MongoDB cluster @ [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)


### Installation


```
git clone https://github.com/prawinn555/nodejsdemo
cd nodejsdemo/
npm install
 
```

* Change your database URL in the file .env. 


```
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0-bs8m2.mongodb.net/test?retryWrites=true

```

* Run the application

```
node server.js
 
```

## Acknowledgments

* All framework contributors
* Online tutorials (https://codeburst.io/@es1amaged)
