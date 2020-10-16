import { Message } from "discord.js";

export default class Context {
  nextCounter: number;
  message: Message;
  args: String[];
  commandName: String;

  constructor(message: Message, args: String[], commandName: string) {
    this.nextCounter = 0;
    this.args = args;
    this.message = message;
    this.commandName = commandName;
  };
};