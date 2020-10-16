import { Collection } from "discord.js";
import Command, { options as CommandOptions } from "./command";
export default class group {
  commands: Collection<String, Command>;
  middlewares: Function[];
  groupName: String;
  group: boolean;

  constructor(name: String) {
    this.commands = new Collection<String, Command>();
    this.middlewares = [];
    this.group = true;
    this.groupName = name;
  }

  use(middleware: Function) {
    this.middlewares.push(middleware);
  }

  command(name: String, options: CommandOptions, ...callbacks: Function[]) {
    this.commands.set(name, new Command([...this.middlewares, ...callbacks], options, this.group, this.groupName));
  };
}