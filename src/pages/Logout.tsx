import Button from "@/components/button"

import { useAtom } from 'jotai'
import { userAtom } from "@/state/atoms"
import Card from "@/components/card"

const Logout = () => {
  const [user, setUser] = useAtom(userAtom)

  const logout = () => {
    setUser({username: "", token: ""})
  }

  return (
    <Card>
      <p className="pb-2">Currently logged in as <span className="rounded p-1 bg-slate-900">{ user.username }</span></p>
      <Button onClick={logout}>logout</Button>
    </Card>
  )
}

export default Logout
