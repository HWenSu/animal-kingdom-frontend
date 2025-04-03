import { useState, useEffect } from "react"
import PropTypes from 'prop-types'; // 導入 PropTypes

const AnimalDataFetcher = ({url, children,fallback}) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [data, setData] = useState([])


  useEffect(()=>{
    const fetchData = async () => {
      try{
        setIsLoading(true)
        //測試假資料
        const response = await fetch(url)
        if(!response.ok){
          throw new Error (`HTTP error! status: ${response.status}`)
        }
        const result = await response.json()
        setData(result);
      } catch(err) {
        setIsError(true)
        console.error(err.message)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [url]) // 當 url 改變時重新獲取資料

  if (isLoading){
    return <div> {fallback || "載入中..."} </div>
  } 

  if(isError){
    return <div> 錯誤 </div>
  }

  return (
    children(data)
  )
}

// prop 類型檢查
AnimalDataFetcher.propTypes = {
  url: PropTypes.string.isRequired, // url 是必須的字串
  children: PropTypes.func.isRequired, // children 是必須的函數
  fallback: PropTypes.string, // fallback 是可選的字串
};

export default AnimalDataFetcher