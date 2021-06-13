## AskMeAnything
A Questions - Answers app that is offered as a Service (SaaS) for our 2021 SaaS course at Ntua

# For Deployment on Heroku
1. Create a new app on Heroku by hitting the "new" button on the top right corner here: https://dashboard.heroku.com/apps
2. Go to Settings-> Add buildpack -> Enter Buildpack URL:  https://github.com/mars/create-react-app-buildpack.git <- this is a buildpack script for react!
3. Make sure there is a Procfile in the root directory with the command: "web: npm start". A Heroku free project gives you one free process that runs the command that it finds in the Procfile. Also make sure there is a "start" command on the package.json that is equal to "react-scripts start".
4. Change "backend_url" on the file "src/App.js" to the url of your backend api server.
5. Make sure there is a "build" command on the package.json that is equal to "react-scripts build". The buildpack calls "npm build" and postbuild or prebuild commands if they exist.
6. Make sure you have all the dependencies that you need for production on the "dependencies" field of package.json and not on the "devDependencies" because the buildpack will not install them.
9. Make sure you have the package.json file on the root of the directory.

Note that Heroku free plan can only run a single process for each project.
