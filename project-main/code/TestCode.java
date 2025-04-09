/**
 * Test code for analyzer
 * This file contains various Java patterns to test the analyzer
 */
public class TestCode {

    /**
     * Calculate factorial recursively
     * @param n The number to calculate factorial for
     * @return The factorial of n
     */
    public static long factorial(int n) {
        if (n <= 1) {
            return 1;
        }
        return n * factorial(n - 1);
    }

    /**
     * Complex function with high cyclomatic complexity
     * @param a First parameter
     * @param b Second parameter
     * @param operation Operation to perform
     * @return Result of the operation
     */
    public static double complexOperation(double a, double b, String operation) {
        double result = 0;
        
        if (operation.equals("add")) {
            result = a + b;
        } else if (operation.equals("subtract")) {
            result = a - b;
        } else if (operation.equals("multiply")) {
            result = a * b;
        } else if (operation.equals("divide")) {
            if (b == 0) {
                throw new ArithmeticException("Division by zero");
            }
            result = a / b;
        } else if (operation.equals("power")) {
            result = Math.pow(a, b);
        } else if (operation.equals("modulo")) {
            result = a % b;
        } else {
            throw new IllegalArgumentException("Invalid operation");
        }
        
        return result;
    }

    /**
     * Class with methods to test object-oriented patterns
     */
    public static class Calculator {
        private java.util.ArrayList<String> history;
        
        public Calculator() {
            this.history = new java.util.ArrayList<>();
        }
        
        public double add(double a, double b) {
            double result = a + b;
            history.add(a + " + " + b + " = " + result);
            return result;
        }
        
        public double subtract(double a, double b) {
            double result = a - b;
            history.add(a + " - " + b + " = " + result);
            return result;
        }
        
        public double multiply(double a, double b) {
            double result = a * b;
            history.add(a + " * " + b + " = " + result);
            return result;
        }
        
        public double divide(double a, double b) {
            if (b == 0) {
                String error = "Division by zero";
                history.add(a + " / " + b + " = Error: " + error);
                throw new ArithmeticException(error);
            }
            double result = a / b;
            history.add(a + " / " + b + " = " + result);
            return result;
        }
        
        public java.util.ArrayList<String> getHistory() {
            return new java.util.ArrayList<>(history);
        }
        
        public boolean clearHistory() {
            history.clear();
            return true;
        }
    }

    /**
     * Nested loops and conditionals for complexity metrics
     * @param matrix Input matrix
     * @return Processed matrix
     */
    public static double[][] processMatrix(double[][] matrix) {
        int rows = matrix.length;
        int cols = matrix[0].length;
        double[][] result = new double[rows][cols];
        
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                if (i == j) {
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

    /**
     * Function with many operators for Halstead metrics
     * @param a First parameter
     * @param b Second parameter
     * @param c Third parameter
     * @param d Fourth parameter
     * @param e Fifth parameter
     * @return Calculated result
     */
    public static double complexExpression(double a, double b, double c, double d, double e) {
        double result;
        
        // Many operators and operands
        result = (a + b) * c / (d - e) + Math.sqrt(a * a + b * b) - Math.pow(c, d % e);
        
        if (result > 0 && a > b || c <= d && e != 0) {
            result += (a + b + c) / (d * e);
        } else {
            result -= (a - b - c) * (d / e);
        }
        
        return result;
    }

    public static void main(String[] args) {
        // Example usage
        System.out.println("Factorial of 5: " + factorial(5));
        System.out.println("Complex operation (add 5, 3): " + complexOperation(5, 3, "add"));
        
        Calculator calc = new Calculator();
        System.out.println("Calculator add: " + calc.add(10, 5));
        System.out.println("Calculator history: " + calc.getHistory());
        
        double[][] testMatrix = {{1, 2, 3}, {4, 5, 6}, {7, 8, 9}};
        double[][] result = processMatrix(testMatrix);
        System.out.println("Processed matrix: " + java.util.Arrays.deepToString(result));
        
        System.out.println("Complex expression: " + complexExpression(1, 2, 3, 4, 5));
    }
} 