export class UserIdentity {

  constructor(
    private readonly _email: string,
    private readonly _email_verified: boolean,
    private readonly _exp: number,
    private readonly _name: string,
  ) {}

  get email(): string {
    return this._email;
  }

  get emailVerified(): boolean {
    return this._email_verified;
  }

  get exp(): number {
    return this._exp;
  }

  get name(): string {
    return this._name;
  }
}
