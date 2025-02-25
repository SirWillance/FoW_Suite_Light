# Commenting in JavaScript vs. Python: Your Code's Inner Monologue

Comments are like little notes you leave in your code to explain what’s going on. Think of them as your code’s inner monologue, sharing secrets with other coders (and your future self). Here's how to use them in JavaScript and Python:

### JavaScript Comments: The Double Slash and Block Party

JavaScript uses two types of comments:

1.  **Single-Line Comments**: Use `//` for comments that fit on one line.

    ```javascript
    // This is a single-line comment in JavaScript
    console.log("Hello, World!"); // And this is an inline comment
    ```

---

2.  **Multi-Line Comments**: Use `/* ... */` for comments that span multiple lines. Perfect for longer explanations or when you need to tell a whole story.

    ```javascript
    /*
    This is a multi-line comment in JavaScript.
    It can span multiple lines and is useful for
    longer explanations.
    */
    console.log("Hello, World!");
    ```

### Python Comments: The Mighty Hash and Triple Quotes

Python also uses two types of comments:

1.  **Single-Line Comments**: Use `#` for comments that fit on one line. Simple and straightforward.

    ```python
    # This is a single-line comment in Python
    print("Hello, World!") # And this is an inline comment
    ```

2.  **Multi-Line Comments/Docstrings**: Use triple quotes (`""" ... """` or `''' ... '''`) for multi-line comments or docstrings. Ideal for describing functions, classes, and modules.

    ```python
    """
    This is a multi-line comment in Python.
    It is often used for docstrings to describe functions, classes, or modules.
    """
    print("Hello, World!")
    ```
    These are also frequently used for type hinting and can be used in python for code documentation with tools such as Sphinx

---

### Key Differences

*   JavaScript uses `//` and `/* ... */`, while Python uses `#` and `""" ... """`.
*   Be careful not to mix them up, or you might cause a syntax error! They don't speak the same language, so choose accordingly.


Pro Tip
Use comments to explain why your code does something, not just what it does.
Keep comments concise and relevant. Too many comments can make your code harder to read.


---


### Examples
*   How to document variables in javascript:
    ```javascript
    let myVariable = "This is my variable" // this is how you document a line
    ```
*  How to document functions in Python:
    ```python
    def myFunction(input_variable: int, text_string: str)->bool:
        """
        This is an example of docstrings
        for documenting a method or function
        
        Args:
            input_variable: an input number
            text_string: the input string
        Return:
            boolean: return of this function
        """
        if(text_string=="example"):
            return True
    ```
* How to implement type hinting in python:
```python
my_variable: str = "this is how you give type hints"


