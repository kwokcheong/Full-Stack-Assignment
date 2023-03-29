# Full-Stack-Assignment

*Hi! My name is Kwok cheong, you can just call me KC :) I had alot of fun working on this tech challenge, it is well designed and thoughtful. Thank you!!*

![Screenshot 2023-03-29 at 11 07 14 AM](https://user-images.githubusercontent.com/27864374/228416470-12ba08f0-aaf8-481d-a3d1-28402da3cc65.png)


This is a fullstack assignment using NodeJS, ReactJS and MySQL.
The objective is to create a system that is needed for a private education business to perform some administrative functions, where administrators can keep track of teachers and their classes.

*As of writing, app is not deployed yet. Aim is to deploy it on AWS EC2 instance*
### How to get started in your local machine

Using your terminal, navigate to the filepath of your choice.
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

5. !!**IMPORTANT**!! set up `.env` files

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

### This app runs on nodeJS and ReactJS

1. Launch NodeJS:
From your terminal, navigate to the server directory
1. `cd Full-Stack-Application`
2. `cd server`
3. `npm start`

2. Open another terminal instance, 
- Either hit the keyboard shortcut `Command + D` or Manually open a new terminal window

From your terminal, navigate to the client directory
1. `cd Full-Stack-Application`
2. `cd client`
3. `npm start`

3. Alternatively! I made a script to run both at once
(NOTICE: This is not tested on other devices yet other than macbook pro 14, it may or may not work on other devices. Do use step 1 and 2 if this does not work for you)

From your terminal in `Full-Stack-Application` directory...
1. `npm start`

### Assumptions made

1. Teacher
    - `name` should be unique, not null, with a character limit less than 256
    - `subject` should not be null, each teacher only teaches one subject
    - `email` should be unique, not null with a character limit less than 256
    - `contactNumber` character limit 10, frontend validation 8-10 char, not null
2. Classes
    - `level` should not be null
    - `name` should be unique, not null
    
Classes page:
- No existing teachers. `Add a teacher` is a link to create teacher page


- Link(s) to the hosted web application and API (if applicable)
*pending as of writing*


### Inputs/suggestions on the API design

1. /api/classes 

- returning the below JSON body may not provide a useful identifier to the teacher's table unless name is unique. 
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

### How to test Postman
##### POST Request: 
1. `/api/teachers` : This creates a teacher record with the information passed in the body

sample body:
```
{
  "name": "Mary",
  "subject": "Mathematics",
  "email": "teachermary@gmail.com",
  "contactNumber": "68129414"
}
```

2. `/api/classes` : This creates a class record with the information passed in the body

sample body:
```
{
  "level": "Primary 1",
  "name": "Class 1A"
  "teacherEmail": "teachermary@gmail.com"
}
```

##### Get Requests:

sample response:
```
{
  "data" :
    [
      {
        "name": "Mary",
        "subject": "Mathematics",
        "email": "teachermary@gmail.com",
        "contactNumber": "68129414"
      },
      {
        "name": "Ken",
        "subject": "Mother Tongue Language",
        "email": "teacherken@gmail.com",
        "contactNumber": "61824191"
      }
    ]
}
```

2. `/api/classes` : This creates a class record with the information passed in the body

sample response:
```
{
  "data" :
    [
      {
        "level": "Primary 1",
        "name": "Class 1A",
        "formTeacher": {
          "name": "Mary"
        }
      },
      {
        "level": "Primary 2",
        "name": "Class 2B",
        "formTeacher": {
          "name": "Ken"
        }
      }
    ]
}
```


### Areas to improve on / wishlist (reflection for myself)

1. More unit testing

- Dived into coding too fast too soon
- More unit testing using mocha chai / react testing library :(

2. More Modular/Reusable code 

- Few areas can be made modular, such as modularizing the `react select box`, `text box`
- Implement a wrapper to pass classes/teachers information down the components. 

3. Deploy onto AWS E2 instance

- Really want to try deployment, I will be trying it out as of writing.
