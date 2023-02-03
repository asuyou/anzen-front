import Card from "@/components/card"
import Button from "@/components/button"
import useData from "@/data/use-data"

import Home from "@/pages/Home"
import EventTable from "@/pages/Table"

const Dashboard = () => {
  const { isLoading, data, refresh  } = useData()

  return (
    <div className="flex flex-col space-y-2">
      <Card className="flex flex-col justify-center max-w-xs">
        <div className="flex flex-row space-x-3 pb-3 justify-between">
          <p className="font-semibold text-lg">Status</p>
          <div className={`${data?.coreStatus.armed ? "bg-green-400" : "bg-red-400"} p-2 rounded`}>{data?.coreStatus.armed ? "Armed" : "Disarmed"}</div>
        </div>
        <Button onClick={refresh}>Toggle</Button>
      </Card>
      <Home />
      <EventTable />
    </div>
  )
}

export default Dashboard

