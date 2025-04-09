#!/usr/bin/env python3
# Test code for analyzer
# This file contains various Python patterns to test the analyzer

import math
import random
from typing import List, Dict, Tuple, Optional


def factorial(n: int) -> int:
    """
    Calculate factorial recursively
    
    Args:
        n: The number to calculate factorial for
        
    Returns:
        The factorial of n
    """
    if n <= 1:
        return 1
    return n * factorial(n - 1)


def complex_operation(a: float, b: float, operation: str) -> float:
    """
    Complex function with high cyclomatic complexity
    
    Args:
        a: First parameter
        b: Second parameter
        operation: Operation to perform
        
    Returns:
        Result of the operation
    """
    result = 0
    
    if operation == 'add':
        result = a + b
    elif operation == 'subtract':
        result = a - b
    elif operation == 'multiply':
        result = a * b
    elif operation == 'divide':
        if b == 0:
            raise ValueError('Division by zero')
        result = a / b
    elif operation == 'power':
        result = a ** b
    elif operation == 'modulo':
        result = a % b
    else:
        raise ValueError('Invalid operation')
    
    return result


class Calculator:
    """Class with methods to test object-oriented patterns"""
    
    def __init__(self):
        self.history = []
    
    def add(self, a: float, b: float) -> float:
        result = a + b
        self.history.append(f"{a} + {b} = {result}")
        return result
    
    def subtract(self, a: float, b: float) -> float:
        result = a - b
        self.history.append(f"{a} - {b} = {result}")
        return result
    
    def multiply(self, a: float, b: float) -> float:
        result = a * b
        self.history.append(f"{a} * {b} = {result}")
        return result
    
    def divide(self, a: float, b: float) -> float:
        if b == 0:
            error = 'Division by zero'
            self.history.append(f"{a} / {b} = Error: {error}")
            raise ValueError(error)
        result = a / b
        self.history.append(f"{a} / {b} = {result}")
        return result
    
    def get_history(self) -> List[str]:
        return self.history
    
    def clear_history(self) -> bool:
        self.history = []
        return True


def process_matrix(matrix: List[List[float]]) -> List[List[float]]:
    """
    Nested loops and conditionals for complexity metrics
    
    Args:
        matrix: Input matrix
        
    Returns:
        Processed matrix
    """
    rows = len(matrix)
    cols = len(matrix[0])
    result = [[0 for _ in range(cols)] for _ in range(rows)]
    
    for i in range(rows):
        for j in range(cols):
            if i == j:
                # Diagonal element
                result[i][j] = matrix[i][j] * 2
            elif i < j:
                # Upper triangle
                result[i][j] = matrix[i][j] + 10
            else:
                # Lower triangle
                result[i][j] = matrix[i][j] - 5
            
            # Additional processing based on value
            if result[i][j] > 100:
                result[i][j] = 100  # Cap at 100
            elif result[i][j] < 0:
                result[i][j] = 0  # Floor at 0
    
    return result


def complex_expression(a: float, b: float, c: float, d: float, e: float) -> float:
    """
    Function with many operators for Halstead metrics
    
    Args:
        a: First parameter
        b: Second parameter
        c: Third parameter
        d: Fourth parameter
        e: Fifth parameter
        
    Returns:
        Calculated result
    """
    result = 0
    
    # Many operators and operands
    result = (a + b) * c / (d - e) + math.sqrt(a * a + b * b) - math.pow(c, d % e)
    
    if result > 0 and a > b or c <= d and e != 0:
        result += (a + b + c) / (d * e)
    else:
        result -= (a - b - c) * (d / e)
    
    return result


if __name__ == "__main__":
    # Example usage
    print(f"Factorial of 5: {factorial(5)}")
    print(f"Complex operation (add 5, 3): {complex_operation(5, 3, 'add')}")
    
    calc = Calculator()
    print(f"Calculator add: {calc.add(10, 5)}")
    print(f"Calculator history: {calc.get_history()}")
    
    test_matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
    print(f"Processed matrix: {process_matrix(test_matrix)}")
    
    print(f"Complex expression: {complex_expression(1, 2, 3, 4, 5)}") 