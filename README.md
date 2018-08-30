# PS_LG

## Antes de Empezar

[Read in English](https://github.com/drconopoima/PS_LG/blob/master/README.en.md)

* [Ejercicio 2](https://github.com/drconopoima/PS_LG/tree/master#ejercicio-2)

  ** [Funcionamiento](https://github.com/drconopoima/PS_LG/tree/master#funcionamiento)

    *** [Configuración de los Json](https://github.com/drconopoima/PS_LG/tree/master#configuracion-de-los-json)

    *** [Propiedades del objeto de configuracion del parsing de los datos](https://github.com/drconopoima/PS_LG/tree/master#propiedades-del-objeto-de-configuracion-del-parsing-de-los-datos)

    *** [Propiedades del componente de React](https://github.com/drconopoima/PS_LG/tree/master#propiedades-del-componente-de-React)

    *** [Componentes de Highcharts independientes](https://github.com/drconopoima/PS_LG/tree/master#componentes-de-highcharts-independientes)

  ** [Dependencias / Prerrequisitos](https://github.com/drconopoima/PS_LG/tree/master#dependencias--prerrequisitos)

  ** [Instalacion y pruebas](https://github.com/drconopoima/PS_LG/tree/master#Instalacion-y-pruebas)

  ** [Implementacion](https://github.com/drconopoima/PS_LG/tree/master#implementacion)

  ** [Realizado con](https://github.com/drconopoima/PS_LG/tree/master#realizado-con)

  ** [Autor](https://github.com/drconopoima/PS_LG/tree/master#autor)

### Ejercicio 1

#### Dependencias / Prerrequisitos

Python 2.7 o superior (2.7.15 al momento de la publicación)

#### Instalación

#### Casos de Prueba de ejemplo

#### Realizado con:

[Anaconda2 v5.2](https://www.anaconda.com/download/#linux) | [Jupyter Lab](https://github.com/jupyterlab/jupyterlab) | [iPython](https://ipython.org/install.html)

### Ejercicio 2

Sitio web de una sola página basado en el framework React.js para obtener con Ajax tres archivos json, hacer algunos análisis de datos, limpieza y agrupación y mostrar un Line Chart que contiene fechas para el Eje x, valores para el Eje y 4 categorías independientes, así como un PieChart que suma todas las categorías juntas.

#### Funcionamiento

La lógica de obtención de datos de los json, junto con la estructura completa de la aplicación React están en el archivo `.ejercicio2/src/App.js`.

El funcionamiento de la página web consta de las siguientes etapas:

La App de React realiza su montaje inicial inicializando la estructura de la web con una cabecera y el área los canvas para los gráficos de HighCharts, que inicialmente se muestran con un mensaje de "Cargando...".

Asincrónicamente se realiza un llamado a los archivos Json en el servidor AWS de Logtrust-Devo. Se espera a que todas las promesas (ES6) generadas seas satisfechas y se procede a manipular la data.

##### Configuracion de los Json

Para la manipulación de la data se pasa a la clase App un Array `dataParsing` de configuración con los datos de cómo está contenida la información de la data. Este array contiene la siguiente estructura:

dataParsing: Array para generalizar la limpieza y obtención de los datos {Array con Objectos}

El array contiene un objeto por cada archivo Json a recibir

##### Propiedades del objeto de configuracion del parsing de los datos

'url': El link de donde buscar el json

'date': Objeto con los datos para obtener la fecha
    'key': Clave del json que almacena la fecha
    'format': Formato de la fecha, puede ser 'YYYY-MM-DD' o 'milliseconds'

'cat': Objeto con los datos para obtener la categoría
    'key': Clave del json que almacena la categoría

'value': Objeto con los datos para obtener el valor
    'key': Clave del json que almacena el valor

Todas las claves tienen una propiedad 'raw' que almacena información requerida para limpiar si hay datos que necesiten ser procesados
    'raw': Objeto con información requerida para limpiar la fecha si esta se almacena en datos sin procesar
          'isRaw': Boolean. True si la fecha está en datos sin procesar, de otro modo false
          'rawKey': Clave del json donde se almacenan datos sin procesar
          'regex': Expresión Regular para obtener la fecha de los datos
          'replaceRegex': Expresión regular para reemplazar algunos parámetros usados para aislar la variable de la data sin procesar

Una vez finalizada la obtención de la información de los Json, esta es almacenada en el estado del componente de React:

##### Propiedades del componente de React

`this.state.cleanedDataForCharts:`

Objeto con el conjunto de datos organizados en primer nivel por categoría y en segundo nivel por fecha

`this.state.lineChartDataArray`

Objeto con los pares [Eje X, Eje Y] organizados por cada categoría para utilizar como entrada para graficar con el componente LineSeries

`this.state.consolidatedData`

Boolean que determina que ya se ha terminado de limpiar y guardar los datos que están listos para ser graficados

`this.state.categoryTotals`

Suma totalizando los valores asociados con cada categoría

Para la gráficación, se prepararon dos componentes de React distintos mediante el uso de React-JSX-Highcharts. Estos se pueden revisar en los archivos `./ejercicio2/src/linechart.js` y `piechart.js`.

##### Componentes de Highcharts independientes

El objetivo de cargar los gráficos desde un componente externo sería generalizar la adición de gráficos a la página según sean necesarios para realizar un dashboard dinámico:

`LineChart`

Componente LineChart para cargar y mostrar un gráfico del tipo lineal de Highcharts]

@param plotOptions [Opciones para la configuración del gráfico con valores de configuración de React-JSX-Highcharts]

@param renderSeries [Datos a graficar]

@param loaded [Indica si se han obtenido los datos (carga async)]

@param titleLabel [Titulo del gráfico]

@param yAxisLabel [Etiqueta para los valores]

@param loadingMsg [Mensaje a mostrar durante la carga]

@Exporta PieChart [Componente que carga un grafico lineal de Highcharts]

`PieChart`

Componente PieChart para cargar y mostrar un gráfico de Highcharts de tipo torta (circular o pie)]

* @param renderSeries [Datos a graficar]
* @param loaded [Indica si se han obtenido los datos (carga async)]
* @param titleLabel [Titulo del gráfico]
* @param axisLabel [Etiqueta para los valores]
* @param loadingMsg [Mensaje a mostrar durante la carga]

#### Dependencias / Prerrequisitos

Todo lo especificado en el archivo./ejercicio2/package.json.

React.js y React-dom 16.4.2 o posterior (junto con React-Scripts 1.1.5)  

Highcharts 6.1.1 o posterior

React-JSX-Highcharts 3.2.1 o posterior

Lodash 4.17.10 o posterior

#### Instalacion y pruebas

Clone el repositorio localmente, luego ejecute los siguientes comandos en un terminal: (asegúrese de instalar NPM primero)

Cambiar el directorio a la carpeta./ejercicio2

`cd ./ejercicio2`

`npm install`

Esto descargará automáticamente todas las dependencias. Después de que haya terminado, usted puede obtener la página corriendo.

`npm start`

Servirá al entorno de desarrollo local en `localhost:3000`. Si un navegador no se abre automáticamente, por favor copie y pegue esa dirección en su navegador preferido.

#### Implementacion

Para implementar el proyecto, servir y probar un entorno de producción localmente, con archivos minimizados, ejecute los siguientes comandos:

`npm install -g serve`

`npm run-script build`

`serve -s build`

El entorno de producción con recursos minados estará disponible en `localhost:5000`. Compruebe esa dirección en un navegador web.

Es posible que desee eliminar a los trabajadores de servicio en un entorno de producción por razones de compatibilidad con dispositivos iOS. Para hacerlo, borre las siguientes líneas de su archivo `./ejercicio2/src/index.js`.

`import registerServiceWorker from './registerServiceWorker';`

`registerServiceWorker();`

#### Realizado con

NPM | React.js | Highcharts | React-jsx-Highcharts | Lodash | Atom Text Editor | Google Chrome DevTools

## Autor

Luis Jesús Díaz
