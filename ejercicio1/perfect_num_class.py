# -*- coding: utf-8 -*-
from math import sqrt
from  functools import reduce

class NotIntOrLong(TypeError):
    """
    Español:
     * [NotIntOrLong(TypeError) Clase de error personalizada para proporcionar una descripción de error ligeramente más informativa cuando los argumentos para los factores no son de tipo int o long]
    English:
     * [NotIntOrLong(TypeError) Custom Error class for providing slightly more informative error description when the arguments for factors aren't of type int or long]
    """
    pass

def factoring_list(list):
    """
     * [factoring_list(list) finds all of the factors of a list containing integers and returns them within a list that contains several lists of factors]
     * @param  [int or list] int_or_list [an iterable with integers, a single integer will work but a list is preferred and a warning will show if it's integer]
     * @return [2-d list]    factors [returns all the factors of the integers in the ]
    """
    try:
        pass
    except TypeError:
        # A dictionary mapping for handling what would have been a switch-case statement
        pass

def factors(n):
    """
    Español:
     * [factors(n) encuentra todos los factores de un entero]
     * @param  {[int o long]} n [un número entero al que quiere encontrarsele factores]
     * @return {[set]}        result_factors [una lista de factores para el número entero]

     Basado en respuestas de Stack Overflow por agf y Steinar Lima con licencia cc by-sa 3.0 con atribución requerida.

    ENGLISH:
     * [factors(n) finds all the factors of an integer]
     * @param  {[int or long]} n [an integer to find factors for]
     * @return {[list]}        result_factors [a list of factors for the integer]

     Based on Stack Overflow answers by agf and Steinar Lima licensed cc by-sa 3.0 with attribution required.
    """
    try:
        step = 2 if n%2 else 1
        return set(reduce(list.__add__,
                    ([i, n//i] for i in range(1, int(sqrt(n))+1, step) if n % i == 0)))
    except TypeError:
        raise NotIntOrLong("Please provide an Integer or a Long as arguments to function factors")
    except Exception:
        raise Exception("Something went wrong. Please make sure that dependencies functools.reduce and math.sqrt are imported as reduce and sqrt, respectively.")

def perfect_calculation(list):
    pass
