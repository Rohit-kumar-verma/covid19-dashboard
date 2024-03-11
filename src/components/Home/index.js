import {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {BsSearch} from 'react-icons/bs'
import {BiChevronRightSquare} from 'react-icons/bi'
import Footer from '../Footer'
import Header from '../Header'
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

const Home = () => {
  const [dataList, setDataList] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredData, setFilteredData] = useState([])

  function convertObjectsDataIntoListItemsUsingForInMethod(data) {
    const resultList = []
    //   getting keys of an object object
    const keyNames = Object.keys(data)

    keyNames.forEach(keyName => {
      if (data[keyName]) {
        const {total} = data[keyName]

        //   if the state's covid data is available we will store it or we will store 0
        const confirmed = total.confirmed ? total.confirmed : 0
        const deceased = total.deceased ? total.deceased : 0
        const recovered = total.recovered ? total.recovered : 0
        const tested = total.tested ? total.tested : 0
        const population = data[keyName].meta.population
          ? data[keyName].meta.population
          : 0
        resultList.push({
          stateCode: keyName,
          name: statesList.find(state => state?.state_code === keyName)
            ?.state_name,
          confirmed,
          deceased,
          recovered,
          tested,
          population,
          active: confirmed - (deceased + recovered),
        })
      }
    })
    return resultList.filter(item => item.name)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://apis.ccbp.in/covid19-state-wise-data',
        )
        const data = await response.json()
        console.log(data)

        setDataList(convertObjectsDataIntoListItemsUsingForInMethod(data))
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  const handleSearch = e => {
    const TermValue = e.target.value
    setSearchTerm(TermValue)
    const DataValue = dataList.filter(item =>
      item?.name.toLowerCase().includes(TermValue.toLowerCase()),
    )
    setFilteredData(DataValue)
  }

  return (
    //
    <div className="main-container">
      <Header />
      <div className="search-bar-container">
        <BsSearch className="search-icon" />
        <input
          className="search-input"
          type="search"
          placeholder="Enter the State"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {filteredData.length > 0 ? (
        <div className="search-data-container">
          {filteredData.map(element => (
            <div key={element.stateCode}>
              <ul className="search-data">
                <li className="list-item">
                  <Link to={`/${element.stateCode}`}>
                    <div className="item-value">
                      <h3 className="state-name-value">{element.name}</h3>

                      <div className="open-detail">
                        <h2 className="state-code-value">
                          {element.stateCode}
                        </h2>
                        <BiChevronRightSquare className="right-arrow-icon" />
                      </div>
                    </div>
                  </Link>
                  <hr />
                </li>
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="table-container" data-testId="stateWiseCovidDataTable">
          <table className="table-data-lists">
            <thead>
              <tr id="heading-items">
                <th className="table-heading">States/UT</th>
                <p className="table-heading">Confirmed</p>
                <th className="table-heading">Active</th>
                <th className="table-heading">Recovered</th>
                <th className="table-heading">Deceased</th>
                <th className="table-heading">Population</th>
              </tr>
            </thead>

            <tbody>
              {dataList.map(element => (
                <tr key={element.stateCode}>
                  <td className="table-item state-name">{element.name}</td>
                  <td className="table-item confirm-cases">
                    {element.confirmed}
                  </td>
                  <td className="table-item active-cases">{element.active}</td>
                  <td className="table-item recovered-cases">
                    {element.recovered}
                  </td>
                  <td className="table-item deceased-cases">
                    {element.deceased}
                  </td>
                  <td className="table-item population-cases">
                    {element.population}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div className="footer-block">
        <Footer />
      </div>
    </div>
  )
}
export default Home
