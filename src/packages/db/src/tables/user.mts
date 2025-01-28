import { withPool } from "../db.mjs";
import { SqlQueryLibrary } from "../sql-queries.mjs";

interface UserEntity {
  id: number;
  username: string;
  password: string;
  email: string;
  first_name: string;
  last_name: string;
  creation_date: number;
}

export type UserSelectAll = Omit<UserEntity, "password">;
export type UserInsertOneParams = Pick<
  UserEntity,
  "username" | "password" | "email" | "first_name" | "last_name"
>;
export type UserInsertOneReturn = Pick<UserEntity, "id" | "creation_date">;

export class User {
  static sql = new SqlQueryLibrary("user");

  static async selectAll() {
    const query = this.sql.format("select-all");
    return withPool((c) => c.query<UserSelectAll>(query));
  }

  static async insertOne({
    username,
    password,
    email,
    first_name,
    last_name,
  }: UserInsertOneParams) {
    const query = this.sql.format("insert-one", [
      username,
      password,
      email,
      first_name,
      last_name,
    ]);
    console.log("QUERY", query);
    return withPool((c) => c.query<UserInsertOneReturn>(query));
  }
}
