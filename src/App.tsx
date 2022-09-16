import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import CreateAd from './components/createAd/CreateAd'
import GameCard from './components/gameCard/GameCard'
import logoNLW from '/assets/logo-nlw-esports.svg'
import CreateAdModal from './components/modal/CreateAdModal'

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

  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
      .catch(err => console.error(err))
  }, [])

  // console.log(search)

  return (
    <div className='main__wrapper'>
      <img src={logoNLW} alt='' />
      <h1 className='main__title'>
        Seu <span>duo</span> está aqui
      </h1>

      <input
      className='w-1/2 text-black mt-8 p-2 rounded'
        type='text'
        placeholder='Busque seu jogo'
        onChange={e => setSearch(e.target.value)}
      />

      {/* games grid */}
      <div className='grid__games'>
        {games
          .filter(value => {
            if (search === '') {
              return value
            } else if (
              value.title.toLowerCase().includes(search.toLowerCase())
            ) {
              return value
            }
          })
          .map(game => (
            <GameCard
              key={game.id}
              img={game.bannerUrl}
              title={game.title}
              ads={game._count.ads}
            />
          ))}
      </div>

      {/* Card publi */}
      <Dialog.Root>
        <CreateAd />
        <CreateAdModal />
      </Dialog.Root>
    </div>
  )
}

export default App
