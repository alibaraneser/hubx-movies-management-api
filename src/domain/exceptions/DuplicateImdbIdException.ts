export class DuplicateImdbIdException extends Error {
  constructor(imdbId: string) {
    super(`Duplicate IMDB ID: ${imdbId}`);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
