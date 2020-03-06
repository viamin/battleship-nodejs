## This is a beta version which means this code has not been verified in a class scenario. So if you are the first person using this in class, you should spend some more time testing it upfront and we would be very happy to hear any issues or successes with it. 

[![Build status](https://psdstewards.visualstudio.com/PSD/_apis/build/status/proscrumdev.battleship-cpp-CI)](https://psdstewards.visualstudio.com/PSD/_build/latest?definitionId=21)

# Battleship NodeJs

A simple game of Battleship, written in NodeJs.  

# Getting started

To edit and debug this project, you can use [Visual Studio Code](https://code.visualstudio.com/) or any other suitable editor.

## Run locally

Run battleship

```bash
node index.js
```

## Execute tests

Execute all tests
```bash
npm test
```

Execute Mocha tests
```bash
mocha './**/*Tests.js'
```

Execute Cucumber-js tests
```bash
./node_modules/.bin/cucumber-js .\GameController_ATDD
```

## Docker

We will provide some Docker support very soon.
