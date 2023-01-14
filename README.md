# Getting Started with SkinX Web App

## Steps to Setup

In the project directory, you need to run:

### 1.`npm install` 
to install all node_modules as listed in packages.json

### 2.`npm run start`
to start up the SkinX web app then it will run on port 3000

PS. You need to start up MongoDB in docker then skinx-service project
before going to the next step.
### 3. Login page
If it is the first time, you will be navigated to Login page,
You can select username and password to login as the detail below
Or else, you can choose some random postedBy's name in database with lowercase and 1234 as a password.

| username  | password |   name   |
|-----------|----------|----------|
| cale      | 1234     |   Cale   |
| elyssa    | 1234     |  elyssa  |
| rubye     | 1234     |  Rubye   |

### 4. Dashboard page
Afer login, it will redirect to Dashboard
There are 4 main functions
1. View all posts card by infinite-scroll.
2. Search posts by their multiple tags by infinite-scroll.
3. Click on post card or post list in search result to see each post modal details.
4. Logout
