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

  ** [Inner workings](#inner-workings)

    *** [Json's configuration](#json-s-configuration)

    *** [Properties of the data parsing configuration object](#properties-of-the-data-parsing-configuration-object)

    *** [Properties of the React component](#properties-of-the-react-component)

    *** [Independent Highcharts components](#independent-highcharts-components)

  ** [Prerrequisites / Dependencies](#prerrequisites--dependencies)

  ** [Installing and testing](#installing-and-testing)

  ** [Deployment Notes](#deployment-notes)

  ** [Built With](#built-with)

  ** [Author](#author)

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

Single-page Website based on the React.js framework to fetch with Ajax three json files, do some data parsing, cleaning and grouping and display a Line Chart  containing dates for the x Axis, Values for the y Axis and 4 independent categories, as well as a PieChart adding all of the categories together.

#### Inner workings

The data collection logic of the json, along with the complete structure of the React application are in the file `.exercise2/src/App.js`.

The operation of the website consists of the following steps:

The React App performs its initial assembly by initializing the structure of the website with a header and the area canvas for the HighCharts graphics, which are initially displayed with a "Loading..." message.

Asynchronously a call is made to the Json files on the Logtrust-Devo AWS server. It is expected that all the promises (ES6) generated will be fulfilled and the data will be manipulated.

##### Json's configuration

For the manipulation of the data, a configuration Array `dataParsing` is passed to the App class with the data of how the data information is contained. This array contains the following structure:

dataParsing: Array to generalize the cleaning and data collection {Array with Objects}

The array contains one object for each Json file to be received

##### Properties of the data parsing configuration object

url': The link to where to look for the json

date': Object with the data to obtain the date
    key': Key of the json that stores the date
    format': Format of the date, can be'YYYYY-MM-DD' or'milliseconds'.

cat': Object with the data to obtain the category
    key': Key of the json that stores the category

value': Object with the data to obtain the value
    key': Key of the json that stores the value

All keys have a'raw' property that stores information required to clean up if there is data that needs to be processed
    raw': Object with information required to clear the date if it is stored in raw data
          isRaw': Boolean. True if the date is in raw data, otherwise false
          rawKey': Key of the json where raw data is stored
          regex': Regular expression to get the date of the data
          replaceRegex': Regular expression to replace some parameters used to isolate the variable from the raw data

Once the Json information is obtained, it is stored in the state of the React component:

##### Properties of the React component

`this.state.cleanedDataForCharts:`

Object with the dataset organized in first level by category and in second level by date

`this.state.lineChartDataArray`

Object with pairs[X-axis, Y-axis] arranged by each category to be used as input for graphing with the LineSeries component

`this.state.consolidatedData`

Boolean that determines that the data that is ready to be plotted is now clean and saved

`this.state.categoryTotals`

Sum totaling the values associated with each category

For the graphing, two different React components were prepared using React-JSX-Highcharts, which can be reviewed in the files `./exercise2/src/linechart.js` and `piechart.js`.

###### Independent Highcharts components

The goal of loading graphics from an external component would be to generalize the addition of graphics to the page as needed for a dynamic dashboard:

`LineChart`

LineChart component for loading and displaying a Highcharts linear type graph]

@param plotOptions[Options for configuring the chart with React-JSX-Highcharts settings]

@param renderSeries[Data to graph]

@param loaded[Indicates if data have been obtained (async load)]]

@param titleLabel[Title of graphic]

@param andAxisLabel[Tag for values]

@param loadingMsg[Message to be displayed during loading]

@Export PieChart[Component that loads a Highcharts line graph]

`PieChart`

PieChart component for loading and displaying a pie-type (circular or foot) Highcharts graph].

@param renderSeries Data to chart

@param loaded [Indicates if data have been obtained (async load)]]

@param titleLabel [Title of the chart]

@param axisLabel

@param loadingMsg[Message to be displayed during loading]

#### Prerrequisites / Dependencies

All specified in the ./ejercicio2/package.json file.

React.js and React-dom 16.4.2 or later (along with React-Scripts 1.1.5)  

Highcharts 6.1.1 or later

React-JSX-Highcharts 3.2.1 or later

Lodash 4.17.10 or later

#### Installing and testing

Clone the reposity locally, then run the commands below on a terminal: (make sure to install NPM first)

Change directory to the ./ejercicio2 folder

`cd ./ejercicio2`

`npm install`

This will automatically download all dependencies. After it has finished, you can get the page by running.

`npm start`

It will serve the development environment locally on `localhost:3000`. It a browser doesn't open automatically, please copy and paste that address in your preferred browser

#### Deployment Notes

To build the project, serve and test a production environment locally, with minified files, please run the following commands:

`npm install -g serve`

`npm run-script build`

`serve -s build`

The production environment with minified resources will become available on `localhost:5000`. Check that address in a web browser.

You may want to delete the service workers in a production environment for compatibility reasons with iOS devices. To do so, please delete the following lines from your `./ejercicio2/src/index.js` file

`import registerServiceWorker from './registerServiceWorker';`

`registerServiceWorker();`

#### Built With

NPM | React.js | Highcharts | React-jsx-Highcharts | Lodash | Atom Text Editor | Google Chrome DevTools

## Author

Luis J. Diaz
