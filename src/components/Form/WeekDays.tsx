import { useState } from 'react'
import * as ToggleGroup from '@radix-ui/react-toggle-group'

const WeekDays = () => {
  const [weekDay, setWeekDay] = useState<string[]>([])

  return (
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
  )
}

export default WeekDays
