import { useEffect, useMemo, useState } from 'react'
import { httpRequest } from './api/api'

import * as Dialog from '@radix-ui/react-dialog'

import logoNLW from '/assets/logo-nlw-esports.svg'

import CreateAd from './components/createAd/CreateAd'
import GameCard from './components/gameCard/GameCard'
import CreateAdModal from './components/modal/CreateAdModal'
import Input from './components/form/Input'
import Buttons from './components/ui/buttons/Buttons'

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
  const [searchValue, setSearchValue] = useState('')


  useEffect(() => {
    httpRequest
      .get('games')
      .then(response => setGames(response.data))
      .catch(err => console.error(err))
  }, [])

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setSearch(searchValue)
    }
  }

  const filteredGames = useMemo(() => {
    if (search.length > 0) {
      return games.filter(({ title }) =>
        title.toLowerCase().includes(search.toLowerCase())
      )
    }
    return games
  }, [search, games])

  return (
    <div className='main__wrapper'>
      <img src={logoNLW} alt='' />
      <h1 className='main__title'>
        Seu <span>duo</span> está aqui
      </h1>
      {/* className='w-1/2 text-black mt-8 p-2 rounded' */}

      <div className='mt-8 self-stretch flex items-center justify-center gap-4'>
        <Input
          style={{ width: '50%' }}
          type='text'
          placeholder='Busque seu jogo'
          onChange={e => setSearchValue(e.target.value)}
          onKeyPress={handleKeyPress}
          value={searchValue}
        />
        <Buttons variant='pesquisar' onClick={() => setSearch(searchValue)} />
      </div>
      {/* games grid */}
      <div className='grid__games'>
        {filteredGames.map(game => (
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
