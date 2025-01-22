const resumir = async (texto) => {
    //Aquí me falta mandar el texto a resumir en la petición

    const apis = [
      fetch(
        "https://api.meaningcloud.com/summarization-1.0"
      ),
      fetch(
        "https://api.nlpcloud.io/v1/bart-large-cnn/summarization"
      ),
      fetch(
        "https://api.openai.com/v1/chat/completions"
      ),
    ];

    try{
        const respuesta = await Promise.race(apis);
        const data = await respuesta.json();

        let textoResumido="";

        if(data.summary){
            textoResumido=data.summary;
        }else if(data.choices){
            textoResumido = data.choices[0].message.content;
        }else{
            textoResumido = "No se pudo resumir";
        }

    }catch(error){
        alert("Error al realizar el resumen");
        console.log(error);
    }
}
let texto= "";

resumir(texto).then((resultado) =>{
    console.log("El texto resumido es: "+resultado);
}).catch((error) =>{
    console.log(error);
});