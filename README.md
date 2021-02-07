# Game of recognizing different brands and logos

This is a fullstack-project created with MERN stack. It creates a single page web application
that is a game where the user can test their knowledge of recognizing different brands/logos.
A single game instance consists of 10 questions from a chosen category (for example Cars) and the
questions are displayed one at a time and if the users picks the right choice, the next question
pops up. If the user picks a wrong alternative, the game ends. Every question has a time limit for
making the choice and the faster they react, the more points they'll get. Final score is then
submitted into score database. Games can be played without registering but there is also an option
for registering as a user for more features (can be added later). Admin users can log in and they
have their own management view where they create new categories or questions and delete or update
existing ones. Regular users can see their account page and modify their user information there.

MERN stack consists of the following techonogies which are used in application development:

- **MongoDB:** A document-based open source database
- **Express:** A web application framework for Node.js
- **React:** A JavaScript front-end library for creating user interfaces
- **Node.js:** JavScript run-time environment that executes JavaScript code outside of a browser (our server environment)

<br />

## Backend

Backend is created with Express framework in Node.js environment and MongoDB is used as a database
for storing data of the users, categories, questions and scores.

### API

The following tables show overview of the REST API that enables the operations used
within the application. <br /><br />

### Categories

| Methods | URLs                  | Actions                        |
| ------- | --------------------- | ------------------------------ |
| GET     | /categories           | Get all categories             |
| GET     | /categories/:id       | Get category by id             |
| GET     | /categories/published | Get all published categories   |
| POST    | /categories           | Create a new category          |
| PUT     | /categories/:id       | Update category by id          |
| DELETE  | /categories           | Delete all categories          |
| DELETE  | /categories/:id       | Delete category by id          |

<br />

### Questions

| Methods | URLs                                  | Actions                                      |
| ------- | --------------------------------------| -------------------------------------------- |
| GET     | /questions                            | Get all questions                            |
| GET     | /questions/:id                        | Get question by id                           |
| GET     | /questions?category=cars              | Get questions that belong to category "Cars" |
| GET     | /questions?category=cars&difficulty=1 | Same as above ^ but question difficulty is 1 |
| POST    | /questions                            | Create a new question                        |
| PUT     | /questions/:id                        | Update question by id                        |
| DELETE  | /questions                            | Delete all questions                         |
| DELETE  | /questions/:id                        | Delete question by id                        |

<br />

### Users

| Methods | URLs                                  | Actions                                      |
| ------- | --------------------------------------| -------------------------------------------- |
| GET     | coming later                          | coming later                                 |

<br />

### Scores

| Methods | URLs                                  | Actions                                      |
| ------- | --------------------------------------| -------------------------------------------- |
| GET     | coming later                          | coming later                                 |

<br />

## Front-end

Front-end is created with React framework.