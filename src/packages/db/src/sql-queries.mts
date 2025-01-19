import path from "node:path";
import fs from "node:fs";
import format from "pg-format";

export class SqlQueryLibrary {
  namespace: string;
  namespacePath: string;
  queries: Record<string, string> = {};

  constructor(namespace: string) {
    this.namespace = namespace;
    this.namespacePath = this.namespace;

    const files = fs.readdirSync(this.namespacePath);
    files.forEach((filename) => {
      this.queries[filename.split(".")[0]] = String(
        fs.readFileSync(path.join(this.namespacePath, filename)),
      );
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
