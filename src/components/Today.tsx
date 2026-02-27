'use client'
import {useEffect, useState} from "react";
import {formatMinSec, PomoData} from "@/lib/utils";



export default function Today() {
  // SELECT * FROM PomoTask WHERE DATE(StartTime) = date('now');
  const [pomoData, setPomoData] = useState<PomoData[]>([]);

  // Fetch data from your API
  useEffect(() => {
    fetch('/api/get-today/')
      .then(res => res.json())
      .then((res) => {
        setPomoData(res)
        console.log(res)
      });
  }, []);

  return(
    <div className={"h-full w-full"}>
      {pomoData.map(p => (
        <div>
          <p key={p.pomo_id}>{formatMinSec(p.starttime, p.endtime)}</p>
          <p key={p.pomo_id}>{p.title}</p>
        </div>
        ))}

    </div>
  )
}