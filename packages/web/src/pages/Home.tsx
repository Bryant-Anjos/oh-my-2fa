import React from 'react'
import api from '../api'

const HomePage: React.FC = () => {
  React.useEffect(() => {
    api.secret.post().then(({ data }) => console.log(data))
  }, [])

  return <p>Olá</p>
}

export default HomePage
