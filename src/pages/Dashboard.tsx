import Card from "@/components/card"
import Button from "@/components/button"
import useData from "@/data/use-data"

import Home from "@/pages/Home"
import EventTable from "@/pages/Table"
import { useState } from "react"
import useRequest from "@/data/use-request"
import { addEmail } from "@/data/global"

const Dashboard = () => {
  const { isLoading, data, refresh  } = useData()
  const { execute, } = useRequest(addEmail)
  const [formEmail, setFormEmail] = useState("")
  const [formPriority, setFormPriority] = useState(0)

  const handleAddEmail = async (event: SubmitEvent) => {
    event.preventDefault()

    await execute({ email: formEmail, priority: formPriority || 0})
  }

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex flex-row space-x-3">
        <Card className="flex flex-col justify-center max-w-xs">
          <div className="flex flex-row space-x-3 pb-3 justify-between">
            <p className="font-semibold text-lg">Status</p>
            <div className={`${data?.coreStatus.armed ? "bg-green-400" : "bg-red-400"} p-2 rounded`}>{data?.coreStatus.armed ? "Armed" : "Disarmed"}</div>
          </div>
          <Button onClick={refresh}>Toggle</Button>
        </Card>
        <Card>
          <h2 className="font-semibold text-lg">Add email</h2>
          <form className="flex flex-col space-y-3" onSubmit={handleAddEmail}>
            <input
                type="text"
                className="bg-slate-600 px-2 py-1 rounded"
                value={formEmail}
                placeholder="email"
                onChange={(e) => setFormEmail(e.target.value)}
            />
            <input
                type="number"
                className="bg-slate-600 px-2 py-1 rounded"
                value={formPriority}
                placeholder="priority"
                onChange={(e) => setFormPriority(parseInt(e.target.value))}
            />
            <Button>
              <input type="submit" value="Submit" />
            </Button>
        </form>
        </Card>
      </div>
      <Home />
      <EventTable />
    </div>
  )
}

export default Dashboard

