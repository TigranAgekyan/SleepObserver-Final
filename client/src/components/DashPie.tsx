import React from 'react'

//* Recharts
import { Pie, PieChart } from 'recharts'

interface Props {
    data?: {
        n1: number,
        n2: number,
        n3: number,
        rem: number
      }
}

function DashPie(props: Props) {

    const uid = localStorage.getItem("userId");

    const data = [
        {
            name: 'Light Sleep',
            value: props.data?.n1
        },
        {
            name: 'Deeper Sleep',
            value: props.data?.n2
        },
        {
            name: 'Deep Sleep',
            value: props.data?.n3
        },
        {
            name: 'REM Sleep',
            value: props.data?.rem
        }
    ]

    const labels = (entry: any) => {
        return entry.name;
    }

    return (
        <div id="glass" className="h-full w-full glass flex place-content-center items-center">
            <PieChart width={400} height={400}>
                <Pie data={data} dataKey="value" cx="50%" cy="50%" outerRadius={100} fill="#D0A98F" label={labels} legendType='square' />
            </PieChart>
        </div>
    )
}

export default DashPie
