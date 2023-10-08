![Index app](./doc/datos/bioetanolTablas.png)


<p align="right">
    <a href="https://github.com/andresWeitzel/Api_Bioetanol_Estadisticas_DynamoDB_AWS/blob/master/translation/README.es.md" target="_blank">
      <img src="https://github.com/andresWeitzel/Api_Bioetanol_Estadisticas_DynamoDB_AWS/blob/master/doc/assets/translation/arg-flag.jpg" width="10%" height="10%" />
  </a> 
   <a href="https://github.com/andresWeitzel/Api_Bioetanol_Estadisticas_DynamoDB_AWS/blob/master/README.md" target="_blank">
      <img src="https://github.com/andresWeitzel/Api_Bioetanol_Estadisticas_DynamoDB_AWS/blob/master/doc/assets/translation/eeuu-flag.jpg" width="10%" height="10%" />
  </a> 
</p>

<br>
<br>

<div align="center">
  
# Bioetanol_Estadisticas_DynamoDB_AWS

</div>  

Api Rest para el manejo estadístico de producción y ventas de bioetanol a base de caña y maíz implementado con Api-Gateway, Nodemon, Serverless-Framework, NodeJs, DynamoDB, Systems Manager Parameter Store, Lambda entre otros. Los servicios de aws se prueban en local. El código del proyecto y la documentación de este (menos doc técnica), ha sido desarrollado/a en inglés.

* [Reportes precios bioetanol](https://glp.se.gob.ar/biocombustible/reporte_precios_bioetanol.php)
* [Dataset biotenanol | Datos Nacionales](https://www.datos.gob.ar/dataset/energia-estadisticas-biodiesel-bioetanol)
* [Excel Estadisticas Secretaría de Energía](https://view.officeapps.live.com/op/view.aspx?src=http%3A%2F%2Fwww.energia.gob.ar%2Fcontenidos%2Farchivos%2FReorganizacion%2Finformacion_del_mercado%2Fmercado_hidrocarburos%2Fbio%2Festadisticas_biocombustibles.xls&wdOrigin=BROWSELINK)



<br>

## Índice 📜

<details>
 <summary> Ver </summary>
 
 <br>
 
### Sección 1)  Descripción, configuración y tecnologías

 - [1.0) Descripción del Proyecto.](#10-descripción-)
 - [1.1) Ejecución del Proyecto.](#11-ejecución-del-proyecto-)
 - [1.2) Configuración del proyecto desde cero](#12-configuración-del-proyecto-desde-cero-)
 - [1.3) Tecnologías.](#13-tecnologías-)

### Sección 2) Endpoints y Ejemplos 
 
 - [2.0) EndPoints y recursos.](#20-endpoints-y-recursos-)
 - [2.1) Ejemplos.](#21-ejemplos-)

### Sección 3) Prueba de funcionalidad y Referencias
 
 - [3.0) Prueba de funcionalidad.](#30-prueba-de-funcionalidad-)
 - [3.1) Referencias.](#31-referencias-)



<br>

</details>



<br>

## Sección 1) Descripción, configuración y tecnologías


### 1.0) Descripción [🔝](#índice-) 

<details>
  <summary>Ver</summary>
 
 <br>

 `Importante`: Hay alertas de seguridad de dependabot que apuntan contra el plugin "serverless-dynamodb-local". No aplicar parches de seguridad a dicho plugin, ya que la versión `^1.0.2` tiene problemas al momento de la creación de tablas y ejecución del servicio de dynamo. Se recomienda mantener la última versión estable `^0.2.40` con las alertas de seguridad generadas.


<br>

</details>




### 1.1) Ejecución del Proyecto [🔝](#índice-)

<details>
  <summary>Ver</summary>
 
* Creamos un entorno de trabajo a través de algún ide, podemos o no crear una carpeta raíz para el proyecto, nos posicionamos sobre la misma
```git
cd 'projectRootName'
``` 
* Una vez creado un entorno de trabajo, clonamos el proyecto
```git
git clone https://github.com/andresWeitzel/Api_Bioetanol_Estadisticas_DynamoDB_AWS
```
* Nos posicionamos sobre el proyecto
```git
cd 'projectName'
```
* Instalamos la última versión LTS de [Nodejs(v18)](https://nodejs.org/en/download)
* Instalamos Serverless Framework de forma global si es que aún no lo hemos realizado
```git
npm install -g serverless
```
* Verificamos la versión de Serverless instalada
```git
sls -v
```
* Instalamos todos los paquetes necesarios
```git
npm i
```
* `Importante`: Hay alertas de seguridad de dependabot que apuntan contra el plugin "serverless-dynamodb-local". No aplicar parches de seguridad a dicho plugin, ya que la versión `^1.0.2` tiene problemas al momento de la creación de tablas y ejecución del servicio de dynamo. Se recomienda mantener la última versión estable `^0.2.40` con las alertas de seguridad generadas.
* Creamos un archivo para almacenar las variables ssm utilizadas en el proyecto (Más allá que sea un proyecto con fines no comerciales es una buena práctica utilizar variables de entorno).
  * Click der sobre la raíz del proyecto
  * New file
  * Creamos el archivo con el name `serverless_ssm.yml`. Este deberá estar a la misma altura que el serverless.yml
  * Añadimos las ssm necesarias dentro del archivo.
  ```git

  # AUTHENTICATION
  X_API_KEY : 'f98d8cd98h73s204e3456998ecl9427j'

  BEARER_TOKEN : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

  # API VALUES
  API_VERSION : 'v1'

  # DYNAMODB VALUES
  BIOET_PRECIOS_TABLE_NAME : 'bioetanol-precios'
  REGION : 'us-east-1'
  ACCESS_KEY_RANDOM_VALUE: 'xxxx'
  SECRET_KEY_RANDOM_VALUE: 'xxxx'
  ENDPOINT: "http://127.0.0.1:8000"

  ```
* El siguiente script configurado en el package.json del proyecto es el encargado de
   * Levantar serverless-offline (serverless-offline)
 ```git
  "scripts": {
    "serverless-offline": "sls offline start",
    "start": "npm run serverless-offline"
  },
```
* Ejecutamos la app desde terminal.
```git
npm start
```


 
<br>

</details>


### 1.2) Configuración del proyecto desde cero [🔝](#índice-)

<details>
  <summary>Ver</summary>
 
 <br>
 


* Creamos un entorno de trabajo a través de algún ide, podemos o no crear una carpeta raíz para el proyecto, nos posicionamos sobre la misma
```git
cd 'projectRootName'
``` 
* Una vez creado un entorno de trabajo, clonamos el proyecto
```git
git clone https://github.com/andresWeitzel/Api_Bioetanol_Estadisticas_DynamoDB_AWS
```
* Nos posicionamos sobre el proyecto
```git
cd 'projectName'
```
* Instalamos la última versión LTS de [Nodejs(v18)](https://nodejs.org/en/download)
* Instalamos Serverless Framework de forma global si es que aún no lo hemos realizado
```git
npm install -g serverless
```
* Verificamos la versión de Serverless instalada
```git
sls -v
```
* Inicializamos un template de serverles
```git
serverless create --template aws-nodejs
```
* Inicializamos un proyecto npm
```git
npm init -y
```
* Instalamos serverless offline 
```git
npm i serverless-offline --save-dev
```
* Agregamos el plugin dentro del serverless.yml
```yml
plugins:
  - serverless-offlline
``` 
* Instalamos serverless ssm 
```git
npm i serverless-offline-ssm --save-dev
```
* Agregamos el plugin dentro del serverless.yml
```yml
plugins:
  - serverless-offlline-ssm
```  
* Instalamos el plugin para el uso de dynamodb en local (No el servicio de dynamoDB, este viene configurado en los archivos dentro de .dynamodb).
* `Importante`: Hay alertas de seguridad de dependabot que apuntan contra el plugin "serverless-dynamodb-local". No aplicar parches de seguridad a dicho plugin, ya que la versión `^1.0.2` tiene problemas al momento de la creación de tablas y ejecución del servicio de dynamo. Se recomienda mantener la última versión estable `^0.2.40` con las alertas de seguridad generadas.
```git
npm install serverless-dynamodb-local --save-dev
```
 * Agregamos el plugin dentro del serverless.yml
```yml
plugins:
  - serverless-dynamodb-local
```
* Instalamos el sdk client de dynamodb para las operaciones de db necesarias
``` git
npm install @aws-sdk/client-dynamodb
```     
* Instalamos el sdk lib de dynamodb para las operaciones de db necesarias
``` git
npm i @aws-sdk/lib-dynamodb
```
* Modificaremos la plantilla inicial  para las configs estandarizadas.
 * Reemplazamos la plantila serverless.yml inicial por la siguiente como modelo base (cambiar nombre, etc)...
```yml

service: nombre

frameworkVersion: '3'

provider:
  name: aws
  runtime: nodejs12.x
  stage: dev
  region : us-west-1
  memorySize: 512
  timeout : 10

plugins:
    - serverless-dynamodb-local
    - serverless-offline-ssm
    - serverless-offline  

functions:
  hello:
    handler: handler.hello

custom:
  serverless-offline:
    httpPort: 4000
    lambdaPort: 4002    
  serverless-offline-ssm:
    stages:
      - dev
  dynamodb:
    stages:
      - dev
```
* Instalamos prettier para indentaciones
``` git
npm i prettier --save
```
* Instalamos node-input-validator para para validaciones de atributos en request, objetos de clases, etc.
``` git
npm i node-input-validator --save
```
* Debemos descargar el .jar junto con su config para ejecutar el servicio de dynamodb. [Descargar aquí](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html#DynamoDBLocal.DownloadingAndRunning.title)
* Una vez descargado el .jar en formato .tar descomprimimos y copiamos todo su contenido dentro de la carpeta `.dynamodb`.
* Instalamos la dependencia para la ejecución de scripts en paralelo
``` git
npm i --save-dev concurrently
``` 
* El siguiente script configurado en el package.json del proyecto es el encargado de
Levantar serverless-offline (serverless-offline)
```git
 "scripts": {
   "serverless-offline": "sls offline start",
   "start": "npm run serverless-offline"
 },
```
* Ejecutamos la app desde terminal.
```git
npm start
```
* Deberíamos esperar un output por consola con los siguiente servicios levantados cuando se ejecuta el comando anterior
```git
> crud-amazon-dynamodb-aws@1.0.0 start
> npm run serverless-offline

> crud-amazon-dynamodb-aws@1.0.0 serverless-offline
> sls offline start

serverless-offline-ssm checking serverless version 3.31.0.
Dynamodb Local Started, Visit: http://localhost:8000/shell
DynamoDB - created table xxxx

etc.....
```
* Ya tenemos una app funcional con una estructura inicial definida por Serverless-Framework. La aplicación queda deployada en http://localhost:4002 y podemos testear el endpoint declarado en el serverless desde postman
* `Aclaración` : El resto de las modificaciones aplicadas sobre la plantilla inicial no se describen por temas de simplificación de doc. Para más info consultar el tutorial de [Serverless-framework](https://www.serverless.com/) para el uso de servicios, plugins, etc.


<br>

</details>



### 1.3) Tecnologías [🔝](#índice-)

<details>
  <summary>Ver</summary>


 <br>
 
| **Tecnologías** | **Versión** | **Finalidad** |               
| ------------- | ------------- | ------------- |
| [SDK](https://www.serverless.com/framework/docs/guides/sdk/) | 4.3.2  | Inyección Automática de Módulos para Lambdas |
| [Serverless Framework Core v3](https://www.serverless.com//blog/serverless-framework-v3-is-live) | 3.23.0 | Core Servicios AWS |
| [Serverless Plugin](https://www.serverless.com/plugins/) | 6.2.2  | Librerías para la Definición Modular |
| [Systems Manager Parameter Store (SSM)](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) | 3.0 | Manejo de Variables de Entorno |
| [Amazon Api Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html) | 2.0 | Gestor, Autenticación, Control y Procesamiento de la Api | 
| [NodeJS](https://nodejs.org/en/) | 14.18.1  | Librería JS |
| [VSC](https://code.visualstudio.com/docs) | 1.72.2  | IDE |
| [Postman](https://www.postman.com/downloads/) | 10.11  | Cliente Http |
| [CMD](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/cmd) | 10 | Símbolo del Sistema para linea de comandos | 
| [Git](https://git-scm.com/downloads) | 2.29.1  | Control de Versiones |



</br>


| **Plugin** | **Descripción** |               
| -------------  | ------------- |
| [Serverless Plugin](https://www.serverless.com/plugins/) | Librerías para la Definición Modular |
| [serverless-offline](https://www.npmjs.com/package/serverless-offline) | Este complemento sin servidor emula AWS λ y API Gateway en entorno local |
| [serverless-offline-ssm](https://www.npmjs.com/package/serverless-offline-ssm) |  busca variables de entorno que cumplen los parámetros de SSM en el momento de la compilación y las sustituye desde un archivo  |





</br>

### Extensiones VSC Implementados.

| **Extensión** |              
| -------------  | 
| Prettier - Code formatter |
| YAML - Autoformatter .yml (alt+shift+f) |


<br>

</details>



<br>


## Sección 2) Endpoints y Ejemplos. 


### 2.0) Endpoints y recursos [🔝](#índice-) 

<details>
  <summary>Ver</summary>

<br>

</details>


### 2.1) Ejemplos [🔝](#índice-) 

<details>
  <summary>Ver</summary>


<br>

</details>




<br>





## Sección 3) Prueba de funcionalidad y Referencias. 


### 3.0) Prueba de funcionalidad [🔝](#índice-) 

<details>
  <summary>Ver</summary>

<br>

</details>


### 3.1) Referencias [🔝](#índice-)

<details>
  <summary>Ver</summary>
 
 <br>

#### Dynamodb installation
 * [DynamoDB en local ejecutable](https://cloudkatha.com/how-to-install-dynamodb-locally-on-windows-10/#:~:text=How%20to%20Install%20DynamoDB%20Locally%20on%20Windows%2010,Use%20DynamoDB%20Locally%20to%20Create%20a%20Table%20)

#### DynamoDB teoría
* [Guía DynamoDB](https://www.dynamodbguide.com/local-secondary-indexes/)
* [Doc Oficial Api DynamoDB](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html#http-api-dynamo-db-create-table)
* [Definicion de atributos](https://tipsfolder.com/range-key-dynamodb-ac5558671b26d5d7f2a34cd9b138c01e/#:~:text=The%20range%20attribute%20is%20the%20type%20key%20of,%28which%20means%20it%20can%20only%20hold%20one%20value%29.)
* [Clave de Partición vs Ordenación](https://stackoverflow.com/questions/27329461/what-is-hash-and-range-primary-key)
* [Expresiones de Filtros en Dynamodb](https://www.alexdebrie.com/posts/dynamodb-filter-expressions/)
* [Ejemplos de Expresiones de Filtros en Dynamodb](https://dynobase.dev/dynamodb-filterexpression/)

#### Dynamodb operations sdk v-3
* [Operations](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/javascript_dynamodb_code_examples.html)
* [Operations API-REST](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html)

#### Videotutoriales 
* [Dynamodb local config](https://www.youtube.com/watch?v=-KRykmVIoV0&t=663s)
* [Crud Dynamodb](https://www.youtube.com/watch?v=hOcbHz4T0Eg)

#### Dynamodb examples
* [Plugin serverless](https://www.serverless.com/plugins/serverless-dynamodb-local)
* [Creación de varias tablas](https://stackoverflow.com/questions/47327765/creating-two-dynamodb-tables-in-serverless-yml)
* [Ejemplo dynamodb serverless](https://github.com/serverless/examples/tree/v3/aws-node-rest-api-with-dynamodb-and-offline)
* [Dynamodb SDK examples](https://github.com/aws-samples/aws-dynamodb-examples/tree/master/DynamoDB-SDK-Examples/node.js)
* [CRUD Dynamodb](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html)

#### Dynamodb code
* [Api Rest Base](https://github.com/jacksonyuan-yt/dynamodb-crud-api-gateway)


#### Herramientas 
 * [Herramienta de Diseño AWS app.diagrams.net](https://app.diagrams.net/?splash=0&libs=aws4)

#### Api Gateway
 * [Buenas Prácticas Api-Gateway](https://docs.aws.amazon.com/whitepapers/latest/best-practices-api-gateway-private-apis-integration/rest-api.html)
 * [Creación de Api-keys personalizadas](https://towardsaws.com/protect-your-apis-by-creating-api-keys-using-serverless-framework-fe662ad37447)

 #### Librerías
 * [Validación de campos](https://www.npmjs.com/package/node-input-validator)
 * [Generador de uuidv4](https://www.npmjs.com/package/uuid)
 * [Us de nodemon](https://www.npmjs.com/package/nodemon)


 #### Package.json
 * [Configuración de scripts en paralelo](https://stackoverflow.com/questions/30950032/how-can-i-run-multiple-npm-scripts-in-parallel)

<br>

</details>




