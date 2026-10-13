/**
 * NairaStreak Labs — Calculation Engine & Monetary Safety Utilities
 * Single Source of Truth for savings formulas, dates, and money handling.
 */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.NairaStreakCalc = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /**
   * Formats a numeric amount in Nigerian Naira (₦).
   * @param {number|string} amount
   * @param {boolean} includeDecimals
   * @returns {string}
   */
  function formatNaira(amount, includeDecimals = false) {
    const num = Number(amount);
    if (isNaN(num)) return '₦0';
    if (includeDecimals) {
      return '₦' + num.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return '₦' + Math.round(num).toLocaleString('en-NG');
  }

  /**
   * Parses user input string into clean numeric Naira amount.
   * Strips symbols, commas, spaces.
   * @param {string|number} input
   * @returns {number}
   */
  function parseNairaInput(input) {
    if (typeof input === 'number') return isFinite(input) && input > 0 ? input : 0;
    if (!input || typeof input !== 'string') return 0;
    const cleaned = input.replace(/[₦,\s]/g, '');
    const parsed = parseFloat(cleaned);
    return isFinite(parsed) && parsed > 0 ? parsed : 0;
  }

  /**
   * Normalizes a date to midnight UTC/local start-of-day.
   * @param {string|Date} dateVal
   * @returns {Date}
   */
  function normalizeDate(dateVal) {
    if (!dateVal) return new Date();
    if (typeof dateVal === 'string') {
      // YYYY-MM-DD string parsing without timezone shift
      const parts = dateVal.split('-');
      if (parts.length === 3) {
        return new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      }
    }
    const d = new Date(dateVal);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  /**
   * Calculates the number of days remaining until target date.
   * Always at least 1 day to prevent division by zero.
   * @param {string|Date} targetDate
   * @param {string|Date} [fromDate]
   * @returns {number}
   */
  function calculateDaysRemaining(targetDate, fromDate = new Date()) {
    const target = normalizeDate(targetDate);
    const start = normalizeDate(fromDate);
    const diffMs = target.getTime() - start.getTime();
    const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
    return Math.max(1, days);
  }

  /**
   * Calculates weeks remaining until target date.
   * @param {string|Date} targetDate
   * @param {string|Date} [fromDate]
   * @returns {number}
   */
  function calculateWeeksRemaining(targetDate, fromDate = new Date()) {
    const days = calculateDaysRemaining(targetDate, fromDate);
    return Math.max(1, Math.round((days / 7) * 10) / 10);
  }

  /**
   * Calculates recommended daily contribution to reach goal.
   * @param {number} targetAmount
   * @param {string|Date} targetDate
   * @param {number} [currentSaved=0]
   * @param {string|Date} [fromDate]
   * @returns {number}
   */
  function calculateDailyContribution(targetAmount, targetDate, currentSaved = 0, fromDate = new Date()) {
    const target = parseNairaInput(targetAmount);
    const saved = parseNairaInput(currentSaved);
    const remaining = Math.max(0, target - saved);
    if (remaining <= 0) return 0;
    const days = calculateDaysRemaining(targetDate, fromDate);
    return Math.ceil(remaining / days);
  }

  /**
   * Calculates recommended weekly contribution to reach goal.
   * @param {number} targetAmount
   * @param {string|Date} targetDate
   * @param {number} [currentSaved=0]
   * @param {string|Date} [fromDate]
   * @returns {number}
   */
  function calculateWeeklyContribution(targetAmount, targetDate, currentSaved = 0, fromDate = new Date()) {
    const target = parseNairaInput(targetAmount);
    const saved = parseNairaInput(currentSaved);
    const remaining = Math.max(0, target - saved);
    if (remaining <= 0) return 0;
    const days = calculateDaysRemaining(targetDate, fromDate);
    const weeks = Math.max(1, days / 7);
    return Math.ceil(remaining / weeks);
  }

  /**
   * Calculates approximate monthly equivalent for a target.
   * @param {number} targetAmount
   * @param {string|Date} targetDate
   * @param {number} [currentSaved=0]
   * @param {string|Date} [fromDate]
   * @returns {number}
   */
  function calculateMonthlyEquivalent(targetAmount, targetDate, currentSaved = 0, fromDate = new Date()) {
    const target = parseNairaInput(targetAmount);
    const saved = parseNairaInput(currentSaved);
    const remaining = Math.max(0, target - saved);
    if (remaining <= 0) return 0;
    const days = calculateDaysRemaining(targetDate, fromDate);
    const months = Math.max(1, days / 30.416);
    return Math.ceil(remaining / months);
  }

  /**
   * Calculates percentage progress towards goal (0 to 100).
   * @param {number} currentSaved
   * @param {number} targetAmount
   * @returns {{ percent: number, remaining: number, isComplete: boolean }}
   */
  function calculateProgress(currentSaved, targetAmount) {
    const target = parseNairaInput(targetAmount);
    const saved = parseNairaInput(currentSaved);
    if (target <= 0) return { percent: 0, remaining: 0, isComplete: false };
    const rawPct = (saved / target) * 100;
    const percent = Math.min(100, Math.max(0, Math.round(rawPct * 10) / 10));
    const remaining = Math.max(0, target - saved);
    return {
      percent,
      remaining,
      isComplete: saved >= target
    };
  }

  /**
   * Validates a goal configuration object.
   * @param {Object} goal
   * @param {string} goal.name
   * @param {number|string} goal.targetAmount
   * @param {string} goal.targetDate
   * @param {string} goal.contributionMode
   * @returns {{ isValid: boolean, errors: Object }}
   */
  function validateGoalInput({ name, targetAmount, targetDate, contributionMode }) {
    const errors = {};

    // 1. Name validation
    if (!name || typeof name !== 'string' || !name.trim()) {
      errors.name = 'Please provide a name for your savings goal.';
    } else if (name.trim().length > 60) {
      errors.name = 'Goal name should be 60 characters or less.';
    }

    // 2. Amount validation
    const parsedAmount = parseNairaInput(targetAmount);
    if (!parsedAmount || parsedAmount <= 0) {
      errors.targetAmount = 'Target amount must be greater than ₦0.';
    } else if (parsedAmount > 1000000000) { // ₦1 Billion safety cap
      errors.targetAmount = 'Target amount cannot exceed ₦1,000,000,000.';
    }

    // 3. Target date validation
    if (!targetDate) {
      errors.targetDate = 'Please select a target deadline date.';
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const target = normalizeDate(targetDate);
      if (isNaN(target.getTime())) {
        errors.targetDate = 'Please enter a valid target date.';
      } else if (target <= today) {
        errors.targetDate = 'Target date must be in the future.';
      }
    }

    // 4. Contribution mode
    if (contributionMode && !['daily', 'weekly'].includes(contributionMode)) {
      errors.contributionMode = 'Contribution mode must be either daily or weekly.';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  }

  return {
    formatNaira,
    parseNairaInput,
    normalizeDate,
    calculateDaysRemaining,
    calculateWeeksRemaining,
    calculateDailyContribution,
    calculateWeeklyContribution,
    calculateMonthlyEquivalent,
    calculateProgress,
    validateGoalInput
  };
});
