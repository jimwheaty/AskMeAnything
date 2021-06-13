## AskMeAnything
A Questions - Answers app that is offered as a Service (SaaS) for our 2021 SaaS course at Ntua

# For Deployment on Heroku
1. Create a new app on Heroku by hitting the "new" button on the top right corner here: https://dashboard.heroku.com/apps
3. Go to Settings-> Add buildpack -> Enter Buildpack URL: https://github.com/mars/create-react-app-buildpack.git
4. Make sure there is a Procfile with the command: "web: npm start"
5. Change "backend_url" on the file: src/App.js to your backend_url.
6. Make sure there is a "build" command on the package.json that is equal to "react-scripts build"
7. Make sure there is a "start" command on the package.json that is equal to "react-scripts start"
8. Make sure you have all the dependencies that you need for production on the "dependencies" field of package.json and not on the "devDependencies".
9. Make sure you have the package.json file on the root of the directory.

Note that Heroku free plan can only run a single process for each project.
