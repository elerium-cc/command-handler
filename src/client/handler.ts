import Client from "./";
import Context from "./context";
import { CommandErrors } from "./enums";
import { PermissionString } from "discord.js";
export default (client: Client) =>  {
  let { prefix } = client;
  client.on("message", message => {
    let { channel, content, guild, member } = message;
    let args = content.split(" ");
    let commandName = args[0].substr(prefix.length, args[0].length - 1);
    let commandPrefix = args[0].substr(prefix.length - 1, prefix.length);
    let command = client.commands.get(commandName);

    if (commandPrefix == prefix) {
      args.splice(0, 1);
      const ctx = new Context(message, args, commandName);
      if (!command) return client.emit("handlerError", CommandErrors.NOT_FOUND, ctx); 
      const { commandOptions } = command!;
      const { CHANNEL_TYPES, PERMISSIONS } = commandOptions;
      
      if (PERMISSIONS.length !== 0) { 
        if (!member) return;
        try {
          member.permissions.any(PERMISSIONS as PermissionString[])
        } catch {return client.emit("handlerError", CommandErrors.INSUFFICIENT_PERMISSIONS, ctx)};
      };
      
      if (!CHANNEL_TYPES.includes(channel.type)) return client.emit("handlerError", CommandErrors.INVAILD_CHANNEL_TYPE, ctx);
      command.run(ctx);
    };
  });
};