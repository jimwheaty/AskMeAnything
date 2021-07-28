## AskMeAnything
A Questions - Answers app that is offered as a Service (SaaS) for our 2021 SaaS course at Ntua

# For Deployment on Heroku
1. Create a new app on Heroku by hitting the "new" button on the top right corner here: https://dashboard.heroku.com/apps
2. Go to Settings-> Add buildpack -> Node.js
3. Make sure there is a Procfile in the root directory with the command: "web: npm run start:prod". A Heroku free project gives you one free process that runs the command that it finds in the Procfile. Also make sure there is a "start:prod" command on the package.json that is equal to "node dist/main".
4. Make sure there is a "build" command on the package.json that is equal to "nest build". The buildpack calls "npm build" and postbuild or prebuild commands if they exist.
5. Make sure you have all the dependencies that you need for production on the "dependencies" field of package.json and not on the "devDependencies" because the buildpack will not install them.
6. Make sure you have the package.json file on the root of the directory.

Note that Heroku free plan can only run a single process for each project.
