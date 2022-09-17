import { FormEvent, useEffect, useState } from 'react'
import axios from 'axios'

import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import * as Select from '@radix-ui/react-select'

import { CaretDown, Check } from 'phosphor-react'

import Input from '../form/Input'
import Buttons from '../ui/buttons/Buttons'
// import SelectGame from '../form/SelectGame'
// import WeekDays from '../form/WeekDays'

interface IGame {
  id: string
  title: string
}

const CreateAdModal = () => {
  const [games, setGames] = useState<IGame[]>([])
  const [weekDay, setWeekDay] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState<boolean>(false)

  const API_URL = 'http://localhost:3333'

  useEffect(() => {
    axios(`${API_URL}/games`)
      .then(response => setGames(response.data))
      .catch(err => console.error(err))
  }, [])

  function handleCheckbox(checked: boolean) {
    if (checked === true) {
      setUseVoiceChannel(true)
    } else {
      setUseVoiceChannel(false)
    }
  }

  async function handleCreateAd(e: FormEvent) {
    e.preventDefault()
    console.log('form enviado')

    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    console.log(`${API_URL}/games/${data.game}/ads`)
    console.log(data.game);
    

    // console.log(data.hourStart, data.hourEnd)
    // console.log(weekDay)
    // console.log(useVoiceChannel)

    // if (!data.name) {
    //   return
    // }

    try {
      axios.post(`${API_URL}/games/${data.game}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDay.map(Number),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChannel
      })
      alert('Anuncio criado com sucesso')
    } catch (error) {
      console.log(error)
      alert('Erro ao criar anuncio' + error)
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='fixed inset-0 bg-black/60' />

      <Dialog.Content className='dialog__content'>
        <Dialog.Title className='text-[32px] font-black'>
          Publique um Anúncio
        </Dialog.Title>

        <form className='mt-8 flex flex-col gap-4' onSubmit={handleCreateAd}>
          <div className='input__div__flex'>
            <label htmlFor='game' className='font-semibold'>
              Qual o game?
            </label>
            {/* <select name='game' id='game' className='form__input font-sans'>
              <option disabled value=''>
                Selecione
              </option>
              {games.map(game => {
                return <option key={game.id} value={game.id}>{game.title}</option>
              })}
            </select> */}
            {/* Select RadixUI option */}

            <Select.Root name='game'>
              <Select.Trigger className='form__input flex items-center justify-between'>
                <Select.Value placeholder='Selecione o game que deseja jogar' />
                <Select.Icon>
                  <CaretDown />
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal>
                <Select.Content className='form__input'>
                  <Select.ScrollUpButton />
                  <Select.Viewport>
                    <Select.Group className='flex flex-col items-start'>
                      {games.map(game => {
                        return (
                          <Select.Item
                            key={game.id}
                            className='form__label p-1 rounded-md hover:bg-purple-700 hover:text-white hover:cursor-pointer flex flex-row-reverse items-center gap-2'
                            value={game.id}>
                            <Select.ItemText>{game.title}</Select.ItemText>
                            <Select.ItemIndicator>
                              <Check />
                            </Select.ItemIndicator>
                          </Select.Item>
                        )
                      })}
                    </Select.Group>
                  </Select.Viewport>
                  <Select.ScrollDownButton />
                </Select.Content>
              </Select.Portal>
            </Select.Root>

          </div>
          <div className='input__div__flex'>
            <label htmlFor='name' className='font-semibold'>
              Seu nome (ou nickname)
            </label>
            <Input
              name='name'
              id='name'
              placeholder='Como te chamam dentro do game?'
            />
          </div>

          <div className='grid grid-cols-2 gap-6'>
            <div className='input__div__flex'>
              <label htmlFor='yearsPlaying' className='font-semibold'>
                Joga há quantos anos?
              </label>
              <Input
                name='yearsPlaying'
                id='yearsPlaying'
                type='number'
                placeholder='Tudo bem ser ZERO'
              />
            </div>
            <div className='input__div__flex'>
              <label htmlFor='discord' className='font-semibold'>
                Qual seu Discord?
              </label>
              <Input name='discord' id='discord' placeholder='Usuario#0000' />
            </div>
          </div>

          <div className='flex gap-6'>
            <div className='input__div__flex'>
              <label htmlFor='game' className='font-semibold'>
                Quando costuma jogar?
              </label>
              <ToggleGroup.Root
                className='pt-2 grid grid-cols-7 gap-1'
                type='multiple'
                value={weekDay}
                onValueChange={setWeekDay}>
                <ToggleGroup.Item
                  className={
                    weekDay.includes('1')
                      ? 'w-6 aspect-square text-sm rounded-sm bg-violet-500'
                      : 'w-6 aspect-square text-sm rounded-sm bg-zinc-900'
                  }
                  value='1'>
                  S
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  className={
                    weekDay.includes('2')
                      ? 'w-6 aspect-square text-sm rounded-sm bg-violet-500'
                      : 'w-6 aspect-square text-sm rounded-sm bg-zinc-900'
                  }
                  value='2'>
                  T
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  className={
                    weekDay.includes('3')
                      ? 'w-6 aspect-square text-sm rounded-sm bg-violet-500'
                      : 'w-6 aspect-square text-sm rounded-sm bg-zinc-900'
                  }
                  value='3'>
                  Q
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  className={
                    weekDay.includes('4')
                      ? 'w-6 aspect-square text-sm rounded-sm bg-violet-500'
                      : 'w-6 aspect-square text-sm rounded-sm bg-zinc-900'
                  }
                  value='4'>
                  Q
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  className={
                    weekDay.includes('5')
                      ? 'w-6 aspect-square text-sm rounded-sm bg-violet-500'
                      : 'w-6 aspect-square text-sm rounded-sm bg-zinc-900'
                  }
                  value='5'>
                  S
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  className={
                    weekDay.includes('6')
                      ? 'w-6 aspect-square text-sm rounded-sm bg-violet-500'
                      : 'w-6 aspect-square text-sm rounded-sm bg-zinc-900'
                  }
                  value='6'>
                  S
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  className={
                    weekDay.includes('0')
                      ? 'w-6 aspect-square text-sm rounded-sm bg-violet-500'
                      : 'w-6 aspect-square text-sm rounded-sm bg-zinc-900'
                  }
                  value='0'>
                  D
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className='flex flex-1 flex-col gap-2'>
              <label htmlFor='hourStart' className='font-semibold'>
                Qual horário do dia?
              </label>
              <div className='flex gap-2'>
                <Input
                  name='hourStart'
                  id='hourStart'
                  type='time'
                  placeholder='De'
                />
                <Input
                  name='hourEnd'
                  id='hourEnd'
                  type='time'
                  placeholder='Até'
                />
              </div>
            </div>
          </div>

          <label className='mt-2 text-sm flex gap-2 cursor-pointer'>
            <Checkbox.Root
              className='w-6 h-6 p-1 rounded bg-zinc-900'
              checked={useVoiceChannel}
              onCheckedChange={handleCheckbox}>
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
