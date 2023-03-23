# Full Stack Assignment
A system is needed for a private education business to perform some administrative functions, where administrators can keep track of teachers and their classes.

Your task is to develop a fullstack application to help the administrators. The screens and API are detailed under [Tasks](#tasks) below. For the purposes of this exercise, you do not need to implement login and access control.

When you have completed your assignment, please submit a link to your code repository to the relevant contact person(s).

If you have any queries, feel free to get in touch with the relevant contact person(s).
&nbsp;  
&nbsp;  
&nbsp;  
# Requirements and Expectations
1. Your code should be uploaded to publically accessible Github (or other similar service) repo.
2. **(Optional)** Deploy your web application and API to a publicly accessible hosting environment.
3. Your code repository should contain a `README.md` that includes the following:
    * Clear instructions to run a working local instance of your web application and API server for testing and evaluation
    * Assumptions made should be documented clearly
    * Link(s) to the hosted web application and API (if applicable)
    * **(Optional)** Inputs/suggestions on the API design
4. Use a single language (only **TypeScript** or **JavaScript** are allowed) across both frontend and backend.
5. Use **NodeJS** for the backend runtime environment.
6. Use the **React** library for the frontend.
7. Using a rdbms is highly reccomended. You may use PostgreSQL, MySQL, or MariaDB.
8. Utilising 3rd party libraries (e.g. Ant Design or Material UI) is allowed.
9. The implementation of the frontend screens does not have to be pixel perfect with the provided Figma designs. Nonetheless, your application should have the same user flows and input controls.
10. **(Optional)** Include unit tests.


&nbsp;  
&nbsp;  
&nbsp;  
# Important!
- We will assess your submission holistically (i.e. not just in terms of functionality), including factors such as:
    * Readability and code cleanliness
    * Secure coding practices
    * Code structure/design, e.g. modularity, testability
- Your **API may be subjected to automated test tools**, so please **adhere closely to the given specs**.
    * *(Optional)* You can provide a Postman collection for the APIs that you've implemented, *but* we might still use our own tools as well to test your APIs.
&nbsp;  
&nbsp;  
&nbsp;  
# Tasks
### 1. As an administrator, I want to register a teacher in the system.
**Design**: [Figma Screen](https://www.figma.com/file/ZVe0i7n0tpldUTCrw2oRPo/GSG-%E2%80%93-SWE-Task-(Take-Home)?node-id=6%3A1512)

**API**
* Endpoint: `POST /api/teachers`
* Headers: `Content-Type: application/json`
* Success response status: HTTP 201
* Request body example:
```
{
  "name": "Mary",
  "subject": "Mathematics",
  "email": "teachermary@gmail.com",
  "contactNumber": "68129414"
}
```
&nbsp;  
&nbsp;  
### 2. As an administrator, I want to retrieve a list of teachers in the system.
**Design**: [Figma Screen](https://www.figma.com/file/ZVe0i7n0tpldUTCrw2oRPo/GSG-%E2%80%93-SWE-Task-(Take-Home)?node-id=6%3A1114)

**API**
* Endpoint: `GET /api/teachers`
* Success response status: HTTP 200
* Success response body :
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
&nbsp;  
&nbsp;  
### 3. As an administrator, I want to add a new class with a form teacher.
A teacher can only be the form teacher of one class.
&nbsp;  
**Design**: [Figma Screen](https://www.figma.com/file/ZVe0i7n0tpldUTCrw2oRPo/GSG-%E2%80%93-SWE-Task-(Take-Home)?node-id=6%3A997)

**API**
* To add a class
  * Endpoint: `POST /api/classes`
  * Headers: `Content-Type: application/json`
  * Success response status: HTTP 201
  * Request body example:
```
{
  "level": "Primary 1",
  "name": "Class 1A"
  "teacherEmail": "teachermary@gmail.com"
}
```
&nbsp;  
&nbsp;  
### 4. As an administrator, I want to retrieve a list of classes in the system.
**Design**: [Figma Screen](https://www.figma.com/file/ZVe0i7n0tpldUTCrw2oRPo/GSG-%E2%80%93-SWE-Task-(Take-Home)?node-id=4%3A180)

**API**
* Endpoint: `GET /api/classes`
* Success response status: HTTP 200
* Success response body :
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
&nbsp;  
## Error Handling
For all the above API endpoints, error responses should:
* have an appropriate HTTP response code (e.g. 400)
* have a JSON response body containing a meaningful error message in the following format:
```
{ "error": "Some meaningful error message" }
```
