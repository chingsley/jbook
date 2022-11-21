"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginCommand = void 0;
var commander_1 = require("commander");
exports.loginCommand = new commander_1.Command()
    .command('login')
    .description('Handle user login')
    .action(function () {
    console.log("This is just a dummy command\n     to illustrate how comander \n     is setup for handling multiple commands,\n    e.g the the login and the serve command");
});
