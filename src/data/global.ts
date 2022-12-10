const handleResponse = async (data: Response) => {
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

