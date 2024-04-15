import {useState, useEffect} from 'react'

import {
  LineChart,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  BarChart,
  Legend,
  Bar,
  LabelList,
} from 'recharts'
import Header from '../Header'
import Footer from '../Footer'
import Counter from '../Counter'
import LoadingSpinner from '../LoadingSpinner'
import './index.css'

const statesList = [
  {
    state_code: 'AN',
    state_name: 'Andaman and Nicobar Islands',
  },
  {
    state_code: 'AP',
    state_name: 'Andhra Pradesh',
  },
  {
    state_code: 'AR',
    state_name: 'Arunachal Pradesh',
  },
  {
    state_code: 'AS',
    state_name: 'Assam',
  },
  {
    state_code: 'BR',
    state_name: 'Bihar',
  },
  {
    state_code: 'CH',
    state_name: 'Chandigarh',
  },
  {
    state_code: 'CT',
    state_name: 'Chhattisgarh',
  },
  {
    state_code: 'DN',
    state_name: 'Dadra and Nagar Haveli and Daman and Diu',
  },
  {
    state_code: 'DL',
    state_name: 'Delhi',
  },
  {
    state_code: 'GA',
    state_name: 'Goa',
  },
  {
    state_code: 'GJ',
    state_name: 'Gujarat',
  },
  {
    state_code: 'HR',
    state_name: 'Haryana',
  },
  {
    state_code: 'HP',
    state_name: 'Himachal Pradesh',
  },
  {
    state_code: 'JK',
    state_name: 'Jammu and Kashmir',
  },
  {
    state_code: 'JH',
    state_name: 'Jharkhand',
  },
  {
    state_code: 'KA',
    state_name: 'Karnataka',
  },
  {
    state_code: 'KL',
    state_name: 'Kerala',
  },
  {
    state_code: 'LA',
    state_name: 'Ladakh',
  },
  {
    state_code: 'LD',
    state_name: 'Lakshadweep',
  },
  {
    state_code: 'MH',
    state_name: 'Maharashtra',
  },
  {
    state_code: 'MP',
    state_name: 'Madhya Pradesh',
  },
  {
    state_code: 'MN',
    state_name: 'Manipur',
  },
  {
    state_code: 'ML',
    state_name: 'Meghalaya',
  },
  {
    state_code: 'MZ',
    state_name: 'Mizoram',
  },
  {
    state_code: 'NL',
    state_name: 'Nagaland',
  },
  {
    state_code: 'OR',
    state_name: 'Odisha',
  },
  {
    state_code: 'PY',
    state_name: 'Puducherry',
  },
  {
    state_code: 'PB',
    state_name: 'Punjab',
  },
  {
    state_code: 'RJ',
    state_name: 'Rajasthan',
  },
  {
    state_code: 'SK',
    state_name: 'Sikkim',
  },
  {
    state_code: 'TN',
    state_name: 'Tamil Nadu',
  },
  {
    state_code: 'TG',
    state_name: 'Telangana',
  },
  {
    state_code: 'TR',
    state_name: 'Tripura',
  },
  {
    state_code: 'UP',
    state_name: 'Uttar Pradesh',
  },
  {
    state_code: 'UT',
    state_name: 'Uttarakhand',
  },
  {
    state_code: 'WB',
    state_name: 'West Bengal',
  },
]

export default function StateDetails(props) {
  const {match} = props
  const {params} = match
  const {stateCode} = params
  console.log(stateCode)
  const [isLoading, setIsLoading] = useState(false)
  const [stateDetailData, setStateDetailData] = useState([])
  const [stateDetailDataBar, setStateDetailDataBar] = useState([])
  useEffect(() => {
    const resultListData = []
    setIsLoading(true)
    const fetchData = async () => {
      try {
        const requestUrl = `https://apis.ccbp.in/covid19-timelines-data/${stateCode}`
        const response = await fetch(requestUrl, {
          method: 'GET',
        })
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const jsonData = await response.json()
        console.log(jsonData)

        setStateDetailData(jsonData)
        const keyNames = Object.keys(jsonData[stateCode].dates)
        console.log(keyNames)

        keyNames.forEach(element => {
          resultListData.push({
            date: element,
            confirmed: jsonData[stateCode].dates[element].total.confirmed,
            deceased: jsonData[stateCode].dates[element].total.deceased,
            recovered: jsonData[stateCode].dates[element].total.recovered,
            tested: jsonData[stateCode].dates[element].total.tested,
            active:
              jsonData[stateCode].dates[element].total.confirmed -
              (jsonData[stateCode].dates[element].total.deceased +
                jsonData[stateCode].dates[element].total.recovered),
          })
        })
        setStateDetailData(resultListData)
        setStateDetailDataBar(
          resultListData.map(item => {
            const newDate = new Date(item.date)
            const dayNumber = newDate.getDate()
            const monthAbbreviation = newDate
              .toLocaleString('default', {month: 'short'})
              .slice(0, 3)
            return {...item, date: `${dayNumber} ${monthAbbreviation}`}
          }),
        )
        setIsLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [stateCode])

  function renderConfirmedLineChart() {
    return (
      <div className="confirmed chart-block">
        <LineChart width={1000} height={300} data={stateDetailData}>
          <XAxis dataKey="date" stroke="#9A0E31" tick={{fontSize: 12}} />
          <YAxis stroke="#9A0E31" tick={{fontSize: 12}} />
          <Tooltip />
          <Legend
            layout="vertical"
            align="right"
            verticalAlign="top"
            wrapperStyle={{
              position: 'absolute',
              right: '0px',
              top: '0px',
              padding: '10px',
            }}
            payload={[{value: 'confirmed', color: 'red', type: 'line'}]}
          />
          <Line type="monotone" dataKey="confirmed" stroke="#9A0E31" />
        </LineChart>
      </div>
    )
  }

  function renderActiveLineChart() {
    return (
      <div>
        <div className="active chart-block">
          <LineChart width={1000} height={300} data={stateDetailData}>
            <XAxis dataKey="date" stroke="#007BFF" tick={{fontSize: 12}} />
            <YAxis stroke="#007BFF" tick={{fontSize: 12}} />
            <Tooltip />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="top"
              wrapperStyle={{
                position: 'absolute',
                right: '0px',
                top: '0px',
                padding: '10px',
              }}
              payload={[{value: 'active', color: '#007BFF', type: 'line'}]}
            />
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
          <LineChart width={1000} height={300} data={stateDetailData}>
            <XAxis dataKey="date" stroke="#6C757D" tick={{fontSize: 12}} />
            <YAxis stroke="#6C757D" tick={{fontSize: 12}} />
            <Tooltip />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="top"
              wrapperStyle={{
                position: 'absolute',
                right: '0px',
                top: '0px',
                padding: '10px',
              }}
              payload={[{value: 'deceased', color: '#6C757D', type: 'line'}]}
            />
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
          <LineChart width={1000} height={300} data={stateDetailData}>
            <XAxis dataKey="date" stroke="#27A243" tick={{fontSize: 12}} />
            <YAxis stroke="#27A243" tick={{fontSize: 12}} />
            <Tooltip />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="top"
              wrapperStyle={{
                position: 'absolute',
                right: '0px',
                top: '0px',
                padding: '10px',
              }}
              payload={[{value: 'recovered', color: '#27A243', type: 'line'}]}
            />
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
          <LineChart width={1000} height={300} data={stateDetailData}>
            <XAxis dataKey="date" stroke="#9673B9" tick={{fontSize: 12}} />
            <YAxis stroke="#9673B9" tick={{fontSize: 12}} />
            <Tooltip />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="top"
              wrapperStyle={{
                position: 'absolute',
                right: '0px',
                top: '0px',
                padding: '10px',
              }}
              payload={[{value: 'tested', color: '#9673B9', type: 'line'}]}
            />
            <Line type="monotone" dataKey="tested" stroke="#9673B9" />
          </LineChart>
        </div>
      </div>
    )
  }
  function renderBarChart() {
    return (
      <div className="bar-chart-block">
        <BarChart
          width={1000}
          height={400}
          data={stateDetailDataBar}
          barSize={16}
        >
          {/* <XAxis dataKey="date" tick={{fontSize: 12}} axisLine={false} /> */}
          <Bar
            dataKey="confirmed"
            fill="#9A0E31"
            className="bar-chart"
            label={{
              position: 'top',
              fill: 'white', // Set the color of the labels
              fontSize: 8,
            }}
          />
          <LabelList dataKey="date" position="bottom" />
        </BarChart>
      </div>
    )
  }

  const renderedDetailsData = (
    <div className="state-detail-container">
      <div className="header-block">
        <h1 className="header-state-name">
          {statesList.find(item => item.state_code === stateCode)?.state_name}
        </h1>
        <div className="header-block-right-1">
          <p>Tested</p>
          <p className="number-text">20239390</p>
        </div>
      </div>
      <div>
        <Counter />
      </div>
      <div className="charts-block">
        {renderBarChart()}
        <h1 className="charts-heading">Daily Spread Trends</h1>
        {renderConfirmedLineChart()}
        {renderActiveLineChart()}
        {renderRecoveredLineChart()}
        {renderDeceasedLineChart()}
        {renderTestedLineChart()}
      </div>
      <Footer />
    </div>
  )

  return (
    <div className="details-main-container">
      <Header />
      {isLoading ? (
        <div data-testId="stateDetailsLoader">
          <LoadingSpinner />{' '}
        </div>
      ) : (
        renderedDetailsData
      )}
    </div>
  )
}
