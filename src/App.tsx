import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import CreateAd from './components/CreateAd/CreateAd'
import GameCard from './components/gameCard/GameCard'
import logoNLW from '/assets/logo-nlw-esports.svg'
import Buttons from './components/ui/buttons/Buttons'
import Input from './components/Form/Input'

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
          <Dialog.Overlay className='fixed inset-0 bg-black/60'/>

          <Dialog.Content className='dialog__content'>
            <Dialog.Title className='text-[32px] font-black'>
              Publique um Anúncio
            </Dialog.Title>

            <form className='mt-8 flex flex-col gap-4'>
              <div className='input__div__flex'>
                <label htmlFor='game' className='font-semibold'>
                  Qual o game?
                </label>
                <Input
                  id='game'
                  placeholder='Selecione o game que deseja jogar'
                />
              </div>
              <div className='input__div__flex'>
                <label htmlFor='name' className='font-semibold'>
                  Seu nome (ou nickname)
                </label>
                <Input id='name' placeholder='Como te chamam dentro do game?' />
              </div>

              <div className='grid grid-cols-2 gap-6'>
                <div className='input__div__flex'>
                  <label htmlFor='yearsPlaying' className='font-semibold'>
                    Joga há quantos anos?
                  </label>
                  <Input
                    id='yearsPlaying'
                    type='number'
                    placeholder='Tudo bem ser ZERO'
                  />
                </div>
                <div className='input__div__flex'>
                  <label htmlFor='discord' className='font-semibold'>
                    Qual seu Discord?
                  </label>
                  <Input id='discord' placeholder='Usuario#0000' />
                </div>
              </div>

              <div className='flex gap-6'>
                <div className='input__div__flex'>
                  <label htmlFor='game' className='font-semibold'>
                    Quando costuma jogar?
                  </label>
                  <div className='grid grid-cols-4 gap-2'>
                    <button
                      className='w-8 aspect-square rounded-sm bg-zinc-900'
                      title='Domingo'>
                      D
                    </button>
                    <button
                      className='w-8 aspect-square rounded-sm bg-zinc-900'
                      title='Segunda'>
                      S
                    </button>
                    <button
                      className='w-8 aspect-square rounded-sm bg-zinc-900'
                      title='Terça'>
                      T
                    </button>
                    <button
                      className='w-8 aspect-square rounded-sm bg-zinc-900'
                      title='Quarta'>
                      Q
                    </button>
                    <button
                      className='w-8 aspect-square rounded-sm bg-zinc-900'
                      title='Quinta'>
                      Q
                    </button>
                    <button
                      className='w-8 aspect-square rounded-sm bg-zinc-900'
                      title='Sexta'>
                      S
                    </button>
                    <button
                      className='w-8 aspect-square rounded-sm bg-zinc-900'
                      title='Sábado'>
                      S
                    </button>
                  </div>
                </div>
                <div className='flex flex-1 flex-col gap-2'>
                  <label htmlFor='hourStart' className='font-semibold'>
                    Qual horário do dia?
                  </label>
                  <div className='flex gap-2'>
                    <Input id='hourStart' type='time' placeholder='De' />
                    <Input id='hourEnd' type='time' placeholder='Até' />
                  </div>
                </div>
              </div>

              <div className='mt-2 text-sm flex gap-2'>
                <Input type='checkbox' />
                Costumo me conectar ao chat de voz
              </div>
              <footer className='mt-4 flex justify-end gap-4'>
                <Buttons variant='cancelar' />
                <Buttons variant='joystick' />
              </footer>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  )
}

export default App
