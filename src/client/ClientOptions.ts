import { ClientOptions } from "discord.js";

export default interface handleOptions extends ClientOptions {
  prefix?: string
};