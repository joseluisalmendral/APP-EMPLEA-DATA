import React, { useEffect, useState } from "react";

const JobRecommendations = ({ skills }) => {
  // Estados para los trabajos
  const [loading, setLoading] = useState(false);
  const [jobs, setJobs] = useState([]);

  // Estados para categorías, weighted skills, skills del usuario y número de skills recomendadas
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [weightedData, setWeightedData] = useState(null);
  const [userSkills, setUserSkills] = useState(skills);
  const [numRecommended, setNumRecommended] = useState(5); // Número de skills recomendadas a mostrar

  // Obtener las categorías desde la API al montar el componente
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("https://api-emplea-data.onrender.com/categories/");
        if (response.ok) {
          const data = await response.json();
          if (data.categories && data.categories.length > 0) {
            setCategories(data.categories);
            setSelectedCategory(data.categories[0]); // Selecciona la primera por defecto
          }
        } else {
          console.error("Error al obtener categorías:", response.status);
        }
      } catch (error) {
        console.error("Error en la llamada a la API de categorías:", error);
      }
    };
    fetchCategories();
  }, []);

  // Cada vez que cambia la categoría seleccionada se llama a la API de weighted-skills
  useEffect(() => {
    if (selectedCategory) {
      const fetchWeightedData = async () => {
        try {
          const response = await fetch(
            `https://api-emplea-data.onrender.com/weighted-skills/?category=${encodeURIComponent(
              selectedCategory
            )}`
          );
          if (response.ok) {
            const data = await response.json();
            setWeightedData(data);
          } else {
            console.error("Error al obtener weighted skills:", response.status);
          }
        } catch (error) {
          console.error("Error en la llamada a weighted-skills:", error);
        }
      };
      fetchWeightedData();
    }
  }, [selectedCategory]);

  // Función para eliminar una skill de la lista del usuario
  const handleDeleteSkill = (skillToDelete) => {
    setUserSkills(userSkills.filter((skill) => skill !== skillToDelete));
  };

  // Función para agregar una skill (desde las recomendadas) a la lista del usuario
  const handleAddSkill = (skillToAdd) => {
    if (!userSkills.some((s) => s.toLowerCase() === skillToAdd.toLowerCase())) {
      setUserSkills([...userSkills, skillToAdd]);
    }
  };

  // Funciones para obtener recomendaciones de trabajos (lógica original)
  const fetchRecommendedJobIds = async (userSkillsList) => {
    const url = "https://api-emplea-data.onrender.com/recommend_jobs/";
    const params = {
      top_n: 10,
      similarity_threshold: 0.35,
    };
    const jsonData = { user_skills: userSkillsList };

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

  // Actualizar las ofertas de trabajo con debounce de 2 segundos al cambiar las skills del usuario
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (userSkills && userSkills.length > 0) {
        setLoading(true);
        const jobIds = await fetchRecommendedJobIds(userSkills);
        const jobDetails = await fetchJobDetailsByIds(jobIds);
        setJobs(jobDetails);
        setLoading(false);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [userSkills]);

  // Función para calcular la "Demanda" (número de ocurrencias y % sobre total)
  const calcularDemanda = (skillName) => {
    if (weightedData && weightedData.weighted_skills) {
      const match = weightedData.weighted_skills.find(
        (ws) => ws.skill.toLowerCase() === skillName.toLowerCase()
      );
      if (match) {
        const porcentaje = ((match.count / weightedData.total_offers) * 100).toFixed(2);
        return `${match.count} - ${porcentaje}%`;
      }
    }
    return `0 - 0%`;
  };

  // Obtener las skills recomendadas: filtrar las que el usuario no tiene, ordenar por count y tomar las primeras según numRecommended
  const obtenerSkillsRecomendadas = () => {
    if (weightedData && weightedData.weighted_skills) {
      const recomendadas = weightedData.weighted_skills
        .filter(
          (ws) =>
            !userSkills.some(
              (userSkill) => userSkill.toLowerCase() === ws.skill.toLowerCase()
            )
        )
        .sort((a, b) => b.count - a.count)
        .slice(0, numRecommended);
      return recomendadas;
    }
    return [];
  };

  return (
    <div className="mt-10 p-6 bg-gray-800 text-white rounded-xl">
      {/* Selector de Categoría centrado */}
      <div className="mb-4 flex flex-col items-center">
        <label htmlFor="category-selector" className="block mb-2 font-bold text-center">
          Selecciona una categoría:
        </label>
        <select
          id="category-selector"
          className="p-2 rounded bg-white text-black text-center"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Contenedor responsivo para las dos tablas */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Tabla de Skills Identificadas */}
        <div className="w-full md:w-1/2">
          <h4 className="font-bold mb-2 text-center">Skills Identificadas</h4>
          <table className="min-w-full bg-gray-700 mt-4 rounded">
            <thead>
              <tr>
                <th className="px-4 py-2 text-center">Acciones</th>
                <th className="px-4 py-2 text-center">Skill Identificada</th>
                <th className="px-4 py-2 text-center">Demanda</th>
              </tr>
            </thead>
            <tbody>
              {userSkills.map((skill, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2 text-center">
                    <button
                      onClick={() => handleDeleteSkill(skill)}
                      className="bg-rose-600 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Eliminar
                    </button>
                  </td>
                  <td className="border px-4 py-2 text-center">{skill}</td>
                  <td className="border px-4 py-2 text-center">{calcularDemanda(skill)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Tabla de Skills Recomendadas */}
        <div className="w-full md:w-1/2">
          <div className="flex text-center gap-3 justify-center items-center mb-2">
            <h4 className="font-bold text-center">Skills Recomendadas</h4>
            <div className="mt-1">
              <input
                id="numRecommended"
                type="number"
                min="1"
                value={numRecommended}
                onChange={(e) =>
                  setNumRecommended(parseInt(e.target.value, 10) || 1)
                }
                className="w-16 text-center rounded bg-gray-600 text-white py-0.5"
              />
            </div>
          </div>
          <table className="min-w-full bg-gray-700 rounded">
            <thead>
              <tr>
                <th className="px-4 py-2 text-center">Skill Recomendadas</th>
                <th className="px-4 py-2 text-center">Demanda</th>
              </tr>
            </thead>
            <tbody>
              {weightedData && weightedData.weighted_skills ? (
                obtenerSkillsRecomendadas().map((ws, index) => {
                  const porcentaje = ((ws.count / weightedData.total_offers) * 100).toFixed(2);
                  return (
                    <tr
                      key={index}
                      className="cursor-pointer hover:bg-gray-600 py-5"
                      onClick={() => handleAddSkill(ws.skill)}
                    >
                      <td className="border px-4 py-2 text-center">{ws.skill}</td>
                      <td className="border px-4 py-2 text-center">{`${ws.count} - ${porcentaje}%`}</td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td className="border px-4 py-2 text-center" colSpan="2">
                    Cargando recomendaciones...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sección de Recomendaciones de Trabajo */}
      <div>
        <h3 className="text-lg font-bold mb-4">Recomendaciones de Trabajo</h3>
        {loading ? (
          <p>Obteniendo las mejores ofertas para ti...</p>
        ) : jobs.length > 0 ? (
          <div className="space-y-6">
            {jobs.map((job) => (
              <div key={job._id} className="bg-white shadow-lg rounded-lg p-6 text-gray-900">
                {/* Título y Empresa */}
                <h2 className="text-3xl font-bold mb-2">{job.Titulo}</h2>
                <p className="text-base text-gray-600 mb-4">
                  {job.Empresa} - {job.Ubicacion}
                </p>

                {/* Contenedor responsivo para detalles */}
                <div className="flex flex-col md:flex-row gap-10">
                  {/* Información Principal */}
                  <div className="mb-4">
                    <p>
                      <span className="text-lg font-semibold">Salario:</span>{" "}
                      {Array.isArray(job.Salario) ? job.Salario.join(" - ") : job.Salario}
                    </p>
                    <p>
                      <span className="text-lg font-semibold">Experiencia mínima:</span>{" "}
                      {job["Experiencia minima"]}
                    </p>
                    <p>
                      <span className="text-lg font-semibold">Tipo de contrato:</span>{" "}
                      {job["Tipo de contrato"]}
                    </p>
                    <p>
                      <span className="text-lg font-semibold">Estudios mínimos:</span>{" "}
                      {Array.isArray(job["Estudios minimos"])
                        ? job["Estudios minimos"].join(", ")
                        : job["Estudios minimos"]}
                    </p>
                  </div>

                  {/* Skills del Job */}
                  <div>
                    <p className="text-lg font-semibold mb-2 flex items-center gap-4">
                      Skills:
                      {job.Skills.map((skill, index) => (
                        <span
                          key={index}
                          className="text-sm px-2 py-1 text-stone-950 bg-violet-100 border border-slate-800 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </p>
                  </div>
                </div>

                {/* Descripción */}
                <p className="text-xl font-semibold">Descripción</p>
                <p className="mb-4">{job.Descripcion}</p>

                {/* Datos Adicionales */}
                <div className="flex items-center justify-between">
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

                  <a target="_blank" className="py-4 px-2 text-white bg-purple-700 font-semibold border border-purple-800 rounded hover:text-lg transition-all" href="https://www.infojobs.net/"
                  style={{marginLeft: '-600px !important'}}>Ver Oferta</a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No se encontraron ofertas de trabajo.</p>
        )}
      </div>
    </div>
  );
};

export default JobRecommendations;
