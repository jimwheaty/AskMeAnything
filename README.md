## AskMeAnything
A Questions - Answers app that is offered as a Service (SaaS) for our 2021 SaaS course at Ntua

# For Deployment on Heroku
1. Create a new app on Heroku here: https://dashboard.heroku.com/apps
![image](https://user-images.githubusercontent.com/58553332/121814935-56405600-cc7c-11eb-8a38-e8229c6befb0.png)
2. Go to Settings-> Add buildpack -> Enter Buildpack URL: https://github.com/mars/create-react-app-buildpack.git
3. Make sure there is a Procfile with the command: "web: npm start"
4. Change "backend_url" on the file: src/App.js to your backend_url.
5. Make sure there is a "build" command on the package.json that is equal to "react-scripts build"
6. Make sure there is a "start" command on the package.json that is equal to "react-scripts start"
7. Make sure you have all the dependencies that you need for production on the "dependencies" field of package.json and not on the "devDependencies".
8. Make sure you have the package.json file on the root of the directory.

Note that Heroku free plan can only run a single process for each project.
