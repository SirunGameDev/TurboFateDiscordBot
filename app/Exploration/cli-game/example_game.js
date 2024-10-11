#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";
import ora from "ora";
import {getFighter, getReth} from "../Archetype.js";
program.version("1.0.0").description("My Node CLI");

program.action(() => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "Choose an option:",
        choices: ["Reth", "Fighter", "Quit"],
      },
    ])
    .then((result) => {
      const spinner = ora(`Doing ${result.choice}...`).start(); // Start the spinner

      setTimeout(() => {
        spinner.succeed(chalk.green("Done!"));
      }, 1000);
      if(result.choice == "Reth") {
        ora(getReth());
      }
    });
});

program.parse(process.argv);