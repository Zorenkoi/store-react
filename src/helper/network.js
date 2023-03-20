import { useState, useEffect } from 'react'

export const getApiResource = async (url) => {
  try {
    const res = await fetch(url)

    if (!res.ok) {
      return false
    }

    return await res.json()
  } catch (error) {
    return false
  }
}

export const useGetApiResource = (url) => {
  const [statusRequest, setStatusRequest] = useState('loading')
  const [data, setData] = useState(null)

  useEffect(() => {
    getApiResource(url).then((response) => {
      if (response) {
        setStatusRequest('good')
        setData(response)
      } else {
        setStatusRequest('error')
        setData(null)
      }
    })
  }, [])

  return { statusRequest, data }
}
