// 1. What design principles does this code violate?
// Low quality abstraction and unreadable conditional.
// It hides the business rules in nested conditionals and relies on low level details like score and income thresholds.

// 2. Refactor the code to improve its design.
// name each business rule as a predicate and return the OR of the approved class.
// I would also make the policy obvious and changable.

function hasExcellentCredit(score: number): boolean {
  return score > 700;
}

function isAuthorizedMidCredit(
  score: number,
  income: number,
  authorized: boolean,
): boolean {
  return income >= 40000 && income <= 100000 && authorized && score > 500;
}

function hasHighIncome(income: number): boolean {
  return income > 100000;
}

export function isLowRiskClient(
  score: number,
  income: number,
  authorized: boolean,
): boolean {
  return (
    hasExcellentCredit(score) ||
    isAuthorizedMidCredit(score, income, authorized) ||
    hasHighIncome(income)
  );
}
