type Factory<T> = () => T;

export class Container {
  private singletons = new Map<string, unknown>();
  private bindings = new Map<string, Factory<unknown>>();

  bind<T>(token: string, factory: Factory<T>) {
    this.bindings.set(token, factory);
  }

  resolve<T>(token: string | (new (...args: unknown[]) => T)): T {
    const tokenName = typeof token === "string" ? token : token.name;
    if (this.singletons.has(tokenName))
      return this.singletons.get(tokenName) as T;
    const factory = this.bindings.get(tokenName) as Factory<T> | undefined;
    if (!factory) throw new Error(`No binding found for ${tokenName}`);
    const instance = factory();
    this.singletons.set(tokenName, instance);
    return instance;
  }
}

export const container = new Container();
