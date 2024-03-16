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
import Footer from '../Footer'
import Counter from '../Counter'
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
        const keyNames = Object.keys(jsonData.AN.dates)
        console.log(keyNames)

        keyNames.forEach(element => {
          //   console.log('date: ', element)
          //   console.log('confirmed:', jsonData.AP.dates[element].total.confirmed)
          //   console.log('deceased:', jsonData.AP.dates[element].total.deceased)
          //   console.log('recovered:', jsonData.AP.dates[element].total.recovered)
          //   console.log('tested:', jsonData.AP.dates[element].total.tested)

          resultListData.push({
            date: element,
            confirmed: jsonData.AN.dates[element].total.confirmed,
            deceased: jsonData.AN.dates[element].total.deceased,
            recovered: jsonData.AN.dates[element].total.recovered,
            tested: jsonData.AN.dates[element].total.tested,
            active:
              jsonData.AN.dates[element].total.confirmed -
              (jsonData.AN.dates[element].total.deceased +
                jsonData.AN.dates[element].total.recovered),
          })
        })
        setStateDetailData(resultListData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  function renderConfirmedLineChart() {
    return (
      <div>
        <div className="confirmed chart-block">
          <LineChart width={900} height={300} data={stateDetailData}>
            <XAxis dataKey="date" stroke="#9A0E31" tick={{fontSize: 12}} />
            <YAxis stroke="#9A0E31" tick={{fontSize: 12}} />
            <Tooltip />
            <Line type="monotone" dataKey="confirmed" stroke="#9A0E31" />
          </LineChart>
        </div>
      </div>
    )
  }

  function renderActiveLineChart() {
    return (
      <div>
        <div className="active chart-block">
          <LineChart width={900} height={300} data={stateDetailData}>
            <XAxis dataKey="date" stroke="#007BFF" tick={{fontSize: 12}} />
            <YAxis stroke="#007BFF" tick={{fontSize: 12}} />
            <Tooltip />
            <Line type="monotone" dataKey="active" stroke="#007BFF" />
          </LineChart>
        </div>
      </div>
    )
  }

  function renderDeceasedLineChart() {
    return (
      <div>
        <div className="deceased chart-block">
          <LineChart width={900} height={300} data={stateDetailData}>
            <XAxis dataKey="date" stroke="#6C757D" tick={{fontSize: 12}} />
            <YAxis stroke="#6C757D" tick={{fontSize: 12}} />
            <Tooltip />
            <Line type="monotone" dataKey="deceased" stroke="#6C757D" />
          </LineChart>
        </div>
      </div>
    )
  }
  function renderRecoveredLineChart() {
    return (
      <div>
        <div className="recovered chart-block">
          <LineChart width={900} height={300} data={stateDetailData}>
            <XAxis dataKey="date" stroke="#27A243" tick={{fontSize: 12}} />
            <YAxis stroke="#27A243" tick={{fontSize: 12}} />
            <Tooltip />
            <Line type="monotone" dataKey="recovered" stroke="#27A243" />
          </LineChart>
        </div>
      </div>
    )
  }
  function renderTestedLineChart() {
    return (
      <div>
        <div className="tested chart-block">
          <LineChart width={900} height={300} data={stateDetailData}>
            <XAxis dataKey="date" stroke="#9673B9" tick={{fontSize: 12}} />
            <YAxis stroke="#9673B9" tick={{fontSize: 12}} />
            <Tooltip />
            <Line type="monotone" dataKey="tested" stroke="#9673B9" />
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
        <>
          <Counter />
        </>
        <>
          {renderBarChart()}
          {renderConfirmedLineChart()}
          {renderActiveLineChart()}
          {renderRecoveredLineChart()}
          {renderDeceasedLineChart()}
          {renderTestedLineChart()}
        </>
        <Footer />
      </div>
    </div>
  )
}
