const connection = new WebSocket('ws://localhost:4000');
const input = document.querySelector('#input');
input.style.overflowY = "hidden"; //Por defecto no aparece el Scroll en el textArea
const submit = document.querySelector("#enviar");

const lienzo = document.getElementById('lienzo');

function generateRandomString(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

const id_cliente = generateRandomString(15);

input.addEventListener('input', ()=>{ 

    input.style.height = "50px"; /* Altura inicial */
    input.style.height = Math.min(input.scrollHeight, 200) + "px"; /* Altura máxima */

    if(input.scrollHeight > 200){
        input.style.overflowY = "scroll";
    }else{
        input.style.overflowY = "hidden";
    }
})

submit.addEventListener('click', (event)=>{
let mensaje = {type : 'chat', text: document.getElementById('input').value, clientId: id_cliente};
document.getElementById('input').value = '';
connection.send(JSON.stringify(mensaje));

});

// Connection opened
connection.addEventListener('open', function (event) {
  console.log('Connected to WS Server ...' + event.target);
});


// Listen for messages
connection.addEventListener('message', function (event) {

const lienzo = document.getElementById('lienzo');    
let sizeSpaceLienzo = lienzo.clientHeight;

let mensaje = JSON.parse(event.data); // ACÁ SE RECIVE UN ARRAY...
//console.log(mensaje + ' Size : '+ mensaje.length);

console.log(mensaje);

    let elemento = document.createElement('div');

    if(mensaje[mensaje.length - 1].clientId === id_cliente){
        
        let etiqueta = `<div style="background: skyblue;
        text-align:right">${mensaje[mensaje.length - 1].text}</div>`;
        elemento.innerHTML = etiqueta;
        lienzo.appendChild(elemento);
    }else{
        
        let etiqueta = `<div style="background: rgb(141, 141, 150);
        text-align:left">${mensaje[mensaje.length - 1].text}</div>`;
        elemento.innerHTML = etiqueta;
        lienzo.appendChild(elemento);
    }


lienzo.style.height = sizeSpaceLienzo + 'px'; /* Altura inicial */


if(lienzo.scrollHeight > sizeSpaceLienzo){
    lienzo.style.overflowY = "scroll";
}else{
    lienzo.style.overflowY = "hidden";
}

});







