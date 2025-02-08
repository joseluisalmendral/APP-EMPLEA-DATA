import React, { useEffect, useState, useRef } from "react";
import { skillsDocumentation } from "../constants";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Función para normalizar las skills (minúsculas, sin acentos y sin espacios extra)
const normalizeSkill = (skill) =>
  skill
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

const JobRecommendations = ({ skills }) => {
  // Estados para trabajos y paginación
  const [jobs, setJobs] = useState([]);
  const [allJobIds, setAllJobIds] = useState([]);
  const [jobOffset, setJobOffset] = useState(0);
  const [jobsPerPage, setJobsPerPage] = useState(3);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  // Otros estados (categorías, weighted skills, skills del usuario, número de skills recomendadas)
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [weightedData, setWeightedData] = useState(null);
  const [userSkills, setUserSkills] = useState(skills);
  const [numRecommended, setNumRecommended] = useState(5);

  // Ref para el contenedor del spinner (loader)
  const loaderRef = useRef(null);

  // --- Categorías y weighted skills ---
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

  // Funciones para agregar/eliminar skills del usuario
  const handleDeleteSkill = (skillToDelete) => {
    setUserSkills(userSkills.filter((skill) => normalizeSkill(skill) !== normalizeSkill(skillToDelete)));
  };

  const handleAddSkill = (skillToAdd) => {
    if (!userSkills.some((s) => normalizeSkill(s) === normalizeSkill(skillToAdd))) {
      setUserSkills([...userSkills, skillToAdd]);
    }
  };

  // --- Funciones para obtener ofertas de trabajo ---
  const fetchRecommendedJobIds = async (userSkillsList) => {
    const url = "https://api-emplea-data.onrender.com/recommend_jobs/";
    // Se solicita un top_n alto para obtener muchos IDs y poder paginar localmente
    const params = {
      top_n: 100,
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

  // Al cambiar las skills del usuario, se obtienen los IDs recomendados y se carga la primera tanda de ofertas
  useEffect(() => {
    const fetchJobs = async () => {
      if (userSkills && userSkills.length > 0) {
        setLoading(true);
        const jobIds = await fetchRecommendedJobIds(userSkills);
        setAllJobIds(jobIds);
        if (jobIds.length > 0) {
          const initialJobIds = jobIds.slice(0, jobsPerPage);
          const jobDetails = await fetchJobDetailsByIds(initialJobIds);
          setJobs(jobDetails);
          setJobOffset(jobsPerPage);
        } else {
          setJobs([]);
          setJobOffset(0);
        }
        setLoading(false);
      }
    };
    fetchJobs();
  }, [userSkills]);

  // Al cambiar el número de ofertas por página, se reinicia la paginación (usando los IDs ya obtenidos)
  useEffect(() => {
    const resetJobs = async () => {
      if (allJobIds.length > 0) {
        setLoading(true);
        const initialJobIds = allJobIds.slice(0, jobsPerPage);
        const jobDetails = await fetchJobDetailsByIds(initialJobIds);
        setJobs(jobDetails);
        setJobOffset(jobsPerPage);
        setLoading(false);
      }
    };
    resetJobs();
  }, [jobsPerPage, allJobIds]);

  // Función para cargar la siguiente tanda de ofertas
  const loadMoreJobs = async () => {
    if (jobOffset >= allJobIds.length) return;
    setLoadingMore(true);
    const nextJobIds = allJobIds.slice(jobOffset, jobOffset + jobsPerPage);
    const moreJobDetails = await fetchJobDetailsByIds(nextJobIds);
    setJobs((prevJobs) => [...prevJobs, ...moreJobDetails]);
    setJobOffset(jobOffset + jobsPerPage);
    setLoadingMore(false);
  };

  // Observer que dispara la carga de más ofertas cuando el spinner es visible
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 1.0,
    };

    const observerCallback = (entries) => {
      if (
        entries[0].isIntersecting &&
        !loadingMore &&
        !loading &&
        jobOffset < allJobIds.length
      ) {
        loadMoreJobs();
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loaderRef, loadingMore, loading, jobOffset, allJobIds]);

  // --- Funciones para Skills recomendadas y cálculo de demanda ---
  const calcularDemanda = (skillName) => {
    if (weightedData && weightedData.weighted_skills) {
      const match = weightedData.weighted_skills.find(
        (ws) => normalizeSkill(ws.skill) === normalizeSkill(skillName)
      );
      if (match) {
        const porcentaje = ((match.count / weightedData.total_offers) * 100).toFixed(2);
        return `${match.count} - ${porcentaje}%`;
      }
    }
    return `0 - 0%`;
  };

  const obtenerSkillsRecomendadas = () => {
    if (weightedData && weightedData.weighted_skills) {
      const recomendadas = weightedData.weighted_skills
        .filter(
          (ws) =>
            !userSkills.some(
              (userSkill) => normalizeSkill(userSkill) === normalizeSkill(ws.skill)
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
      {/* Contenedor para selector de categoría y total de ofertas */}
      <div className="mb-8 flex flex-col md:flex-row items-center justify-around">
        <div className="flex items-center gap-4">
          <label htmlFor="category-selector" className="text-2xl mt-1 block mb-2 font-bold">
            Categoría:
          </label>
          <select
            id="category-selector"
            className="p-2 rounded bg-white text-black"
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
        <div className="mt-4 text-2xl md:mt-0">
          <span className="font-bold">Ofertas Totales: </span>
          <span>{weightedData ? weightedData.total_offers : 0}</span>
        </div>
      </div>

      {/* Gráfico de Skills más demandadas */}
      {weightedData && weightedData.weighted_skills && (
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-center mb-4">Skills más demandadas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weightedData.weighted_skills} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis dataKey="skill" tick={{ fill: "#fff" }} />
              <YAxis tick={{ fill: "#fff" }} />
              <Tooltip contentStyle={{ backgroundColor: "#333", border: "none" }} labelStyle={{ color: "#fff" }} />
              <Legend wrapperStyle={{ color: "#fff" }} />
              <Bar dataKey="count">
                {weightedData.weighted_skills.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      userSkills.some(
                        (us) => normalizeSkill(us) === normalizeSkill(entry.skill)
                      )
                        ? "#82ca9d" // Color resaltado para skills identificadas
                        : "#8884d8" // Color por defecto para el resto
                    }
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Contenedor responsivo para las tablas de Skills Identificadas y Recomendadas */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Tabla de Skills Identificadas */}
        <div className="w-full md:w-1/2">
          <h3 className="text-lg font-bold mb-2 text-center">Skills Identificadas</h3>
          <table className="min-w-full bg-gray-700 mt-4 rounded">
            <thead>
              <tr>
                <th className="px-4 py-2 text-center">Acciones</th>
                <th className="px-4 py-2 text-center">Skill Identificada</th>
                <th className="px-4 py-2 text-center">
                  Demanda
                  <span
                    className="ml-1 text-blue-400 cursor-pointer"
                    title="El número de la izquierda corresponde al número de ofertas en las que aparece esa skill y el número de la derecha es el porcentaje frente al total."
                  >
                    ?
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {[...userSkills]
                .sort((a, b) => {
                  // Se busca la demanda (count) de cada skill usando la función normalizeSkill
                  const wsA = weightedData && weightedData.weighted_skills.find(
                    (ws) => normalizeSkill(ws.skill) === normalizeSkill(a)
                  );
                  const wsB = weightedData && weightedData.weighted_skills.find(
                    (ws) => normalizeSkill(ws.skill) === normalizeSkill(b)
                  );
                  const countA = wsA ? wsA.count : 0;
                  const countB = wsB ? wsB.count : 0;
                  return countB - countA;
                })
                .map((skill, index) => (
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
            <h4 className="text-lg font-bold text-center">Skills Recomendadas</h4>
            <div className="mt-1">
              <input
                id="numRecommended"
                type="number"
                min="1"
                value={numRecommended}
                onChange={(e) => setNumRecommended(parseInt(e.target.value, 10) || 1)}
                className="w-16 text-center rounded bg-gray-600 text-white py-0.5"
              />
            </div>
          </div>
          <table className="mt-3 min-w-full bg-gray-700 rounded">
            <thead>
              <tr>
                <th className="px-4 py-2 text-center">Skill Recomendada</th>
                <th className="px-4 py-2 text-center">
                  Demanda
                  <span
                    className="ml-1 text-blue-400 cursor-pointer"
                    title="El número de la izquierda corresponde al número de ofertas en las que aparece esa skill y el número de la derecha es el porcentaje frente al total."
                  >
                    ?
                  </span>
                </th>
                <th className="px-4 py-2 text-center">Doc.</th>
              </tr>
            </thead>
            <tbody>
              {weightedData && weightedData.weighted_skills ? (
                obtenerSkillsRecomendadas().map((ws, index) => {
                  const porcentaje = ((ws.count / weightedData.total_offers) * 100).toFixed(2);
                  return (
                    <tr
                      key={index}
                      className="cursor-pointer text-center hover:bg-gray-600 py-5"
                      onClick={() => handleAddSkill(ws.skill)}
                    >
                      <td className="border px-4 py-2 text-center">{ws.skill}</td>
                      <td className="border px-4 py-2 text-center">{`${ws.count} - ${porcentaje}%`}</td>
                      <td className="border px-4 py-2 text-center">
                        {skillsDocumentation[normalizeSkill(ws.skill)] ? (
                          <a
                            href={skillsDocumentation[normalizeSkill(ws.skill)]}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            title={`Ver documentación de ${ws.skill}`}
                            className="flex justify-center"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6 text-blue-400 hover:text-blue-200"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 110 20 10 10 0 010-20z"
                              />
                            </svg>
                          </a>
                        ) : (
                          <span className="text-gray-500">N/A</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td className="border px-4 py-2 text-center" colSpan="3">
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
        <div className="flex justify-between items-center gap-4 mb-4">
          <h3 className="text-3xl font-bold">Recomendaciones de Trabajo</h3>
          <div className="flex items-center gap-2">
            <label htmlFor="jobsPerPage" className="text-2xl font-bold">
              Ofertas por página:
            </label>
            <input
              id="jobsPerPage"
              type="number"
              min="1"
              value={jobsPerPage}
              onChange={(e) => setJobsPerPage(parseInt(e.target.value, 10) || 1)}
              className="w-16 text-xl text-center rounded bg-gray-600 text-white py-0.5"
            />
          </div>
        </div>
        {loading ? (
          <p>Obteniendo las mejores ofertas para ti...</p>
        ) : jobs.length > 0 ? (
          <div className="space-y-6">
            {jobs.map((job) => (
              <div key={job._id} className="bg-white shadow-lg rounded-lg p-6 text-gray-900">
                <h2 className="text-3xl font-bold mb-2">{job.Titulo}</h2>
                <p className="text-base text-gray-600 mb-4">
                  {job.Empresa} - {job.Ubicacion}
                </p>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="mb-4">
                    <p>
                      <span className="text-lg font-semibold">Salario:</span>{" "}
                      {(Array.isArray(job.Salario) && job.Salario.length > 1)
                        ? job.Salario.join("€ - ") + "€"
                        : job.Salario}
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
                <p className="text-xl font-semibold">Descripción</p>
                <div className="group">
                  <p className="mb-4 max-h-[4.5rem] overflow-hidden transition-all duration-[670ms] ease-in-out group-hover:max-h-[500px]">
                    {job.Descripcion}
                  </p>
                </div>
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
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    className="md:mr-5 py-4 px-2 text-white bg-purple-700 font-semibold border border-purple-800 rounded hover:text-lg transition-all"
                    href="https://www.infojobs.net/"
                  >
                    Ver Oferta
                  </a>
                </div>
              </div>
            ))}
            {/* Spinner para cargar más ofertas (observado por el IntersectionObserver) */}
            {jobOffset < allJobIds.length && (
              <div ref={loaderRef} className="flex justify-center items-center py-4">
                {loadingMore && (
                  <svg className="animate-spin h-8 w-8 text-white" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                  </svg>
                )}
              </div>
            )}
          </div>
        ) : (
          <p>No se encontraron ofertas de trabajo.</p>
        )}
      </div>
    </div>
  );
};

export default JobRecommendations;
