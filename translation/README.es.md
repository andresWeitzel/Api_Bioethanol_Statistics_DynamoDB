![Index app](../doc/datos/bioetanolTablas.png)

<div align="right">
  <img width="25" height="25" src="../doc/assets/icons/devops/png/aws.png" />
  <img width="25" height="25" src="../doc/assets/icons/aws/png/lambda.png" />
    <img width="27" height="27" src="../doc/assets/icons/devops/png/postman.png" />
  <img width="29" height="27" src="../doc/assets/icons/devops/png/git.png" />
  <img width="28" height="27" src="../doc/assets/icons/aws/png/api-gateway.png" />
  <img width="27" height="27" src="../doc/assets/icons/aws/png/parameter-store.png" />
  <img width="27" height="27" src="../doc/assets/icons/backend/javascript-typescript/png/nodejs.png" />
  <img width="25" height="27" src="../doc/assets/icons/aws/png/dynamo.png" />
     <img width="24" height="24" src="../doc/assets/icons/backend/javascript-typescript/png/typescript.png" />
  <img width="32" height="32" src="../doc/assets/icons/devops/png/vsc.png" />
</div> 

<br>

<br>

<div align="right">
  <a href="https://github.com/andresWeitzel/Api_Bioetanol_Estadisticas_DynamoDB_AWS/blob/master/translation/README.es.md">
    <img width="65" height="40" src="../doc/assets/translation/arg-flag.jpg" />
  </a> 
  <a href="https://github.com/andresWeitzel/Api_Bioetanol_Estadisticas_DynamoDB_AWS/blob/master/README.md">
    <img width="65" height="40" src="../doc/assets/translation/eeuu-flag.jpg" />
  </a> 
</div>

<div align="center">

# Bioetanol Estadísticas DynamoDB AWS

</div>

Api Rest para el manejo estadístico de producción y ventas de bioetanol a base de caña y maíz implementado con Api-Gateway, Nodemon, Serverless-Framework, NodeJs, DynamoDB, Systems Manager Parameter Store, Lambda entre otros. Los servicios de aws se prueban en local. El código del proyecto y la documentación de este (menos doc técnica), ha sido desarrollado/a en inglés.

*   [Reportes precios bioetanol](https://glp.se.gob.ar/biocombustible/reporte_precios_bioetanol.php)
*   [Dataset biotenanol | Datos Nacionales](https://www.datos.gob.ar/dataset/energia-estadisticas-biodiesel-bioetanol)
*   [Excel Estadisticas Secretaría de Energía](https://view.officeapps.live.com/op/view.aspx?src=http%3A%2F%2Fwww.energia.gob.ar%2Fcontenidos%2Farchivos%2FReorganizacion%2Finformacion_del_mercado%2Fmercado_hidrocarburos%2Fbio%2Festadisticas_biocombustibles.xls\&wdOrigin=BROWSELINK)
*   [Playlist prueba de funcionalidad](https://www.youtube.com/playlist?list=PLCl11UFjHurDt4nwIAFwH0FTX5hvPl5re) <a href="https://www.youtube.com/playlist?list=PLCl11UFjHurDt4nwIAFwH0FTX5hvPl5re" target="_blank"> <img src="../doc/assets/social-networks/yt.png" width="5%" height="5%" />

<br>

## Índice 📜

<details>
 <summary> Ver </summary>

 <br>

### Sección 1)  Descripción, configuración y tecnologías

*   [1.0) Descripción del Proyecto.](#10-descripción-)
*   [1.1) Ejecución del Proyecto.](#11-ejecución-del-proyecto-)
*   [1.2) Configuración del proyecto desde cero](#12-configuración-del-proyecto-desde-cero-)
*   [1.3) Tecnologías.](#13-tecnologías-)

### Sección 2) Endpoints y Ejemplos

*   [2.0) EndPoints y recursos.](#20-endpoints-y-recursos-)
*   [2.1) Ejemplos.](#21-ejemplos-)

### Sección 3) Prueba de funcionalidad y Referencias

*   [3.0) Prueba de funcionalidad.](#30-prueba-de-funcionalidad-)
*   [3.1) Referencias.](#31-referencias-)

<br>

</details>

<br>

## Sección 1) Descripción, configuración y tecnologías

### 1.0) Descripción [🔝](#índice-)

<details>
  <summary>Ver</summary>

 <br>

Api Rest para la gestión estadística de la producción y comercialización de bioetanol a base de caña y maíz. Para su arquitectura principal se cubren todas las operaciones de dynamo a través de helpers modularizados, endpoints a través de controladores, se utilizan enumerados, etc. También se aplican todas las operaciones CRUD necesarias, así como validaciones de credenciales, tokens, encabezados, cuerpo, etc. , para cada endpoint. de cada tabla. Las tablas de dynamodb involucradas son precios de bioetanol, total de bioetanol y tipos de bioetanol.
`Importante`: Hay alertas de seguridad de dependabot que se cerraron porque apuntan al complemento "serverless-dynamodb-local". No aplique parches de seguridad a ese complemento, ya que la versión `^1.0.2` tiene problemas para crear tablas y ejecutar el servicio dynamo. Se recomienda mantener la última versión estable `^0.2.40` con las alertas de seguridad generadas.

<br>

</details>

### 1.1) Ejecución del Proyecto [🔝](#índice-)

<details>
  <summary>Ver</summary>

*   Creamos un ambiente de trabajo a través de algún IDE, podemos o no crear una carpeta raíz para el proyecto, nos posicionamos en ella.

```git
cd 'nombre_proyecto'
```

*   Una vez creado un entorno de trabajo clonamos el proyecto

```git
git clone https://github.com/andresWeitzel/Api_Bioetanol_Estadisticas_DynamoDB_AWS
```

*   Nos posicionamos en el proyecto

```git
cd 'nombre_proyecto'
```

*   Instalamos la última versión LTS de [Nodejs(v18)](https://nodejs.org/en/download)
*   Instalamos Serverless Framework globalmente si aún no lo realizamos.

```git
npm install -g serverless
```

\*Verificamos la versión de Serverless instalada

```git
sls -v
```

*   Instalamos todos los paquetes necesarios

```git
npm i
```

*   `Importante`: Hay alertas de seguridad de dependabot que se cerraron porque apuntan al complemento "serverless-dynamodb-local". No aplique parches de seguridad a ese complemento, ya que la versión `^1.0.2` tiene problemas para crear tablas y ejecutar el servicio dynamo. Se recomienda mantener la última versión estable `^0.2.40` con las alertas de seguridad generadas.
*   Para simplificar, se incluye el archivo de variables ssm (serverless\_ssm.yml). Se recomienda no incluir ni cambiar credenciales, token, etc.
*   El siguiente script configurado en el package.json del proyecto es responsable de
    *   Levantar serverless ("serverless-offline")
    *   Ejecutar serverless-offline ("start")
    *   Ejecutar nodemon y serverless ("start:dev")
    *   Dar formato archivo .js y .ts con prettier ("format-prettier")
    *   Dar formato archivo .md con remark ("format-remark")
    *   etc.
    ```git
        "serverless-offline": "sls offline start",
        "start": "npm run serverless-offline",
        "start:dev": "nodemon -e js,ts,yml,json --exec \"sls offline start\"",
        "format-prettier": "prettier --write \"{src,test}/**/*.{js,ts}\"",
        "check": "remark . --quiet --frail",
        "format-remark": "remark . --quiet --frail --output",
        "format-md": "remark . --output"
    ```
    *   Ejecutamos la aplicación desde la terminal.
    ```git
    npm run start
    ```
    *   Ejecutamos la aplicación con nodemon para detectar automáticamente los cambios del servidor.

```git
npm run start:dev
```

\*`Importante`: Es posible que existan otros pasos previos que no se hayan incluido por sincronización entre documentos con relación al desarrollo. Abra un hilo de conversación dentro de la sección 'Problemas' del proyecto.

<br>

</details>

### 1.2) Configuración del proyecto desde cero [🔝](#índice-)

<details>
  <summary>Ver</summary>

 <br>

*   Creamos un entorno de trabajo a través de algún ide, podemos o no crear una carpeta raíz para el proyecto, nos posicionamos sobre la misma

```git
cd 'projectRootName'
```

*   Una vez creado un entorno de trabajo, clonamos el proyecto

```git
git clone https://github.com/andresWeitzel/Api_Bioetanol_Estadisticas_DynamoDB_AWS
```

*   Nos posicionamos sobre el proyecto

```git
cd 'projectName'
```

*   Instalamos la última versión LTS de [Nodejs(v18)](https://nodejs.org/en/download)
*   Instalamos Serverless Framework de forma global si es que aún no lo hemos realizado

```git
npm install -g serverless
```

*   Verificamos la versión de Serverless instalada

```git
sls -v
```

*   Inicializamos un template de serverles

```git
serverless create --template aws-nodejs
```

*   Inicializamos un proyecto npm

```git
npm init -y
```

*   Instalamos serverless offline

```git
npm i serverless-offline --save-dev
```

*   Agregamos el plugin dentro del serverless.yml

```yml
plugins:
  - serverless-offlline
```

*   Instalamos serverless ssm

```git
npm i serverless-offline-ssm --save-dev
```

*   Agregamos el plugin dentro del serverless.yml

```yml
plugins:
  - serverless-offlline-ssm
```

*   Instalamos el plugin para el uso de dynamodb en local (No el servicio de dynamoDB, este viene configurado en los archivos dentro de .dynamodb).
*   `Importante`: Hay alertas de seguridad de dependabot que apuntan contra el plugin "serverless-dynamodb-local". No aplicar parches de seguridad a dicho plugin, ya que la versión `^1.0.2` tiene problemas al momento de la creación de tablas y ejecución del servicio de dynamo. Se recomienda mantener la última versión estable `^0.2.40` con las alertas de seguridad generadas.

```git
npm install serverless-dynamodb-local --save-dev
```

*   Agregamos el plugin dentro del serverless.yml

```yml
plugins:
  - serverless-dynamodb-local
```

*   Instalamos el sdk client de dynamodb para las operaciones de db necesarias

```git
npm install @aws-sdk/client-dynamodb
```

*   Instalamos el sdk lib de dynamodb para las operaciones de db necesarias

```git
npm i @aws-sdk/lib-dynamodb
```

*   Modificaremos la plantilla inicial  para las configs estandarizadas.
*   Reemplazamos la plantila serverless.yml inicial por la siguiente como modelo base (cambiar nombre, etc)...

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

*   Instalamos prettier para indentaciones

```git
npm i prettier --save
```

*   Instalamos node-input-validator para para validaciones de atributos en request, objetos de clases, etc.

```git
npm i node-input-validator --save
```

*   Debemos descargar el .jar junto con su config para ejecutar el servicio de dynamodb. [Descargar aquí](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html#DynamoDBLocal.DownloadingAndRunning.title)
*   Una vez descargado el .jar en formato .tar descomprimimos y copiamos todo su contenido dentro de la carpeta `.dynamodb`.
*   Instalamos la dependencia para la ejecución de scripts en paralelo

```git
npm i --save-dev concurrently
```

*   El siguiente script configurado en el package.json del proyecto es el encargado de
    Levantar serverless-offline (serverless-offline)

```git
 "scripts": {
   "serverless-offline": "sls offline start",
   "start": "npm run serverless-offline"
 },
```

*   Ejecutamos la app desde terminal.

```git
npm start
```

*   Deberíamos esperar un output por consola con los siguiente servicios levantados cuando se ejecuta el comando anterior

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

*   Ya tenemos una app funcional con una estructura inicial definida por Serverless-Framework. La aplicación queda deployada en http://localhost:4002 y podemos testear el endpoint declarado en el serverless desde postman
*   `Aclaración` : El resto de las modificaciones aplicadas sobre la plantilla inicial no se describen por temas de simplificación de doc. Para más info consultar el tutorial de [Serverless-framework](https://www.serverless.com/) para el uso de servicios, plugins, etc.

<br>

</details>

### 1.3) Tecnologías [🔝](#índice-)

<details>
  <summary>Ver</summary>

 <br>

| **Tecnologías** | **Versión** | **Finalidad** |\
| ------------- | ------------- | ------------- |
| [SDK](https://www.serverless.com/framework/docs/guides/sdk/) | 4.3.2  | Inyección Automática de Módulos para Lambdas |
| [Serverless Framework Core v3](https://www.serverless.com//blog/serverless-framework-v3-is-live) | 3.23.0 | Core Servicios AWS |
| [Serverless Plugin](https://www.serverless.com/plugins/) | 6.2.2  | Librerías para la Definición Modular |
| [Systems Manager Parameter Store (SSM)](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) | 3.0 | Manejo de Variables de Entorno |
| [Amazon Api Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html) | 2.0 | Gestor, Autenticación, Control y Procesamiento de la Api |
| [Amazon DynamoDB](https://aws.amazon.com/es/dynamodb/) | 2017.11.29 | Servicio de base de datos NoSQL rápido y flexible para un rendimiento de milisegundos de un solo dígito a cualquier escala |
| [NodeJS](https://nodejs.org/en/) | 14.18.1  | Librería JS |
| [VSC](https://code.visualstudio.com/docs) | 1.72.2  | IDE |
| [Postman](https://www.postman.com/downloads/) | 10.11  | Cliente Http |
| [CMD](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/cmd) | 10 | Símbolo del Sistema para linea de comandos |
| [Git](https://git-scm.com/downloads) | 2.29.1  | Control de Versiones |
| Others | - | Others |

</br>

| **Plugin** | **Descripción** |\
| -------------  | ------------- |
| [Serverless Plugin](https://www.serverless.com/plugins/) | Librerías para la Definición Modular |
| [serverless-dynamodb-local](https://www.serverless.com/plugins/serverless-dynamodb-local) | Permite levantar dynamodb localmente paa serverless. |
| [serverless-offline](https://www.npmjs.com/package/serverless-offline) | Este complemento sin servidor emula AWS λ y API Gateway en entorno local |
| [serverless-offline-ssm](https://www.npmjs.com/package/serverless-offline-ssm) |  busca variables de entorno que cumplen los parámetros de SSM en el momento de la compilación y las sustituye desde un archivo  |

</br>

### Extensiones VSC Implementados.

| **Extensión** |\
| -------------  |
| Prettier - Code formatter |
| YAML - Autoformatter .yml (alt+shift+f) |
| GitLens - Tracking changes |
| Serverless Framework - Autocompleted with snippets |
| Tabnine - AI Autocomplete |
| Others |

<br>

</details>

<br>

## Sección 2) Endpoints y Ejemplos.

### 2.0) Endpoints y recursos [🔝](#índice-)

<details>
   <summary>View</summary>
<br>

### 2.0.1) Variables en Postman

| **Variable** | **Value** |
| ------------- | ------------- |
| base\_url | http://localhost:4000/dev/v1 |
| x-api-key | f98d8cd98h73s204e3456998ecl9427j |
| bearer-token | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV\_adQssw5c |

*   `Importante`: Los valores de las keys se incluten para pruebas locales.

<br>

### 2.0.2) Bioetanol\_Precios endpoints

#### GET operaciones:

*   `base_url`/bioetanol-precios/list?limit=`limitValue`\&orderAt=`orderAtValue`
*   `base_url`/bioetanol-precios/uuid/`uuidValue`
*   `base_url`/bioetanol-precios/bioetanol-cana-azucar/`bioetanolCanaAzucarValue`?limit=`limitValue`\&orderAt=`orderAtValue`
*   `base_url`/bioetanol-precios/created-at/`createdAtvalue`?limit=`limitValue`\&orderAt=`orderAtValue`
*   `base_url`/bioetanol-precios/field-type?limit=`limitValue`\&orderAt=`orderAtValue`\&fieldType=`fieldTypeValue`\&fieldValue=`fieldValueValue`
*   `base_url`/bioetanol-precios/periodo/`periodoValue`
*   `base_url`/bioetanol-precios/bioetanol-maiz/`bioetanolMaizValue`?limit=`limitValue`\&orderAt=`orderAtValue`
*   `All endpoints are optional paginated except /test, /db-connection and /id/{{user-id}}`

#### POST operaciones:

*   `base_url`/bioetanol-precios/

#### PUT operaciones:

*   `base_url`/bioetanol-precios/`uuid`

#### DELETE operaciones:

*   `base_url`/bioetanol-precios/`uuid`

<br>

### 2.0.3) Bioetanol\_Tipos endpoints

*   `Para resumir la documentación, revisar los endpoints desde la colección de postman incluida en el proyecto.`

<br>

### 2.0.4) Bioetanol\_Total endpoints

*   `Para resumir la documentación, revisar los endpoints desde la colección de postman incluida en el proyecto.`

<br>

</details>

### 2.1) Ejemplos [🔝](#índice-)

<details>
  <summary>Ver</summary>

### 2.1.0) Variables en Postman

| **Variable** | **Value** |
| ------------- | ------------- |
| base\_url | http://localhost:4000/dev/v1 |
| x-api-key | f98d8cd98h73s204e3456998ecl9427j |
| bearer-token | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV\_adQssw5c |

*   `Importante`: Los valores de las keys se incluten para pruebas locales.

<br>

### 2.1.1) Endpoints Bioetanol_Precios

### Obtener todos los items de Bioetanol-precios

#### Request (GET)

```postman
curl --location 'http://localhost:4000/dev/v1/bioetanol-precios/list?limit=3&orderAt=asc' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json'
```

#### Response (200 OK)

```json
{
    "message": [
        {
            "createdAt": "2023-11-18 21:55:01",
            "uuid": "3bfff0ca-8cba-4113-bc94-4afb6e7feb7e",
            "periodo": "2023-11",
            "bioetMaiz": "412,23",
            "bioetCanAzucar": "345,33",
            "unidadMedida": "USD/m3",
            "fuenteDatos": "Secretaría de Energía",
            "region": "Norte",
            "variacionAnual": "5.2",
            "variacionMensual": "1.8",
            "observaciones": "Precios estables en el mercado",
            "updatedAt": "2023-11-18 21:55:01"
        }
    ]
}
```

#### Response (400 Bad Request)

```json
{
    "message": "Bad request, check missing or malformed headers"
}
```

#### Response (401 Unauthorized)

```json
{
    "message": "Not authenticated, check x_api_key and Authorization"
}
```

#### Response (500 Internal Server Error)

```json
{
    "message": "An error has occurred, failed to list database objects. Check if items exists."
}
```

---

### Obtener por UUID Bioetanol-precios

#### Request (GET)

```postman
curl --location 'http://localhost:4000/dev/v1/bioetanol-precios/uuid/3f86f08e-99a6-442f-b31c-1668cbe76edb' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json'
```

#### Response (200 OK)

```json
{
    "message": {
        "createdAt": "2023-11-18 21:55:01",
        "uuid": "3bfff0ca-8cba-4113-bc94-4afb6e7feb7e",
        "periodo": "2023-11",
        "bioetMaiz": "412,23",
        "bioetCanAzucar": "345,33",
        "unidadMedida": "USD/m3",
        "fuenteDatos": "Secretaría de Energía",
        "region": "Norte",
        "variacionAnual": "5.2",
        "variacionMensual": "1.8",
        "observaciones": "Precios estables en el mercado",
        "updatedAt": "2023-11-18 21:55:01"
    }
}
```

#### Response (400 Bad Request)

```json
{
    "message": "The Bioetanol prices object with the requested id 3f86f08e-99a6-442f-b31c-1668cbe76edb is not found in the database."
}
```

#### Response (400 Bad Request - Headers)

```json
{
    "message": "Bad request, check missing or malformed headers"
}
```

#### Response (401 Unauthorized)

```json
{
    "message": "Not authenticated, check x_api_key and Authorization"
}
```

---

### Agregar item Bioetanol-precios

#### Request (POST)

```postman
curl --location 'http://localhost:4000/dev/v1/bioetanol-precios/' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json' \
--data '{
    "periodo": "2023-11",
    "bioetanol_azucar": "345,33",
    "bioetanol_maiz": "412,23",
    "unidad_medida": "USD/m3",
    "fuente_datos": "Secretaría de Energía",
    "region": "Norte",
    "variacion_anual": "5.2",
    "variacion_mensual": "1.8",
    "observaciones": "Precios estables en el mercado"
}'
```

#### Response (200 OK)

```json
{
    "message": {
        "uuid": "3bfff0ca-8cba-4113-bc94-4afb6e7feb7e",
        "periodo": "2023-11",
        "bioetCanAzucar": "345,33",
        "bioetMaiz": "412,23",
        "unidadMedida": "USD/m3",
        "fuenteDatos": "Secretaría de Energía",
        "region": "Norte",
        "variacionAnual": "5.2",
        "variacionMensual": "1.8",
        "observaciones": "Precios estables en el mercado",
        "createdAt": "2023-11-18 21:55:01",
        "updatedAt": "2023-11-18 21:55:01"
    }
}
```

#### Response (400 Bad Request)

```json
{
    "message": "Bad request, check request body attributes. Missing or incorrect"
}
```

#### Response (400 Bad Request - Headers)

```json
{
    "message": "Bad request, check missing or malformed headers"
}
```

#### Response (401 Unauthorized)

```json
{
    "message": "Not authenticated, check x_api_key and Authorization"
}
```

---

### Actualizar item Bioetanol-precios

#### Request (PUT)

```postman
curl --location --request PUT 'http://localhost:4000/dev/v1/bioetanol-precios/67ecfcf7-c338-43d8-9220-4d7b43b7e914' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json' \
--data '{
    "periodo": "2023-11",
    "bioetanol_azucar": "345,33",
    "bioetanol_maiz": "412,23",
    "unidad_medida": "USD/m3",
    "fuente_datos": "Secretaría de Energía",
    "region": "Norte",
    "variacion_anual": "5.2",
    "variacion_mensual": "1.8",
    "observaciones": "Precios estables en el mercado"
}'
```

#### Response (200 OK)

```json
{
    "message": {
        "createdAt": "2023-11-18 22:01:34",
        "periodo": "2023-11",
        "uuid": "b58fd5cb-ed0b-461c-bfea-50c240e51280",
        "bioetMaiz": "412,23",
        "bioetCanAzucar": "345,33",
        "unidadMedida": "USD/m3",
        "fuenteDatos": "Secretaría de Energía",
        "region": "Norte",
        "variacionAnual": "5.2",
        "variacionMensual": "1.8",
        "observaciones": "Precios estables en el mercado",
        "updatedAt": "2023-11-18 22:03:34"
    }
}
```

#### Response (400 Bad Request)

```json
{
    "message": "Bad request, check request body attributes for bioetanol-precios. Missing or incorrect"
}
```

#### Response (400 Bad Request - Headers)

```json
{
    "message": "Bad request, check missing or malformed headers"
}
```

#### Response (401 Unauthorized)

```json
{
    "message": "Not authenticated, check x_api_key and Authorization"
}
```

#### Response (500 Internal Server Error)

```json
{
    "message": "Internal Server Error. Unable to update object in db as failed to get a item by uuid 67ecfcf7-c338-43d8-9220-4d7b43b7e914 . Check if the item exists in the database and try again."
}
```

---

### Eliminar item Bioetanol-precios

#### Request (DELETE)

```postman
curl --location --request DELETE 'http://localhost:4000/dev/v1/bioetanol-precios/2c6d2e51-390b-4cb4-ab69-7820c632e6a4' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json'
```

#### Response (200 OK)

```json
{
    "message": "Successfully removed item based on uuid 2c6d2e51-390b-4cb4-ab69-7820c632e6a4"
}
```

#### Response (400 Bad Request - Headers)

```json
{
    "message": "Bad request, check missing or malformed headers"
}
```

#### Response (401 Unauthorized)

```json
{
    "message": "Not authenticated, check x_api_key and Authorization"
}
```

#### Response (500 Internal Server Error)

```json
{
    "message": "Unable to delete item based on uuid 2c6d2e51-390b-4cb4-ab69-7820c632e6a4"
}
```

---

### 2.1.2) Endpoints Bioetanol_Tipos

### Obtener todos los items de Bioetanol-tipos

#### Request (GET)

```postman
curl --location 'http://localhost:4000/dev/v1/bioetanol-tipos/list?limit=3&orderAt=asc' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json'
```

#### Response (200 OK)

```json
{
    "message": [
        {
            "uuid": "3bfff0ca-8cba-4113-bc94-4afb6e7feb7e",
            "tipo": "caña_azucar",
            "periodo": "2023-11",
            "produccion": "150000",
            "ventasTotales": "145000",
            "capacidadInstalada": "180000",
            "eficienciaProduccion": "85",
            "materiaPrima": "caña de azúcar",
            "ubicacion": "Norte",
            "estadoOperativo": "activo",
            "observaciones": "Producción estable",
            "createdAt": "2023-11-18 21:55:01",
            "updatedAt": "2023-11-18 21:55:01"
        }
    ]
}
```

#### Response (400 Bad Request)

```json
{
    "message": "Bad request, check missing or malformed headers"
}
```

#### Response (401 Unauthorized)

```json
{
    "message": "Not authenticated, check x_api_key and Authorization"
}
```

#### Response (500 Internal Server Error)

```json
{
    "message": "An error has occurred, failed to list database objects. Check if items exists."
}
```

---

### Obtener por UUID Bioetanol-tipos

#### Request (GET)

```postman
curl --location 'http://localhost:4000/dev/v1/bioetanol-tipos/uuid/3f86f08e-99a6-442f-b31c-1668cbe76edb' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json'
```

#### Response (200 OK)

```json
{
    "message": {
        "uuid": "3bfff0ca-8cba-4113-bc94-4afb6e7feb7e",
        "tipo": "caña_azucar",
        "periodo": "2023-11",
        "produccion": "150000",
        "ventasTotales": "145000",
        "capacidadInstalada": "180000",
        "eficienciaProduccion": "85",
        "materiaPrima": "caña de azúcar",
        "ubicacion": "Norte",
        "estadoOperativo": "activo",
        "observaciones": "Producción estable",
        "createdAt": "2023-11-18 21:55:01",
        "updatedAt": "2023-11-18 21:55:01"
    }
}
```

#### Response (400 Bad Request)

```json
{
    "message": "The Bioetanol types object with the requested id 3f86f08e-99a6-442f-b31c-1668cbe76edb is not found in the database."
}
```

#### Response (400 Bad Request - Headers)

```json
{
    "message": "Bad request, check missing or malformed headers"
}
```

#### Response (401 Unauthorized)

```json
{
    "message": "Not authenticated, check x_api_key and Authorization"
}
```

---

### Agregar item Bioetanol-tipos

#### Request (POST)

```postman
curl --location 'http://localhost:4000/dev/v1/bioetanol-tipos/' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json' \
--data '{
    "tipo": "caña_azucar",
    "periodo": "2023-11",
    "produccion": "150000",
    "ventas_totales": "145000",
    "capacidad_instalada": "180000",
    "eficiencia_produccion": "85",
    "materia_prima": "caña de azúcar",
    "ubicacion": "Norte",
    "estado_operativo": "activo",
    "observaciones": "Producción estable"
}'
```

#### Response (200 OK)

```json
{
    "message": {
        "uuid": "3bfff0ca-8cba-4113-bc94-4afb6e7feb7e",
        "tipo": "caña_azucar",
        "periodo": "2023-11",
        "produccion": "150000",
        "ventasTotales": "145000",
        "capacidadInstalada": "180000",
        "eficienciaProduccion": "85",
        "materiaPrima": "caña de azúcar",
        "ubicacion": "Norte",
        "estadoOperativo": "activo",
        "observaciones": "Producción estable",
        "createdAt": "2023-11-18 21:55:01",
        "updatedAt": "2023-11-18 21:55:01"
    }
}
```

#### Response (400 Bad Request)

```json
{
    "message": "Bad request, check request body attributes. Missing or incorrect"
}
```

#### Response (400 Bad Request - Headers)

```json
{
    "message": "Bad request, check missing or malformed headers"
}
```

#### Response (401 Unauthorized)

```json
{
    "message": "Not authenticated, check x_api_key and Authorization"
}
```

---

### Actualizar item Bioetanol-tipos

#### Request (PUT)

```postman
curl --location --request PUT 'http://localhost:4000/dev/v1/bioetanol-tipos/67ecfcf7-c338-43d8-9220-4d7b43b7e914' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json' \
--data '{
    "tipo": "caña_azucar",
    "periodo": "2023-11",
    "produccion": "160000",
    "ventas_totales": "155000",
    "capacidad_instalada": "180000",
    "eficiencia_produccion": "88",
    "materia_prima": "caña de azúcar",
    "ubicacion": "Norte",
    "estado_operativo": "activo",
    "observaciones": "Producción mejorada"
}'
```

#### Response (200 OK)

```json
{
    "message": {
        "uuid": "67ecfcf7-c338-43d8-9220-4d7b43b7e914",
        "tipo": "caña_azucar",
        "periodo": "2023-11",
        "produccion": "160000",
        "ventasTotales": "155000",
        "capacidadInstalada": "180000",
        "eficienciaProduccion": "88",
        "materiaPrima": "caña de azúcar",
        "ubicacion": "Norte",
        "estadoOperativo": "activo",
        "observaciones": "Producción mejorada",
        "createdAt": "2023-11-18 21:55:01",
        "updatedAt": "2023-11-18 22:03:34"
    }
}
```

#### Response (400 Bad Request)

```json
{
    "message": "Bad request, check request body attributes for bioetanol-tipos. Missing or incorrect"
}
```

#### Response (400 Bad Request - Headers)

```json
{
    "message": "Bad request, check missing or malformed headers"
}
```

#### Response (401 Unauthorized)

```json
{
    "message": "Not authenticated, check x_api_key and Authorization"
}
```

#### Response (500 Internal Server Error)

```json
{
    "message": "Internal Server Error. Unable to update object in db as failed to get a item by uuid 67ecfcf7-c338-43d8-9220-4d7b43b7e914 . Check if the item exists in the database and try again."
}
```

---

### Eliminar item Bioetanol-tipos

#### Request (DELETE)

```postman
curl --location --request DELETE 'http://localhost:4000/dev/v1/bioetanol-tipos/2c6d2e51-390b-4cb4-ab69-7820c632e6a4' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json'
```

#### Response (200 OK)

```json
{
    "message": "Successfully removed item based on uuid 2c6d2e51-390b-4cb4-ab69-7820c632e6a4"
}
```

#### Response (400 Bad Request - Headers)

```json
{
    "message": "Bad request, check missing or malformed headers"
}
```

#### Response (401 Unauthorized)

```json
{
    "message": "Not authenticated, check x_api_key and Authorization"
}
```

#### Response (500 Internal Server Error)

```json
{
    "message": "Unable to delete item based on uuid 2c6d2e51-390b-4cb4-ab69-7820c632e6a4"
}
```

<br>

</details>

<br>

## Sección 3) Prueba de funcionalidad y Referencias.

### 3.0) Prueba de funcionalidad [🔝](#índice-)

<details>
  <summary>Ver</summary>
<br>

<br>

</details>

### 3.1) Referencias [🔝](#índice-)

<details>
  <summary>Ver</summary>

 <br>

#### Dynamodb installation

*   [DynamoDB en local ejecutable](https://cloudkatha.com/how-to-install-dynamodb-locally-on-windows-10/#:~:text=How%20to%20Install%20DynamoDB%20Locally%20on%20Windows%2010,Use%20DynamoDB%20Locally%20to%20Create%20a%20Table%20)

#### DynamoDB teoría

*   [Guía DynamoDB](https://www.dynamodbguide.com/local-secondary-indexes/)
*   [Doc Oficial Api DynamoDB](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html#http-api-dynamo-db-create-table)
*   [Definicion de atributos](https://tipsfolder.com/range-key-dynamodb-ac5558671b26d5d7f2a34cd9b138c01e/#:~:text=The%20range%20attribute%20is%20the%20type%20key%20of,%28which%20means%20it%20can%20only%20hold%20one%20value%29.)
*   [Clave de Partición vs Ordenación](https://stackoverflow.com/questions/27329461/what-is-hash-and-range-primary-key)
*   [Expresiones de Filtros en Dynamodb](https://www.alexdebrie.com/posts/dynamodb-filter-expressions/)
*   [Ejemplos de Expresiones de Filtros en Dynamodb](https://dynobase.dev/dynamodb-filterexpression/)

#### Dynamodb operations sdk v-3

*   [Operations](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/javascript_dynamodb_code_examples.html)
*   [Operations API-REST](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html)

#### Videotutoriales

*   [Dynamodb local config](https://www.youtube.com/watch?v=-KRykmVIoV0\&t=663s)
*   [Crud Dynamodb](https://www.youtube.com/watch?v=hOcbHz4T0Eg)

#### Dynamodb examples

*   [Plugin serverless](https://www.serverless.com/plugins/serverless-dynamodb-local)
*   [Creación de varias tablas](https://stackoverflow.com/questions/47327765/creating-two-dynamodb-tables-in-serverless-yml)
*   [Ejemplo dynamodb serverless](https://github.com/serverless/examples/tree/v3/aws-node-rest-api-with-dynamodb-and-offline)
*   [Dynamodb SDK examples](https://github.com/aws-samples/aws-dynamodb-examples/tree/master/DynamoDB-SDK-Examples/node.js)
*   [CRUD Dynamodb](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html)

#### Dynamodb code

*   [Api Rest Base](https://github.com/jacksonyuan-yt/dynamodb-crud-api-gateway)

#### Herramientas

*   [Herramienta de Diseño AWS app.diagrams.net](https://app.diagrams.net/?splash=0\&libs=aws4)

#### Api Gateway

*   [Buenas Prácticas Api-Gateway](https://docs.aws.amazon.com/whitepapers/latest/best-practices-api-gateway-private-apis-integration/rest-api.html)
*   [Creación de Api-keys personalizadas](https://towardsaws.com/protect-your-apis-by-creating-api-keys-using-serverless-framework-fe662ad37447)

#### Librerías

*   [Validación de campos](https://www.npmjs.com/package/node-input-validator)
*   [Generador de uuidv4](https://www.npmjs.com/package/uuid)
*   [Us de nodemon](https://www.npmjs.com/package/nodemon)

#### Package.json

*   [Configuración de scripts en paralelo](https://stackoverflow.com/questions/30950032/how-can-i-run-multiple-npm-scripts-in-parallel)

#### Formating prettier

*   [Formatting Node.js codebase with Prettier](https://dev.to/zsevic/formatting-nodejs-codebase-with-prettier-3ghi)
*   [Set up a Node.js App with ESLint and Prettier ](https://dev.to/devland/set-up-a-nodejs-app-with-eslint-and-prettier-4i7p)

#### Formating remark-link

*   [remark-inline-links](https://github.com/remarkjs/remark-inline-links)
*   [remark-lint-list-item-indent](https://www.npmjs.com/package/remark-lint-list-item-indent)

#### Testing

*   [How to mock process env in jest](https://jestjs.io/docs/configuration#setupfiles-array)

<br>

</details>
