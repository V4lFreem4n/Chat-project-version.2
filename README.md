# Chat-project-version.2
This project is a nodejs chat that makes use of libraries like WS, EXPRESS, HTTP and WebSocket. It is a simple but didactic version to learn how sockets work.

Next I will explain how it works in Spanish:

Nuestro Servidor será el archivo javascript 'root.js' el cual recibe conexiones del cliente, el cual todos sus archivos estáticos están en la carpeta public. 
El funcionamiento es muy simple, el servidor crear un socket por cada cliente que entre a la página, el cliente recibe ese socket y cada vez que escriba un mensaje y de click en el botón de 'Enviar', se mandará desde el cliente un JSON que contienen tres propiedades, la propiedad 'type' que especifica si es un cliente o no, la propiedad 'text' que especifica el mensaje que se envía y la propiedad 'clientId' que es el identificador del cliente. En este proyecto, consideré a efectos prácticos asignarles un identificador desde el cliente en lugar que desde el servidor. El identificador es una clave que se genera mediente una función que retorna una cadena alfanumérica de quince caracteres completemente aleatoria. 

La función es esta:


function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  
  Finalmente, el servidor registra los mensajes entrantes y los coloca en el div del html del cliente, se guardan los mensajes en una array y se devuelve el JSON al cliente para que posteriormente cada uno vea su mensaje al lado derecho de la pantalla, y el de los demás clintes al lado izquierdo.

AUTOR: V A P P
UNIVERSIDAD: UTP
