import React from 'react'
import { Info, Repos, User, Search } from '../components'
import loadingImage from '../images/preloader.gif'
import { GithubContext } from '../context/context'
const Dashboard = () => {
  const { isLoading } = React.useContext(GithubContext)
  if (isLoading) {
    return (
      <main>
        <Search></Search>
        <img src={loadingImage} className='loading-img' alt='Loading' />
      </main>
    )
  }
  return (
    <main>
      <Search />
      <Info />
      <User />
      <Repos />

    </main>
  )
}

export default Dashboard
