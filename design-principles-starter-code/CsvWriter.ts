// 1. Explain why/how this program violates the Single Responsibility Principle
// The SRP is violated because of formatting rules like the escaping quoting and field joining. The output responsibilities like printing to the console
// is also mixed with the formatting responsibilities. The formatting rules are also mixed together in the same class.
// This makes the code more difficult to maintain and extend, as changes to one responsibility may affect the other responsibilities.\

// 2. Explain how you would refactor the program to improve its design.
// I would extract the csv formatting into a csv formatter. I would also inject a linewriter so csvwriter doesnt worry about output.
// So the csvwriter would do format to write and nothing else.

export class CsvWriter {
  public write(lines: string[][]) {
    for (let i = 0; i < lines.length; i++) this.writeLine(lines[i]);
  }

  private writeLine(fields: string[]) {
    if (fields.length == 0) console.log();
    else {
      this.writeField(fields[0]);

      for (let i = 1; i < fields.length; i++) {
        console.log(",");
        this.writeField(fields[i]);
      }
      console.log();
    }
  }

  private writeField(field: string) {
    if (field.indexOf(",") != -1 || field.indexOf('\"') != -1)
      this.writeQuoted(field);
    else console.log(field);
  }

  private writeQuoted(field: string) {
    console.log('\"');
    for (let i = 0; i < field.length; i++) {
      let c: string = field.charAt(i);
      if (c == '\"') console.log('""');
      else console.log(c);
    }
    console.log('\"');
  }
}
