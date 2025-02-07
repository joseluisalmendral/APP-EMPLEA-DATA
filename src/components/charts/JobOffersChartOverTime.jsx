// JobOffersChart.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Brush
} from "recharts";

// Importa tu animación (ajusta según tu proyecto)
import { fadeIn } from "../../utils/motion";
// Si usas un HOC para secciones, por ejemplo:
import { SectionWrapper } from "../../hoc";

// Componente que renderiza el gráfico de líneas
const JobOffersChartOverTime = ({ data }) => {
  return (
    <>
      <motion.div
      variants={fadeIn("up", "spring", 0.3, 1)}
      initial="hidden"
      whileInView="show"
      className="mt-10"
      >
      <h2 className="text-white text-center text-4xl font-bold mb-4">
        Ofertas de Trabajo a lo largo del tiempo
      </h2>
      <ResponsiveContainer width="100%" height={450} style={{fontSize: "20px", backgroundColor: "transparent", padding: "10px 0px", borderRadius: "10px"}}>
        <LineChart data={data} className="-ml-6">
          <CartesianGrid strokeLinejoin="3 3" strokeOpacity="40%" />
          <XAxis dataKey="Mes" />
          <YAxis />
          <Tooltip />
          <Legend className="mt-5"/>
          <Line type="monotone" dataKey="Data Engineer" stroke="#8884d8"  />
          <Line type="monotone" dataKey="Data Analyst" stroke="#82ca9d" />
          <Line type="monotone" dataKey="Data Scientist" stroke="#ffc658"  />
          <Line
            type="monotone"
            dataKey="Data Security & Privacy"
            stroke="#ff7300"
          />
            <Brush stroke="#e032e6"  />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
    <motion.div
      variants={fadeIn("up", "spring", 0.3, 1)}
      initial="hidden"
      whileInView="show"
      className="mt-4"
    >
      <section className="py-8 bg-gray-900 text-white border-white border rounded">
        <div className="container mx-auto px-4 ">
          <p className="text-lg mb-6 text-center">
            Esta gráfica muestra cómo cambian las demandas del mercado 
            y qué perfiles están ganando relevancia. 
          </p>
          <p className="text-lg text-center">
            Por ejemplo, observamos cómo los roles de <span className="font-semibold text-indigo-400">Data Engineer</span> 
            y <span className="font-semibold text-orange-400">Data Security</span> están en auge, reflejando la creciente 
            importancia de la infraestructura de datos y la privacidad. Estas tendencias te ayudarán a planificar tu camino 
            profesional y a tomar decisiones informadas sobre tus próximos pasos.
          </p>
        </div>
      </section>

    </motion.div>
    </>

  );
};

// Componente contenedor que hace el fetch y transforma los datos
const JobOffersChartContainer = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para transformar la data:
  // Agrupa por "Mes" y para cada mes asigna la cantidad de ofertas por "Categoría"
  const transformData = (rawData) => {
    const grouped = {};
    rawData.forEach((item) => {
      const mes = item.Mes;
      const categoria = item["Categoría"];
      const cantidad = item["Cantidad de Ofertas"];
      if (!grouped[mes]) {
        grouped[mes] = { Mes: mes };
      }
      grouped[mes][categoria] = cantidad;
    });
    // Convertimos el objeto agrupado en un array y lo ordenamos (asumiendo formato "YYYY-MM")
    return Object.values(grouped).sort((a, b) =>
      a.Mes.localeCompare(b.Mes)
    );
  };

  useEffect(() => {
    fetch("https://api-emplea-data.onrender.com/job-offers-over-time")
      .then((response) => response.json())
      .then((apiData) => {
        const transformed = transformData(apiData);
        setData(transformed);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener la data:", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="text-white">Cargando datos...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500">
        Ocurrió un error al cargar los datos. Inténtalo nuevamente.
      </div>
    );
  }

  return <JobOffersChartOverTime data={data} />;
};


export default SectionWrapper(JobOffersChartContainer, "job-offers-chart");