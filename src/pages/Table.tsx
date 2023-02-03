import Card from "@/components/card"
import Table from "@/components/table"
import { Event, Command } from "@/data/types"
import useData from "@/data/use-data"

import { uid } from "uid"

const EventTable = () => {
    let { isLoading, error, data } = useData()

    const eventAccessor = (data: Event) => [
      new Date(parseInt(data.timestamp.$date.$numberLong)).toLocaleString(),
      data.device.name,
      data.plugin.name,
    ]

    const commandAccessor = (data: Command) => [
      new Date(parseInt(data.timestamp.$date.$numberLong)).toLocaleString(),
      data.plugin.name,
      data.data,
    ]

    const armed_bg = (armed: boolean) => (
      `hover:bg-slate-800 ${armed ? "bg-red-800/30" : ""} transition`
    )

    return (
        <div className="flex flex-col space-y-2">
          <Card>
              <h1 className="font-semibold text-xl pb-4">Last 10 Events</h1>
              { isLoading && <p>Loading</p> }
              { error && <p>{error}</p> }
              { data && 
              <div className="items-center justify-center flex">
                  <Table
                      data={data.lastCE.events}
                      headers={["Time", "Device", "Plugin"]}
                      accessor={eventAccessor}
                      rowClass={event => armed_bg(event.metadata.armed)}
                      cellClass={() => "py-2 px-4 border border-l-0 border-r-0 border-slate-600"}
                      id={() => uid()}
                  />
              </div>
              }
          </Card>
          <Card>
              <h1 className="font-semibold text-xl pb-4">Last 10 Commands</h1>
              { isLoading && <p>Loading</p> }
              { error && <p>{error}</p> }
              { data && 
              <div className="items-center justify-center flex">
                  <Table
                      data={data.lastCE.commands}
                      headers={["Time", "Plugin", "Value"]}
                      accessor={commandAccessor}
                      rowClass={command => armed_bg(command.metadata.armed_type == 1)}
                      cellClass={() => "py-2 px-4 border border-l-0 border-r-0 border-slate-600"}
                      id={() => uid()}
                  />
              </div>
              }
          </Card>
        </div>
    )
}

export default EventTable
