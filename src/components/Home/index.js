import {useState, useEffect} from 'react'
import {FiSearch} from 'react-icons/fi'
import Footer from '../Footer'
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

  function convertObjectsDataIntoListItemsUsingForInMethod(data) {
    const resultList = []
    //   getting keys of an object object
    const keyNames = Object.keys(data)

    keyNames.forEach(keyName => {
      if (data[keyName]) {
        const {total} = data[keyName]
        // console.log(statesList)

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
    return resultList
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://apis.ccbp.in/covid19-state-wise-data',
        )
        const data = await response.json()
        setDataList(convertObjectsDataIntoListItemsUsingForInMethod(data))
        // console.log(dataList)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return (
    //
    <div className="main-container">
      <nav>
        <div className="navbar-container">
          <h1 className="logo-name">
            COVID19<span>INDIA</span>
          </h1>
          <div className="nav-items-container">
            <ul className="nav-items-block">
              <li className="nav-list">Home</li>
              <li className="nav-list">About</li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="search-bar-container">
        <FiSearch className="search-icon" />
        <input
          className="search-input"
          type="search"
          placeholder="Enter the State"
        />
      </div>

      <div className="table-container">
        <table className="table-data-lists">
          <thead>
            <tr id="heading-items">
              <th className="table-heading">States/UT</th>
              <th className="table-heading">Confirmed</th>
              <th className="table-heading">Active</th>
              <th className="table-heading">Recovered</th>
              <th className="table-heading">Deceased</th>
              <th className="table-heading">Population</th>
            </tr>
          </thead>

          <tbody>
            {dataList.map(element => (
              <tr>
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
      <div className="footer-block">
        <Footer />
      </div>
    </div>
  )
}
export default Home
