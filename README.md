# Bioetanol_Estadisticas_DynamoDB_AWS
Api Rest para el manejo estadístico de producción y ventas de bioetanol a base de caña y maíz implementado con Api-Gateway, Serverless-Framework, NodeJs, DynamoDB, Systems Manager Parameter Store, Lambda, entre otros.



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

<br>

</details>




### 1.1) Ejecución del Proyecto [🔝](#índice-)

<details>
  <summary>Ver</summary>
 
 
* Una vez creado un entorno de trabajo a través de algún ide, clonamos el proyecto
```git
git clone https://github.com/andresWeitzel/Microservice_Mercadolibre_Users_AWS
```
* Nos posicionamos sobre el proyecto
```git
cd 'projectName'
```
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
* Instalamos dynamodb con la configuración de librerias que se encuentran dentro de .dynamodb. Procedemos a instalar dicho servicio 
```git
sls dynamodb install
```
* Creamos un archivo para almacenar las variables ssm utilizadas en el proyecto (Más allá que sea un proyecto con fines no comerciales es una buena práctica utilizar variables de entorno).
  * Click der sobre la raíz del proyecto
  * New file
  * Creamos el archivo con el name `serverless_ssm.yml`. Este deberá estar a la misma altura que el serverless.yml
  * Añadimos las ssm necesarias dentro del archivo.
  ```git
    # Keys
    X_API_KEY : 'f98d8cd98h73s204e3456998ecl9427j'

    BEARER_TOKEN : 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'

  ```  
* Ejecutamos el proyecto
```git
sls offline start
```
 
 
<br>

</details>


### 1.2) Configuración del proyecto desde cero [🔝](#índice-)

<details>
  <summary>Ver</summary>
 
 <br>
 

* Creamos un entorno de trabajo a través de algún ide, luego de crear una carpeta nos posicionamos sobre la misma
```git
cd 'projectName'
```
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
* Instalamos serverless-dynamoDB-local (No dynamoDB)
```git
npm install --save serverless-dynamodb-local
```
 * Agregamos el plugin dentro del serverless.yml
```yml
plugins:
  - serverless-dynamodb-local
```
 * Reemplazamos la plantila serverless.yml inicial por la siguiente como modelo (cambiar nombre, etc)...
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
 
* Descargamos la Java Runtime Engine (JRE) versión 6.x o posterior. [Descargar desde aquí](https://www.oracle.com/java/technologies/downloads/)
* Descargamos el .jar que contendrá toda la configuración para la instalación . [Descargar desde aquí](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html#DynamoDBLocal.DownloadingAndRunning.title)
* Una vez descargado el .jar en formato .tar descomprimimos y copiamos todo su contenido dentro de la carpeta que se cread de dynamo en el proyecto (.dynamodb). Si esta carpeta no está, la creamos dentro de proyecto.
* Procedemos a instalar el servicio de dynamodb
```git
sls dynamodb install
```
* Ejecutamos el proyecto
```git
sls offline start
```

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

#### Dynamodb
* [Plugin serverless](https://www.serverless.com/plugins/serverless-dynamodb-local)

#### Herramientas 
 * [Herramienta de Diseño AWS app.diagrams.net](https://app.diagrams.net/?splash=0&libs=aws4)

#### Api Gateway
 * [Buenas Prácticas Api-Gateway](https://docs.aws.amazon.com/whitepapers/latest/best-practices-api-gateway-private-apis-integration/rest-api.html)
 * [Creación de Api-keys personalizadas](https://towardsaws.com/protect-your-apis-by-creating-api-keys-using-serverless-framework-fe662ad37447)

 #### Librerías
 * [Validación de campos](https://www.npmjs.com/package/node-input-validator)

<br>

</details>




