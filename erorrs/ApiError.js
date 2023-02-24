export class ApiErorr extends Error {
  status;
  erorrs;
  constructor(message, status, erorrs = []) {
    super(message);
    this.status = status;
    this.erorrs = erorrs;
  }

  static unAuthError() {
    return new ApiErorr("Пользователь не авторизован", 401);
  }
  static badRequest(message, error = []) {
    return new ApiErorr(message, 400, error);
  }
}
