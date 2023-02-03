import Button from "@/components/button"
import MsgBox from "@/components/msgbox"

import { useState } from "react"

const Register = () => {
  const [status, setStatus] = useState({ code: 0, error: "" })
  const [formName, setFormName] = useState("")
  const [formPWD, setFormPWD] = useState("")
  const [formEmail, setFormEmail] = useState("")

  const handle_register = async (event: SubmitEvent) => {
    event.preventDefault()

    const registerReq = {
      username: formName,
      password: formPWD,
      email: formEmail
    }

    let data = await fetch("http://127.0.0.1:8000/api/v1/auth/register", {
      method: "POST",
      body: JSON.stringify(registerReq),
    })

    setFormPWD("")
    setFormName("")
    setFormEmail("")

    const resp = await data.json()

    let status = {
      code: data.status,
      error: ""
    }

    if (resp.error) {
      status.error = resp.error
    }

    setStatus(status)
  }

  return (
    <div className="flex flex-col">
      <h1 className="text-3xl pb-3 font-semibold">Register</h1>
      <form onSubmit={handle_register} className="flex flex-col space-y-3">
        <input
          type="text"
          className="bg-slate-600 px-2 py-1 rounded"
          value={formName}
          placeholder="username"
          onChange={(e) => setFormName(e.target.value)}
        />
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
        {status.code > 0 && status.code != 200 && 
          <MsgBox color="bg-red-400">
            <p className="font-semibold">{ status.error }!</p>
          </MsgBox>
        }
        {status.code == 200 && 
          <MsgBox color="bg-green-400">
            <p className="font-semibold">Account Created!</p>
          </MsgBox>
        }
        <Button>
          <input type="submit" value="Submit" />
        </Button>
      </form>
    </div>
  )
}

export default Register

