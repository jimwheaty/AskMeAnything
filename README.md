# AskMeAnything
A Questions - Answers app that is offered as a Service (SaaS) for our 2021 SaaS course at NTUA. For learning purposes, the app is implemented using 2 different architectural patterns: MVC and SOA. MVC app is deployed on https://askmeanything2021view.herokuapp.com 

Dummy user to experiment with:
username: jackie
password: el_presidente

## Stack
Backend: TypeScript, Nest.js, Express, Sequelize ORM
Frontend: React.js, Bootstrap


## Branches
### main
An informative, non-functional branch. Contains the documentation of the project, mainly UML diagrams: ERD, deployment, component. 

### soa-localhost
A SOA-version of the app deployed locally. It contains the frontend and backend code.

### frontend-mvc-heroku
A MVC-version of the app deployed on Heroku (frontend). It contains the "View" of the MVC.

### backend-mvc
A MVC-version of the app deployed on Heroku (backend). It contains the "Model" and the "Controller" of the MVC.

Note that Heroku free plan can only run a single process for each project. For this reason we needed two separate branches to push to heroku in order to deploy our app.
