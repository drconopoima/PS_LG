# PS_LG

## Getting Started

[Leer en español](https://github.com/drconopoima/PS_LG/blob/master/README.md)

* [Exercise 1](#exercise-1)

** [Prerrequisites / Dependencies](#prerrequisites--dependencies)

** [Execution and test cases](#execution-and-test-cases)

** [Functions](#functions)

** [Error handling](#error-handling)

** [Built with:](#built-with)

* [Exercise 2](#exercise-2)

### Exercise 1

Script for sorting integers according to these perfect numbers, abundant numbers or deficient numbers.

`classify(integers)`

Returns a tuple with strings categorizing each element according to the result of the comparison with itself of the calculation of the sum of its factors divided by 2:

`"perfect"`: If both numbers compared are the same, it's a perfect number

`"abundant"`: If the sum of the factors divided by 2 is greater than the number, it is an abundant number.

`"deficient"`: If the sum of the factors divided by 2 is lower than the number, it is a deficient number.

#### Prerrequisites / Dependencies

Python 2.7 or higher (2.7.15 on release)

Libraries:
* Math
* collections
* functools
* sys

#### Execution and test cases

On a console terminal run:

[console]python2 perfect_num_type.py Numbers_Separated_By_Spaces[/console]

For example:

`python2 perfect_num_type.py 2 4 6 12 28`

Output:

[console]classification: (2: 'deficient'),(4: 'deficient'),(6: 'perfect'),(12: 'abundant'),(28: 'perfect')[/console]

Alternatively, you can open and run on ipython:

> In [1]: `%run perfect_num_type.py`

You can then execute the function `classify(integers)` with the values you want to sort entered in a list or tuple

> In [2]: `classify([2,4,6,12,28])`

> Out[2]: `('deficient', 'deficient', 'perfect', 'abundant', 'perfect')`

También es posible solicitar la clasificación de un único entero int o long:

> In [2]: `classify(8128)`

> Out[2]: `('perfect')`

#### Functions

##### factors(number):

Function that finds all the factors of an integer

Input: number [int o long]: An integer to find factors for

Output: output [set]: A set of factors for the integer

Based on Stack Overflow answers by agf and Steinar Lima licensed under cc by-sa 3.0 with attribution required.
https://stackoverflow.com/questions/6800193/what-is-the-most-efficient-way-of-finding-all-the-factors-of-a-number-in-python

##### factoring_list(integers):

Finds all integer factors in the numbers contained in an iterable argument (including the number itself) and returns them into a list containing several sets of number factors

Input: integers [tuple, list, iterable]: An iterable type containing integer(s).

Output: output [list of sets]: Returns all integer factors as a list of sets, including the factored number itself

##### perfect_calculation(integers):

Returns a tuple with the sum of all the factors of the integers of the argument, excluding the very number that was factored.

Input: integers [tuple, list, iterable]: An iterable containing integer(s).

Output: output [tuple]: Sum divided by 2 of the factors of the numbers in the tuple argument.

##### classify(integers):

Returns a tuple with strings categorizing each element according to the result of the comparison with itself of the calculation of the sum of its factors divided by 2

    "perfect": If both numbers compared are the same, it's a perfect number

    "abundant": If the sum of the factors divided by 2 is greater than the number, it is an abundant number.

    "deficient": If the sum of the factors divided by 2 is lower than the number, it is a deficient number.

Input: integers [int, long, tuple, list, iterable]: An integer or an iterable structure containing integer(s).

Output: output [tuple of strings]: Tuple that contains strings categorising the numbers according to whether they are 'perfect', 'abundant' or 'deficient'

#### Error handling:

The most common error of the factors(number) function and the factoring_list(integers) function is TypeError, due to the specific characteristics of the argument. To make the required type of argument explicit, the following error classes are inherited from TypeError:

##### NotIntOrLong(TypeError):

Custom error class to provide an informative description when the arguments for the factoring function are not of the int or long type

##### NotIterable(TypeError):

Custom error class to provide an error description when the arguments are not provided in an iterable structure

#### Built With

[Anaconda2 v5.2](https://www.anaconda.com/download/#linux) | [Jupyter Lab](https://github.com/jupyterlab/jupyterlab) | [iPython](https://ipython.org/install.html)

### Exercise 2

#### Prerrequisites / Dependencies

#### Installing

#### Running tests

#### Deployment

#### Built With

## Authors

Luis J. Diaz
