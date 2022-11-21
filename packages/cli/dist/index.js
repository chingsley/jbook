"use strict";
// const serve = require('local-api'); // doesn't work in typescript
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var serve_1 = require("./commands/serve");
var login_1 = require("./commands/login");
commander_1.program
    .addCommand(serve_1.serveCommand)
    .addCommand(login_1.loginCommand);
commander_1.program.parse(process.argv);
