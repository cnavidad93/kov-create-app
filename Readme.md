# Kov Create App

[![Version](https://img.shields.io/github/package-json/v/cnavidad93/kov-create-app)](https://img.shields.io/github/package-json/v/cnavidad93/kov-create-app)

CLI tool to create a base setup for kov projects using Vite and SWC.
The project created comes with an opinionated version of Eslint and Prettier configuration as well as the folders structure according to the standards of KOV.

## Frontend Stack

You will be prompt to use any of this options for your project:

- React
- React + Typescript

## Features

You will be prompt to add any of this features to your project:

- Redux with Redux Saga
- Kov-shared-components library
- _Tests with Jest (Coming Soon..)_

## Usage

This tool requires [Node.js](https://nodejs.org/) v16+ to run.

The easiest way to use this tool is to run this command and follow the prompts

```sh
npx kov-create-app
```

You can also use arguments to bypass the prompts

```sh
npx kov-create-app [options] <projectName>

Arguments:
  projectName                  name of your project

Options:
  -t, --template <stack>       template type (choices: "react", "typescript")
  -r, --redux                  add redux and redux saga
  -k, --kov-shared-components  add kov-shared-components lib
  -h, --help                   display help for command
```
