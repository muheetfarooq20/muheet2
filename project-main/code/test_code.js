// Test code for analyzer
// This file contains various JavaScript patterns to test the analyzer

/**
 * Calculate factorial recursively
 * @param {number} n - The number to calculate factorial for
 * @return {number} The factorial of n
 */
function factorial(n) {
  if (n <= 1) {
    return 1;
  }
  return n * factorial(n - 1);
}

/**
 * Complex function with high cyclomatic complexity
 * @param {number} a - First parameter
 * @param {number} b - Second parameter
 * @param {string} operation - Operation to perform
 * @return {number} Result of the operation
 */
function complexOperation(a, b, operation) {
  let result = 0;

  if (operation === "add") {
    result = a + b;
  } else if (operation === "subtract") {
    result = a - b;
  } else if (operation === "multiply") {
    result = a * b;
  } else if (operation === "divide") {
    if (b === 0) {
      throw new Error("Division by zero");
    }
    result = a / b;
  } else if (operation === "power") {
    result = Math.pow(a, b);
  } else if (operation === "modulo") {
    result = a % b;
  } else {
    throw new Error("Invalid operation");
  }

  return result;
}

// Class with methods to test object-oriented patterns
class Calculator {
  constructor() {
    this.history = [];
  }

  add(a, b) {
    const result = a + b;
    this.history.push(`${a} + ${b} = ${result}`);
    return result;
  }

  subtract(a, b) {
    const result = a - b;
    this.history.push(`${a} - ${b} = ${result}`);
    return result;
  }

  multiply(a, b) {
    const result = a * b;
    this.history.push(`${a} * ${b} = ${result}`);
    return result;
  }

  divide(a, b) {
    if (b === 0) {
      const error = "Division by zero";
      this.history.push(`${a} / ${b} = Error: ${error}`);
      throw new Error(error);
    }
    const result = a / b;
    this.history.push(`${a} / ${b} = ${result}`);
    return result;
  }

  getHistory() {
    return this.history;
  }

  clearHistory() {
    this.history = [];
    return true;
  }
}

// Nested loops and conditionals for complexity metrics
function processMatrix(matrix) {
  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = [];

  for (let i = 0; i < rows; i++) {
    result[i] = [];
    for (let j = 0; j < cols; j++) {
      if (i === j) {
        // Diagonal element
        result[i][j] = matrix[i][j] * 2;
      } else if (i < j) {
        // Upper triangle
        result[i][j] = matrix[i][j] + 10;
      } else {
        // Lower triangle
        result[i][j] = matrix[i][j] - 5;
      }

      // Additional processing based on value
      if (result[i][j] > 100) {
        result[i][j] = 100; // Cap at 100
      } else if (result[i][j] < 0) {
        result[i][j] = 0; // Floor at 0
      }
    }
  }

  return result;
}

// Function with many operators for Halstead metrics
function complexExpression(a, b, c, d, e) {
  let result = 0;

  // Many operators and operands
  result =
    ((a + b) * c) / (d - e) + Math.sqrt(a * a + b * b) - Math.pow(c, d % e);

  if ((result > 0 && a > b) || (c <= d && e !== 0)) {
    result += (a + b + c) / (d * e);
  } else {
    result -= (a - b - c) * (d / e);
  }

  return result;
}

// Export functions and classes
module.exports = {
  factorial,
  complexOperation,
  Calculator,
  processMatrix,
  complexExpression,
};
