import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";
import JobRecommendations from "./JobRecommendations";
import { CheckCircle } from "lucide-react";
import { dataTips } from "../constants";

const Contact = () => {
  const formRef = useRef();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [dataTip, setDataTip] = useState(dataTips[0]);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [showTick, setShowTick] = useState(false);
  const [skills, setSkills] = useState([]);

  // Refs para contar clics y registrar el momento del primer clic
  const clickCountRef = useRef(0);
  const firstClickTimeRef = useRef(null);

  // Actualiza dataTip de forma aleatoria cada 9 segundos cuando se está cargando
  useEffect(() => {
    if (loading) {
      const tipInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * dataTips.length);
        setDataTip(dataTips[randomIndex]);
      }, 9000);

      return () => clearInterval(tipInterval);
    }
  }, [loading]);

  // Realiza scroll automático 3 segundos después de obtener las skills
  useEffect(() => {
    if (skills.length > 0) {
      const scrollTimeout = setTimeout(() => {
        window.scrollBy({
          top: 750, // desplaza hacia abajo
          behavior: "smooth",
        });
      }, 3000);
      return () => clearTimeout(scrollTimeout);
    }
  }, [skills]);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    console.log("Archivo seleccionado:", selectedFile);
  };

  const simulateProgress = () => {
    setProgress(0);
    let timeElapsed = 0;
    const totalTime = 180; // tiempo total en segundos (puedes ajustar para pruebas)
    const interval = setInterval(() => {
      timeElapsed += 1;
      setProgress((prev) => Math.min(prev + 100 / totalTime, 100));
      if (timeElapsed >= totalTime) {
        clearInterval(interval);
      }
    }, 1000);
    setIntervalId(interval);
  };

  // Función para simular la llamada a la API de procesamiento del CV
  const simulateApiCall = () => {
    console.log("Simulación de API activada");
    setLoading(true);
    setUploadComplete(false);
    simulateProgress();

    // Simulamos un retardo en la respuesta de la API (por ejemplo, 2 segundos)
    setTimeout(() => {
      const simulatedSkills = ["excel", "powerbi", "python", "sql"];
      console.log("Simulación de API, skills recibidas:", simulatedSkills);
      setSkills(simulatedSkills);
      setUploadComplete(true);
      setShowTick(true);
      clearInterval(intervalId);
      setProgress(100);
      // Mostramos el tick verde y luego reseteamos el estado
      setTimeout(() => {
        setShowTick(false);
        setProgress(0);
        setLoading(false);
        // Reiniciamos el formulario y eliminamos el archivo seleccionado
        if (formRef.current) formRef.current.reset();
        setFile(null);
      }, 1500);
    }, 2000);
  };

  // Función original para enviar el CV a la API real
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
        console.log("Skills detectadas:", result.skills_detected);
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
        if (formRef.current) formRef.current.reset();
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

  // Función para detectar 4 clics en el componente <EarthCanvas /> en menos de 6 segundos
  const handleEarthCanvasClick = () => {
    if (loading) return; // Evita iniciar una nueva simulación si ya se está cargando

    const now = Date.now();
    if (!firstClickTimeRef.current) {
      // Primer clic: se registra el tiempo inicial y se establece el contador en 1
      firstClickTimeRef.current = now;
      clickCountRef.current = 1;
    } else {
      const diffSeconds = (now - firstClickTimeRef.current) / 1000;
      if (diffSeconds > 6) {
        // Si han pasado más de 6 segundos, reiniciamos el contador
        firstClickTimeRef.current = now;
        clickCountRef.current = 1;
      } else {
        // Si estamos dentro del límite, incrementamos el contador
        clickCountRef.current += 1;
        if (clickCountRef.current >= 4) {
          simulateApiCall();
          // Reiniciamos el contador después de activar la simulación
          clickCountRef.current = 0;
          firstClickTimeRef.current = null;
        }
      }
    }
  };

  // Se ha eliminado el useEffect que detectaba la combinación de teclas (a, s, d, f)
  // ya que ahora la simulación se activa con 4 clics en <EarthCanvas />.

  return (
    <>
      <div className="xl:mt-12 flex xl:flex-row flex-col-reverse gap-10">
        <motion.div
          variants={slideIn("left", "tween", 0.2, 1)}
          className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
        >
          <p className={styles.sectionSubText}>¡Prueba tú mismo!</p>
          <h3 className={styles.sectionHeadText}>Sube tu CV!</h3>

          <form ref={formRef} onSubmit={handleSubmit} className="mt-12 flex flex-col gap-8">
            <label className="flex flex-col">
              <span className="text-white font-medium mb-4">
                Sube tu archivo (.pdf, .png, .jpg, .jpeg)
              </span>
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
                <div className={`w-full bg-gray-700 rounded-full h-4 ${showTick ? "hidden" : ""}`}>
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

        <motion.div
          variants={slideIn("right", "tween", 0.2, 1)}
          className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
        >
          {/* Se envuelve <EarthCanvas /> en un div que detecta los clics */}
          <div onClick={handleEarthCanvasClick} className="w-full h-full">
            <EarthCanvas />
          </div>
        </motion.div>
      </div>

      {/* Render de JobRecommendations: se activa cuando hay skills */}
      {skills.length > 0 && <JobRecommendations skills={skills} />}
    </>
  );
};

export default SectionWrapper(Contact, "contact");
