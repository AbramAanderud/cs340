
// 1. Explain how this program violates the High-Quality Abstraction principle.
// Retirement calculator relies on the raw dtes and low level math which mixes business rules with time calculations.
// Employee exposes raw public fields so they can be mutated by outside things. 

// 2. Explain how you would refactor the code to improve its design.
// I would create employment dates inside employee with getters.
// I would Introduce an employment period object with safe computations.
// I would keep retirement calculator forcused on business rules and inject the employment period to it.
//  This way the retirement calculator can be tested without worrying about date math and the employee class can be tested without worrying about retirement rules.

class Employee {
	public employmentStartDate: Date;
	public employmentEndDate: Date;
}

class RetirementCalculator {
	private employee: Employee;

	public constructor(emp: Employee) {
		this.employee = emp;
	}

	public calculateRetirement(payPeriodStart: Date, payPeriodEnd: Date): number { … }

	private getTotalYearsOfService(startDate: Date, endDate: Date): number { … }

	private getMonthsInLastPosition(startDate: Date, endDate: Date): number { … }
	
    ...
}
