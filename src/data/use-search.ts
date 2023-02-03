import { userAtom } from "@/state/atoms"
import { useAtom } from "jotai"
import { searchRequest } from "@/data/global"
import { useState } from "react"
import { HourlyTotal, Event, Command } from "@/data/types"


// Hook documentation at: https://beta.reactjs.org/learn/reusing-logic-with-custom-hooks

type Resp = {
  ok: boolean,
  status: number,
  error: string,
  data: {
    hourlyTotals: HourlyTotal[],
    lastCE: {
      events: Event[],
      commands: Command[]
    }
  } | null
}

function useSearch() {
  const [user, _setUser] = useAtom(userAtom)
  const [data, setData] = useState<Resp>({ ok: false, status: 0, error: "", data: null });
  const [fetching, setFetching] = useState(false)

  const search = async (req: URLSearchParams) => {
    if (!user.token) {return}
    setFetching(true)
    
    let resp = await searchRequest(user.token, req)

    setFetching(false)
    setData(resp)
  }

  return {
    isLoading: !data.error && !data.ok || data.status != 200,
    data: data.data,
    search,
    fetching,
  }
}

export default useSearch
