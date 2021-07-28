# SOA app
####  Deployed on localhost

Let's the 3 separate apps soa-auth, soa-quest-answ, soa-stats on 3 different terminals:
```sh
cd backend/soa-auth
npm install
npm run start
```
Open a new terminal and type:
```sh
cd backend/soa-quest-answ
npm install
npm run start
```
Again, open a new terminal and type:
```sh
cd backend/soa-stats
npm install
npm run start
```
The backend is set up. Now let's deploy our frontend: 
```sh
cd frontend/soa-stats
npm install
npm run start:dev
```
Our app is successfully deployed! Frontend listening on http://localhost:3200