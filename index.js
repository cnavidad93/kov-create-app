#!/usr/bin/env node
import * as fs from "node:fs";
import figlet from "figlet";
import gradient from "gradient-string";
import inquirer from "inquirer";
import { execSync as cmd } from "child_process";
import chalk from "chalk";
import {
  DEFAULT_PACKAGES,
  KOV_SHARED_PACKAGES,
  REDUX_PACKAGES,
  TYPESCRIPT_PACKAGES,
} from "./configs/packages.js";

const FRONTEND_STACK = {
  REACT: "React",
  REACT_TYPESCRIPT: "React + Typescript",
};

const FEATURES = {
  REDUX: "Redux (Saga)",
  // TEST: "Test (Jest)",
  KOV_SHARED: "Kov React Shared Components",
};

const packages = {
  dependencies: {},
  devDependencies: {},
};

let projectName, frontendStack, extraFeatures, jsFileExt, reactFileExt;

// HELPERS
const sleep = async (ms) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

const copyFile = (source, destination) => {
  return fs.copyFileSync(source, `./${projectName}${destination}`);
};

const copyFolder = (source, destination) => {
  fs.mkdirSync(`./${projectName}${destination}`);
  return fs.cpSync(source, `./${projectName}${destination}`, {
    recursive: true,
  });
};

const addPackages = (pg = {}) => {
  packages.dependencies = {
    ...packages.dependencies,
    ...(pg.dependencies ?? {}),
  };
  packages.devDependencies = {
    ...packages.devDependencies,
    ...(pg.devDependencies ?? {}),
  };

  return packages;
};

const setStack = (type = "js") => {
  jsFileExt = type === "js" ? "js" : "ts";
  reactFileExt = type === "js" ? "jsx" : "tsx";
};

// CLI FORM
async function showTitle(title) {
  console.clear();
  figlet(title, (err, data) => console.log(gradient.pastel.multiline(data)));

  await sleep(1000);
}

async function promptProjectName() {
  const answer = await inquirer.prompt({
    name: "project_name",
    type: "input",
    message: "What is your project name?",
    default() {
      return "kov_create_app_project";
    },
  });

  projectName = answer.project_name;
}

async function promptFrontendStack() {
  const answer = await inquirer.prompt({
    name: "frontend_stack",
    type: "list",
    message: "Which stack do you want to use:\n",
    choices: [FRONTEND_STACK.REACT, FRONTEND_STACK.REACT_TYPESCRIPT],
  });

  frontendStack = answer.frontend_stack;
}

async function promptExtraFeatures() {
  const answer = await inquirer.prompt({
    name: "extra_features",
    type: "checkbox",
    message: "Select what features do you want to add:\n",
    choices: [FEATURES.REDUX, FEATURES.KOV_SHARED],
  });

  extraFeatures = answer.extra_features;
}

async function promptInstallDependencies() {
  console.clear();
  const answer = await inquirer.prompt({
    name: "install",
    type: "confirm",
    message: "Do you want to run 'npm i' ?\n",
  });

  if (answer.install) {
    console.log(chalk.yellow(`Installing dependencies..`));
    cmd(`cd ./${projectName} && npm i`, { stdio: "inherit" });
    console.log(chalk.green(`All Done!`));
    console.log();
    console.log(
      chalk.white(`Follow this commands to run your project:
    cd ./${projectName}
    npm run dev
    `)
    );
  } else {
    console.log(chalk.green(`All Done!`));
    console.log();
    console.log(
      chalk.white(`Follow this commands to run your project:
    cd ./${projectName}
    npm i
    npm run dev
    `)
    );
  }
}

// BUILDERS
function baseProjectSetup() {
  // copy default Home component
  copyFile("./components/Home.jsx", `/src/components/Home.${reactFileExt}`);

  // copy default styles
  copyFile("./styles/index.css", "/src/index.css");
  copyFile("./styles/Home.scss", "/src/components/Home.scss");

  // copy Eslint, Prittier, .gitignore and vite config files
  console.log(chalk.green(`Adding eslint and prettier rules..`));
  copyFile("./configs/.eslintrc.json", "/.eslintrc.json");
  copyFile("./configs/.gitignore", "/.gitignore");
  copyFile("./configs/.prettierrc", "/.prettierrc");
  copyFile("./configs/vite.config.js", `/vite.config.${jsFileExt}`);
}

function reduxSetup() {
  console.log(chalk.magenta(`Setting up redux..`));
  // add Redux packages
  addPackages(REDUX_PACKAGES);

  // copy redux config and example
  copyFolder(`./redux/${jsFileExt}`, "/src/store");

  // copy redux based Home component
  copyFile("./components/HomeRedux.jsx", `/src/components/${reactFileExt}`);

  // add redux store provider to root component
  copyFile("./components/indexRedux.jsx", `/src/index.${reactFileExt}`);
}

function createPackageJson() {
  const packageFile = fs.readFileSync(`./${projectName}/package.json`, {
    encoding: "utf8",
  });
  const packageJson = JSON.parse(packageFile);
  packageJson.name = projectName;
  packageJson.dependencies = packages.dependencies;
  packageJson.devDependencies = packages.devDependencies;
  fs.writeFileSync(
    `./${projectName}/package.json`,
    JSON.stringify(packageJson)
  );
}

async function createScaffold() {
  console.clear();
  console.log(
    chalk.blue(
      `Creating scaffolding for "${projectName}" with ${frontendStack}..`
    )
  );

  if (fs.existsSync(`./${projectName}`)) {
    console.log(
      chalk.red(`Error: Directory ./${projectName}/ already exists.`)
    );
    process.exit(1);
  }

  if (frontendStack === FRONTEND_STACK.REACT) {
    // add default packages
    setStack("js");
    addPackages(DEFAULT_PACKAGES);

    // copy template
    copyFolder("./templates/react-swc", "/");
    baseProjectSetup();
  } else if (frontendStack === FRONTEND_STACK.REACT_TYPESCRIPT) {
    // add default and typescript packages
    setStack("ts");
    addPackages(DEFAULT_PACKAGES);
    addPackages(TYPESCRIPT_PACKAGES);

    // copy template
    copyFolder("./templates/react-swc-ts", "/");
    baseProjectSetup();
  } else {
    console.log(chalk.red("Error: Frontend Stack not valid."));
    process.exit(1);
  }

  if (extraFeatures.includes(FEATURES.REDUX)) {
    reduxSetup();
  }

  if (extraFeatures.includes(FEATURES.KOV_SHARED)) {
    addPackages(KOV_SHARED_PACKAGES);
  }

  // add dependecies to package.json
  createPackageJson();
}

try {
  await showTitle("KOV CREATE APP");

  await promptProjectName();
  await promptFrontendStack();
  await promptExtraFeatures();

  await createScaffold();

  await promptInstallDependencies();
} catch (error) {
  console.log(`Error: ${chalk.red(error.message)}`);
  cmd(`rm -rf ./${projectName}`);
  process.exit(1);
}