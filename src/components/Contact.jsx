import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import JobRecommendations from "./JobRecommendations";
import { CheckCircle } from "lucide-react";

const dataTips = [
  "Divide y vencerás: separa tu código en funciones pequeñas y reutilizables.",
  "Comenta tu código, pero solo cuando sea realmente necesario.",
  "Las bases de datos indexadas mejoran la velocidad de las consultas.",
  "Aprende a escribir código limpio y mantenible, tu yo futuro te lo agradecerá.",
  "Usa estructuras de datos adecuadas para cada problema.",
  "Versiona tu código con Git para evitar pérdidas y facilitar el trabajo en equipo.",
  "Automatiza tareas repetitivas para ahorrar tiempo.",
  "Mantén tus dependencias actualizadas y revisa su seguridad.",
  "¿Por qué los programadores siempre confunden Navidad y Halloween? Porque Oct 31 == Dec 25!",
  "¿Cómo se llama un programador en el gimnasio? ¡Un desarrollador de fuerza!",
  "¿Qué dijo el dataset cuando lo olvidaron? '¡Sin mí, no tienes contexto!'",
  "¿Por qué los científicos de datos aman los ascensores? Porque los elevan a un nivel superior de clustering.",
    "Un programador va a comprar leche. Su esposa le dice: 'Compra una leche y si hay huevos, compra una docena'. Vuelve con 12 leches. '¿Por qué trajiste 12 leches?' 'Porque había huevos'.",
    "SQL y NoSQL entran a un bar. SQL pregunta: '¿Puedo unirme a ti?' NoSQL responde: '¡No, gracias!'.",
    "¿Por qué los científicos de datos son malos en las relaciones? Porque siempre están dividiendo sus datasets.",
    "¿Cómo se llama un programador en la playa? Un script kiddie.",
    "¿Por qué los modelos de Machine Learning siempre están tristes? Porque tienen demasiados sesgos.",
    "Dos bytes entran a un bar y uno le dice al otro: 'Creo que tengo un bug'. El otro responde: 'Sí, te ves un poco desbordado'.",
    "¿Por qué los programadores prefieren la oscuridad? Porque la luz atrae bugs.",
    "¿Por qué los programadores de Python nunca discuten? Porque siempre encuentran una solución elegante.",
    "Un científico de datos entra a una panadería y pide un pan. El panadero pregunta: '¿Cómo lo quiere?'. El científico responde: 'Normalizado, por favor'.",
    "¿Cómo se llama el primo matemático de Harry Potter? ¡Log-aritmo!"
];

const Contact = () => {
  const formRef = useRef();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [skills, setSkills] = useState([]);
  const [intervalId, setIntervalId] = useState(null);
  const [dataTip, setDataTip] = useState(dataTips[0]);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [showTick, setShowTick] = useState(false);

  useEffect(() => {
    if (loading) {
      const tipInterval = setInterval(() => {
        setDataTip((prevTip) => {
          const nextIndex = (dataTips.indexOf(prevTip) + 1) % dataTips.length;
          return dataTips[nextIndex];
        });
      }, 8000);

      return () => clearInterval(tipInterval);
    }
  }, [loading]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    console.log("Archivo seleccionado:", selectedFile);
  };

  const simulateProgress = () => {
    setProgress(0);
    let timeElapsed = 0;
    const totalTime = 130;
    const interval = setInterval(() => {
      timeElapsed += 1;
      setProgress((prev) => Math.min(prev + (100 / totalTime), 100));
      if (timeElapsed >= totalTime) {
        clearInterval(interval);
      }
    }, 1000);
    setIntervalId(interval);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Por favor, selecciona un archivo antes de enviar.");
      return;
    }

    setLoading(true);
    setUploadComplete(false);
    simulateProgress();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://cv-interpreter2.onrender.com/process_cv/", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Respuesta de la API:", result);

      if (result.skills_detected) {
        console.log('entro aqui')
        setSkills(result.skills_detected);
        setUploadComplete(true);
        setShowTick(true);
        setTimeout(() => {
          setShowTick(false);
          setProgress(0);
        }, 1500);
      }

      clearInterval(intervalId);
      setProgress(100);

      setTimeout(() => {
        setLoading(false);
        formRef.current.reset();
        setFile(null);
      }, 500);
    } catch (error) {
      console.error("Error al procesar el archivo:", error);
      clearInterval(intervalId);
      setLoading(false);
      setProgress(0);
      alert("Error al procesar el archivo.");
    }
  };

  return (
    <>
      <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10`}>
        <motion.div variants={slideIn("left", "tween", 0.2, 1)} className="flex-[0.75] bg-black-100 p-8 rounded-2xl">
          <p className={styles.sectionSubText}>Prueba tú mismo!</p>
          <h3 className={styles.sectionHeadText}>Sube tu archivo</h3>
  
          <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">Sube tu archivo (.pdf, .png, .jpg, .jpeg)</span>
              <input
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={handleFileChange}
                className="bg-tertiary py-4 px-6 text-white rounded-lg outline-none border-none font-medium cursor-pointer"
              />
            </label>
  
            {loading && (
              <div className="flex flex-col items-center">
                {!showTick ? (
                  <div className="loader mb-4"></div>
                ) : (
                  <CheckCircle className="text-green-500 w-10 h-10 mb-4" />
                )}
                <div className={`w-full bg-gray-700 rounded-full h-4 ${showTick ? 'hidden' : ''}`}>
                  <div
                    className="bg-green-500 h-4 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="text-white text-lg mt-2">Data Tip:</p>
                <p className="text-white text-center mt-1">{dataTip}</p>
              </div>
            )}
  
            <button
              type="submit"
              className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
            >
              {loading ? "Cargando..." : "Enviar"}
            </button>
          </form>
        </motion.div>
  
        <motion.div variants={slideIn("right", "tween", 0.2, 1)} className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]">
          <EarthCanvas />
        </motion.div>
      </div>
  
      {skills.length > 0 && <JobRecommendations skills={skills} />}
    </>
  );
};

export default SectionWrapper(Contact, "contact");
