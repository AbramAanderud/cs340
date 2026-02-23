// 1. What design principle(s) does this code violate?
// Violates the original course class which mixes domain entity with persistance.
// This violates SRP and DIP. And it weakens testabilty.

// 2. Explain how you would refactor this code to improve its design.
// Keep the couse as a pure domain model. Also move DB operations somewhere else like a repo.
// Inject a database connection so the code depends on interfaces.

export class Course {
  name: string;
  credits: number;

  constructor(name: string, credits: number) {
    this.name = name;
    this.credits = credits;
  }

  static async create(name: string, credits: number): Promise<Course> {
    // ... Code to insert a new Course object into the database ...
  }

  static async find(name: string): Promise<Course | undefined> {
    // ... Code to find a Course object in the database ...
  }

  async update(): Promise<void> {
    // ... Code to update a Course object in the database ...
  }
}
