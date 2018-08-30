# -*- coding: utf-8 -*-
from math import sqrt
from  functools import reduce
import sys
from collections import OrderedDict

class NotIntOrLong(TypeError):
    """
    ESPAÑOL:
     * [NotIntOrLong(TypeError) Clase de error personalizada para proporcionar una descripción
                                informativa cuando los argumentos para la función de obtención
                                de factores no son de tipo int o long
    ENGLISH:
     * [NotIntOrLong(TypeError) Custom error class to provide an informative description when
                                the arguments for the factoring function are not of the int or
                                long type
    """
    pass

def factors(number):
    """
    ESPAÑOL:
     * factors(number)               Función que encuentra todos los factores de un entero
     * @param  [int o long] entrada  [un número entero al que quiere encontrarsele factores]
     * @return [set]        salida   [un set de factores para el número entero]

     Basado en respuestas de Stack Overflow por agf y Steinar Lima bajo licencia cc by-sa 3.0
     con atribución requerida.
     https://stackoverflow.com/questions/6800193/what-is-the-most-efficient-way-of-finding-all-the-factors-of-a-number-in-python

    ENGLISH:
     * factors(number)                Function that finds all the factors of an integer
     * @param  [int or long]  input   [an integer to find factors for]
     * @return [set]          output  [a set of factors for the integer]

     Based on Stack Overflow answers by agf and Steinar Lima licensed under cc by-sa 3.0 with
     attribution required.
     https://stackoverflow.com/questions/6800193/what-is-the-most-efficient-way-of-finding-all-the-factors-of-a-number-in-python
    """
    try:
        step = 2 if number%2 else 1
        return set(reduce(tuple.__add__,
                ((i, number//i) for i in range(1, int(sqrt(number))+1, step) if number % i == 0)))
    except TypeError:
        raise NotIntOrLong("factors() argument must be a number of type Int or Long")
    except Exception:
        raise Exception(("Something went wrong with execution of factors(). Please "
                        "make sure that dependencies functools.reduce and math.sqrt "
                        "are imported as reduce and sqrt, respectively."))



class NotIterable(TypeError):
    """
    ESPAÑOL:
     * NotIterable(TypeError)  Clase de error personalizada para proporcionar una descripción
                               de error cuando no se suministran los argumentos como una
                               estructura iterable
    ENGLISH:
     * NotIterable(TypeError)  Custom error class to provide an error description when
                               the arguments are not provided in an iterable structure
    """
    pass

def factoring_list(integers):
    """
    ESPAÑOL:
     * factoring_list(integers)            Encuentra todos los factores de números enteros en los
                                           numeros contenidos en un argumento iterable (incluyendo
                                           al propio número) y los devuelve dentro de una lista que
                                           contiene sets de los factores de los enteros
     * @param  [iterable]       entrada    [un iterable que contiene número(s) entero(s)]
     * @return [list of sets]   salida     [devuelve todos los factores de los números enteros como una
                                           lista de sets, incluyendo al propio número factorizado]
    ENGLISH:
     * factoring_list(integers)            Finds all integer factors in the numbers contained in an
                                           iterable argument (including the number itself) and returns
                                           them into a list containing several sets of number factors
     * @param  [iterable]      input       [an iterable type containing integer(s).]
     * @return [list of sets]  output      [returns all integer factors as a list of sets, including
                                           the factored number itself]
    """
    factors_list = []
    try:
        for intgr in integers:
            factors_list.append(factors(intgr))
        return factors_list
    except TypeError:
        raise NotIterable(("factoring_list() arguments must be a tuple or another "
                           "iterable containing integers of type Int or Long."))

def perfect_calculation(integers):
    """
    ESPAÑOL:
     * perfect_calculation(integers)    Retorna un tuple con la suma dividida entre 2 de todos los
                                        factores de los enteros del argumento, incluyendo al propio
                                        número que fue factorizado.
     * @param  [iterable] entrada       [un iterable que contiene número(s) entero(s).]
     * @return [tuple]    salida        [suma dividida entre 2 de los factores de los números de la
                                        tuple de enteros en el argumento]
     ENGLISH:
      * perfect_calculation(integers)   Returns a tuple with the sum of all the factors of the integers
                                        of the argument, excluding the very number that was factored.
      * @param  [iterable]  input       [an iterable containing integer(s).
      * @return [tuple]     output      [sum divided by 2 of the factors of the numbers in the tuple
                                        argument]
    """
    return tuple(sum(each_factors_list)/2 for each_factors_list in factoring_list(integers))

def classify(integers):
    """
    ESPAÑOL:
     * classify(integers)                     Retorna un tuple con strings categorizando cada elemento según
                                              el resultado de la comparación consigo mismo del cálculo de la
                                              suma de sus factores dividida entre 2:
                                              "perfect":   Si ambos números comparados son iguales, es un
                                                           número perfecto ("perfect", en inglés)
                                              "abundant":  Si la suma de los factores dividida entre 2 es mayor
                                                           al número, es un número abundante ("abundant", en
                                                           inglés)
                                              "deficient": Si la suma de los factores dividida entre 2 es menor
                                                           al número, es un número defectivo ("deficient", en
                                                           inglés)
     * @param  [int, long, iterable] entrada  [Un entero o una estructura iterable que contiene número(s)
                                              entero(s).]
     * @return [tuple]   output               [tuple de strings categorizando los números según estos sean
                                              "perfect" (número perfecto), "abundant" (abundante) o
                                              "deficient" (defectivo)]
     ENGLISH:
      * classify(integers)                    [Returns a tuple with strings categorizing each element
                                              according to the result of the comparison with itself of the
                                              calculation of the sum of its factors divided by 2:
                                              "perfect":   If both numbers compared are the same, it is a
                                                           perfect number.
                                              "abundant":  If the sum of the factors divided by 2 is greater
                                                           than the number, it is an abundant number.
                                              "deficient": If the sum of the factors divided by 2 is lower
                                                           than the number, it is a deficient number.
      * @param  [int, long, iterable] input   [An integer or an iterable structure containing integer(s).].
      * @return [tuple]               output  [tuple of strings categorising the numbers according to
                                              whether they are 'perfect', 'abundant' or 'deficient']
    """
    if isinstance(integers, (int, long)):
        integers = (integers,) # crear un tuple para que sea iterable
    output = []  # necesita ser una lista para agregar cada elemento por separado
    for index,factors_sum in enumerate(perfect_calculation(integers)):
        evaluate_perfection = factors_sum - integers[index]
        if evaluate_perfection == 0:
            output.append('perfect')
        elif evaluate_perfection > 0:
            output.append('abundant')
        else:
            output.append('deficient')
    return tuple(output)

if len(sys.argv) > 1:
    arguments = [int(item) for item in sys.argv[1:]]
    results_list = OrderedDict()
    classifications = classify(arguments)
    for index,numbers in enumerate(arguments):
        results_list[numbers] = classifications[index]
    print 'classification: ' + str(results_list).replace('OrderedDict','').replace('([','').replace('])','').replace(', (', ',(').replace(', ',': ')
