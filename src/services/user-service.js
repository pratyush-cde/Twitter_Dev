const { UserRepository } = require("../repository/index");

class UserService {
  constructor() {
    this.userRepository = new UserRepository();
  }

  async signup(data) {
    return this.userRepository.create(data);
  }
}

module.exports = UserService;
