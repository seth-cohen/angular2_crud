# angular2_crud
Angular2 with vanilla js CRUD SPA example

## Persistence ##
The application can utilize 2 different data storage paradigms and you can switch between the two on the fly. 

You'll see a button at the top to allow you to switch between using localStorage
(storing JSON objects on the client - no configuration required - data visible in dev tools > application > localStorage)
and a MySQL database running on the same machine (if you create a DB called 'cyber' and use 'database_schema.sql'
to create the tables - you may also need to provide the params in DB.js to configure the connection as well)

## Running . ##
To run the sample just clone the above repository and type 'npm install' 
at the prompt in the root of the cloned directory. 
To start the server type 'npm start' and you can connect to at localhost:3000.

## Routing ##
The application utilizes a router for navigation, so normal browser navigation 
will work (you could for example go directly to localhost:3000/update/3 to bring up the 
update screen for user with id = 3).
