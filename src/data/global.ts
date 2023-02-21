export type ValidatedResponse = {
  ok: boolean,
  status: Response["status"],
  error: string,
  data: any
}

// Documentation used: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API

const handleResponse = async (data: Response): Promise<ValidatedResponse> => {
  let isOk = data.ok
  let status = data.status

  let jsonData = await data.json()

  return {
    ok: isOk,
    status: status,
    error: jsonData.error,
    data: jsonData.data
  }
}

export const fetchStats = async (token: string) => {
  let data = await fetch("http://127.0.0.1:8000/api/v1/data/stats", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return await handleResponse(data)
}

export const toggleArmRequest = async (token: string) => {
  let data = await fetch("http://127.0.0.1:8000/api/v1/data/toggle", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return await handleResponse(data)
}

export const searchRequest = async (
  token: string,
  req: URLSearchParams
  ) => {
  let data = await fetch("http://localhost:8000/api/v1/data/search?" + req.toString(), {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return await handleResponse(data)
}

export const fetchCurrentUser = async (token: string) => {
  let data = await fetch("http://localhost:8000/api/v1/users/user", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return await handleResponse(data)
}

type passwordData = {
  password: string
}

export const updatePassword = async (token: string, data: passwordData) => {
  const updateReq = {
    password: data.password
  }
  let newData = await fetch("http://127.0.0.1:8000/api/v1/users/updatepassword", {
    method: "POST",
    body: JSON.stringify(updateReq),
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return await handleResponse(newData)
}

type emailData = {
  email: string,
  priority: number
}

export const addEmail = async (token: string, data: emailData) => {
  const emailReq = {
    email: data.email,
    priority: data.priority
  }

  let newData = await fetch("http://127.0.0.1:8000/api/v1/corefuncs/", {
    method: "POST",
    body: JSON.stringify(emailReq),
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  return await handleResponse(newData)
}

