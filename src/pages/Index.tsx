import LineChart from "@/components/linechart"
import Card from "@/components/card"
import useData from "@/data/use-data"

const Index = (props: any) => {
  let { data, isLoading, error } = useData()

  let bgColor = error ? "bg-red-400" : ""

  return (
    <>
      <Card className={`${bgColor} transition`} >
        <h1 className="font-semibold text-xl pb-2">Events per hour</h1>
        <p>Armed indicates that number of events that happened whilst armed. Conversely, unarmed events happened when the system was not armed</p>
        { isLoading && <p>Loading</p> }
        { error && <p>{error}</p> }
        { data && <LineChart /> }
      </Card>
    </>
  )
}

export default Index
