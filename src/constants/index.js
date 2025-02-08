import {
  mobile,
  backend,
  creator,
  web,
  reactjs,
  nodejs,
  mongodb,
  docker,
  meta,
  starbucks,
  tesla,
  shopify,
  carrent,
  jobit,
  tripguide
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "Mercado Laboral",
  },
  {
    id: "work",
    title: "Sobre Nosotros",
  },
  {
    id: "contact",
    title: "Sube tu CV",
  },
];

const services = [
  {
    title: "Data Analyst",
    icon: web,
  },
  {
    title: "Data Scientist",
    icon: mobile,
  },
  {
    title: "Data Engineer",
    icon: backend,
  },
  {
    title: "Seguridad y Privacidad",
    icon: creator,
  },
];

const technologies = [
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "docker",
    icon: docker,
  }
];

const experiences = [
  {
    title: "React.js Developer",
    company_name: "Starbucks",
    icon: starbucks,
    iconBg: "#383E56",
    date: "March 2020 - April 2021",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "React Native Developer",
    company_name: "Tesla",
    icon: tesla,
    iconBg: "#E6DEDD",
    date: "Jan 2021 - Feb 2022",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Web Developer",
    company_name: "Shopify",
    icon: shopify,
    iconBg: "#383E56",
    date: "Jan 2022 - Jan 2023",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Full stack Developer",
    company_name: "Meta",
    icon: meta,
    iconBg: "#E6DEDD",
    date: "Jan 2023 - Present",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "Gracias a EMPLEA/DATA, descubrí las áreas que necesitaba mejorar para ser más empleable. ¡En menos de un mes recibí dos ofertas de trabajo alineadas con mis habilidades! Es como tener un mentor en tu bolsillo.",
    name: "María López",
    designation: "Analista de Datos Junior",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "Me sorprendió lo precisa que es la aplicación al recomendar ofertas. Me mostró oportunidades que no había encontrado en otros sitios y me ayudó a entender mejor dónde encajo en el mercado laboral.",
    name: "Juan Pérez",
    designation: "Científico de Datos",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "Esta herramienta me dio una visión clara del mercado laboral y me ayudó a saber exactamente qué habilidades desarrollar. Gracias a sus recomendaciones personalizadas, conseguí mi primera pasantía en una empresa de tecnología",
    name: "Ana Rodríguez",
    designation: "Estudiante de Ciencia de Datos",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Car Rent",
    description:
      "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "Job IT",
    description:
      "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      }
    ],
    image: jobit,
    source_code_link: "https://github.com/",
  },
  {
    name: "Trip Guide",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      }
    ],
    image: tripguide,
    source_code_link: "https://github.com/",
  },
];

const dataTips = [
  // Buenas prácticas y consejos
  "Divide y vencerás: separa tu código en funciones pequeñas y reutilizables.",
  "Comenta tu código, pero solo cuando sea realmente necesario.",
  "Las bases de datos indexadas mejoran la velocidad de las consultas.",
  "Aprende a escribir código limpio y mantenible, tu yo futuro te lo agradecerá.",
  "Usa estructuras de datos adecuadas para cada problema.",
  "Versiona tu código con Git para evitar pérdidas y facilitar el trabajo en equipo.",
  "Automatiza tareas repetitivas para ahorrar tiempo.",
  "Mantén tus dependencias actualizadas y revisa su seguridad.",
  "Recuerda: el 90% de los bugs se deben a un 10% del código, ¡así que revisa esa parte con lupa!",
  "La documentación es como un mapa del tesoro: imprescindible, pero a veces tan enigmático como un laberinto.",
  "El testing es el héroe no reconocido de cualquier aplicación: sin él, el caos reinaría.",
  
  // Chistes para el buen humor
  "¿Por qué los programadores siempre confunden Navidad y Halloween? Porque Oct 31 == Dec 25!",
  "¿Cómo se llama un programador en el gimnasio? ¡Un desarrollador de fuerza!",
  "¿Qué dijo el dataset cuando lo olvidaron? '¡Sin mí, no tienes contexto!'",
  "¿Por qué los científicos de datos aman los ascensores? Porque los elevan a un nivel superior de clustering.",
  "Un programador va a comprar leche. Su esposa le dice: 'Compra una leche y si hay huevos, compra una docena'. Vuelve con 12 leches. '¿Por qué trajiste 12 leches?' 'Porque había huevos'.",
  "SQL y NoSQL entran a un bar. SQL pregunta: '¿Puedo unirme a ti?' NoSQL responde: '¡No, gracias!'",
  "¿Por qué los científicos de datos son malos en las relaciones? Porque siempre están dividiendo sus datasets.",
  "¿Cómo se llama un programador en la playa? Un script kiddie.",
  "¿Por qué los modelos de Machine Learning siempre están tristes? Porque tienen demasiados sesgos.",
  "Dos bytes entran a un bar y uno le dice al otro: 'Creo que tengo un bug'. El otro responde: 'Sí, te ves un poco desbordado'.",
  "¿Por qué los programadores prefieren la oscuridad? Porque la luz atrae bugs.",
  "¿Por qué los programadores de Python nunca discuten? Porque siempre encuentran una solución elegante.",
  "Un científico de datos entra a una panadería y pide un pan. El panadero pregunta: '¿Cómo lo quiere?'. El científico responde: 'Normalizado, por favor'.",
  "¿Cómo se llama el primo matemático de Harry Potter? ¡Log-aritmo!",
  
  // Más curiosidades y humor
  "El hardware es la parte visible del iceberg; el software es el océano que lo sostiene.",
  "La depuración es como ser detective: cada pista en el código te acerca al misterioso bug.",
  "¿Qué le dijo el código al desarrollador? 'No me molestes, estoy en producción'.",
  "Un día, un desarrollador dijo: '¡Viva el open source!' y su computadora respondió: '¡Yo también, en mi kernel!'",
  "El aprendizaje continuo es el mantra de todo buen programador: ¡nunca dejes de hackear tu mente!",
  "¿Por qué el programador se quedó mirando su reloj? Porque esperaba que su bug tuviera un 'timeout'.",
  "¿Cuál es el colmo de un programador? Que su vida no compile con sus expectativas."
];

const skillsDocumentationExtended = {
  "azure": "https://learn.microsoft.com/en-us/azure/",
  "data mining": "https://en.wikipedia.org/wiki/Data_mining",
  "estadística descriptiva": "https://es.wikipedia.org/wiki/Estad%C3%ADstica_descriptiva",
  "auditoria de datos": "https://www.google.com/search?q=auditor%C3%ADa+de+datos",
  "kubernetes": "https://kubernetes.io/docs/home/",
  "gcp": "https://cloud.google.com/docs",
  "analisis crítico": "https://www.google.com/search?q=an%C3%A1lisis+cr%C3%ADtico",
  "google cloud": "https://cloud.google.com/docs",
  "nlp": "https://en.wikipedia.org/wiki/Natural_language_processing",
  "apachespark": "https://spark.apache.org/docs/latest/",
  "analisis critico": "https://www.google.com/search?q=an%C3%A1lisis+critico",
  "analisis": "https://www.google.com/search?q=an%C3%A1lisis",
  "data lakes": "https://www.google.com/search?q=data+lakes",
  "statistics": "https://en.wikipedia.org/wiki/Statistics",
  "etl processes": "https://www.google.com/search?q=etl+processes",
  "visualización de datos": "https://www.google.com/search?q=visualizaci%C3%B3n+de+datos",
  "pytorch": "https://pytorch.org/docs/",
  "excel": "https://support.microsoft.com/en-us/excel",
  "r": "https://www.r-project.org/",
  "seguridad": "https://www.google.com/search?q=seguridad",
  "seguridad de sistemas": "https://www.google.com/search?q=seguridad+de+sistemas",
  "big data tools": "https://www.google.com/search?q=big+data+tools",
  "hadoop": "https://hadoop.apache.org/docs/",
  "datalakes": "https://www.google.com/search?q=datalakes",
  "apache spark": "https://spark.apache.org/docs/latest/",
  "data analysis": "https://en.wikipedia.org/wiki/Data_analysis",
  "bigdata": "https://en.wikipedia.org/wiki/Big_data",
  "machine learning": "https://www.google.com/search?q=machine+learning",
  "sql": "https://www.w3schools.com/sql/",
  "analisis predictivo": "https://www.google.com/search?q=an%C3%A1lisis+predictivo",
  "apache kafka": "https://kafka.apache.org/documentation/",
  "estadistica descriptiva": "https://es.wikipedia.org/wiki/Estad%C3%ADstica_descriptiva",
  "gdpr": "https://gdpr-info.eu/",
  "powerbi": "https://learn.microsoft.com/en-us/power-bi/",
  "analisiscritico": "https://www.google.com/search?q=an%C3%A1lisiscritico",
  "cloud platforms": "https://www.google.com/search?q=cloud+platforms",
  "iso 27001": "https://www.iso.org/iso-27001-information-security.html",
  "aws": "https://aws.amazon.com/documentation/",
  "tensorflow": "https://www.tensorflow.org/learn",
  "data warehouses": "https://www.google.com/search?q=data+warehouses",
  "trabajoenequipo": "https://www.google.com/search?q=trabajo+en+equipo",
  "Estado no completado": "https://www.google.com/search?q=estado+no+completado",
  "comunicacion": "https://www.google.com/search?q=comunicaci%C3%B3n",
  "auditoría de datos": "https://www.google.com/search?q=auditor%C3%ADa+de+datos",
  "comunicacion efectiva": "https://www.google.com/search?q=comunicación+efectiva",
  "comunicación": "https://www.google.com/search?q=comunicación",
  "análisis crítico": "https://www.google.com/search?q=an%C3%A1lisis+cr%C3%ADtico",
  "bi": "https://www.google.com/search?q=business+intelligence",
  "gestión de riesgos": "https://www.google.com/search?q=gesti%C3%B3n+de+riesgos",
  "tableau": "https://www.tableau.com/learn/training",
  "visualizacion": "https://www.google.com/search?q=visualizaci%C3%B3n",
  "docker": "https://docs.docker.com/",
  "data warehousing": "https://www.google.com/search?q=data+warehousing",
  "visualización": "https://www.google.com/search?q=visualizaci%C3%B3n",
  "data visualization": "https://en.wikipedia.org/wiki/Data_visualization",
  "spark": "https://spark.apache.org/docs/latest/",
  "etl": "https://www.google.com/search?q=etl",
  "kafka": "https://kafka.apache.org/documentation/",
  "sistemas de seguridad": "https://www.google.com/search?q=sistemas+de+seguridad",
  "nosql": "https://www.google.com/search?q=nosql",
  "análisis de datos": "https://en.wikipedia.org/wiki/Data_analysis",
  "elt": "https://www.google.com/search?q=elt",
  "cloud computing": "https://www.google.com/search?q=cloud+computing",
  "analisis de datos": "https://www.google.com/search?q=an%C3%A1lisis+de+datos",
  "big data": "https://en.wikipedia.org/wiki/Big_data",
  "gestion de riesgos": "https://www.google.com/search?q=gesti%C3%B3n+de+riesgos",
  "iso27001": "https://www.iso.org/iso-27001-information-security.html",
  "keras": "https://keras.io/",
  "airflow": "https://airflow.apache.org/docs/",
  "datawarehouses": "https://www.google.com/search?q=data+warehouses",
  "visualizacion de datos": "https://www.google.com/search?q=visualizaci%C3%B3n+de+datos",
  "deep learning": "https://en.wikipedia.org/wiki/Deep_learning",
  "trabajo en equipo": "https://www.google.com/search?q=trabajo+en+equipo",
  "python": "https://docs.python.org/3/"
};
// Función para normalizar (pasar a minúsculas y eliminar acentos)
const normalizeSkill = (skill) =>
  skill
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

// Creamos un objeto con las claves ya normalizadas
export const skillsDocumentation = Object.keys(skillsDocumentationExtended).reduce((acc, key) => {
  acc[normalizeSkill(key)] = skillsDocumentationExtended[key];
  return acc;
}, {});

export { services, technologies, experiences, testimonials, projects, dataTips };
