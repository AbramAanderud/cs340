import * as fs from "fs";
import * as path from "path";

export abstract class Template {
  protected dirName: string;
  protected fileRegExp: RegExp;
  protected recurse: boolean;

  protected constructor(
    dirName: string,
    filePattern: string,
    recurse: boolean = false
  ) {
    this.dirName = dirName;
    this.fileRegExp = new RegExp(filePattern);
    this.recurse = recurse;
  }

  public async run(): Promise<void> {
    await this.processDirectory(this.dirName);
    this.printFinalSummary();
  }

  private async processDirectory(filePath: string): Promise<void> {
    if (!this.isDirectory(filePath)) {
      this.handleNonDirectory(filePath);
      return;
    }

    if (!this.isReadable(filePath)) {
      this.handleUnreadableDirectory(filePath);
      return;
    }

    const files = fs.readdirSync(filePath);

    for (let file of files) {
      const fullPath = path.join(filePath, file);
      if (this.isFile(fullPath)) {
        if (this.isReadable(fullPath)) {
          await this.processFile(fullPath);
        } else {
          this.handleUnreadableFile(fullPath);
        }
      }
    }

    if (this.recurse) {
      for (let file of files) {
        const fullPath = path.join(filePath, file);
        if (this.isDirectory(fullPath)) {
          await this.processDirectory(fullPath);
        }
      }
    }
  }

  private async processFile(filePath: string): Promise<void> {
    if (this.fileRegExp.test(filePath)) {
      try {
        await this.handleFile(filePath);
      } catch (error) {
        this.handleFileError(filePath, error);
      }
    }
  }

  protected abstract handleFile(filePath: string): Promise<void>;
  protected abstract handleFileError(filePath: string, error: any): void;
  protected abstract printFinalSummary(): void;

  protected isDirectory(filePath: string): boolean {
    try {
      return fs.statSync(filePath).isDirectory();
    } catch (error) {
      return false;
    }
  }

  protected isFile(filePath: string): boolean {
    try {
      return fs.statSync(filePath).isFile();
    } catch (error) {
      return false;
    }
  }

  protected isReadable(filePath: string): boolean {
    try {
      fs.accessSync(filePath, fs.constants.R_OK);
      return true;
    } catch (error) {
      return false;
    }
  }

  protected handleNonDirectory(dirName: string): void {
    console.log(`${dirName} is not a directory`);
  }

  protected handleUnreadableDirectory(dirName: string): void {
    console.log(`Directory ${dirName} is unreadable`);
  }

  protected handleUnreadableFile(fileName: string): void {
    console.log(`File ${fileName} is unreadable`);
  }
}
