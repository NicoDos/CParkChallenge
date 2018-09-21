# React-Native app to manage geo reports

## Getting Started

### Prerequisites

This app requires node and npm/yarn

### Installing

clone repo

```
git clone git@github.com:NicoDos/React-Native-app-to-manage-geo-reports.git
```

move into folder

```
cd ~/React-Native-app-to-manage-geo-reports
```

install dependencies

```
yarn install
```

Setup git hooks

```
chmod +x .git/hooks/pre-commit
```

move into server folder

```
cd ~/React-Native-app-to-manage-geo-reports/server
```

install dependencies

```
yarn install
```

## Running locally

### App

1. Initialize the React Native packager with `yarn start`
2. Run your app in Expo with `exp start` and follow instructions

### Server

Running local mongodb and express instances:

1. Launch the server with `yarn start`

OR

Running express and mongodb in a Docker container:

1. Move into folder with `cd ~/React-Native-app-to-manage-geo-reports/server`
2. Build Docker image with `docker build -t api .`
3. Run docker-compose file with `docker-compose up`
4. (App) Set your static local IP on ./src/Components/Reports.js:10 & ./src/Components/ReportsList.js:13

## Misc

### To Do

1. Remove static local IP on ./src/Components/Reports.js:10 & ./src/Components/ReportsList.js:13
2. Use environment variable to read either prod or dev database config file at ./server/index.js:5
3. Create a login/signup page
4. Gitignore .env file
5. Add & Improve doc and unt tests

