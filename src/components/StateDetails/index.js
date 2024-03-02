import {useState, useEffect} from 'react'
// import {Line} from 'react-chartjs-2'
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  BarChart,
  Bar,
} from 'recharts'
import Header from '../Header'
import './index.css'

export default function StateDetails() {
  const [stateDetailData, setStateDetailData] = useState([])
  const requestUrl = 'https://apis.ccbp.in/covid19-timelines-data'
  useEffect(() => {
    const resultListData = []
    const fetchData = async () => {
      try {
        const response = await fetch(requestUrl, {
          method: 'GET',
        })
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const jsonData = await response.json()
        console.log(jsonData)

        setStateDetailData(jsonData)
        const keyNames = Object.keys(jsonData.AP.dates)
        console.log(keyNames)

        keyNames.forEach(element => {
          console.log('date: ', element)
          console.log('confirmed:', jsonData.AP.dates[element].total.confirmed)
          console.log('deceased:', jsonData.AP.dates[element].total.deceased)
          console.log('recovered:', jsonData.AP.dates[element].total.recovered)
          console.log('tested:', jsonData.AP.dates[element].total.tested)

          resultListData.push({
            date: element,
            confirmed: jsonData.AP.dates[element].total.confirmed,
          })
        })
        const filterDate = new Date('2021-10-26')
        setStateDetailData(
          resultListData.filter(item => {
            const itemDate = new Date(item.date)
            return itemDate > filterDate
          }),
        )
        console.log(stateDetailData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  function renderLineChart() {
    return (
      <div>
        <h1>Line Chart</h1>
        <div className="App">
          <LineChart
            width={730}
            height={250}
            data={stateDetailData}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="#8884d8" />
          </LineChart>
        </div>
      </div>
    )
  }

  function renderBarChart() {
    return (
      <div>
        <h1>Bar Chart</h1>
        <div>
          <BarChart width={1032} height={450} data={stateDetailData}>
            <CartesianGrid strokeDasharray="" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="confirmed"
              fill="#8884d8"
              className="bar"
              label={{position: 'top', color: 'white'}}
            />
          </BarChart>
        </div>
      </div>
    )
  }

  return (
    <div className="details-main-container">
      <Header />
      <div className="state-detail-container">
        <div>
          <h1 className="state-name">Andhara Pradesh</h1>
        </div>
        <div>
          <p>Tested</p>
          <p>20239390</p>
        </div>
        {renderBarChart()}
        {renderLineChart()}
      </div>
    </div>
  )
}
