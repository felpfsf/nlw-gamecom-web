import { useEffect, useState } from 'react'
import CreateAd from './components/CreateAd/CreateAd'
import GameCard from './components/gameCard/GameCard'
import logoNLW from '/assets/logo-nlw-esports.svg'

interface IGame {
  id: string
  title: string
  bannerUrl: string
  _count: {
    ads: number
  }
}

function App() {
  const [games, setGames] = useState<IGame[]>([])

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => setGames(data))
  }, [])

  console.log(games)

  return (
    <div className='main__wrapper'>
      <img src={logoNLW} alt='' />
      <h1 className='main__title'>
        Seu <span>duo</span> está aqui
      </h1>

      {/* games grid */}
      <div className='grid__games'>
        {games.map(game => (
          <GameCard
            key={game.id}
            img={game.bannerUrl}
            title={game.title}
            ads={game._count.ads}
          />
        ))}
      </div>

      {/* Card publi */}
      <CreateAd />
    </div>
  )
}

export default App
