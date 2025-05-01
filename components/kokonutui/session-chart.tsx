"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Updated data to use only green, yellow, and red statuses
const data = [
  {
    name: "Mon",
    Compliant: 12,
    "Security Risk": 8,
    Violations: 2,
  },
  {
    name: "Tue",
    Compliant: 15,
    "Security Risk": 10,
    Violations: 3,
  },
  {
    name: "Wed",
    Compliant: 18,
    "Security Risk": 7,
    Violations: 1,
  },
  {
    name: "Thu",
    Compliant: 14,
    "Security Risk": 9,
    Violations: 2,
  },
  {
    name: "Fri",
    Compliant: 16,
    "Security Risk": 11,
    Violations: 2,
  },
]

export default function SessionChart() {
  return (
    <ResponsiveContainer width="100%" height="100%" minHeight={450}>
      <BarChart
        width={500}
        height={350}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 30,
          bottom: 20,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis width={30} axisLine={false} tickLine={false} tickMargin={10} />
        <Tooltip />
        <Legend
          verticalAlign="bottom"
          height={20}
          wrapperStyle={{
            paddingTop: 0,
            marginBottom: 0,
            position: "relative",
            bottom: 0,
          }}
        />
        <Bar dataKey="Compliant" stackId="a" fill="#10b981" /> {/* Green */}
        <Bar dataKey="Security Risk" stackId="a" fill="#eab308" /> {/* Yellow */}
        <Bar dataKey="Violations" stackId="a" fill="#ef4444" /> {/* Red */}
      </BarChart>
    </ResponsiveContainer>
  )
}
