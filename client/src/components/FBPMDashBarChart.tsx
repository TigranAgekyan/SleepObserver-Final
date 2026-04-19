import React from 'react'

import {Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis} from 'recharts'

interface Props {
    data: {bpm: number[], timeStamp: string[]}
}

function FBPMDashBarChart(props: Props) {
    const {} = props

    let data: {date: string, bpm: number}[] = [];

    props.data.bpm.forEach((bpm, key) => {
        data.push({
            date: props.data.timeStamp[key],
            bpm: bpm
        });
    });

    return (
        <div id="glass" className="w-full h-full glass">
            <div className="w-full h-[15%] flex place-content-end items-center px-6 text-my_white font-inter font-medium text-2xl">
            {
                "Heart BPM"
            }
            </div>

            <div className="w-full h-[85%] flex place-content-center items-center">
                <BarChart width={600} height={250} data={data}>
                    {/* <CartesianGrid strokeDasharray="3 3" /> */}
                    <XAxis dataKey="date" hide/>
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="bpm" fill="#D0A98F" />
                </BarChart>
            </div>
        </div>
    )
}

export default FBPMDashBarChart
