class User {
  constructor(fullName, username, email,
    password, urlProfilePicture, userJoined, admin) {
    this.fullName = fullName;
    this.username = username;
    this.email = email;
    this.password = password;
    this.urlProfilePicture = urlProfilePicture;
    this.userJoined = userJoined;
    this.admin = admin;
  }

  get fullName() {
    return this._fullName;
  }

  set fullName(fullName) {
    this._fullName = fullName;
  }

  get username() {
    return this._username;
  }

  set username(username) {
    this._username = username;
  }

  get email() {
    return this._email;
  }

  set email(email) {
    this._email = email;
  }

  get password() {
    return this._password;
  }

  set password(password) {
    this._password = password;
  }

  get urlProfilePicture() {
    return this._urlProfilePicture;
  }

  set urlProfilePicture(urlProfilePicture) {
    this._urlProfilePicture = urlProfilePicture;
  }

  get userJoined() {
    return this._userJoined;
  }

  set userJoined(date) {
    this._userJoined = date;
  }

  get admin() {
    return this._admin;
  }

  set admin(isAdmin) {
    this._admin = isAdmin;
  }

  toObject() {
    return {
      fullName: this.fullName,
      username: this.username,
      email: this.email,
      password: this.password,
      urlProfilePicture: this.urlProfilePicture,
      userJoined: this.userJoined,
      admin: true,
    };
  }
}

module.exports = User;