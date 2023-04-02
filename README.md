# King of devs: Wooy

![wooy](https://ipfs.io/ipfs/Qmb7mU9CiYr8dMNpUf1TZzapcZeNPHYaf6XzZ1aQRUU44U)

#### En Wooy, tu ayuda se recompensa con un POD exclusivo (Proof of donation). Una pieza de arte unica diseñaba especialmente para ti.

### ¿Para que sirve? 
Es un certificado digital de tu apoyo a una causa benefica. Todos los que han contribuido a causa de impacto puede obtenerlo.
* * *
### Instalación:

Para utilizar esta aplicación, primero debes clonar este repositorio en tu máquina local.

> `git clone https://github.com/francocornejo/wooy-pods.git`

Luego asegurate de tener instaladas las siguientes herramientas:

- Visual studio code
- Node.JS

Para iniciar la página web, es necesario seguir los siguientes pasos:

1. Abre una terminal y navega a la carpeta donde clonaste este repositorio.

2. Ejecuta `npm install` para instalar las dependencias requeridas. Entre ellas: express, mongoose, web3, mongoDB, nodemon, dotenv

3. Ejecuta `npm start` para iniciar la aplicación.

4. Ingresar por url al dominio local: `https://localhost:8080`

5. En caso de querer emular una base de datos que representaria la información entregada por las ONG, ingresar al dominio local: `https://localhost:8080/register` y completar el formulario.

Si han seguido adecuadamente estos procedimientos, la página web operaria en su totalidad.
* * *
### Uso

A continuacion detallaremos como utilizar el proyecto y como acceder a sus funcionalidad.

Trabajamos con ONGs para regalarle NFT PODs (proof of donations) a los donantes de sus plataformas asi los fidelizan. La ONG nos envian ***una base de datos*** con los mails de sus donantes y nosotros minteamos el POD a nuestra wallet y los vinculamos a su ***email***, el usuario puede en nuestro sitio web visualizar su POD y si lo desea llevarselo a su wallet.

Detallaremos exhaustivamente los pasos del proceso para que puedan adquirir un conocimiento profundo sobre el proyecto.

1. Una ONG se une a nuestra iniciativa.
2. Realizamos la implementación del **smart contract** en la plataforma de Remix.
3. La ONG nos proporciona semanalmente su base de datos de donantes por correo electrónico.
4. Generamos un hash de los correos electrónicos recibidos.
5. Si nuestra base de datos consta de, por ejemplo, 5 correos electrónicos, creamos 5 tokens únicos denominados PODs, cada uno asociado a su correspondiente hash de correo electrónico.
6. Los usuarios pueden acceder al sitio web y buscar su POD ingresando su correo electrónico en el campo de búsqueda correspondiente.
7. Una vez encontrado, el usuario puede optar por transferir su POD a su billetera digital completando el formulario de solicitud de transferencia de POD mediante el siguiente enlace: 

  >	 `www.localhost:8080/pages/ongs/{Nombre-del-pods}.html` 

8. En el formulario, el usuario debe proporcionar su correo electrónico y su wallet para completar la transferencia.
9. WOOY transfiere el POD solicitado desde la billetera de la organización a la billetera del usuario utilizando un código único de identificación.
* * *
### FAQ

1. ¿Puede cualquier acceder a un POD de nuestra propiedad?
- Si siempre y cuando realices una donación a una ONG que vos elijas y nosotros te contactaremos para lograr un vinculo.

2. ¿Que es un POD?
- Los POD's son token no fungibles (NFT) que representan una prueba de donación hechas con las ONG que trabajan con nosotros.
 
3. ¿Puedo almacenar mas de un POD?
- Si, podes obtener uno por cada ONG en la que hayas donado.

4. ¿Que beneficios tiene la colección de PODs?
- Demuestra tu compromiso y apoyo hacia la causa y ONG a las que has donado. A largo plazo, podrás obtener mayores beneficios y recompensas

### Contruido con:

- Hardhat
- Web3
- Visual studio code
- Node.JS
- MongoDB
- Bootstrap
- JQuery
- Ajax

### Autores

- Franco Cornejo (https://github.com/francocornejo)
- Santiago Nielsen (https://github.com/santiagon1)
- Juan Nielsen (https://github.com/juannielsen)
- Federico Buccella (https://github.com/federicobuccella)