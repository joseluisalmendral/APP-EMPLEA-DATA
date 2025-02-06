import React, { useEffect, useState } from "react";

const JobRecommendations = ({ skills }) => {
  // Estado para controlar la carga y almacenar los detalles de los trabajos
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);

  // Función para obtener IDs de trabajos recomendados
  const fetchRecommendedJobIds = async (skills) => {
    const url = "https://api-emplea-data.onrender.com/recommend_jobs/";
    const params = {
      top_n: 10,
      similarity_threshold: 0.35,
    };
    const jsonData = { user_skills: skills };

    try {
      const response = await fetch(
        `${url}?top_n=${params.top_n}&similarity_threshold=${params.similarity_threshold}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(jsonData),
        }
      );

      if (response.status === 200) {
        const recommendedJobs = await response.json();
        return recommendedJobs.map((job) => job._id);
      } else {
        console.error("Error al obtener IDs de trabajos recomendados:", response.status);
        return [];
      }
    } catch (error) {
      console.error("Error en la llamada a /recommend_jobs/:", error);
      return [];
    }
  };

  // Función para obtener detalles de los trabajos a partir de sus IDs
  const fetchJobDetailsByIds = async (jobIds) => {
    if (!jobIds || jobIds.length === 0) {
      console.warn("⚠ No hay IDs de ofertas para buscar detalles. Terminando proceso.");
      return [];
    }

    const url = "https://api-emplea-data.onrender.com/get_jobs_by_ids/";
    const jsonData = { job_ids: jobIds };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      });

      if (response.status === 200) {
        const jobDetails = await response.json();
        return jobDetails;
      } else {
        console.error("Error al obtener detalles de los trabajos:", response.status);
        return [];
      }
    } catch (error) {
      console.error("Error en la llamada a /get_jobs_by_ids/:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      // Obtenemos los IDs recomendados
      const jobIds = await fetchRecommendedJobIds(skills);
      // Obtenemos los detalles a partir de los IDs y los almacenamos en el estado
      const jobDetails = await fetchJobDetailsByIds(jobIds);
      setJobs(jobDetails);
      setLoading(false);
    };

    if (skills && skills.length > 0) {
      fetchJobs();
    }
  }, [skills]);

  return (
    <div className="mt-10 p-6 bg-gray-800 text-white rounded-xl">
      {/* Tabla de Skills identificadas */}
      {skills && skills.length > 0 && (
        <div className="mb-6">
          <h4 className="font-bold mb-2">Skills identificadas:</h4>
          <table className="min-w-full bg-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Skill</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((skill, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{skill}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {loading ? (
        <p>Obteniendo las mejores ofertas para ti...</p>
      ) : (
        <>
          <h3 className="text-lg font-bold mb-4">Recomendaciones de Trabajo</h3>
          {jobs.length > 0 ? (
            <div className="space-y-6">
              {jobs.map((job) => (
                <div key={job._id} className="bg-white shadow-lg rounded-lg p-6 text-gray-900">
                  {/* Título y Empresa */}
                  <h2 className="text-2xl font-bold mb-2">{job.Titulo}</h2>
                  <p className="text-sm text-gray-600 mb-4">
                    {job.Empresa} - {job.Ubicacion}
                  </p>

                  {/* Información Principal */}
                  <div className="mb-4">
                    <p>
                      <span className="font-semibold">Salario:</span>{" "}
                      {Array.isArray(job.Salario) ? job.Salario.join(", ") : job.Salario}
                    </p>
                    <p>
                      <span className="font-semibold">Experiencia mínima:</span> {job["Experiencia minima"]}
                    </p>
                    <p>
                      <span className="font-semibold">Tipo de contrato:</span> {job["Tipo de contrato"]}
                    </p>
                    <p>
                      <span className="font-semibold">Estudios mínimos:</span>{" "}
                      {Array.isArray(job["Estudios minimos"])
                        ? job["Estudios minimos"].join(", ")
                        : job["Estudios minimos"]}
                    </p>
                  </div>

                  {/* Descripción */}
                  <p className="mb-4">{job.Descripcion}</p>

                  {/* Datos Adicionales */}
                  <div className="text-sm text-gray-500 mb-4">
                    <p>
                      <span className="font-semibold">Referencia:</span> {job.Referencia}
                    </p>
                    <p>
                      <span className="font-semibold">Categoría Original:</span> {job.cat_original}
                    </p>
                    <p>
                      <span className="font-semibold">Categoría Identificada:</span> {job.cat_identificada}
                    </p>
                    <p>
                      <span className="font-semibold">Fecha:</span> {job.fecha}
                    </p>
                  </div>

                  {/* Skills del Job */}
                  <div>
                    <p className="font-semibold mb-2">Skills:</p>
                    <ul className="list-disc list-inside">
                      {job.Skills.map((skill, index) => (
                        <li key={index}>{skill}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No se encontraron ofertas de trabajo.</p>
          )}
        </>
      )}
    </div>
  );
};

export default JobRecommendations;
