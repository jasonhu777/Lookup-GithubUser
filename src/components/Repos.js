import React from 'react'
import styled from 'styled-components'
import { GithubContext } from '../context/context'
import { Pie3D, Column3D, Bar3D, Doughnut2D } from './Charts'
const Repos = () => {
  const { repos } = React.useContext(GithubContext)

  const languages = repos.reduce((total, repo) => {
    const { language, stargazers_count } = repo
    if (!language) return total
    total[language] = total[language] ?
      { ...total[language], value: total[language].value + 1, stars: total[language].stars + stargazers_count } :
      { label: language, value: 1, stars: stargazers_count }
    return total
  }, {})
  const mostUsedLanguagues = Object.values(languages).sort((a, b) => b.value - a.value).slice(0, 5)
  const mostPopular = Object.values(languages).sort((a, b) => b.stars - a.stars).map(item => { return { ...item, value: item.stars } }).slice(0, 5)

  let { stars, forks } = repos.reduce((total, repo) => {
    const { stargazers_count, name, forks } = repo
    total.stars[stargazers_count] = { label: name, value: stargazers_count }
    total.forks[forks] = { label: name, value: forks }
    return total
  }, { stars: {}, forks: {} })


  stars = Object.values(stars).slice(-5).reverse()
  forks = Object.values(forks).slice(-5).reverse()

  return (
    <section className="section">
      <Wrapper className="section-center">
        <Pie3D data={mostUsedLanguagues} />
        <Column3D data={stars}></Column3D>
        <Doughnut2D data={mostPopular}></Doughnut2D>
        <Bar3D data={forks}></Bar3D>
      </Wrapper>
    </section>

  )
}

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`

export default Repos
