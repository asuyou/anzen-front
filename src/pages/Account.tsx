import Button from "@/components/button"

import { useAtom } from 'jotai'
import { userAtom } from "@/state/atoms"
import Card from "@/components/card"
import { useEffect, useState } from "react"
import { fetchCurrentUser, updatePassword } from "@/data/global"
import useRequest from "@/data/use-request"

const Logout = () => {
  const { data, error, execute } = useRequest(updatePassword)
  const [user, setUser] = useAtom(userAtom)
  const [accountName, setAccountName] = useState("Loading")
  const [level, setLevel] = useState<string | number>("Loading")
  const [email, setEmail] = useState("Loading")
  const [created, setCreated] = useState("Loading")
  const [formPWD, setFormPWD] = useState("")

  useEffect(() => {
    fetchCurrentUser(user.token).then((data) => {
      let date = new Date(parseInt(data.data.created.$date.$numberLong)).toLocaleString()
      setAccountName(data.data.username)
      setLevel(data.data.level)
      setEmail(data.data.email)
      setCreated(date)
    })
  }, [])

  const logout = () => {
    setUser({username: "", token: ""})
  }

  const handlePasswordReset = async (event: SubmitEvent) => {
    event.preventDefault()

    await execute(formPWD)
    
    setFormPWD("")

    setUser({ username: "", token: "" })
  }

  return (
    <div className="space-y-3">
      <Card>
        <p className="pb-2">Currently logged in as <span className="rounded p-1 bg-slate-900">{ accountName }</span></p>
        <p className="pb-2">Email <span className="rounded p-1 bg-slate-900">{ email }</span></p>
        <p className="pb-2">Created at <span className="rounded p-1 bg-slate-900">{ created }</span></p>
        <p className="pb-2">Account level <span className="rounded p-1 bg-slate-900">{ level }</span></p>
        <Button onClick={logout}>logout</Button>
      </Card>
      <Card>
        <h2 className="text-xl font-semibold pb-2">Update password</h2>
        <form className="flex flex-col space-y-3" onSubmit={handlePasswordReset}>
          <input 
              type="password"
              className="bg-slate-600 px-2 py-1 rounded"
              value={formPWD}
              placeholder="password"
              onChange={(e) => setFormPWD(e.target.value)}
          />
            <Button>
              <input type="submit" value="Submit" />
            </Button>
        </form>
        { error && <p>Could not update password</p>}
        { data && <p>Updated!</p>}
      </Card>
    </div>
  )
}

export default Logout
