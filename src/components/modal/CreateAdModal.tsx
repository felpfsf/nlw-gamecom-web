import { FormEvent, useEffect, useState } from 'react'
import axios from 'axios'
import { httpRequest } from '../../api/api'

import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import * as Select from '@radix-ui/react-select'

import { CaretDown, CaretUp, Check } from 'phosphor-react'

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

  useEffect(() => {
    httpRequest
      .get('/games')
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
    // console.log('form enviado')

    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    // console.log(`${httpRequest.defaults.baseURL}games/${data.game}/ads`)

    // console.log(
    //   `id: ${data.game}\n name: ${data.name}\n yearsPlaying: ${data.yearsPlaying}\n discord: ${data.discord}\n weekDay: ${weekDay}\n hourStart: ${data.hourStart}, hourEnd: ${data.hourEnd}\n typeof hourEnd: ${typeof(data.hourEnd)}\n useVoiceChannel: ${useVoiceChannel}`
    // )

    if (!data.name) {
      return
    }

    try {
      axios.post(`${httpRequest.defaults.baseURL}games/${data.game}/ads`, {
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
        <Dialog.Title className='text-xl md:text-[32px] font-black'>
          Publique um Anúncio
        </Dialog.Title>

        <form
          className='mt-4 md:mt-8 flex flex-col md:gap-4'
          onSubmit={handleCreateAd}>
          <div className='input__div__flex'>
            <label
              htmlFor='game'
              className='form__label'>
              Qual o game?
            </label>
            {/* 
            <select name='game' id='game' className='form__input font-sans'>
              <option disabled value=''>
                Selecione
              </option>
              {games.map(game => {
                return <option key={game.id} value={game.id}>{game.title}</option>
              })}
            </select>
             */}

            {/* Select RadixUI option */}
            <Select.Root name='game'>
              <Select.Trigger
                aria-label='game'
                className='form__input flex items-center justify-between'>
                <Select.SelectValue placeholder='Selecione o game que deseja jogar' />
                <Select.Icon>
                  <CaretDown
                    size={20}
                    className='hover:text-zinc-300 duration-200 ease-in'
                  />
                </Select.Icon>
              </Select.Trigger>

              <Select.Portal>
                <Select.Content className='form__input overflow-hidden'>
                  <Select.ScrollUpButton className='text-zinc-100 mx-auto py-2'>
                    <CaretUp size={20} />
                  </Select.ScrollUpButton>
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
                  <Select.ScrollDownButton>
                    <CaretDown
                      size={20}
                      className='text-zinc-100 mx-auto py-2'
                    />
                  </Select.ScrollDownButton>
                </Select.Content>
              </Select.Portal>
            </Select.Root>
          </div>
          <div className='input__div__flex'>
            <label
              htmlFor='name'
              className='form__label'>
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
              <label
                htmlFor='yearsPlaying'
                className='form__label'>
                Anos jogando
              </label>
              <Input
                name='yearsPlaying'
                id='yearsPlaying'
                type='number'
                placeholder='Tudo bem ser ZERO'
              />
            </div>
            <div className='input__div__flex'>
              <label
                htmlFor='discord'
                className='form__label'>
                Qual seu Discord?
              </label>
              <Input name='discord' id='discord' placeholder='Usuario#0000' />
            </div>
          </div>

          <div className='flex gap-6'>
            <div className='input__div__flex'>
              <label
                htmlFor='game'
                className='form__label'>
                Quando costuma jogar?
              </label>
              <ToggleGroup.Root
                className='pt-2 grid grid-cols-4 md:grid-cols-4 gap-1'
                type='multiple'
                value={weekDay}
                onValueChange={setWeekDay}>
                <ToggleGroup.Item
                  className={
                    weekDay.includes('1')
                      ? 'toggle__group__on'
                      : 'toggle__group__off'
                  }
                  value='1'>
                  S
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  className={
                    weekDay.includes('2')
                      ? 'toggle__group__on'
                      : 'toggle__group__off'
                  }
                  value='2'>
                  T
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  className={
                    weekDay.includes('3')
                      ? 'toggle__group__on'
                      : 'toggle__group__off'
                  }
                  value='3'>
                  Q
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  className={
                    weekDay.includes('4')
                      ? 'toggle__group__on'
                      : 'toggle__group__off'
                  }
                  value='4'>
                  Q
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  className={
                    weekDay.includes('5')
                      ? 'toggle__group__on'
                      : 'toggle__group__off'
                  }
                  value='5'>
                  S
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  className={
                    weekDay.includes('6')
                      ? 'toggle__group__on'
                      : 'toggle__group__off'
                  }
                  value='6'>
                  S
                </ToggleGroup.Item>

                <ToggleGroup.Item
                  className={
                    weekDay.includes('0')
                      ? 'toggle__group__on'
                      : 'toggle__group__off'
                  }
                  value='0'>
                  D
                </ToggleGroup.Item>
              </ToggleGroup.Root>
            </div>
            <div className='flex flex-1 flex-col gap-2'>
              <label
                htmlFor='hourStart'
                className='form__label'>
                Qual horário do dia?
              </label>
              <div className='flex flex-col items-center gap-2'>
                <div className='flex items-center gap-2'>
                  <span className='text-xs md:text-base'>De</span>
                  <Input
                    name='hourStart'
                    id='hourStart'
                    type='time'
                    placeholder='De'
                  />
                </div>
                <div className='flex items-center gap-2'>
                  <span className='text-xs md:text-base'>Até</span>
                  <Input
                    name='hourEnd'
                    id='hourEnd'
                    type='time'
                    placeholder='Até'
                  />
                </div>
              </div>
            </div>
          </div>

          <label className='mt-8 md:mt-2 text-xs md:text-sm flex items-center gap-2 cursor-pointer'>
            <Checkbox.Root
              className='relative w-4 md:w-6 aspect-square p-1 rounded bg-zinc-900'
              checked={useVoiceChannel}
              onCheckedChange={handleCheckbox}>
              <Checkbox.Indicator>
                <Check className='absolute top-1 left-0 w-4 md:w-6 aspect-square text-emerald-400' />
              </Checkbox.Indicator>
            </Checkbox.Root>
            Costumo me conectar ao chat de voz
          </label>
          <footer className='mt-8 md:mt-4 flex items-center justify-end gap-4'>
            <Buttons variant='cancelar' />
            <Buttons variant='joystick' />
          </footer>
        </form>
      </Dialog.Content>
    </Dialog.Portal>
  )
}

export default CreateAdModal
