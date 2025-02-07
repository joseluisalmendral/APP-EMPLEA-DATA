import { useState, useEffect } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { ComputersCanvas } from "./canvas";

const Hero = () => {
  // Estado para determinar si el dispositivo es Android
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    // Verifica que navigator esté disponible (por ejemplo, en SSR no lo está)
    if (typeof navigator !== "undefined") {
      const userAgent = navigator.userAgent || navigator.vendor || window.opera;
      // Si el userAgent contiene "Android", entonces es un dispositivo Android
      if (/Android/i.test(userAgent)) {
        setIsAndroid(true);
      }
    }
  }, []);

  return (
    <section className="relative w-full h-screen mx-auto">
      <div
        className={`absolute inset-0 top-[120px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        <div>
          <h1 className={`${styles.heroHeadText} text-white`}>
            EMPLEA<span className="text-[#915EFF]">/DATA</span>
          </h1>
          <p className={`${styles.heroSubText} mt-2 text-white-100`}>
            TU CAMINO HACIA EL EMPLEO <br className="sm:block hidden" />
            GUIADO POR DATOS.
          </p>
        </div>
      </div>

      {/* Sólo renderizamos el componente ComputersCanvas si no es Android */}
      {!isAndroid && <ComputersCanvas />}

      <div className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
        <a href="#about">
          <div className="w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2">
            <motion.div
              animate={{ y: [0, 24, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className="w-3 h-3 rounded-full bg-secondary mb-1"
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
