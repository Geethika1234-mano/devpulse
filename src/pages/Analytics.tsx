import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { week: "Week 1", prs: 5 },
  { week: "Week 2", prs: 8 },
  { week: "Week 3", prs: 3 },
  { week: "Week 4", prs: 7 },
];

export default function Analytics() {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">PR Activity Analytics</h2>
      <div className="h-64 bg-white/5 p-4 rounded-xl border border-white/10">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="week" stroke="#8884d8" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="prs" stroke="#60a5fa" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
