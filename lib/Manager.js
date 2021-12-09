// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require('../lib/Employee.js')

class Manager {

  constructor(name, email, id, officeNumber) {
    super(name, email, id, officeNumber)

    this.officeNumber = officeNumber
  }
  getofficeNumber() {
    return this.officeNumber
  }
  getRole() {
    return "Employee"
  }
}

module.exports = Manager