import { useEffect, useState } from 'react'

import * as Select from '@radix-ui/react-select'

import { CaretDown, Check } from 'phosphor-react'

interface IGame {
  id: string
  title: string
}

const SelectGame = () => {
  const [games, setGames] = useState<IGame[]>([])

  useEffect(()=>{
    fetch('http://localhost:3333/games')
    .then(response => response.json())
    .then(data => setGames(data))
  },[])

  return (
    <Select.Root>
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
              {/* Select Option */}
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
              {/* Select Option */}
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

export default SelectGame
