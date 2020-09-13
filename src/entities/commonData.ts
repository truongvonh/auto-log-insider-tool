interface ITokenPayload {
  client_id: string,
  sub: string,
  fullName: string,
  email: string,
}

export interface IToken {
  payload: ITokenPayload;
}