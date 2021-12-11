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
    name: "addEmployee",
    message: "Would you like to add another employee?"
  })
    .then(data => {
      if (data.addEmployee == true) {
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

function questionPrompts() {
  inquirer.prompt([
    {
      type: "input",
      name: "name",
      message: "Please enter name of employee."
    },
    {
      type: "input",
      name: "id",
      message: "Please enter ID of employee."
    },
    {
      type: "input",
      name: "email",
      message: "Please enter employee email."
    },
    {
      type: "list",
      name: "role",
      message: "Select current role.",
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
          message: "Please enter office number."
        }])
          .then(addManager => {
            const newManager = new Manager(answers.name, answers.id, answers.email, addManager.officeNumber)
            team.push(newManager)
            addEmployee()
          })
      } else if (answers.role === "Engineer") {
        inquirer.prompt([{
          type: "input",
          name: "github",
          message: "Please enter gitHub of employee."
        }])
          .then(addEngineer => {
            const newEngineer = new Engineer(answers.name, answers.id, answers.email, addEngineer.github)
            team.push(newEngineer)
            addEmployee()
          })
      } else if (answers.role === "Intern") {
        inquirer.prompt([{
          type: "input",
          name: "school",
          message: "Please enter school of intern."
        }])
          .then(addIntern => {
            const newIntern = new Intern(answers.name, answers.id, answers.email, addIntern.school)
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
    console.log("Employee summary has been created.")
  })
}

questionPrompts()



// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
