import path from "node:path";
import fs from "node:fs";
import format from "pg-format";

const BASE_PATH = "/utkusarioglu/react-workshop/src/packages/db/src/sql";

export class SqlQueryLibrary {
  namespace: string;
  namespacePath: string;
  queries: Record<string, string> = {};

  constructor(namespace: string) {
    this.namespace = namespace;
    this.namespacePath = this.namespace;

    const namespacePath = path.join(BASE_PATH, this.namespacePath);
    const files = fs.readdirSync(namespacePath);
    files.forEach((filename) => {
      const filePath = path.join(namespacePath, filename);
      this.queries[filename.split(".")[0]] = String(fs.readFileSync(filePath));
    });
  }

  format(queryName: string, values?: unknown) {
    const template = this.queries[queryName];
    if (!template) {
      throw new Error(
        [
          `Cannot find ${queryName} at ${this.namespacePath}`,
          "\nQueries:",
          this.queries,
        ].join(""),
      );
    }
    return format(template, values);
  }
}
