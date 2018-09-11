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

### API

1. move into folder with `cd ~/CParkChallenge/server`
2. Build Docker image with `docker build -t cpark-challenge .`
3. Run a Docker container with the built image
