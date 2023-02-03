import Card from "@/components/card"
import Button from "@/components/button"
import { ChangeEvent, PropsWithChildren } from "react"
import useSearchParam from "@/data/use-search-param";
import Table from "@/components/table"
import { uid } from "uid"
import { Event, Command } from "@/data/types"
import useSearch from "@/data/use-search";
import LineChart from "@/components/linechart"

const Search = () => {
  let { getParam, setParam, moveLocation } = useSearchParam()
  let { isLoading, data, search, fetching } = useSearch()

  let bgColor = ""

  if (!isLoading && !data) {
    bgColor = "bg-red-400"
  } else if (fetching) {
    bgColor = "bg-blue-400"
  }

  const setStartDate = (event: ChangeEvent<HTMLInputElement>) => {
    setParam("start", event.target.valueAsDate?.toISOString())
  }

  const setEndDate = (event: ChangeEvent<HTMLInputElement>) => {
    setParam("end", event.target.valueAsDate?.toISOString())
  }

  const setArmed = (event: ChangeEvent<HTMLInputElement>) => {
    setParam("armed", event.target.value)
  }

  const setDevice = (event: ChangeEvent<HTMLInputElement>) => {
    setParam("device", event.target.value)
  }

  const setPlugin = (event: ChangeEvent<HTMLInputElement>) => {
    setParam("plugin", event.target.value)
  }

  const submit = (event: SubmitEvent) => {
    event.preventDefault()

    let params = moveLocation()

    search(params).then(() => {
      console.log(data)
    }).catch(() => {
      bgColor = "bg-red-400"
    })
  }

  const eventAccessor = (data: Event) => [
    new Date(parseInt(data.timestamp.$date.$numberLong)).toLocaleString(),
    data.device.name,
    data.plugin.name,
  ]

  const commandAccessor = (data: Command) => [
    new Date(parseInt(data.timestamp.$date.$numberLong)).toLocaleString(),
    data.plugin.name,
    // data.data,
    ""
  ]


  const armed_bg = (armed: boolean) => (
    `hover:bg-slate-800 ${armed ? "bg-red-800/30" : ""} transition`
  )

  return (
    <div className="space-y-3 flex flex-col">
      <h1 className="text-3xl font-semibold">Search</h1>
      <Card>
        <form
          className="flex flex-row flex-wrap gap-4"
          action="https://localhost:8000/api/v1/data/search"
          method="GET"
          onSubmit={submit}
        >
          <Label>
            <p className="font-semibold">Start Date:</p>
            <input
              type="date"
              name="start"
              className="bg-slate-600 px-2 py-1 rounded"
              placeholder="Start Date"
              defaultValue={getParam("start")?.substring(0,10) || ""}
              onChange={setStartDate}
            />
          </Label>
          <Label>
            <p className="font-semibold">End Date:</p>
            <input
              type="date"
              name="end"
              className="bg-slate-600 px-2 py-1 rounded"
              placeholder="Start Date"
              defaultValue={getParam("end")?.substring(0,10) || ""}
              onChange={setEndDate}
            />
          </Label>
          <Label>
            <p className="font-semibold">Armed:</p>
            <select
              className="bg-slate-600 px-2 py-1 rounded"
              name="armed"
              defaultValue={getParam("armed") || "any"}
              onChange={setArmed}
            >
              <option value="any">Any</option>
              <option value="armed">Armed</option>
              <option value="unarmed">Unarmed</option>
            </select>
          </Label>
          <Label>
            <p className="font-semibold">Device:</p>
            <input
              type="text"
              className="bg-slate-600 px-2 py-1 rounded resize-x"
              placeholder="Device Name"
              name="device"
              defaultValue={getParam("device") || ""}
              onChange={setDevice}
            />
          </Label>
          <Label>
            <p className="font-semibold">Plugin:</p>
            <input
              type="text"
              className="bg-slate-600 px-2 py-1 rounded"
              placeholder="Plugin Name"
              name="plugin"
              defaultValue={getParam("plugin") || ""}
              onChange={setPlugin}
            />
          </Label>
          <Button>
            <input type="submit" value="Submit" />
          </Button>
        </form>
      </Card>
      <Card className={`${bgColor} transition pb-5`}>
        <h2 className="font-semibold text-xl">Events</h2>
        { fetching && <p>Loading</p> }
        { data && <LineChart info={data.hourlyTotals} />}
      </Card>
      <Card className={`${bgColor} transition`}>
        <h2 className="font-semibold text-xl">Data</h2>
        { fetching && <p>Loading</p> }
        { data && 
          <div className="flex space-x-2">
            <div className="items-center justify-center flex">
                <Table
                    data={data.lastCE.events}
                    headers={["Time", "Device", "Plugin"]}
                    accessor={eventAccessor}
                    rowClass={event => armed_bg(event.metadata.armed)}
                    cellClass={() => "py-2 px-4 border border-l-0 border-r-0 border-slate-600"}
                    id={() => (uid())}
                />
            </div>
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
          </div>
        }
      </Card>
    </div>
  )
}

const Label = (props: PropsWithChildren) => (
  <label className="flex flex-col space-y-2">
    {props.children}
  </label>
)

export default Search
