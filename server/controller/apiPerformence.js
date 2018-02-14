const ApiPerformenceModel = require('../models/apiPerformence')

class ApiPerformenceController {
  static constructor() {}

  static async addRecord(data) {
    await ApiPerformenceModel.create(data).catch(e => console.log(e))
  }
}

module.exports = ApiPerformenceController
