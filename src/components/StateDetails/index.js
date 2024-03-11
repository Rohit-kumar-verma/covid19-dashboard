import {useState, useEffect} from 'react'

import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  BarChart,
  Bar,
  //   ResponsiveContainer,
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
          //   console.log('date: ', element)
          //   console.log('confirmed:', jsonData.AP.dates[element].total.confirmed)
          //   console.log('deceased:', jsonData.AP.dates[element].total.deceased)
          //   console.log('recovered:', jsonData.AP.dates[element].total.recovered)
          //   console.log('tested:', jsonData.AP.dates[element].total.tested)

          resultListData.push({
            date: element,
            confirmed: jsonData.AP.dates[element].total.confirmed,
          })
        })
        const filterDate = new Date('2021-10-21')
        setStateDetailData(
          resultListData.filter(item => {
            const itemDate = new Date(item.date)
            return itemDate > filterDate
          }),
        )
        console.log(resultListData)

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
          <LineChart width={730} height={250} data={stateDetailData}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="confirmed" stroke="#9A0E31" />
          </LineChart>
        </div>
      </div>
    )
  }

  function renderBarChart() {
    return (
      <div className="bar-chart-block flex items-center">
        <BarChart width={600} height={400} data={stateDetailData}>
          <Bar
            dataKey="confirmed"
            fill="#9A0E31"
            className="bar-chart"
            label={{
              position: 'top',
              color: 'white',
              fontSize: '12',
            }}
          />
        </BarChart>
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
