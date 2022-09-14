import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import CreateAd from './components/CreateAd/CreateAd'
import GameCard from './components/gameCard/GameCard'
import logoNLW from '/assets/logo-nlw-esports.svg'
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
      <Dialog.Root>
        <CreateAd />
        <Dialog.Portal>
          <Dialog.Overlay className='bg-black/60 inset-0 fixed' />
          <Dialog.Content className='fixed top-[100px] left-1/2 -translate-x-1/2 translate-y-1/2 w-[480px] py-8 px-10 rounded-lg bg-nlw-clr_pub_bg shadow-black/25'>
            <Dialog.Title className='text-[32px] font-black'>
              Publique um Anúncio
            </Dialog.Title>
            <Dialog.Content>
              <form>
                <div>
                  <label htmlFor='game'>Qual o game?</label>
                  <input
                    id='game'
                    type='text'
                    placeholder='Selecione o game que deseja jogar'
                  />
                </div>
                <div>
                  <label htmlFor='name'>Seu nome (ou nickname)</label>
                  <input
                    id='name'
                    type='text'
                    placeholder='Como te chamam dentro do game?'
                  />
                </div>
                <div>
                  <div>
                    <label htmlFor='yearsPlaying'>Joga há quantos anos?</label>
                    <input
                      id='yearsPlaying'
                      type='text'
                      placeholder='Tudo bem ser ZERO'
                    />
                  </div>
                  <div>
                    <label htmlFor='discord'>Qual seu Discord?</label>
                    <input
                      id='discord'
                      type='text'
                      placeholder='Usuario#0000'
                    />
                  </div>
                </div>
                <div>
                  <div>
                    <label htmlFor='weekDays'>Quando costuma jogar?</label>
                    {/* WeekDays */}
                  </div>
                  <div>
                    <label htmlFor='hourStart'>Qual horário do dia?</label>
                    <div>
                      <input id='hourStart' type='time' placeholder='De' />
                      <input id='hourEnd' type='time' placeholder='Até' />
                    </div>
                  </div>
                </div>
                <input type='checkbox' name='' id='' />
                Costumo me conectar ao chat de voz
                <footer>
                  <Buttons variant='joystick' />
                  <Buttons variant='cancelar' />
                </footer>
              </form>
            </Dialog.Content>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default App
