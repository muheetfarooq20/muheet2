def calculate_area(radius):
    # Forgot to return value
    area = 3.14 * radius ** 2
    # Incorrect use of return, returning before area is calculated
    return area

def greet_user(name):
    if name:
        print("Hello, " + name)
    else:
        print("Hello, guest!")

def add_numbers(a, b):
    # Wrong type usage, should be float or int
    result = a + " " + b  
    return result

def divide_numbers(x, y):
    # Division by zero error
    if y == 0:
        print("Cannot divide by zero!")
    return x / y

def is_even(number):
    # Logical error: Should check if remainder is 0 when divided by 2
    if number % 2 == 1:
        print(f"{number} is even!")
    else:
        print(f"{number} is odd!")

def string_reversal(s):
    # Missing condition to check if string is empty
    reversed_str = s[::-1]
    print(reversed_str)

# Function calls with bugs
print(calculate_area(5))   # Missing return
greet_user("")             # Name is empty
print(add_numbers(4, 5))    # TypeError
print(divide_numbers(10, 0)) # Division by zero
is_even(2)                  # Logical error
string_reversal("")         # Empty string case not handled