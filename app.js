// Required packages
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Module Exports
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const render = require("./lib/htmlRenderer");

// array to build team
let team = [];

const addEmployee = () => {
  inquirer.prompt({
    type: "confirm",
    name: "add",
    message: "Would you like to add another employee?"
  })
    .then(data => {
      if (data.add == true) {
        questionPrompts()
      }
      else {
        fs.mkdir('output', { recursive: true }, (err => {
          if (err) {
            console.log(err)
          }
        }))
        writeToFile("./output/team.html", render(team))
      }
    })
}
// array of questions for all employees
function questionPrompts() {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Please enter name of employee:"
    },
    {
      type: "input",
      name: "id",
      message: "Please enter ID of employee:"
    },
    {
      type: "input",
      name: "email",
      message: "Please enter employee email:"
    },
    {
      type: "list",
      name: "role",
      message: "Select current role:",
      choices: [
        "Manager",
        "Engineer",
        "Intern",
      ]
    },
  ])
    .then(answers => {
      if (answers.role === "Manager") {
        inquirer.prompt([{
          type: "input",
          name: "officeNumber",
          message: "Please enter office number:"
        }])
          .then(addManager => {
            const newManager = new Manager(answers.name, answers.id, answers.email, addManager.officeNumber)
            console.log(newManager)
            team.push(newManager)
            addEmployee()
          })
      } else if (answers.role === "Engineer") {
        inquirer.prompt([{
          type: "input",
          name: "github",
          message: "Please enter gitHub of employee:"
        }])
          .then(addEngineer => {
            const newEngineer = new Engineer(answers.name, answers.id, answers.email, addEngineer.github)
            console.log(newEngineer)
            team.push(newEngineer)
            addEmployee()
          })
      } else if (answers.role === "Intern") {
        inquirer.prompt([{
          type: "input",
          name: "school",
          message: "Please enter school of intern:"
        }])
          .then(addIntern => {
            const newIntern = new Intern(answers.name, answers.id, answers.email, addIntern.school)
            console.log(newIntern)
            team.push(newIntern)
            addEmployee()
          })
      }
    })
}

function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, err => {
    if (err) {
      console.log(err)
    }
    console.log(team)
    console.log("Success! Employee summary has been created.")
  })
}

questionPrompts()
