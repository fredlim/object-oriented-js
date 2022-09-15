// https://www.youtube.com/playlist?list=PL4cUxeGkcC9i5yvDkJgt60vNVWffpblB7
// https://www.youtube.com/watch?v=PMfcsYzj-9M&t=1260s

'use strict';
// class based syntax

class UserClass {
    constructor(email, name) {
        this.email = email;
        this.name = name;
        this.online = false;
        this.score = 0;
    }
    login() {
        console.log(this.email, 'just logged in');
        return this;
    }
    logout() {
        console.log(this.email, 'just logged out');
        return this;
    }
    updateScore() {
        this.score++;
        console.log(this.email, 'score is now', this.score);
        return this;
    }
}

class AdminClass extends UserClass {
    constructor(email, name, approval) {
        super(email, name);
        this.approval = approval;
        this.role = 'super admin';
    }
    deleteUser(user) {
        //users = users.filter(u => {return u.email != user.email;});
        usersC = usersC.filter(u => u.email != user.email);
    }
}

var userCOne = new UserClass('use_one@gmail.com', 'User One');
var userCTwo = new UserClass('use_two@gmail.com', 'User Two');
var adminC = new AdminClass('admin@gmail.com', 'Admin', true);

var usersC = [userCOne, userCTwo, adminC];

// classical pattern

function User(email, name) {
    this.email = email;
    this.name = name;
    this.online = false;
    this.score = 0;
}

User.prototype.login = function() {
    this.online = true;
    console.log(this.email, 'has logged in');
};

User.prototype.logout = function() {
    this.online = false;
    console.log(this.email, 'has logged out');
};

User.prototype.updateScore = function() {
    this.score++;
    console.log(this.email, 'score is now', this.score);
    return this;
};

// function Admin(...args) {
//     //User.call(this, ...args);
//     User.apply(this, args);
//     this.role = "super admin";
// }

function Admin(email, name, approval) {
    //User.call(this, ...args);
    User.call(this, email, name);
    this.approval = approval;
    this.role = "super admin";
}

Admin.prototype = Object.create(User.prototype);
Admin.prototype.approval = false;
Admin.prototype.deleteUser = function(user) {
    users = users.filter(u => u.email != user.email);
};

var userOne = new User('user_one@gmail.com', 'User One');
var userTwo = new User('user_two@gmail.com', 'User Two');
var admin = new Admin('super@gmail.com', 'Admin', true);

var users = [userOne, userTwo, admin];

// prototypal pattern

var UserP = {
    constructor: function(email, name) {
        this.email = email;
        this.name = name;
        this.online = false;
    },
    login: function() {
        this.online = true;
        console.log(this.email, 'has logged in');
    },
    logout: function() {
        this.online = false;
        console.log(this.email, 'has logged out');
    }
};

UserP.getName = function() {
    return this.name;
};

var AdminP = Object.create(UserP);
AdminP.approval = 'true';
AdminP.constructor = function(email, name, approval) {
    UserP.constructor.call(this, email, name);
    this.approval = approval;
    this.role = 'super admin';
}

var userPOne = Object.create(UserP);
userPOne.constructor('user_one@gmail.com', 'User One');
var userPTwo = Object.create(UserP);
userPTwo.constructor('user_two@gmail.com', 'User Two');
var adminP = Object.create(AdminP);
adminP.constructor('admin@gmail.com', 'Admin', true);

var usersP = [userPOne, userPTwo, adminP];

// var Staff = {
//     constructor: function(email, name) {
//         this.email = email;
//         this.name = name;
//         this.online = false;
//     },
//     login: function() {
//         this.online = true;
//         console.log(this.email, 'has logged in');
//     },
//     logout: function() {
//         this.online = false;
//         console.log(this.email, 'has logged out');
//     }
// };

// Staff.getName = function() {
//     return this.name;
// };

// var Manager = Object.create(Staff);
// Manager.approval = 'true';
// Manager.constructor = function(email, name, approval) {
//     Staff.constructor.call(this, email, name);
//     this.approval = approval;
//     this.role = "boss";
// }

// var staffOne = Object.create(Staff);
// staffOne.constructor("peter@gmail.com", "Peter Chan");
// var managerOne = Object.create(Manager);
// managerOne.constructor("taiman@gmail.com", "Tai Man", true);

////////////////////
// prototypal inheritance

// var robert = {
//     firstName: 'Robert',
//     lastName: 'Smith',
//     getFullName: function() {
//         return this.firstName + ' ' + this.lastName;
//     }
// };

// var mike = Object.create(robert);
// mike.firstName = 'Mike';
// mike.lastName = 'Williams';

//////

function Employee(firstName, lastName) {
    this.firstName = firstName;
    this.lastName = lastName;
}

Employee.prototype.getFullName = function() {
        return this.firstName + ' ' + this.lastName;
};

var robert = new Employee('Robert', 'Smith');
var mike = new Employee('Mike', 'Williams');
