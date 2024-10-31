export class CategoryAlreadyExistsError extends Error {
    constructor() {
      super('Name already exists.')
    }
  }