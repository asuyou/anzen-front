import { fetchStats } from "@/data/global"
import { dataAtom, userAtom } from "@/state/atoms"
import { useAtom } from "jotai"
import { useEffect } from "react"

const DataFetching = (props: React.PropsWithChildren<any>) => {
  const [globalData, setData] = useAtom(dataAtom)
  const [user, _setUser] = useAtom(userAtom)

  const fetch = async () => {
    if (!user.token) {return}

    try {
      let data = await fetchStats(user.token)
      setData({...data, error: ""})
    } catch {
      let insert_err = {
        ...globalData,
        error: "Could not fetch data from API"
      }
      setData(insert_err)
    }
  }

  useEffect(() => {
    const interval = setInterval(fetch, 5_000)

    return () => clearInterval(interval)
  }, [user.token])

  useEffect(() => {
    fetch()
      .then(() => {})
  }, [])
  
  return (
    <>
      { props.children }
    </>
  )
}

export default DataFetching
