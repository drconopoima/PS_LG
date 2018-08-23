# -*- coding: utf-8 -*-
from math import sqrt
from  functools import reduce

class NotIntOrLong(TypeError):
    """
    ESPAÑOL:
     * [NotIntOrLong(TypeError) Clase de error personalizada para proporcionar una descripción
        informativa cuando los argumentos para la función de obtención de factores no son de
        tipo int o long]
    ENGLISH:
     * [NotIntOrLong(TypeError) Custom error class to provide an informative description when
        the arguments for the factoring function are not of the int or long type]
    """
    pass

def factors(n):
    """
    ESPAÑOL:
     * [factors(n) encuentra todos los factores de un entero]
     * @param  {[int o long]} n [un número entero al que quiere encontrarsele factores]
     * @return {[set]}        result_factors [una lista de factores para el número entero]

     Basado en respuestas de Stack Overflow por agf y Steinar Lima bajo licencia cc by-sa 3.0
     con atribución requerida.

    ENGLISH:
     * [factors(n) finds all the factors of an integer]
     * @param  {[int or long]} n [an integer to find factors for]
     * @return {[set]}        result_factors [a set of factors for the integer]

     Based on Stack Overflow answers by agf and Steinar Lima licensed under cc by-sa 3.0 with
     attribution required.
    """
    try:
        step = 2 if n%2 else 1
        return set(reduce(list.__add__,
                ([i, n//i] for i in range(1, int(sqrt(n))+1, step) if n % i == 0)))
    except TypeError:
        raise NotIntOrLong("factors() argument must be a number of type Int or Long")
    except Exception:
        raise Exception(("Something went wrong with execution of factors(). Please "
                         "make sure that dependencies functools.reduce and math.sqrt "
                         "are imported as reduce and sqrt, respectively."))



class NotIterable(TypeError):
    """
    ESPAÑOL:
     * [NotIterable(TypeError) Clase de error personalizada para proporcionar una descripción
                               de error cuando no se suministran los argumentos como una
                               estructura iterable]
    ENGLISH:
     * [NotIterable(TypeError) Custom error class to provide an error description when
                               the arguments are not provided in an iterable structure]
    """
    pass

def factoring_list(lista):
    """
    ESPAÑOL:
     * factoring_list(lista) [Encuentra todos los factores de números enteros en una lista argumento
                             (excluyendo al propio número) y los devuelve dentro de una lista que
                             contiene varias listas de factores]
     * @param  [list]     lista       [un iterable que contiene número(s) entero(s). Se convertirá
                                      automáticamente en una lista en el momento de la ejecución.
     * @return [2-d list] factors_list [devuelve todos los factores de los números enteros como una
                                       lista de listas, excluyendo al propio número factorizado]
    ENGLISH:
     * factoring_list(lista) [Finds all factors for integers passed in the argument list (excluding
                             the number itself) and returns them within a list containing several
                             factor lists within a list that contains several lists of factors]
     * @param  [list]     lista        [an iterable type with integers. It will be automatically
                                       converted into a list on execution]
     * @return [2-d list] factors_list [returns all integer factors as a list of lists, excluding
                                       the factored number itself]
    """
    try:
        lista = list(lista) # asegurando el tipo de argumento sea una lista
    except TypeError:
        raise NotIterable(("factoring_list() arguments must be a list or another "
                           "iterable containing integers of type Int or Long."))
    factors_list = []
    for intgr in lista:
        tmp_list = list(factors(intgr))
        tmp_list.remove(intgr)
        factors_list.append(tmp_list)
    return factors_list

def perfect_calculation(lista):
    """
    ESPAÑOL:
     * perfect_calculation(lista) Retorna una lista con la suma de todos los factores de los enteros
                                  del argumento, excluyendo al propio número que fue factorizado.
     * @param [list]      lista   [un iterable que contiene número(s) entero(s). Se convertirá
                                  automáticamente en una lista en el momento de la ejecución.]
     * @return [list]     sumados [suma de los factores de los números de la lista argumento]
     ENGLISH:
      * perfect_calculation(lista) [Returns a list with the sum of all the factors of the integers of
                                   the argument, excluding the very number that was factored.]
      * @param [list]      lista   [an iterable containing integer(s). It will automatically become
                                    a list at runtime].
      * @return [list]     sumados [sum of the factors of the numbers in the list argument]
    """
    return [sum(each_factors_list) for each_factors_list in factoring_list([item for item in lista])]
