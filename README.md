# Full-Stack-Assignment
This is a fullstack assignment using NodeJS, ReactJS and MySQL.
The objective is to create a system that is needed for a private education business to perform some administrative functions, where administrators can keep track of teachers and their classes.

*As of writing, app is not deployed yet. Aim is to deploy it on AWS EC2 instance*
### How to get started in your local machine

0. Using your terminal, navigate to the filepath of your choice.
1. run command `git clone https://github.com/kwokcheong/Full-Stack-Assignment.git`
2. run command `cd Full-Stack-Assignment`
3. Downloads:

    A. mysql community edition (if not yet installed )
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

    B. postman (if needed )
    https://www.postman.com/downloads/



4. From Full-Stack-Assignment path: run command `npm install`
    - Alternatively, navigate into respective folders and run `npm install`
    - `cd client` -> `npm install`
    - `cd server` -> `npm install`

4. (IMPORTANT) set up `.env` files

    - Within the Full-Stack-Assignment folder, there are 2 folders, Server and Client
    
    - Within Server folder, add a file called `.env`

        copy and paste this into that file
        ```
        DB_HOST=localhost
        DB_USER=root
        DB_PASSWORD=password
        DB_NAME=PrivateEducation
        PORT=3001
        ```

    - Now within the Client folder, add the `.env`

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


- Assumptions made

1. Teacher
    - `name` should be unique, not null, with a character limit less than 256
    - `subject` should not be null
    - `email` should be unique, not null with a character limit less than 256
    - `contactNumber` character limit 10, frontend validation 8-10 char, not null
2. Classes
    - `level` should not be null
    - `name` should be unique, not null
    
Classes page:
- No existing teachers. `Add a teacher` is a link to create teacher page


- Link(s) to the hosted web application and API (if applicable)
*pending as of writing*


- Inputs/suggestions on the API design

1. /api/classes 

- returning the below JSON body may not provide a useful indentifier to the teacher's table unless name is unique. 
- Suggest to return more information under the `formTeacher` body to include information `email` or unique identifier `id`

```
{
    "level": "Primary 2",
    "name": "kcsaur",
    "formTeacher": {
        "name": "Kwokcheong Wong"
    }
}
```

2. Error Handling

- could consider returning an array of errors, providing more information on the other errors captured
```
{ 
    "errors": {
        "name": "Some meaningful error message",
        "subject": "Some meaningful error message",
        "email": "Some meaningful error message",
        "contactNumber": "Some meaningful error message"
    } 
}
```

3. (Non API Related) Class name could be a select dropdown


