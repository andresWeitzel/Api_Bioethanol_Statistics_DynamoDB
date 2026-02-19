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

<br>

<br>

<div align="center">

# Bioetanol Estadísticas DynamoDB AWS ![(status-completed)](../doc/assets/icons/badges/status-completed.svg)

</div>

Api Rest para el manejo estadístico de producción y ventas de bioetanol a base de caña y maíz implementado con Api-Gateway, Nodemon, Serverless-Framework, NodeJs, DynamoDB, Systems Manager Parameter Store, Lambda entre otros. Los servicios de aws se prueban en local. El código del proyecto y la documentación de este (menos doc técnica), ha sido desarrollado/a en inglés.

*   [Postman Collection](../postman/collection/Api_Bioetanol_Dynamo_AWS.postman_collection.json) 
*   [Playlist prueba de funcionalidad](https://www.youtube.com/playlist?list=PLCl11UFjHurDt4nwIAFwH0FTX5hvPl5re) <a href="https://www.youtube.com/playlist?list=PLCl11UFjHurDt4nwIAFwH0FTX5hvPl5re" target="_blank"> <img src="../doc/assets/social-networks/yt.png" width="25" height="15" />

<br>

## Índice 📜

<details>
 <summary> Ver detalles </summary>

<div align="right">

`Última actualización: 19/02/26` 

</div>

### Sección 1)  Descripción, configuración y tecnologías

*   [1.0) Descripción del Proyecto.](#10-descripción-)
*   [1.1) Ejecución del Proyecto.](#11-ejecución-del-proyecto-)
*   [1.2) Configuración del proyecto desde cero](#12-configuración-del-proyecto-desde-cero-)
*   [1.3) Tecnologías.](#13-tecnologías-)

### Sección 2) Endpoints y Ejemplos

*   [2.0) EndPoints y recursos.](#20-endpoints-y-recursos-)
*   [2.1) Ejemplos.](#21-ejemplos-)

### Sección 3) Pruebas de Funcionalidad y Referencias

*   [3.0) Prueba de funcionalidad.](#30-prueba-de-funcionalidad-)
*   [3.1) Referencias.](#31-referencias-)

<br>

</details>

<br>

## Sección 1) Descripción, configuración y tecnologías

### 1.0) Descripción [🔝](#índice-)

<details>
  <summary>Ver detalles</summary>

 <br>

Api Rest para la gestión estadística de la producción y comercialización de bioetanol a base de caña y maíz. Para su arquitectura principal se cubren todas las operaciones de dynamo a través de helpers modularizados, endpoints a través de controladores, se utilizan enumerados, etc. También se aplican todas las operaciones CRUD necesarias, así como validaciones de credenciales, tokens, encabezados, cuerpo, etc. , para cada endpoint. de cada tabla. Las tablas de dynamodb involucradas son precios de bioetanol, total de bioetanol y tipos de bioetanol.
`Importante`: Hay alertas de seguridad de dependabot que se cerraron porque apuntan al complemento "serverless-dynamodb-local". No aplique parches de seguridad a ese complemento, ya que la versión `^1.0.2` tiene problemas para crear tablas y ejecutar el servicio dynamo. Se recomienda mantener la última versión estable `^0.2.40` con las alertas de seguridad generadas.

<br>

</details>

### 1.1) Ejecución del Proyecto [🔝](#índice-)

<details>
  <summary>Ver detalles</summary>

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
*   Instalamos el Serverless Framework globalmente si aún no lo hemos hecho. Recomiendo la version tres ya que es gratuita y no nos pide credenciales. Se puede usar la última version (cuatro) sin problemas, aunque es de pago.

```git
npm install -g serverless@3
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
  <summary>Ver detalles</summary>

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
  <summary>Ver detalles</summary>

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
   <summary>Ver detalles</summary>
<br>

### 2.0.1) Variables en Postman

| **Variable** | **Value** |
| ------------- | ------------- |
| base\_url | http://localhost:4000/dev/v1 |
| x-api-key | f98d8cd98h73s204e3456998ecl9427j |
| bearer-token | Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c |

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

#### GET type operations:

*   `base_url`/bioetanol-tipos/list?limit=`limitValue`\&orderAt=`orderAtValue`
*   `base_url`/bioetanol-tipos/uuid/`uuidValue`
*   `base_url`/bioetanol-tipos/tipo/`tipoValue`?limit=`limitValue`\&orderAt=`orderAtValue`
*   `base_url`/bioetanol-tipos/periodo/`periodoValue`?limit=`limitValue`\&orderAt=`orderAtValue`
*   `base_url`/bioetanol-tipos/produccion/`produccionValue`?limit=`limitValue`\&orderAt=`orderAtValue`
*   `base_url`/bioetanol-tipos/ventas-totales/`ventasTotalesValue`?limit=`limitValue`\&orderAt=`orderAtValue`
*   `base_url`/bioetanol-tipos/ubicacion/`ubicacionValue`?limit=`limitValue`\&orderAt=`orderAtValue`
*   `base_url`/bioetanol-tipos/estado-operativo/`estadoOperativoValue`?limit=`limitValue`\&orderAt=`orderAtValue`
*   `All endpoints are optional paginated except /test, /db-connection and /id/{{user-id}}`

#### POST type operations:

*   `base_url`/bioetanol-tipos/

#### PUT type operations:

*   `base_url`/bioetanol-tipos/`uuid`

#### DELETE type operations:

*   `base_url`/bioetanol-tipos/`uuid`

<br>

### 2.0.4) Endpoints Bioetanol_Total

#### Operaciones tipo GET:

*   `base_url`/bioetanol-total/list?limit=`limitValue`\&orderAt=`orderAtValue`
*   `base_url`/bioetanol-total/uuid/`uuidValue`
*   `base_url`/bioetanol-total/periodo/`periodoValue`?limit=`limitValue`\&orderAt=`orderAtValue`
*   `base_url`/bioetanol-total/produccion/`produccionValue`?limit=`limitValue`\&orderAt=`orderAtValue`
*   `base_url`/bioetanol-total/ventas-totales/`ventasTotalesValue`?limit=`limitValue`\&orderAt=`orderAtValue`
*   `base_url`/bioetanol-total/capacidad-instalada/`capacidadInstaladaValue`?limit=`limitValue`\&orderAt=`orderAtValue`
*   `base_url`/bioetanol-total/eficiencia-produccion/`eficienciaProduccionValue`?limit=`limitValue`\&orderAt=`orderAtValue`
*   `base_url`/bioetanol-total/ubicacion/`ubicacionValue`?limit=`limitValue`\&orderAt=`orderAtValue`
*   `base_url`/bioetanol-total/estado-operativo/`estadoOperativoValue`?limit=`limitValue`\&orderAt=`orderAtValue`
*   `Todos los endpoints son opcionalmente paginados excepto /test, /db-connection y /id/{{user-id}}`

#### Operaciones tipo POST:

*   `base_url`/bioetanol-total/

#### Operaciones tipo PUT:

*   `base_url`/bioetanol-total/`uuid`

#### Operaciones tipo DELETE:

*   `base_url`/bioetanol-total/`uuid`

</details>


### 2.1) Ejemplos [🔝](#índice-)

<details>
  <summary>Ver detalles</summary>

<br>

### 2.1.1) Endpoints Bioetanol_Precios

### Obtener todos los items de Bioetanol-precios

#### Solicitud (GET)

```postman
curl --location 'http://localhost:4000/dev/v1/bioetanol-precios/list?limit=3&orderAt=asc' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json'
```

#### Respuesta (200 OK)

```json
{
    "message": [
        {
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
    ]
}
```

#### Respuesta (400 Bad Request - Headers)

```json
{
    "message": "Solicitud incorrecta, verifique los encabezados faltantes o mal formados"
}
```

#### Respuesta (401 Unauthorized)

```json
{
    "message": "No autenticado, verifique x_api_key y Authorization"
}
```

#### Respuesta (500 Internal Server Error)

```json
{
    "message": "Ha ocurrido un error, no se pudieron listar los objetos de la base de datos. Verifique si existen los items."
}
```

<br>

---

<br>

### Obtener item de Bioetanol-precios por UUID

#### Solicitud (GET)

```postman
curl --location 'http://localhost:4000/dev/v1/bioetanol-precios/uuid/3bfff0ca-8cba-4113-bc94-4afb6e7feb7e' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json'
```

#### Respuesta (200 OK)

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

#### Respuesta (400 Bad Request)

```json
{
    "message": "El parámetro uuid es requerido"
}
```

#### Respuesta (400 Bad Request - Headers)

```json
{
    "message": "Solicitud incorrecta, verifique los encabezados faltantes o mal formados"
}
```

#### Respuesta (401 Unauthorized)

```json
{
    "message": "No autenticado, verifique x_api_key y Authorization"
}
```

<br>

---

<br>

### Agregar item de Bioetanol-precios

#### Solicitud (POST)

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

#### Respuesta (200 OK)

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

#### Respuesta (400 Bad Request)

```json
{
    "message": "Solicitud incorrecta, verifique los atributos del cuerpo de la solicitud. Faltantes o incorrectos"
}
```

#### Respuesta (400 Bad Request - Headers)

```json
{
    "message": "Solicitud incorrecta, verifique los encabezados faltantes o mal formados"
}
```

#### Respuesta (401 Unauthorized)

```json
{
    "message": "No autenticado, verifique x_api_key y Authorization"
}
```

<br>

---

<br>

### Actualizar item de Bioetanol-precios

#### Solicitud (PUT)

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

#### Respuesta (200 OK)

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

#### Respuesta (400 Bad Request)

```json
{
    "message": "Solicitud incorrecta, verifique los atributos del cuerpo de la solicitud para bioetanol-precios. Faltantes o incorrectos"
}
```

#### Respuesta (400 Bad Request - Headers)

```json
{
    "message": "Solicitud incorrecta, verifique los encabezados faltantes o mal formados"
}
```

#### Respuesta (401 Unauthorized)

```json
{
    "message": "No autenticado, verifique x_api_key y Authorization"
}
```

#### Respuesta (500 Internal Server Error)

```json
{
    "message": "Error interno del servidor. No se pudo actualizar el objeto en la base de datos ya que falló al obtener un item por uuid 67ecfcf7-c338-43d8-9220-4d7b43b7e914. Verifique si el item existe en la base de datos e intente nuevamente."
}
```

<br>

---

<br>

### Eliminar item de Bioetanol-precios

#### Solicitud (DELETE)

```postman
curl --location --request DELETE 'http://localhost:4000/dev/v1/bioetanol-precios/2c6d2e51-390b-4cb4-ab69-7820c632e6a4' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json'
```

#### Respuesta (200 OK)

```json
{
    "message": "Item eliminado exitosamente basado en uuid b58fd5cb-ed0b-461c-bfea-50c240e51280"
}
```

#### Respuesta (400 Bad Request - Headers)

```json
{
    "message": "Solicitud incorrecta, verifique los encabezados faltantes o mal formados"
}
```

#### Respuesta (401 Unauthorized)

```json
{
    "message": "No autenticado, verifique x_api_key y Authorization"
}
```

#### Respuesta (500 Internal Server Error)

```json
{
    "message": "Error interno del servidor. No se pudo eliminar el objeto en la base de datos ya que falló al obtener un item por uuid 2c6d2e51-390b-4cb4-ab69-7820c632e6a4. Verifique si el item existe en la base de datos e intente nuevamente."
}
```

<br>

---

<br>

### 2.1.2) Endpoints de Bioetanol_Total

### Obtener todos los items de Bioetanol-total

#### Solicitud (GET)

```postman
curl --location 'http://localhost:4000/dev/v1/bioetanol-total/list?limit=3&orderAt=asc' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json'
```

#### Respuesta (200 OK)

```json
{
    "message": [
        {
            "uuid": "3bfff0ca-8cba-4113-bc94-4afb6e7feb7e",
            "estadoOperativo": "821",
            "eficienciaProduccion": "95.5",
            "capacidadInstalada": "1000",
            "ventasTotales": "850",
            "produccion": "900",
            "createdAt": "2023-11-18 21:55:01",
            "updatedAt": "2023-11-18 21:55:01"
        }
    ]
}
```

#### Respuesta (400 Bad Request - Headers)

```json
{
    "message": "Solicitud incorrecta, verifique los encabezados faltantes o mal formados"
}
```

#### Respuesta (401 Unauthorized)

```json
{
    "message": "No autenticado, verifique x_api_key y Authorization"
}
```

#### Respuesta (500 Internal Server Error)

```json
{
    "message": "Ha ocurrido un error, no se pudieron listar los objetos de la base de datos. Verifique si existen los items."
}
```

<br>

---

<br>

### Obtener item de Bioetanol-total por UUID

#### Solicitud (GET)

```postman
curl --location 'http://localhost:4000/dev/v1/bioetanol-total/uuid/3bfff0ca-8cba-4113-bc94-4afb6e7feb7e' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json'
```

#### Respuesta (200 OK)

```json
{
    "message": {
        "uuid": "3bfff0ca-8cba-4113-bc94-4afb6e7feb7e",
        "estadoOperativo": "821",
        "eficienciaProduccion": "95.5",
        "capacidadInstalada": "1000",
        "ventasTotales": "850",
        "produccion": "900",
        "createdAt": "2023-11-18 21:55:01",
        "updatedAt": "2023-11-18 21:55:01"
    }
}
```

#### Respuesta (400 Bad Request)

```json
{
    "message": "El parámetro uuid es requerido"
}
```

#### Respuesta (400 Bad Request - Headers)

```json
{
    "message": "Solicitud incorrecta, verifique los encabezados faltantes o mal formados"
}
```

#### Respuesta (401 Unauthorized)

```json
{
    "message": "No autenticado, verifique x_api_key y Authorization"
}
```

<br>

---

<br>

### Agregar item de Bioetanol-total

#### Solicitud (POST)

```postman
curl --location 'http://localhost:4000/dev/v1/bioetanol-total/' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json' \
--data '{
    "estadoOperativo": "821",
    "eficienciaProduccion": "95.5",
    "capacidadInstalada": "1000",
    "ventasTotales": "850",
    "produccion": "900"
}'
```

#### Respuesta (200 OK)

```json
{
    "message": {
        "uuid": "3bfff0ca-8cba-4113-bc94-4afb6e7feb7e",
        "estadoOperativo": "821",
        "eficienciaProduccion": "95.5",
        "capacidadInstalada": "1000",
        "ventasTotales": "850",
        "produccion": "900",
        "createdAt": "2023-11-18 21:55:01",
        "updatedAt": "2023-11-18 21:55:01"
    }
}
```

#### Respuesta (400 Bad Request)

```json
{
    "message": "Solicitud incorrecta, verifique los atributos del cuerpo de la solicitud. Faltantes o incorrectos"
}
```

#### Respuesta (400 Bad Request - Headers)

```json
{
    "message": "Solicitud incorrecta, verifique los encabezados faltantes o mal formados"
}
```

#### Respuesta (401 Unauthorized)

```json
{
    "message": "No autenticado, verifique x_api_key y Authorization"
}
```

<br>

---

<br>

### Actualizar item de Bioetanol-total

#### Solicitud (PUT)

```postman
curl --location --request PUT 'http://localhost:4000/dev/v1/bioetanol-total/3bfff0ca-8cba-4113-bc94-4afb6e7feb7e' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json' \
--data '{
    "estadoOperativo": "821",
    "eficienciaProduccion": "95.5",
    "capacidadInstalada": "1000",
    "ventasTotales": "850",
    "produccion": "900"
}'
```

#### Respuesta (200 OK)

```json
{
    "message": {
        "uuid": "3bfff0ca-8cba-4113-bc94-4afb6e7feb7e",
        "estadoOperativo": "821",
        "eficienciaProduccion": "95.5",
        "capacidadInstalada": "1000",
        "ventasTotales": "850",
        "produccion": "900",
        "createdAt": "2023-11-18 21:55:01",
        "updatedAt": "2023-11-18 21:55:01"
    }
}
```

#### Respuesta (400 Bad Request)

```json
{
    "message": "Solicitud incorrecta, verifique los atributos del cuerpo de la solicitud para bioetanol-total. Faltantes o incorrectos"
}
```

#### Respuesta (400 Bad Request - Headers)

```json
{
    "message": "Solicitud incorrecta, verifique los encabezados faltantes o mal formados"
}
```

#### Respuesta (401 Unauthorized)

```json
{
    "message": "No autenticado, verifique x_api_key y Authorization"
}
```

#### Respuesta (500 Internal Server Error)

```json
{
    "message": "Error interno del servidor. No se pudo actualizar el objeto en la base de datos ya que falló al obtener un item por uuid 3bfff0ca-8cba-4113-bc94-4afb6e7feb7e. Verifique si el item existe en la base de datos e intente nuevamente."
}
```

<br>

---

<br>

### Eliminar item de Bioetanol-total

#### Solicitud (DELETE)

```postman
curl --location --request DELETE 'http://localhost:4000/dev/v1/bioetanol-total/3bfff0ca-8cba-4113-bc94-4afb6e7feb7e' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json'
```

#### Respuesta (200 OK)

```json
{
    "message": "Item eliminado exitosamente basado en uuid 3bfff0ca-8cba-4113-bc94-4afb6e7feb7e"
}
```

#### Respuesta (400 Bad Request - Headers)

```json
{
    "message": "Solicitud incorrecta, verifique los encabezados faltantes o mal formados"
}
```

#### Respuesta (401 Unauthorized)

```json
{
    "message": "No autenticado, verifique x_api_key y Authorization"
}
```

#### Respuesta (500 Internal Server Error)

```json
{
    "message": "Error interno del servidor. No se pudo eliminar el objeto en la base de datos ya que falló al obtener un item por uuid 3bfff0ca-8cba-4113-bc94-4afb6e7feb7e. Verifique si el item existe en la base de datos e intente nuevamente."
}
```

<br>

---

<br>

### Obtener item de Bioetanol-total por estado operativo

#### Solicitud (GET)

```postman
curl --location 'http://localhost:4000/dev/v1/bioetanol-total/estado-operativo/821?limit=5&orderAt=asc' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json'
```

#### Respuesta (200 OK)

```json
{
    "message": [
        {
            "uuid": "3bfff0ca-8cba-4113-bc94-4afb6e7feb7e",
            "estadoOperativo": "821",
            "eficienciaProduccion": "95.5",
            "capacidadInstalada": "1000",
            "ventasTotales": "850",
            "produccion": "900",
            "createdAt": "2023-11-18 21:55:01",
            "updatedAt": "2023-11-18 21:55:01"
        }
    ]
}
```

#### Respuesta (400 Bad Request)

```json
{
    "message": "El parámetro estado operativo es requerido"
}
```

#### Respuesta (400 Bad Request - Headers)

```json
{
    "message": "Solicitud incorrecta, verifique los encabezados faltantes o mal formados"
}
```

#### Respuesta (401 Unauthorized)

```json
{
    "message": "No autenticado, verifique x_api_key y Authorization"
}
```

<br>

---

<br>

### Obtener item de Bioetanol-total por eficiencia produccion

#### Solicitud (GET)

```postman
curl --location 'http://localhost:4000/dev/v1/bioetanol-total/eficiencia-produccion/95.5?limit=5&orderAt=asc' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json'
```

#### Respuesta (200 OK)

```json
{
    "message": [
        {
            "uuid": "3bfff0ca-8cba-4113-bc94-4afb6e7feb7e",
            "estadoOperativo": "821",
            "eficienciaProduccion": "95.5",
            "capacidadInstalada": "1000",
            "ventasTotales": "850",
            "produccion": "900",
            "createdAt": "2023-11-18 21:55:01",
            "updatedAt": "2023-11-18 21:55:01"
        }
    ]
}
```

#### Respuesta (400 Bad Request)

```json
{
    "message": "El parámetro eficiencia produccion es requerido"
}
```

#### Respuesta (400 Bad Request - Headers)

```json
{
    "message": "Solicitud incorrecta, verifique los encabezados faltantes o mal formados"
}
```

#### Respuesta (401 Unauthorized)

```json
{
    "message": "No autenticado, verifique x_api_key y Authorization"
}
```

<br>

---

<br>

### Obtener item de Bioetanol-total por capacidad instalada

#### Solicitud (GET)

```postman
curl --location 'http://localhost:4000/dev/v1/bioetanol-total/capacidad-instalada/1000?limit=5&orderAt=asc' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json'
```

#### Respuesta (200 OK)

```json
{
    "message": [
        {
            "uuid": "3bfff0ca-8cba-4113-bc94-4afb6e7feb7e",
            "estadoOperativo": "821",
            "eficienciaProduccion": "95.5",
            "capacidadInstalada": "1000",
            "ventasTotales": "850",
            "produccion": "900",
            "createdAt": "2023-11-18 21:55:01",
            "updatedAt": "2023-11-18 21:55:01"
        }
    ]
}
```

#### Respuesta (400 Bad Request)

```json
{
    "message": "El parámetro capacidad instalada es requerido"
}
```

#### Respuesta (400 Bad Request - Headers)

```json
{
    "message": "Solicitud incorrecta, verifique los encabezados faltantes o mal formados"
}
```

#### Respuesta (401 Unauthorized)

```json
{
    "message": "No autenticado, verifique x_api_key y Authorization"
}
```

<br>

---

<br>

### Obtener item de Bioetanol-total por ventas totales

#### Solicitud (GET)

```postman
curl --location 'http://localhost:4000/dev/v1/bioetanol-total/ventas-totales/850?limit=5&orderAt=asc' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json'
```

#### Respuesta (200 OK)

```json
{
    "message": [
        {
            "uuid": "3bfff0ca-8cba-4113-bc94-4afb6e7feb7e",
            "estadoOperativo": "821",
            "eficienciaProduccion": "95.5",
            "capacidadInstalada": "1000",
            "ventasTotales": "850",
            "produccion": "900",
            "createdAt": "2023-11-18 21:55:01",
            "updatedAt": "2023-11-18 21:55:01"
        }
    ]
}
```

#### Respuesta (400 Bad Request)

```json
{
    "message": "El parámetro ventas totales es requerido"
}
```

#### Respuesta (400 Bad Request - Headers)

```json
{
    "message": "Solicitud incorrecta, verifique los encabezados faltantes o mal formados"
}
```

#### Respuesta (401 Unauthorized)

```json
{
    "message": "No autenticado, verifique x_api_key y Authorization"
}
```

<br>

---

<br>

### Obtener item de Bioetanol-total por produccion

#### Solicitud (GET)

```postman
curl --location 'http://localhost:4000/dev/v1/bioetanol-total/produccion/900?limit=5&orderAt=asc' \
--header 'x-api-key: f98d8cd98h73s204e3456998ecl9427j' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c' \
--header 'Content-Type: application/json'
```

#### Respuesta (200 OK)

```json
{
    "message": [
        {
            "uuid": "3bfff0ca-8cba-4113-bc94-4afb6e7feb7e",
            "estadoOperativo": "821",
            "eficienciaProduccion": "95.5",
            "capacidadInstalada": "1000",
            "ventasTotales": "850",
            "produccion": "900",
            "createdAt": "2023-11-18 21:55:01",
            "updatedAt": "2023-11-18 21:55:01"
        }
    ]
}
```

#### Respuesta (400 Bad Request)

```json
{
    "message": "El parámetro produccion es requerido"
}
```

#### Respuesta (400 Bad Request - Headers)

```json
{
    "message": "Solicitud incorrecta, verifique los encabezados faltantes o mal formados"
}
```

#### Respuesta (401 Unauthorized)

```json
{
    "message": "No autenticado, verifique x_api_key y Authorization"
}
```

<br>

</details>

<br>

## Sección 3) Pruebas de Funcionalidad y Referencias

### 3.0) Prueba de funcionalidad [🔝](#índice-)

<details>
   <summary>Ver detalles</summary>

   #### [Ver Playlist](https://www.youtube.com/playlist?list=PLCl11UFjHurDt4nwIAFwH0FTX5hvPl5re)

  <a href="https://www.youtube.com/playlist?list=PLCl11UFjHurDt4nwIAFwH0FTX5hvPl5re">
    <img src="../doc/assets/Api_Bioethanol_Statistics_DynamoDB_yt.png" />
  </a> 

<br>

</details>

### 3.1) Referencias [🔝](#índice-)

<details>
   <summary>Ver detalles</summary>

  <br>

#### Reportes
*   [Bioethanol price reports](https://glp.se.gob.ar/biocombustible/reporte_precios_bioetanol.php)
*   [Dataset biotenanol | National Data](https://www.datos.gob.ar/dataset/energia-estadisticas-biodiesel-bioetanol)
*   [Excel Statistics Secretariat of Energy](https://view.officeapps.live.com/op/view.aspx?src=http%3A%2F%2Fwww.energia.gob.ar%2Fcontenidos%2Farchivos%2FReorganizacion%2Finformacion_del_mercado%2Fmercado_hydrocarburos%2Fbio%2Festatisticas_biocombustibles.xls\&wdOrigin=BROWSELINK)    

#### Instalación de Dynamodb

*   [DynamoDB en ejecutable local](https://cloudkatha.com/how-to-install-dynamodb-locally-on-windows-10/#:~:text=How%20to%20Install%20DynamoDB%20Locally%20on%20Windows%2010,Use%20DynamoDB%20Locally%20to%20Create%20a%20Table%20)

#### Teoría de DynamoDB

*   [Guía de DynamoDB](https://www.dynamodbguide.com/local-secondary-indexes/)
*   [Documentación oficial de la API DynamoDB](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html#http-api-dynamo-db-create-table)
*   [Definición de atributos](https://tipsfolder.com/range-key-dynamodb-ac5558671b26d5d7f2a34cd9b138c01e/#:~:text=The%20range%20attribute%20is%20the%20type%20key%20of,%28which%20means%20it%20can%20only%20hold%20one%20value%29.)
*   [Clave de partición vs Clave de ordenación](https://stackoverflow.com/questions/27329461/what-is-hash-and-range-primary-key)
*   [Expresiones de filtro en Dynamodb](https://www.alexdebrie.com/posts/dynamodb-filter-expressions/)
*   [Ejemplos de expresiones de filtro en Dynamodb](https://dynobase.dev/dynamodb-filterexpression/)

#### Operaciones de Dynamodb SDK v-3

*   [Operaciones](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/javascript_dynamodb_code_examples.html)
*   [Operaciones API-REST](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html)

#### Tutoriales en video

*   [Configuración de Dynamodb local](https://www.youtube.com/watch?v=-KRykmVIoV0\&t=663s)
*   [CRUD Dynamodb](https://www.youtube.com/watch?v=hOcbHz4T0Eg)

#### Ejemplos de Dynamodb

*   [Plugin serverless](https://www.serverless.com/plugins/serverless-dynamodb-local)
*   [Creación de múltiples tablas](https://stackoverflow.com/questions/47327765/creating-two-dynamodb-tables-in-serverless-yml)
*   [Ejemplo de dynamodb serverless](https://github.com/serverless/examples/tree/v3/aws-node-rest-api-with-dynamodb-and-offline)
*   [Ejemplos de SDK Dynamodb](https://github.com/aws-samples/aws-dynamodb-examples/tree/master/DynamoDB-SDK-Examples/node.js)
*   [CRUD Dynamodb](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html)

#### Código de Dynamodb

*   [API Rest Base](https://github.com/jacksonyuan-yt/dynamodb-crud-api-gateway)

</details>
