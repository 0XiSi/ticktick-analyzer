'use client'
import { useState, useEffect } from 'react';
import {HabitData} from "@/lib/utils";

export default function HabitYearView() {
  const [habitData, setHabitData] = useState<HabitData[]>([]);
  const [selectedHabit, setSelectedHabit] = useState<string | null>(null);

  // Fetch data from your API
  useEffect(() => {
    fetch('/api/get-habits/')
      .then(res => res.json())
      .then((res) => {
        setHabitData(res)
        console.log(res)
      });
  }, []);

  function clicked(habit: HabitData) {
    console.log(habit.id)
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">2024 Habit Analysis</h1>

      {/* Habit selector */}
      <select onChange={(e) => setSelectedHabit(e.target.value)}>
        {habitData.map(h => (
          <option key={h.id} value={h.name}>{h.name}</option>
        ))}
      </select>
      <br/>
      {habitData.map(h => (
        <>
          <button
            style={{backgroundColor: h.color}} key={h.id}
            onClick={
              () => clicked(h)
            }
          >{h.name}</button>
          <br/>
        </>
      ))}
      {/* Year heatmap - perfect for visualizing daily streaks */}
      {/*<HeatMap*/}
      {/*  startDate={new Date('2024-01-01')}*/}
      {/*  endDate={new Date('2024-12-31')}*/}
      {/*  values={habitData}*/}
      {/*  classForValue={(value) => {*/}
      {/*    if (!value) return 'color-empty';*/}
      {/*    return `color-scale-${Math.min(value.count, 4)}`;*/}
      {/*  }}*/}
      {/*/>*/}

      {/* Time tracking chart - Commented out as it is incomplete */}
      {/*
      <LineChart width={800} height={400} data={timeData}>
        <Line type="monotone" dataKey="minutes" stroke="#8884d8" />
        <XAxis dataKey="date" />
        <YAxis />
      </LineChart>
      {/**!/*/}
    </div>
  );
}
