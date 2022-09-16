import { useEffect, useState } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

import { Check } from 'phosphor-react'

import Input from '../form/Input'
import Buttons from '../ui/buttons/Buttons'
import SelectGame from '../form/SelectGame'
import WeekDays from '../form/WeekDays'

interface IGame {
  id: string
  title: string
}

const CreateAdModal = () => {
  const [games, setGames] = useState<IGame[]>([])

  useEffect(() => {
    fetch('http://localhost:3333/games')
      .then(response => response.json())
      .then(data => {
        setGames(data)
      })
      .catch(err => console.error(err))
  }, [])

  // console.log(games)

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='fixed inset-0 bg-black/60' />

      <Dialog.Content className='dialog__content'>
        <Dialog.Title className='text-[32px] font-black'>
          Publique um Anúncio
        </Dialog.Title>

        <form className='mt-8 flex flex-col gap-4'>
          <div className='input__div__flex'>
            <label htmlFor='game' className='font-semibold'>
              Qual o game?
            </label>
            {/* Select RadixUI option */}
            <SelectGame />
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
              <WeekDays />
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

          <label className='mt-2 text-sm flex gap-2 cursor-pointer'>
            <Checkbox.Root className='w-6 h-6 p-1 rounded bg-zinc-900'>
              <Checkbox.Indicator>
                <Check className='w-4 h-4 text-emerald-400' />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>
          <footer className='mt-4 flex items-center justify-end gap-4'>
            <Buttons variant='cancelar' />
            <Buttons variant='joystick' />
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}

export default CreateAdModal
