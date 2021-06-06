export class User {
  constructor(
    public uid: string,
    public email: string,
    public username: string
  ) {}

  static userFromJson(data: any) {
    return new User(data['uid'], data['email'], data['username']);
  }
}
