const assert = require('assert');
const Calc = require('../calculations.js');

console.log('--- Testing calculations.js ---');

// 1. formatNaira
assert.strictEqual(Calc.formatNaira(500000), '₦500,000');
assert.strictEqual(Calc.formatNaira('500000'), '₦500,000');
assert.strictEqual(Calc.formatNaira(0), '₦0');
assert.strictEqual(Calc.formatNaira(-50), '₦-50');
assert.strictEqual(Calc.formatNaira(1234.56, true), '₦1,234.56');
assert.strictEqual(Calc.formatNaira('invalid'), '₦0');
console.log('✓ formatNaira tests passed');

// 2. parseNairaInput
assert.strictEqual(Calc.parseNairaInput('₦500,000'), 500000);
assert.strictEqual(Calc.parseNairaInput(' 1,000,000 '), 1000000);
assert.strictEqual(Calc.parseNairaInput(750000), 750000);
assert.strictEqual(Calc.parseNairaInput('-500'), 0);
assert.strictEqual(Calc.parseNairaInput('abc'), 0);
assert.strictEqual(Calc.parseNairaInput(null), 0);
console.log('✓ parseNairaInput tests passed');

// 3. Days & Weeks remaining
const baseDate = new Date(2026, 9, 13); // Oct 13, 2026
const targetDate = new Date(2026, 9, 23); // Oct 23, 2026 (10 days)
assert.strictEqual(Calc.calculateDaysRemaining(targetDate, baseDate), 10);
assert.strictEqual(Calc.calculateDaysRemaining('2026-10-23', baseDate), 10);
// Same day has no remaining calendar days
assert.strictEqual(Calc.calculateDaysRemaining(baseDate, baseDate), 0);
console.log('✓ calculateDaysRemaining tests passed');

// 4. Daily and Weekly contributions
// ₦100,000 in 10 days -> ₦10,000 / day
assert.strictEqual(Calc.calculateDailyContribution(100000, targetDate, 0, baseDate), 10000);
// If ₦20,000 already saved -> ₦80,000 / 10 = ₦8,000 / day
assert.strictEqual(Calc.calculateDailyContribution(100000, targetDate, 20000, baseDate), 8000);
// If goal reached -> 0
assert.strictEqual(Calc.calculateDailyContribution(100000, targetDate, 100000, baseDate), 0);
// Weekly contribution: 10 days = 10/7 weeks (~1.428) -> 100,000 / (10/7) = 70,000
assert(Calc.calculateWeeklyContribution(100000, targetDate, 0, baseDate) > 0);
console.log('✓ calculateDailyContribution & calculateWeeklyContribution tests passed');

// 5. Progress calculation
const p1 = Calc.calculateProgress(250000, 500000);
assert.strictEqual(p1.percent, 50);
assert.strictEqual(p1.remaining, 250000);
assert.strictEqual(p1.isComplete, false);

const p2 = Calc.calculateProgress(500000, 500000);
assert.strictEqual(p2.percent, 100);
assert.strictEqual(p2.remaining, 0);
assert.strictEqual(p2.isComplete, true);
console.log('✓ calculateProgress tests passed');

// 6. Validation
const v1 = Calc.validateGoalInput({
  name: 'New Laptop',
  targetAmount: '600000',
  targetDate: '2026-12-31',
  contributionMode: 'weekly'
});
assert.strictEqual(v1.isValid, true);
assert.strictEqual(Object.keys(v1.errors).length, 0);

// Invalid cases: blank name, zero amount, past date
const v2 = Calc.validateGoalInput({
  name: '',
  targetAmount: '0',
  targetDate: '2020-01-01',
  contributionMode: 'monthly'
});
assert.strictEqual(v2.isValid, false);
assert(v2.errors.name);
assert(v2.errors.targetAmount);
assert(v2.errors.targetDate);
assert(v2.errors.contributionMode);
console.log('✓ validateGoalInput tests passed');

console.log('ALL CALCULATION TESTS PASSED successfully! 🚀');
