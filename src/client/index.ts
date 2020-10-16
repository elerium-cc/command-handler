import { Client, Collection } from "discord.js";
import Command, { options as CommandOptions } from "./command";
import handlerOptions from "./ClientOptions";
import handler from "./handler";

const defaultOptions: CommandOptions =  {
  CHANNEL_TYPES: ["text", "news"],
  PERMISSIONS: []
};

export default class handlerClient extends Client {
  commands: Collection<String, Command>;
  middlewares: Function[];
  prefix: string;

  constructor(options?: handlerOptions) {
    super(options);
    this.commands = new Collection<String, Command>();
    this.middlewares = [];
    this.prefix = options?.prefix! || "!";
    handler(this);
  }

  use(middleware: Function) {
    this.middlewares.push(middleware);
  }

  command(name: String, options: CommandOptions, ...callbacks: Function[]) {
    this.commands.set(name, new Command([...this.middlewares, ...callbacks], options));
  };

  addGroup(commands: Collection<String, Command>) {
    commands.keyArray().forEach(name => {
      let command = commands.get(name);
      if (command!.group) {
        this.commands.set(name, command!);
      };
    });
  };

};

export { defaultOptions };