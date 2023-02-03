import { APIData, dataAtom, userAtom } from "@/state/atoms"
import { useAtom } from "jotai"
import { toggleArmRequest } from "@/data/global"

// Hook documentation at: https://beta.reactjs.org/learn/reusing-logic-with-custom-hooks

function useData() {
  const [data, setData] = useAtom(dataAtom)
  const [user, _setUser] = useAtom(userAtom)
  
  const refresh = async () => {
    if (!user.token && !data.data) { return }

    let resp = await toggleArmRequest(user.token)

    if (resp.ok && resp.status == 200) {
      let dataCopy: APIData  = JSON.parse(JSON.stringify(data))
  
      dataCopy.data!.coreStatus!.armed = !data.data?.coreStatus.armed
  
      setData(dataCopy)
    }
  }

  return {
    isLoading: !data.error && !data.ok && data.status != 200,
    error: data.error,
    data: data.data,
    refresh
  }
}

export default useData

