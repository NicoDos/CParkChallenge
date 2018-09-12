# CParkChallenge

## Getting Started

### Prerequisites

This app requires node and npm/yarn

### Installing

clone repo

```
git clone git@github.com:NicoDos/CParkChallenge.git
```

move into folder

```
cd ~/CParkChallenge
```

install dependencies

```
yarn install
```

Setup git hooks

```
chmod +x .git/hooks/pre-commit
```

### API

move into folder

```
cd ~/CParkChallenge/server
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

1. Launch the server with `yarn start`
2. Visit http://localhost:8080

## Deploying

### App

Follow deployment process described at https://docs.expo.io/versions/latest/guides/building-standalone-apps.html

### API

1. move into folder with `cd ~/CParkChallenge/server`
2. Build Docker image with `docker build -t cpark-challenge-api .`
3. Run docker-compose file

## Misc

### To Do

1. Replace static local IP on ./src/Components/Reports.js:10 & ./src/Components/ReportsList.js:13
2. Use environment variable to read either prod or dev database config file at ./server/index.js:5
3. Add & Improve doc and unt tests

