
const typeDefs = `
  scalar Timestamp

  type Question {
    _id:ID!
    question: String!
    answer: String!
    categories: [String!]
  }
  interface User {
    _id: ID!
    name: String!
    email: String!
  }
  type AssignedQuestion {
    questionInfo: Question!
    givenAnswer: String!
    score: Int!
  }
  type Interview {
    _id: ID!    
    date: Timestamp!
    questions: [AssignedQuestion]
    takenBy: Supervisor!
    finalNote: String
  }
  type Candidate implements User {
    _id: ID!    
    name: String!
    email: String!
    address: String
    phone: String 
    skype: String
    note: String
    interviews: [Interview]
  }
  type Supervisor implements User {
    _id: ID!    
    name: String!
    email: String!
    jwt: String
  }
  input QuestionDetails {
    _id: ID!
    question: String!
    answer: String!
    givenAnswer: String!
    categories: [String!]
    score: Int!
  }
  type Query {
    candidate(email: String!): Candidate!
    candidates: [Candidate]
    questions(offset: Int!, categories: [String]): [Question]

  }
  type Mutation {
    login(email: String!, password: String!) : Supervisor
    signup(name: String!, email: String!, password: String!) : Supervisor
    addQuestion(question: String!, answer: String!, categories: [String!]) : Question
    startInterview(candidateEmail: String!) : Interview
    pushQuestionDetails(interviewId: String!, candidateEmail: String!, questionDetails: QuestionDetails) : AssignedQuestion
    addCandidate(name: String!, email: String!, address: String, phone: String, skype: String) : Candidate
  }
`;

export default typeDefs;
