import Context from "./context";
import Client, { defaultOptions } from "./";
import { MessageEmbed, ColorResolvable } from "discord.js";

export interface embedOptions {
  title: String;
  color: Number;
}


export default (client: Client, options: embedOptions) => {
  client.command("help", defaultOptions, (ctx: Context) => {
    let { message, args } = ctx;
    let commands: String[] = [];
    let embed = new MessageEmbed();
    embed.setColor(<ColorResolvable>options.color);
    embed.setTitle(options.title);
    client.commands.keyArray().forEach((name: String) => {
      let command = client.commands.get(name);
      if (command!.group && !args[0]) {
        let name = `\`${client.prefix}help ${command!.groupName}\``;
        if (commands.includes(name)) return;
        commands.push(name);
      } else {
        if (args[0] && command!.groupName !== args[0]) return;
        commands.push(`\`${name}\``);
      };
    });
    if (commands.length > 0) {
      embed.setDescription(commands.join(", "));
      message.channel.send(embed);
    };
  });
};