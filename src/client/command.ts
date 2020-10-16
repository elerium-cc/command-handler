import Context from "./context";
export interface options {
  CHANNEL_TYPES: String[];
  PERMISSIONS: String[];
};

export default class Command {
  functions: Function[] // for the middleware parts
  commandOptions: options;
  groupName?: String;
  group?: Boolean;

  constructor(callbacks: Function[], commandOptions: options, group?: boolean, groupName?: String) {
    this.functions = callbacks;
    this.commandOptions = commandOptions;
    if (group) {
      this.group = group;
      this.groupName = groupName;
    };
  }

  private getNextFunction(ctx: Context) {
    let called = false;
    return () => {
      if (called) return;
      called = !called; 
      ctx.nextCounter++;

      let nextFunction = this.functions[ctx.nextCounter]; 
      if (nextFunction) return nextFunction(ctx, this.getNextFunction(ctx));
      
      return;
    };
  };

  run(ctx: Context) {
    this.functions[0](ctx, this.getNextFunction(ctx));
  };
}