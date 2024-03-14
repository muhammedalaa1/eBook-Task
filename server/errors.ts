class APIError extends Error {
  statusCode: number;

  /**
   * @param {string} message
   * @param {number} statusCode
   */
  constructor(message: string, statusCode: number) {
    super(message);
    super.name = "APIError";
    this.statusCode = statusCode;
  }
}

const validationError = () => new APIError("Validation failed.", 400);

const searchError = () => new APIError("Name is required", 400);

export { APIError, validationError, searchError };
