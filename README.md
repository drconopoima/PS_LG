# PS_LG

## Antes de Empezar

[Read in English](https://github.com/drconopoima/PS_LG/blob/master/README.en.md)

### Ejercicio 1

Script de clasificación de números enteros según estos números perfectos ('perfect'), números abundantes ('abundant') o números defectivos ('deficient').

`classify(integers)`

Retorna un tuple con strings categorizando cada elemento según el resultado de la comparación consigo mismo del cálculo de la suma de sus factores dividida entre 2:

`"perfect"`:  Si ambos números comparados son iguales, es un número perfecto
`"abundant"`: Si la suma de los factores dividida entre 2 es mayor al número, es un número abundante
`"deficient"`: Si la suma de los factores dividida entre 2 es menor al número, es un número defectivo

#### Dependencias / Prerrequisitos

Python 2.7 o superior (2.7.15 al momento de la publicación).
Librerias:
* Math
* collections
* functools
* sys

#### Ejecución y casos de prueba de ejemplo

En un terminal de consola de comandos ejecutar:

[console]python2 perfect_num_type.py Numeros_Separados_Por_Espacios[/console]

Ejemplo:

`python2 perfect_num_type.py 2 4 6 12 28`

Salida:
[console]classification: (2: 'deficient'),(4: 'deficient'),(6: 'perfect'),(12: 'abundant'),(28: 'perfect')[/console]

Alternativamente, puede abrir y ejecutar en ipython:

> In [1]: `%run perfect_num_type.py`

Puede luego ejecutar la función `classify(integers)` con los valores que desee clasificar introducidos en una lista o tuple

> In [2]: `classify([2,4,6,12,28])`
> Out[2]: `('deficient', 'deficient', 'perfect', 'abundant', 'perfect')`

También es posible solicitar la clasificación de un único entero int o long:

> In [2]: `classify(8128)`
> Out[2]: `('perfect')`

#### Funciones

##### factors(number):

Función que encuentra todos los factores de un entero

Entrada: number [int o long]: Un número entero al que quiere encontrarsele factores
Salida: output [set]: Un set de factores para el número de entrada

Basado en respuestas de Stack Overflow por agf y Steinar Lima bajo licencia cc by-sa 3.0 con atribución requerida.
https://stackoverflow.com/questions/6800193/what-is-the-most-efficient-way-of-finding-all-the-factors-of-a-number-in-python

##### factoring_list(integers):

Encuentra todos los factores de números enteros en los numeros contenidos en un argumento iterable (incluyendo al propio número) y los devuelve dentro de una lista que contiene sets de los factores de los enteros

Entrada: integers [tuple, list, iterable]: un iterable que contiene número(s) entero(s)
Salida: output [lista con sets]: devuelve todos los factores de los números enteros como una lista de sets, incluyendo al propio número factorizado

##### perfect_calculation(integers):

Retorna un tuple con la suma dividida entre 2 de todos los factores de los enteros del argumento, incluyendo al propio número que fue factorizado.

Entrada: integers [tuple, list, iterable]: Un iterable que contiene número(s) entero(s). Se convertirá automáticamente en un tuple en el momento de la ejecución.
Salida: output [tuple]: suma dividida entre 2 de los factores de los números de la tuple de enteros en el argumento

##### classify(integers):

Retorna un tuple con strings categorizando cada elemento según el resultado de la comparación consigo mismo del cálculo de la suma de sus factores dividida entre 2
    "perfect": Si ambos números comparados son iguales, es un número perfecto ("perfect", en inglés)
    "abundant": Si la suma de los factores dividida entre 2 es mayor al número, es un número abundante ("abundant", en inglés)
    "deficient": Si la suma de los factores dividida entre 2 es menor al número, es un número defectivo ("deficient", en inglés)

Entrada: integers [int, long, tuple, list, iterable]: Un entero o una estructura iterable que contiene número(s) entero(s).
Salida: output [tuple con strings]: Tuple que contiene strings categorizando los números según estos sean "perfect" (número perfecto), "abundant" (abundante) o "deficient" (defectivo)

#### Manejo de errores:

El error más común de la función factors(number) y de la función factoring_list(integers) es TypeError, debido a las caracteristicas específicas del argumento. Para hacer explícito el tipo de argumento requerido, los siguientes errores heredan de TypeError:

##### NotIntOrLong(TypeError):
Clase de error personalizada para proporcionar una descripción informativa cuando los argumentos para la función de obtención de factores no son de tipo int o long

##### NotIterable(TypeError):
Clase de error personalizada para proporcionar una descripción de error cuando no se suministran los argumentos como una estructura iterable

#### Realizado con:

[Anaconda2 v5.2](https://www.anaconda.com/download/#linux) | [Jupyter Lab](https://github.com/jupyterlab/jupyterlab) | [iPython](https://ipython.org/install.html)

### Ejercicio 2

#### Dependencias / Prerrequisitos

#### Instalación

#### Casos de Prueba de ejemplo

#### Implementación

#### Realizado con:

## Autor

Luis Jesús Díaz
