import React from 'react'

interface Props {
    title: string,
    value: number | string
}

function FDashTab(props: Props) {
    const {} = props

    return (
        <div
              id="infoTab"
              className="h-[75%] w-[15%] glass text-my_white flex flex-col items-center place-content-center justify-between p-4 font-inter hover:drop-shadow-glow hover:border transition-all"
            >
              <span id="label" className="text-sm font-medium">
                {props.title}
              </span>

              <span id="value" className="text-lg font-light">
                {props.value}
              </span>
            </div>
    )
}

export default FDashTab
