// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.
const Employee = require('../lib/Employee.js')

class Intern {

  constructor(name, email, id, school) {
    super(name, email, id, school)

    this.school = school
  }
  getSchool() {
    return this.school
  }
  getRole() {
    return "Employee"
  }
}

module.exports = Intern