import Client, { defaultOptions } from "./client";
import { CommandErrors } from "./client/enums";
import Context from "./client/context";
import group from "./client/group";
import helpCommand from "./client/help";
const testGroup = new group("testgroup");

testGroup.command("test", defaultOptions, (ctx: Context) => {
  let { message } = ctx;
  message.channel.send("A command in a group works :D")
});

const client = new Client();
client.addGroup(testGroup.commands);

client.on("handlerError", (error: CommandErrors, ctx: Context) => {
  let { message } = ctx;
  switch (error) {
    case CommandErrors.NOT_FOUND:
      message.channel.send("command was not found");
      break;
    case CommandErrors.INSUFFICIENT_PERMISSIONS:
      message.channel.send("INSUFFICIENT_PERMISSIONS");
      break
  }
});

client.command("ping", defaultOptions, (ctx: Context) => {
  let { message } = ctx;
  message.channel.send("Pong!");
});

helpCommand(client, {
  title: "commands",
  color: 0x0000FF
});

client.login("token");

console.log("done!");