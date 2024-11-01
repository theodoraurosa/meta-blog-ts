export class PostAlreadyExistsError extends Error {
    constructor() {
      super('Title already exists.')
    }
  }