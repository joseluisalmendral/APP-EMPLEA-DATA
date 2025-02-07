import React from "react";
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";


const ServiceCard = ({ index, title, icon }) => (
  <Tilt 
    tiltMaxAngleX={45} 
    tiltMaxAngleY={45} 
    scale={1} 
    transitionSpeed={450} 
    className='xs:w-[250px] w-full'
  >
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.75)}
      className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
    >
      <div
        className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
      >
        <img
          src={icon}
          alt={title}
          className='w-16 h-16 object-contain'
        />
        <h3 className='text-white text-[20px] font-bold text-center'>
          {title}
        </h3>
      </div>
    </motion.div>
  </Tilt>
);

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introducción</p>
        <h2 className={styles.sectionHeadText}>El Poder de los Datos</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-3 text-secondary text-[20px] max-w-5xl leading-[32px]"
      >
        En un mundo impulsado por los datos, identificar las oportunidades laborales adecuadas puede ser un desafío. 
        ¿Qué puestos son los más demandados? ¿Qué habilidades necesitas para destacar en cada rol? Nuestra plataforma 
        está diseñada para responder a estas preguntas, ayudándote a navegar el complejo panorama del mercado laboral 
        en el mundo del data. Explora las tendencias, descubre las habilidades clave y conecta con las oportunidades 
        que están dando forma al futuro. ¡Empieza tu viaje hacia una carrera en datos hoy mismo!
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>

    </>
  );
};

export default SectionWrapper(About, "about");