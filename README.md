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
type: //string or boolean
```


> Currently Required Variables

```
showVideo // show video button
videoUrl //video url
eventDate // can replace 时间: 2019.10.19-22
eventAddress //can relplace 地点: 山东青岛 - 展位号: N3馆, J01
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

> Running APP will need following


* MongoDB
* Server (Node JS)
* Frontend (Vue JS)


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

> Clone server.

`git clone https://github.com/andresorjuela/cmefapp.git --branch server --single-branch server`

> Clone frontend.

`git clone https://github.com/andresorjuela/cmefapp.git --branch frontend --single-branch frontend`

> folder should look like this

```
/cmefapp
    /server
    /frontend
```


> Install dependencies
//use terminal two tabs or windows to handle both front end backend

```
cd server

npm install

cd frontend

npm install
```


> Run app server's

```
server

node ./bin/www
```

> Using [Nodemon](https://www.npmjs.com/package/nodemon)

```
nodemon start
```


Back end will be on [Localhost port 8081](http://localhost:8081/)



```
frontend

npm run start
```
Front end will be on [Localhost port 8080](http://localhost:8080/)


### Build front end.

> in Front end repository every thing is managed by vue.config.js and will handle everything by onw, all we just need to change one line of code.


* To make things all the javascript functions are written very clearly and plain javascript so if anyone trying to change, please keep it as simple as possible.

```
/cmefapp
    /frontend
        /src
            /plugins
                    /API.js
```

in this file we have to update the server link and as we use same folder for both front and backend it will use following url's

> for live server

```
    baseURL:'/'
```

> for local testing

```
        baseURL:'http://localhost:8081/'
```

* one base url must be commited out



> Build front end


``` npm run build ```

this will auto generate a static site into `/server/public/` folder and you can test it using [Server port] (http://localhost:8081)

> Update git remote frontend.

```
git status
git add .
git commit -am "changes bla bla"
git push

```

> Update git remote server. (one liner)

`git add . && git commit -a -m "server" && git push`


Thanks

