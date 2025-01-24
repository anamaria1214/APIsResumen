const resumir = async (texto) => {
    const apis = [
      fetch(
        "https://api.meaningcloud.com/summarization-1.0",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            key: "cff1883b7ba445bf31dc533e28e2ff18",
            txt: texto, 
            sentences: 1, 
            lang: "es", 
          }),
        }
      ),
      
    ];
  
    try {
      const respuesta = await Promise.race(apis);
      const data = await respuesta.json();
  
      console.log("Respuesta de la API:", data);

      let textoResumido = "";
  
      if (data.summary) {
        textoResumido = data.summary; 
      } else if (data.choices) {
        textoResumido = data.choices[0].message.content; 
      } else {
        textoResumido = "No se pudo resumir";
      }
  
      return textoResumido; 
    } catch (error) {
      console.error("Error al procesar la API:", error);
      throw new Error("Error al resumir el texto");
    }
  };
  
  let texto =
    "Una aplicación de captura y análisis de protocolos de red (network packet sniffer) es una" +
    " herramienta que permite obtener y analizar los mensajes intercambiados por aplicaciones" +
    " de red. Wireshark, la aplicación más utilizada para el análisis de protocolos tiene dos" +
    " tareas principales: capturar frames de la capa de enlace de datos y mostrar los paquetes de forma tal" +
    " que se puedan ver los protocolos involucrados con el nivel de detalle deseado.";

  resumir(texto)
    .then((resultado) => {
      console.log("El texto resumido es: " + resultado);
    })
    .catch((error) => {
      console.error(error);
    });