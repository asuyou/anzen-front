import Button from "@/components/button"
import MsgBox from "@/components/msgbox"

import { useState } from "react"
import { useAtom } from 'jotai'
import { userAtom } from "@/state/atoms"

const Login = () => {
  const [user, setUser] = useAtom(userAtom)
  const [error, setError] = useState("")
  const [formEmail, setFormEmail] = useState("")
  const [formPWD, setFormPWD] = useState("")

  const handle_login = async (event: SubmitEvent) => {
    event.preventDefault()

    const loginReq = {
      email: formEmail,
      password: formPWD
    }

    let data = await fetch("http://127.0.0.1:8000/api/v1/auth/login", {
      method: "POST",
      body: JSON.stringify(loginReq),
    })

    setFormPWD("")
    setFormEmail("")

    const resp = await data.json()

    if (resp.error) {
      setError(resp.error)
    } else {
      setError("")
      setUser(resp)
    }
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl pb-3 font-semibold">Login</h1>
      <form onSubmit={handle_login} className="flex flex-col space-y-3">
        <input
          type="text"
          className="bg-slate-600 px-2 py-1 rounded"
          value={formEmail}
          placeholder="email"
          onChange={(e) => setFormEmail(e.target.value)}
        />
        <input
          type="password"
          className="bg-slate-600 px-2 py-1 rounded"
          value={formPWD}
          placeholder="password"
          onChange={(e) => setFormPWD(e.target.value)}
        />
        {error && 
          <MsgBox color="bg-red-400">
            <p className="font-semibold">{ error }!</p>
          </MsgBox>
        }
        <Button>
          <input type="submit" value="Submit" />
        </Button>
      </form>
    </div>
  )
}

export default Login
