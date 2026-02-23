export abstract class Animal {
  name: string;
  trainingPriority: number;

  constructor(name: string, trainingPriority: number) {
    this.trainingPriority = trainingPriority;
    this.name = name;
  }

  static getAnimalsSorted<T extends Animal>(animalList: T[]): T[] {
    return animalList.sort((a1, a2) =>
      a1.trainingPriority < a2.trainingPriority ? -1 : 1,
    );
  }

  static getTrainingPriorityList<T extends Animal>(animalList: T[]): string {
    return animalList
      .map(
        (animal) =>
          animal.name +
          "'s training priority: " +
          animal.trainingPriority +
          "\n",
      )
      .join("");
  }
}
