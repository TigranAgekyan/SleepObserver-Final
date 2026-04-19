import React from 'react'

import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from 'recharts'

interface Props {
    data: {
        cycleTime: string[],
        cycleTotals: {
          n1: number,
          n2: number,
          n3: number,
          rem: number
        },
        cycles: string[]
      }
}

function FCycleDashBarChart(props: Props) {
    const {} = props

    let data: {name: string, duration: number}[] = [];

    props.data.cycles.forEach((cycle, key) => {
        const start = new Date(props.data.cycleTime[key]).getTime();
        const end = new Date(props.data.cycleTime[key+1]).getTime();
        let duration = 2;
        if(key != props.data.cycles.length - 1){
            duration = (end - start)/1000/60/60;
        }
        let cycleName;
        if(cycle == 'n1'){
            cycleName='Light Sleep'
        }else if(cycle == 'n2'){
            cycleName='Deeper Sleep'
        }else if(cycle == 'n3'){
            cycleName='Deep Sleep'
        }else{
            cycleName='REM Sleep'
        }

        data.push({
            name: cycleName,
            duration: duration
        });
    });

    return (
        <div id="glass" className="w-full h-full glass">
            <div className="w-full h-[15%] flex place-content-end items-center px-6 text-my_white font-inter font-medium text-2xl">
            {
                "Sleep Cycles"
            }
            </div>

            <div className="w-full h-[85%] flex place-content-center items-center">
                <BarChart width={600} height={250} data={data}>
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="duration" fill="#D0A98F" />
                </BarChart>
            </div>
        </div>
    )
}

export default FCycleDashBarChart
