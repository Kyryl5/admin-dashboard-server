module.exports = class UserDto {
  email;
  id;
  isActivated;
  
  constructor(model) {
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
  }
}