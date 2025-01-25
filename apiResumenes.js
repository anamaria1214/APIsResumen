async function resumirIA1(texto) {
    const body= {
            contents: [{
              parts: [{ text: `Resume el siguiente texto de manera breve solo si es algo valido y con sentido, sino indica que no puedes hablar del tema y pide que se te brinde de nuevo algo valido: ${texto}` }],       
             }]
          
    }

    const respuesta= await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDRO7QuYXn26BHrcsOASIxF4i88-WdGk8I", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
    })

    if(!respuesta.ok){
        throw new Error("Error en la API de gemini");
    }

    const data= await respuesta.json();
    return `Resumen generado por Gemini: "${data.candidates[0].content.parts[0].text}"`

}

async function resumirIA2(texto) {
    const body= {
        key: "cff1883b7ba445bf31dc533e28e2ff18",
        txt: texto,
        sentences: 1,
        lang: "es",
          
    }

    const respuesta= await fetch("https://api.meaningcloud.com/summarization-1.0", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(body)
    })

    if(!respuesta.ok){
        throw new Error("Error en la API de MeaningCloud");
    }

    const data= await respuesta.json();
    return `Resumen generado por MeaningCloud: "${data.summary}"`

}

const resumir = async () => {
    const textoOriginal = document.getElementById("texto").value;
    try {
        const serviciosIA = [resumirIA1(textoOriginal), resumirIA2(textoOriginal)];
        const resultado = await Promise.race(serviciosIA);
        document.getElementById("resultado").innerText = `${resultado}`;
      } catch (error) {
        console.error("Error al generar resumen:", error);
        res.status(500).json({ message: "Error al generar el resumen." });
      }
  };
  

  