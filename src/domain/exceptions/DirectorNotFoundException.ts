export class DirectorNotFoundException extends Error {
  constructor(id: string) {
    super(`Director not found: ${id}`);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
