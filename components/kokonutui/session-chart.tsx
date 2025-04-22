"use client"

import { XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, BarChart, Bar, Tooltip } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

// Sample data for the compliance trends chart - updated to include orange and purple
const data = [
  { date: "Mar 21", green: 12, yellow: 4, orange: 2, purple: 2, red: 1 },
  { date: "Mar 22", green: 15, yellow: 3, orange: 3, purple: 1, red: 2 },
  { date: "Mar 23", green: 18, yellow: 5, orange: 2, purple: 2, red: 0 },
  { date: "Mar 24", green: 14, yellow: 6, orange: 3, purple: 3, red: 3 },
  { date: "Mar 25", green: 16, yellow: 4, orange: 2, purple: 2, red: 2 },
  { date: "Mar 26", green: 13, yellow: 5, orange: 3, purple: 2, red: 4 },
  { date: "Mar 27", green: 17, yellow: 3, orange: 2, purple: 3, red: 1 },
]

export default function SessionChart() {
  return (
    <ChartContainer
      config={{
        green: {
          label: "Compliant",
          color: "hsl(142, 76%, 36%)",
        },
        yellow: {
          label: "Concerns",
          color: "hsl(45, 93%, 47%)",
        },
        orange: {
          label: "Security Risk",
          color: "hsl(24, 95%, 53%)",
        },
        purple: {
          label: "Suspicious Activity",
          color: "hsl(280, 67%, 50%)",
        },
        red: {
          label: "Violations",
          color: "hsl(0, 84%, 60%)",
        },
      }}
      className="h-[300px] w-full flex justify-center items-center"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 30, left: 10, bottom: 50 }} barSize={20}>
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis dataKey="date" scale="point" padding={{ left: 20, right: 20 }} tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
          <Tooltip content={<ChartTooltipContent />} cursor={{ fill: "rgba(0, 0, 0, 0.05)" }} />
          <Legend
            wrapperStyle={{
              paddingTop: 15,
              width: "100%",
              textAlign: "center",
            }}
            iconSize={10}
            fontSize={12}
            align="center"
            verticalAlign="bottom"
            layout="horizontal"
          />
          <Bar dataKey="green" stackId="a" fill="var(--color-green)" name="Compliant" radius={[4, 4, 0, 0]} />
          <Bar dataKey="yellow" stackId="a" fill="var(--color-yellow)" name="Concerns" radius={[0, 0, 0, 0]} />
          <Bar dataKey="orange" stackId="a" fill="var(--color-orange)" name="Security Risk" radius={[0, 0, 0, 0]} />
          <Bar
            dataKey="purple"
            stackId="a"
            fill="var(--color-purple)"
            name="Suspicious Activity"
            radius={[0, 0, 0, 0]}
          />
          <Bar dataKey="red" stackId="a" fill="var(--color-red)" name="Violations" radius={[0, 0, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

