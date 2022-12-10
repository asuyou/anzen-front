import { APIData, dataAtom, userAtom } from "@/state/atoms"
import { useAtom } from "jotai"
import { toggleArmRequest } from "@/data/global"

function useData() {
  const [data, setData] = useAtom(dataAtom)
  const [user, _setUser] = useAtom(userAtom)
  
  data.data?.hourlyTotals.sort((value1, value2) => {
    return parseInt(value1.date.$date.$numberLong) - parseInt(value2.date.$date.$numberLong)
  })

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

