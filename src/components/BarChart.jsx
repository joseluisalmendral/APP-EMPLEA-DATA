import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { SectionWrapper } from "../hoc";

const data = [
  { name: 'Enero', value: 400 },
  { name: 'Febrero', value: 300 },
  { name: 'Marzo', value: 500 },
  { name: 'Abril', value: 200 },
  { name: 'Mayo', value: 600 }
];

const BarChartComponent = () => {
  return (
    <div className="w-full h-80 p-4 bg-white shadow-md rounded-2xl">
      <h2 className="text-xl font-semibold text-center mb-4">Gráfico de Barras</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#4F46E5" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SectionWrapper(BarChartComponent, 'BarChartComponent');