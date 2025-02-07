// LocationDistributionChart.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Brush,
} from "recharts";
import { fadeIn } from "../../utils/motion";
import { SectionWrapper } from "../../hoc";


const LocationDistributionChart = ({ data }) => {
  return (
    <>
      <motion.div
        variants={fadeIn("up", "spring", 0.3, 1)}
        initial="hidden"
        whileInView="show"
        className="mt-4"
      >
        <h2 className="text-white text-center text-4xl font-bold mb-6">
          Distribución de Ofertas por Ubicación
        </h2>
        <ResponsiveContainer
          width="100%"
          height={450}
          style={{
            fontSize: "20px",
            backgroundColor: "transparent",
            padding: "10px 0px",
            borderRadius: "10px",
          }}
        >
          <BarChart data={data} className="-ml-6">
            <CartesianGrid strokeDasharray="3 3" strokeOpacity="40%" />
            <XAxis dataKey="Ubicación" />
            <YAxis />
            <Tooltip />
            <Legend className="mt-5" />
            <Bar dataKey="Frecuencia" fill="#8884d8" />
            <Brush dataKey="Ubicación" height={30} stroke="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
      <motion.div
        variants={fadeIn("up", "spring", 0.3, 1)}
        initial="hidden"
        whileInView="show"
        className="mt-4"
      >
        <section className="py-8 bg-gray-900 text-white border border-white rounded">
          <div className="container mx-auto px-4">
            <p className="text-lg mb-6 text-center">
              Esta gráfica muestra la distribución geográfica de las ofertas de
              empleo, permitiéndote observar en qué ciudades se concentra la
              actividad laboral.
            </p>
          </div>
        </section>
      </motion.div>
    </>
  );
};

// Componente contenedor que realiza la llamada a la API y maneja la data
const LocationDistributionChartContainer = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://api-emplea-data.onrender.com/location-distribution")
      .then((response) => response.json())
      .then((apiData) => {
        // Opcional: ordenar los datos de mayor a menor frecuencia
        const sortedData = apiData.sort((a, b) => b.Frecuencia - a.Frecuencia);
        setData(sortedData);
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

  return <LocationDistributionChart data={data} />;
};

export default SectionWrapper(
  LocationDistributionChartContainer,
  "location-distribution-chart"
);
