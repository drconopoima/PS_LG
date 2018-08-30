# PS_LG

## Getting Started

[Leer en español](https://github.com/drconopoima/PS_LG/blob/master/README.md)

* [Exercise 1](https://github.com/drconopoima/PS_LG/tree/master/README.en.md#exercise-2)
** [Inner workings](https://github.com/drconopoima/PS_LG/tree/master/README.en.md#inner-workings)
*** [Json's configuration](https://github.com/drconopoima/PS_LG/tree/master/README.en.md#json-s-configuration)
*** [Properties of the data parsing configuration object](https://github.com/drconopoima/PS_LG/tree/master/README.en.md#properties-of-the-data-parsing-configuration-object)
*** [Properties of the React component](https://github.com/drconopoima/PS_LG/tree/master/README.en.md#properties-of-the-react-component)
*** [Independent Highcharts components](https://github.com/drconopoima/PS_LG/tree/master/README.en.md#independent-highcharts-components)
** [Prerrequisites / Dependencies](https://github.com/drconopoima/PS_LG/tree/master/README.en.md#prerrequisites--dependencies)
** [Installing and testing](https://github.com/drconopoima/PS_LG/tree/master/README.en.md#installing-and-testing)
** [Deployment Notes](https://github.com/drconopoima/PS_LG/tree/master/README.en.md#deployment-notes)
** [Built With](https://github.com/drconopoima/PS_LG/tree/master/README.en.md#built-with)
** [Author](https://github.com/drconopoima/PS_LG/tree/master/README.en.md#author)


### Exercise 1

#### Prerrequisites / Dependencies

Python 2.7 or higher (2.7.15 on release)

#### Installing

#### Running tests

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
