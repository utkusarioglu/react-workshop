import { withPool } from "../db.mjs";
import { Log } from "@react-workshop/decorators";
import { SqlQueryLibrary } from "../sql-queries.mjs";

export interface Message {
  id: number;
  message: string;
  timestamp: string;
}

export class Messages {
  static sql = new SqlQueryLibrary(
    "/utkusarioglu/react-workshop/src/packages/db/src/sql/messages",
  );

  @Log
  static async create() {
    const query = this.sql.format("create-table");
    return withPool((client) => {
      return client.query(query);
    });
  }

  @Log
  static async select() {
    const query = this.sql.format("select");
    return withPool<Message[]>(async (client) => {
      const response = await client.query(query);
      return response.rows;
    });
  }

  @Log
  static async insert(message: string) {
    const query = this.sql.format("insert", [[message]]);
    return withPool<Message[]>(async (client) => {
      const response = await client.query(query);
      return response.rows;
    });
  }
}

await Messages.create();
