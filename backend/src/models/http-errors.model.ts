class HttpError extends Error {
  constructor(message: string, errorCode: number) {
    super(message);
    this.code = errorCode;
  }

  code: number;
}

export default HttpError;
