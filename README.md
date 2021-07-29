# SOA app
####  Deployed on localhost

First, we need to deploy the redis server that will host our message broking service between our services, to do that in a linux environment we type: 
```sh
sudo apt-get install redis-server
```
Then, lets open the redis server in localhost

```sh
redis-server
```

Let's the 3 separate apps soa-auth, soa-quest-answ, soa-stats on 3 different terminals:
```sh
cd backend/soa-auth &&
npm install &&
npm run start:dev
```

Open a new terminal and type:
```sh
cd backend/soa-quest-answ &&
npm install &&
npm run start:dev
```

Again, open a new terminal and type:
```sh
cd backend/soa-stats &&
npm install &&
npm run start:dev
```

The backend is set up. Now let's deploy our frontend: 
```sh
cd frontend &&
npm install &&
npm run start
```

Our app is successfully deployed! Frontend listening on http://localhost:3200
