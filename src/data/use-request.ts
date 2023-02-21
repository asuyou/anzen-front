import { userAtom } from "@/state/atoms"
import { useAtom } from "jotai"
import { ValidatedResponse } from "@/data/global"
import { useState } from "react"

// Hook documentation at: https://beta.reactjs.org/learn/reusing-logic-with-custom-hooks

function useRequest<T>(endpoint: (token: string, data: T) => Promise<ValidatedResponse> ) {
  const [data, setData] = useState<any>({})
  const [user, _setUser] = useAtom(userAtom)
  
  const execute = async (params: T) => {
    if (!user.token && !data.data) { return }

    let resp = await endpoint(user.token, params)
    
    if (resp.ok && resp.status == 200) {
      setData(resp)
    }
  }

  return {
    isLoading: !data.error && !data.ok && data.status != 200,
    error: data.error,
    data: data.data,
    execute
  }
}

export default useRequest

