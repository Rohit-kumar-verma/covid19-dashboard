import {useEffect} from 'react'

export default function About() {
  //   const response = fetch('https://apis.ccbp.in/covid19-faqs')
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://apis.ccbp.in/covid19-faqs')
        const data = await response.json()
        console.log(data)

        // setDataList(convertObjectsDataIntoListItemsUsingForInMethod(data))
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])

  return <div className="About-container">ibo</div>
}
