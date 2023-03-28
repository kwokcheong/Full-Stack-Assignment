# Full-Stack-Assignment
This is a fullstack assignment using NodeJS, ReactJS and MySQL. 


- Clear instructions to run a working local instance of your web application and API server for testing and evaluation

### How to get started in your local machine

1. git clone https://github.com/kwokcheong/Full-Stack-Assignment.git
2. cd Full-Stack-Assignment

A. download mysql community edition
https://dev.mysql.com/downloads/file/?id=516926
- developer default
- Settings to take note of
```
    port: 3306
    mysqlroot password: password
    check that username: root
    password: password
```

- in mysql workbench app, click on local instance mysql80, you will need to log in

//download postman (if needed)
https://www.postman.com/downloads/



3. From Full-Stack-Assignment path: run
`npm install`

4. set up .env files

- Within the Full-Stack-Assignment folder, there are 2 folders
Server and Client

Within Server folder, add a file called `.env`

copy and paste this into that file
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=password
DB_NAME=PrivateEducation
PORT=3001
```

now within the Client folder, add the `.env`

copy and paste this into that file 
```
REACT_APP_BASE_URL="http://localhost:3001"
```

This app runs on nodeJS and ReactJS

Launch NodeJS:
From your terminal...
1. `cd Full-Stack-Application`
2. `cd server`
3. `npm start`

Open another terminal instance...
From your terminal...
1. `cd Full-Stack-Application`
2. `cd client`
3. `npm start`


- Assumptions made should be documented clearly



- Link(s) to the hosted web application and API (if applicable)


- Inputs/suggestions on the API design


