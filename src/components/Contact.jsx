import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

const Contact = () => {
  const formRef = useRef();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [skills, setSkills] = useState([]); // Estado para almacenar las habilidades detectadas
  const [buttonText, setButtonText] = useState("Enviar");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const simulateProgress = () => {
    setProgress(0);
    let timeElapsed = 0;
    const totalTime = 130; // 130 segundos (2 minutos y 10 segundos)
    const interval = setInterval(() => {
      timeElapsed += 1;
      setProgress((prev) => Math.min(prev + (100 / totalTime), 100));
      if (timeElapsed >= totalTime) {
        clearInterval(interval);
      }
    }, 1000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Por favor, selecciona un archivo antes de enviar.");
      return;
    }

    setLoading(true);
    setButtonText("Cargando...");
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

      setSkills(result.skills_detected || []); // Guardar las habilidades detectadas
      setButtonText("SKILLS IDENTIFICADAS");
      setLoading(false);
      setProgress(0);
    } catch (error) {
      console.error("Error al procesar el archivo:", error);
      alert("Error al procesar el archivo.");
      setLoading(false);
      setProgress(0);
      setButtonText("Enviar");
    }
  };

  return (
    <div className={`xl:mt-12 flex xl:flex-row flex-col-reverse gap-10 overflow-hidden`}>
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
              <div className="loader mb-4"></div>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <div
                  className="bg-green-500 h-4 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-white mt-2">{Math.floor(progress)}%</p>
            </div>
          )}

          <button
            type="submit"
            className="bg-tertiary py-3 px-8 rounded-xl outline-none w-fit text-white font-bold shadow-md shadow-primary"
          >
            {buttonText}
          </button>
        </form>

        {skills.length > 0 && (
          <div className="mt-8">
            <h4 className="text-white text-lg font-bold mb-4">Habilidades Detectadas:</h4>
            <table className="w-full text-white bg-gray-800 rounded-lg">
              <thead>
                <tr>
                  <th className="border border-gray-700 px-4 py-2">#</th>
                  <th className="border border-gray-700 px-4 py-2">Habilidad</th>
                </tr>
              </thead>
              <tbody>
                {skills.map((skill, index) => (
                  <tr key={index}>
                    <td className="border border-gray-700 px-4 py-2 text-center">{index + 1}</td>
                    <td className="border border-gray-700 px-4 py-2">{skill}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </motion.div>

      <motion.div variants={slideIn("right", "tween", 0.2, 1)} className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]">
        <EarthCanvas />
      </motion.div>

      <style>{`
        .loader {
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top: 4px solid #fff;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
