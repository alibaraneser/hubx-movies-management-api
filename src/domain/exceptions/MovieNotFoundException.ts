export class MovieNotFoundException extends Error {
  constructor(id: string) {
    super(`Movie not found: ${id}`);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
