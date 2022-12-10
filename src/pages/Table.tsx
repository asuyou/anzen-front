import Card from "@/components/card"
import Table from "@/components/table"
import { Event } from "@/data/types"
import useData from "@/data/use-data"

import { uid } from "uid"

const EventTable = () => {
    let { isLoading, error, data } = useData()

    let bgColor = error ? "bg-red-400" : ""

    const accessor = (data: Event) => [
        new Date(parseInt(data.timestamp.$date.$numberLong)).toLocaleString(),
        data.device[0].name,
        data.plugin[0].name,
        "1"
    ]

    return (
        <>
            <Card>
                <h1 className="font-semibold text-xl pb-4">Last 10 Events</h1>
                { isLoading && <p>Loading</p> }
                { error && <p>{error}</p> }
                { data && 
                <div className="items-center justify-center flex">
                    <Table
                        data={data.lastCE.events}
                        headers={["Time", "Device", "Plugin", "Value"]}
                        accessor={accessor}
                        rowClass={() => "hover:bg-slate-800 transition"}
                        cellClass={() => "py-2 px-4 border border-l-0 border-r-0 border-slate-600"}
                        id={(data) => uid()}
                    />
                </div>
                }
            </Card>
        </>
    )
}

export default EventTable