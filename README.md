# cmefapp
App for CMEF visitors to find out information about Orantech during the show



This app is build with Vue JS on frontend with Iview as ui framework. on backend server is build with Node js using express framework and mongodb as a database. i have also used mongoose ORM to make thing easier. as everything already discussed following are some points to be noted..

* if you are tring to update timing slots in database or making anyother changes to date model. please delete all date related data other wise it will crash the frontend code.


* To make things all the javascript functions are written very clearly and plain javascript so if anyone trying to change, please keep it as simple as possible.

* Don't delete any current system variable from database directly. 


* If you want to add a variable for another purpuse you can use `/api/sysVar/add` . with a parameter 

```
varName: //variable name (unique)
value: //boolean true or false
```



* i will add an extra api and you will be able to set variable as text or number, user  `/api/sysVar/toggleType` . with a parameter 

```
name: //variable name 
```

* branches are

```
Master branch // i am using for server code only but can use for anything
Frontend // front end code
server // server code and should be latest and active to heroku
cmef_andres //....
```


> Any update related to server won't need to update the build but if any changes happen on front end then app should be build again.

### Making App work Locally


> Mongodb should be up on  `27017` `port which is mostly the default port on all systems, if any changes you can update 

```
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/cmef' 

//process.env.MONGODB_URI  server related and dont change

27017 => port
cmef => dbname

```

in `config/database.js` in server branch
.
___


> open terminal and `cd` to any local folder you want.

___
> let create a directory first.

`
mkdir cmefapp
`
> let clone the repos using git 

`git clone <url> --branch <branch name> --single-branch <folder-name>`

> Clone frontend.

`git clone https://github.com/andresorjuela/cmefapp.git --branch frontend --single-branch frontend`

> Clone server.

`git clone https://github.com/andresorjuela/cmefapp.git --branch server --single-branch server`

> folder should look like this

```
/cmefapp
    /frontend
    /server
```


> Install dependencies
//use terminal two tabs or windows to handle both front end backend

```
cd frontend

npm install

cd server

npm install
```



> Run app server's


```
frontend

npm run start
```
Front end will be on [Localhost port 8080](http://localhost:8080/)
```
server

node app.js
```

Back end will be on [Localhost port 8081](http://localhost:8081/)





