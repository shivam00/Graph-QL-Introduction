# The App Server

Right now the questions that are asked are stored in a DOC file and the scores are maintained in an excel sheet. 

The Interview App will aim to automate this process.

```
The Interview App Server will contain all the backend process.
```

## Getting Started
Clone the repository and run 
```
$ yarn
```
It will add all the dependencies that are needed to run this project automatically 

You than require an `.env` file to set the enviroment variable
### Please specify the following environemnt variables in the file `.env`

| Key          | Description                                 |
| ------------ | :-----------------------------------------: |
| DB_URL       | The Mongo Instance URL                      |
| JWT_SECRET   | Secret Key for Token Signing                |
| TEST_DB_URL  | Test DB URL                                 |
| TEST_DB_NAME | Test DB Name                                |


## SCRIPTS
### Develop
To run the app on default link -- http://localhost:3000
```
$ yarn develop
```
### Build
It will transpile ES6 script to ES5 script using babel and put the build in build folder
```
$ yarn build
```
 Delete the prior build and make a new build in build folder
```
$ yarn clean-build
```
### Test
It will help us to detect any error in our code by running all the unit test and output it in a collected manner
```
$ yarn test
```
 Watch files for changes and rerun all tests when something changes
```
$ yarn test:watch
```
## API Documentation 
### Queries
* To get information about the particular candidate i.e (name, email, address, phone, skype_Id, Interview Details)
 ```
    candidate(email: String!): Candidate!
 ```
* To get information about all candidates
 ```
    candidates: [Candidate]
 ```
* To get all questions with a filter of offset and categories 
 ```
    questions(offset: Int!, categories: [String]): [Question]
 ```
### Mutations
* To authenticate the supervisor 
```
    login(email: String!, password: String!) : Supervisor
```
* To register supervisor 
```   
    signup(name: String!, email: String!, password: String!) : Supervisor
```
* To add new question
```   
    addQuestion(question: String!, answer: String!, categories: [String!]) : Question
```
* To add interview details for the selected candidate 
```   
    startInterview(candidateEmail: String!) : Interview
```
* To add question and answer of the candidate under the selected candidate
```   
    pushQuestionDetails(interviewId: String!, candidateEmail: String!,    
    questionDetails: QuestionDetails) : AssignedQuestion
```
* To add the candidate for interview
```   
    addCandidate(name: String!, email: String!, address: String, phone: String,    
    skype: String) : Candidate
```
## Built With

* [Express](https://expressjs.com/) - Node.js web application framework
* [Yarn](https://yarnpkg.com) - Dependency Management
* [GraphQL](https://http://graphql.org) -Query language for our API

