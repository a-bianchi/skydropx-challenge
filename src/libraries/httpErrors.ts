import { baseErrors } from './errorName';

export class HttpError extends Error {
  public status = 500;
  public code = '0001';
  public message = 'Internal_Server_Error';
  public name = 'INTERNAL_SERVER_ERROR';

  constructor(name: string) {
    super(name);
    const error = baseErrors.find((errorItem) => String(errorItem.name) === String(name));
    if (error) {
      this.code = error.code;
      this.message = error.message;
      this.name = error.name;
    } else {
      this.name = name;
    }
  }
}
export class HttpBadRequest extends HttpError {
  constructor(message: string) {
    super(message);
    this.status = 400;
  }
}

export class HttpNotFound extends HttpError {
  constructor(message: string) {
    super(message);
    this.status = 404;
  }
}

export class HttpUnauthorized extends HttpError {
  constructor(message: string) {
    super(message);
    this.status = 401;
  }
}

export class HttpForbidden extends HttpError {
  constructor(message: string) {
    super(message);
    this.status = 403;
  }
}

export class HttpConflict extends HttpError {
  constructor(message: string) {
    super(message);
    this.status = 409;
  }
}
export class HttpUnsupportedMediaType extends HttpError {
  constructor(message: string) {
    super(message);
    this.status = 415;
  }
}
