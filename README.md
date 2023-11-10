![Index app](https://github.com/andresWeitzel/Api_Bioetanol_Estadisticas_DynamoDB_AWS/blob/master/doc/datos/bioetanolTablas.png)

<p align="right">
     <a href="https://github.com/andresWeitzel/Api_Bioetanol_Estadisticas_DynamoDB_AWS/blob/master/translation/README.es.md" target="_blank">
       <img src="https://github.com/andresWeitzel/Api_Bioetanol_Estadisticas_DynamoDB_AWS/blob/master/doc/assets/translation/arg-flag.jpg" width="10%" height="10%" />
   </a>
    <a href="https://github.com/andresWeitzel/Api_Bioetanol_Estadisticas_DynamoDB_AWS/blob/master/README.md" target="_blank">
       <img src="https://github.com/andresWeitzel/Api_Bioetanol_Estadisticas_DynamoDB_AWS/blob/master/doc/assets/translation/eeuu-flag.jpg" width="10%" height="10%" />
   </a>
</p>

<div align="center">

# Bioethanol\_Statistics\_DynamoDB\_AWS

</div>

Api Rest for the statistical management of production and sales of bioethanol based on cane and corn implemented with Api-Gateway, Nodemon, Serverless-Framework, NodeJs, DynamoDB, Systems Manager Parameter Store, Lambda among others. AWS services are tested locally. The project code and its documentation (less technical doc) have been developed in English.

*   [Bioethanol price reports](https://glp.se.gob.ar/biocombustible/reporte_precios_bioetanol.php)
*   [Dataset biotenanol | National Data](https://www.datos.gob.ar/dataset/energia-estadisticas-biodiesel-bioetanol)
*   [Excel Statistics Secretariat of Energy](https://view.officeapps.live.com/op/view.aspx?src=http%3A%2F%2Fwww.energia.gob.ar%2Fcontenidos%2Farchivos%2FReorganizacion%2Finformacion_del_mercado%2Fmercado_hydrocarburos%2Fbio%2Festatisticas_biocombustibles.xls\&wdOrigin=BROWSELINK)
*   [Playlist functionality test](https://www.youtube.com/playlist?list=PLCl11UFjHurDt4nwIAFwH0FTX5hvPl5re) <a href="https://www.youtube.com/playlist?list=PLCl11UFjHurDt4nwIAFwH0FTX5hvPl5re" target="_blank"> <img src="./doc/assets/img/youtube-logo.png" width="5%" height="5%" />

<br>

## Index 📜

<details>
  <summary> View </summary>

  <br>

### Section 1) Description, configuration and technologies

*   [1.0) Project Description.](#10-description-)
*   [1.1) Project Execution.](#11-project-execution-)
*   [1.2) Project configuration from scratch](#12-project-configuration-from-scratch-)
*   [1.3) Technologies.](#13-technologies-)

### Section 2) Endpoints and Examples

*   [2.0) EndPoints and resources.](#20-endpoints-and-resources-)
*   [2.1) Examples.](#21-examples-)

### Section 3) Functionality Testing and References

*   [3.0) Functionality test.](#30-functionality-test-)
*   [3.1) References.](#31-references-)

<br>

</details>

<br>

## Section 1) Description, configuration and technologies

### 1.0) Description [🔝](#index-)

<details>
   <summary>View</summary>

  <br>

Api Rest for the statistical management of the production and marketing of bioethanol based on cane and corn. For its main architecture, all dynamo operations are covered through modularized helpers, endpoints through controllers, enumerations are used, etc. All necessary CRUD operations are also applied, as well as validations of credentials, tokens, headers, body, etc. for each endpoint of each table. The dynamodb tables involved are bioethanolPrices, bioethanolTotal, and bioethanolTypes.
`Important`: There are security alerts from dependabot that were closed as they point to the "serverless-dynamodb-local" plugin. Do not apply security patches to that plugin, as version `^1.0.2` has problems creating tables and running the dynamo service. It is recommended to keep the latest stable version `^0.2.40` with the security alerts generated.

<br>

</details>

### 1.1) Project Execution [🔝](#index-)

<details>
   <summary>View</summary>

*   We create a work environment through some IDE, we may or may not create a root folder for the project, we position ourselves on it

```git
cd 'projectRootName'
```

*   Once a work environment has been created, we clone the project

```git
git clone https://github.com/andresWeitzel/Api_Bioetanol_Estadisticas_DynamoDB_AWS
```

*   We position ourselves on the project

```git
cd 'projectName'
```

*   We install the latest LTS version of [Nodejs(v18)](https://nodejs.org/en/download)
*   We install the Serverless Framework globally if we have not already done so

```git
npm install -g serverless
```

*   We verify the version of Serverless installed

```git
sls -v
```

*   We install all the necessary packages

```git
npm i
```

*   `Important`: There are security alerts from dependabot that were closed as they point to the "serverless-dynamodb-local" plugin. Do not apply security patches to that plugin, as version `^1.0.2` has problems creating tables and running the dynamo service. It is recommended to keep the latest stable version `^0.2.40` with the security alerts generated.
*   For simplification purposes, the file for ssm variables (serverless\_ssm.yml) is included. It is recommended not to include or change credentials, token, etc.
*   The following script configured in the project's package.json is responsible for
    *   Lift serverless-offline ("serverless-offline")
    *   run serverless-offline ("start")
    *   run nodemon and serverless ("start:dev")
    *   format all js and ts files with prettier ("format-prettier")
    *   format all .md files with remark ("format-remark")
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
    *   We run the app from terminal.
    ```git
    npm run start
    ```
    *   We run the app with nodemon to auto detect changes from the server.
```git
npm run start:dev
```

*   `Important`: It is possible that there are other previous steps that have not been included due to synchronization between docs in relation to development. Please open a conversation thread within the 'Issues' section of the project.

<br>

</details>

### 1.2) Project configuration from scratch [🔝](#index-)

<details>
<summary>View</summary>

<br>

*   We create a work environment through some IDE, we may or may not create a root folder for the project, we position ourselves on it

```git
cd 'projectRootName'
```

*   Once a work environment has been created, we clone the project

```git
git clone https://github.com/andresWeitzel/Api_Bioetanol_Estadisticas_DynamoDB_AWS
```

*   We position ourselves on the project

```git
cd 'projectName'
```

*   We install the latest LTS version of [Nodejs(v18)](https://nodejs.org/en/download)
*   We install the Serverless Framework globally if we have not already done so

```git
npm install -g serverless
```

*   We verify the version of Serverless installed

```git
sls -v
```

*   We initialize a serverles template

```git
serverless create --template aws-nodejs
```

*   We initialize an npm project

```git
npm init -y
```

*   We install serverless offline

```git
npm i serverless-offline --save-dev
```

*   We add the plugin inside the serverless.yml

```yml
plugins:
   - serverless-offline
```

*   We install serverless ssm

```git
npm i serverless-offline-ssm --save-dev
```

*   We add the plugin inside the serverless.yml

```yml
plugins:
   - serverless-offlline-ssm
```

*   We install the plugin to use dynamodb locally (Not the dynamoDB service, this is configured in the files within .dynamodb).
*   `Important`: There are security alerts from dependabot that were closed as they point to the "serverless-dynamodb-local" plugin. Do not apply security patches to that plugin, as version `^1.0.2` has problems creating tables and running the dynamo service. It is recommended to keep the latest stable version `^0.2.40` with the security alerts generated.

```git
npm install serverless-dynamodb-local --save-dev
```

*   We add the plugin inside the serverless.yml

```yml
plugins:
   - serverless-dynamodb-local
```

*   We install the dynamodb client sdk for the necessary db operations

```git
npm install @aws-sdk/client-dynamodb
```

*   We install the dynamodb sdk lib for the necessary db operations

```git
npm i @aws-sdk/lib-dynamodb
```

*   We will modify the initial template for the standardized configs.
    *   We replaced the initial serverless.yml template with the following one as the base model (change name, etc)...

```yml

service: name

frameworkVersion: '3'

provider:
   name: aws
   runtime: nodejs12.x
   stage: dev
   region: us-west-1
   memorySize: 512
   timeout: 10

plugins:
     - serverless-dynamodb-local
     - serverless-offline-ssm
     - serverless-offline

functions:
   Hello:
     handler: handler.hello

custom:
   serverless-offline:
     httpPort: 4000
     lambdaPort: 4002
   serverless-offline-ssm:
     stages:
       -dev
   dynamodb:
     stages:
       -dev
```

*   We install prettier for indentations

```git
npm i prettier --save
```

*   We install node-input-validator to validate attributes in requests, class objects, etc.

```git
npm i node-input-validator --save
```

*   We must download the .jar along with its config to run the dynamodb service. [Download here](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/DynamoDBLocal.DownloadingAndRunning.html#DynamoDBLocal.DownloadingAndRunning.title)
*   Once the .jar has been downloaded in .tar format, we decompress and copy all its contents into the `.dynamodb` folder.
*   We install the dependency for the execution of scripts in parallel

```git
npm i --save-dev concurrently
```

*   The following script configured in the project's package.json is responsible for
    Raise serverless-offline (serverless-offline)

```git
  "scripts": {
    "serverless-offline": "sls offline start",
    "start": "npm run serverless-offline"
  },
```

*   We run the app from terminal.

```git
npm start
```

*   We should expect a console output with the following services raised when the previous command is executed

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

*   We already have a functional app with an initial structure defined by Serverless-Framework. The application is deployed at http://localhost:4002 and we can test the endpoint declared in the serverless from postman
*   `Clarification`: The rest of the modifications applied to the initial template are not described due to document simplification issues. For more information consult See the [Serverless-framework](https://www.serverless.com/) tutorial for using services, plugins, etc.

<br>

</details>

### 1.3) Technologies [🔝](#index-)

<details>
   <summary>View</summary>

  <br>

| **Technologies** | **Version** | **Purpose** |
| ------------- | ------------- | ------------- |
| [SDK](https://www.serverless.com/framework/docs/guides/sdk/) | 4.3.2 | Automatic Module Injection for Lambdas |
| [Serverless Framework Core v3](https://www.serverless.com//blog/serverless-framework-v3-is-live) | 3.23.0 | Core Services AWS |
| [Serverless Plugin](https://www.serverless.com/plugins/) | 6.2.2 | Libraries for Modular Definition |
| [Systems Manager Parameter Store (SSM)](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) | 3.0 | Management of Environment Variables |
| [Amazon Api Gateway](https://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html) | 2.0 | API Manager, Authentication, Control and Processing |
| [NodeJS](https://nodejs.org/en/) | 14.18.1 | JS Library |
| [VSC](https://code.visualstudio.com/docs) | 1.72.2 | IDE |
| [Postman](https://www.postman.com/downloads/) | 10.11 | Http Client |
| [CMD](https://learn.microsoft.com/en-us/windows-server/administration/windows-commands/cmd) | 10 | Command Prompt for command line |
| [Git](https://git-scm.com/downloads) | 2.29.1 | Version Control |

</br>

| **Plugin** | **Description** |
| ------------- | ------------- |
| [Serverless Plugin](https://www.serverless.com/plugins/) | Libraries for Modular Definition |
| [serverless-offline](https://www.npmjs.com/package/serverless-offline) | This serverless plugin emulates AWS λ and API Gateway on-premises |
| [serverless-offline-ssm](https://www.npmjs.com/package/serverless-offline-ssm) | finds environment variables that match the SSM parameters at build time and replaces them from a file |

</br>

### VSC Extensions Implemented.

| **Extension** |
| ------------- |
| Prettier - Code formatter |
| YAML - Autoformatter .yml (alt+shift+f) |
| GitLens - Tracking changes |
| Serverless Framework - Autocompleted with snippets |
| Tabnine - AI Autocomplete |
| Others |

<br>

</details>

<br>

## Section 2) Endpoints and Examples.

### 2.0) Endpoints and resources [🔝](#index-)

<details>
   <summary>View</summary>

<br>

</details>

### 2.1) Examples [🔝](#index-)

<details>
   <summary>View</summary>
   //check

<br>

</details>

<br>

## Section 3) Functionality Testing and References.

### 3.0) Functionality test [🔝](#index-)

<details>
   <summary>View</summary>

<br>

</details>

### 3.1) References [🔝](#index-)

<details>
   <summary>View</summary>

  <br>

#### Dynamodb installation

*   [DynamoDB on local executable](https://cloudkatha.com/how-to-install-dynamodb-locally-on-windows-10/#:~:text=How%20to%20Install%20DynamoDB%20Locally%20on%20Windows%2010,Use%20DynamoDB%20Locally%20to%20Create%20a%20Table%20)

#### DynamoDB theory

*   [DynamoDB Guide](https://www.dynamodbguide.com/local-secondary-indexes/)
*   [Official Api DynamoDB Doc](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html#http-api-dynamo-db-create-table)
*   [Attribute definition](https://tipsfolder.com/range-key-dynamodb-ac5558671b26d5d7f2a34cd9b138c01e/#:~:text=The%20range%20attribute%20is%20the%20type%20key%20of,%28which%20means%20it%20can%20only%20hold%20one%20value%29.)
*   [Partition Key vs Sort](https://stackoverflow.com/questions/27329461/what-is-hash-and-range-primary-key)
*   [Filter Expressions in Dynamodb](https://www.alexdebrie.com/posts/dynamodb-filter-expressions/)
*   [Examples of Filter Expressions in Dynamodb](https://dynobase.dev/dynamodb-filterexpression/)

#### Dynamodb operations sdk v-3

*   [Operations](https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/javascript_dynamodb_code_examples.html)
*   [Operations API-REST](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html)

#### Video tutorials

*   [Dynamodb local config](https://www.youtube.com/watch?v=-KRykmVIoV0\&t=663s)
*   [Crud Dynamodb](https://www.youtube.com/watch?v=hOcbHz4T0Eg)

#### Dynamodb examples

*   [serverless plugin](https://www.serverless.com/plugins/serverless-dynamodb-local)
*   [Creating multiple tables](https://stackoverflow.com/questions/47327765/creating-two-dynamodb-tables-in-serverless-yml)
*   [dynamodb serverless example](https://github.com/serverless/examples/tree/v3/aws-node-rest-api-with-dynamodb-and-offline)
*   [Dynamodb SDK examples](https://github.com/aws-samples/aws-dynamodb-examples/tree/master/DynamoDB-SDK-Examples/node.js)
*   [CRUD Dynamodb](https://docs.aws.amazon.com/apigateway/latest/developerguide/http-api-dynamo-db.html)

#### Dynamodb code

*   [Api Rest Base](https://github.com/jacksonyuan-yt/dynamodb-crud-api-gateway)

#### Tools

*   [AWS Design Tool app.diagrams.net](https://app.diagrams.net/?splash=0\&libs=aws4)

#### API Gateway

*   [Hello good Api-Gateway Practices](https://docs.aws.amazon.com/whitepapers/latest/best-practices-api-gateway-private-apis-integration/rest-api.html)
*   [Creating Custom Api-keys](https://towardsaws.com/protect-your-apis-by-creating-api-keys-using-serverless-framework-fe662ad37447)

#### Bookstores

*   [Field validation](https://www.npmjs.com/package/node-input-validator)
*   [uuidv4 generator](https://www.npmjs.com/package/uuid)
*   [Nodemon Usage](https://www.npmjs.com/package/nodemon)

#### Package.json

*   [Setting up parallel scripts](https://stackoverflow.com/questions/30950032/how-can-i-run-multiple-npm-scripts-in-parallel)

#### Formating prettier

*   [Formatting Node.js codebase with Prettier](https://dev.to/zsevic/formatting-nodejs-codebase-with-prettier-3ghi)
*   [Set up a Node.js App with ESLint and Prettier ](https://dev.to/devland/set-up-a-nodejs-app-with-eslint-and-prettier-4i7p)

#### Formating remark-link

*   [remark-inline-links](https://github.com/remarkjs/remark-inline-links)
*   [remark-lint-list-item-indent](https://www.npmjs.com/package/remark-lint-list-item-indent)

<br>

</details>
