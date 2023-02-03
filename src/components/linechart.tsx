import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, Label } from 'recharts';

import { useState, useMemo } from "react";
import { HourlyTotal } from "@/data/types";

// Documentation from: https://recharts.org/en-US/api

type TempData = {
  [key: string]: {
    armed: number,
    unarmed: number
  } | null
}

type FormattedData = {
  name: string,
  armed: number,
  unarmed: number
}

const Chart = ({info}: {info: HourlyTotal[]}) => {
  if (!info) { return <></> }

  const [fmtData, setFmtData] = useState<FormattedData[]>([])

  useMemo(() => {
    let tempMap: TempData = {}


    const getDT = (key: string) => {
      let date = new Date(parseInt(key))

      return `${new Intl.DateTimeFormat('en-GB', { weekday: "long" }).format(date).slice(0, 3)} ${date.getHours()}:00`
    }

    info.forEach(element => {
      let pos = tempMap[element.date.$date.$numberLong]

      tempMap[element.date.$date.$numberLong] = {
        armed: element._id.armed ? element.count : pos?.armed || 0,
        unarmed: !element._id.armed ? element.count : pos?.unarmed || 0,
      }
    });

    const newData = Object.entries(tempMap)
    .sort((a, b) => {
      let larger = -1
      if (parseInt(a[0]) > parseInt(b[0])) {
        larger = 1
      }
      return larger
    })
    .map(([key, value]) => ({
      name: getDT(key),
      armed: value?.armed || 0,
      unarmed: value?.unarmed || 0
    }))

    setFmtData(newData)
  }, [info])

  return (
  <ResponsiveContainer width="90%" height="70%" className="m-10">
    <LineChart data={fmtData} margin={{
        bottom: 50,
        left: 20,
      }}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis
        dataKey="name"
        tick={{ fill: "#cbd5e1" }}
        tickLine={{ stroke: "#94a3b8" }}
        axisLine={{ stroke: "#94a3b8" }}
        textAnchor="end"
      >
        <Label value="Time" offset={40} position="bottom" className="text-white fill-current" />
      </XAxis>

      <YAxis
        tick={{ fill: "#cbd5e1" }}
        tickLine={{ stroke: "#94a3b8" }}
        axisLine={{ stroke: "#94a3b8" }}
        label={{ value: "Events per hour", angle: -90, position: "left", fill: "#fff" }}
        fill="white"
      />
      <Tooltip labelClassName="text-slate-700" wrapperClassName="rounded" />
      <Line type="monotone" dataKey="armed" stroke="#fb923c" />
      <Line type="monotone" dataKey="unarmed" stroke="#818cf8" />
      <Legend />
    </LineChart>
  </ResponsiveContainer>
  )
}

export default Chart

