import HTTPClient from './HTTPClient';

export default class ApiClient extends HTTPClient {
  constructor(
    baseUrl: string,
    projectKey: string,
    headers = [
      ['Authorization', 'Bearer t29PsRWgrtXw-EE426xbtbt770M-zBUv'],
      ['Content-Type', 'application/json'],
    ],
  ) {
    super({ baseUrl, projectKey, headers });
  }

  getProducts() {
    return this.get('/products');
  }
}

// Bearer "access_token" я получил через Postman. Collections > Authorization > Obtain access token.
// Без него данные не получиться выгрузить. На нем потом в дальнейшем будем завязана авторизация пользователей, как я понял.
