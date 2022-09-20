import * as Dialog from '@radix-ui/react-dialog'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { httpRequest } from '../../api/api'
import ShowAdModal from '../modal/ShowAdModal'

interface IGameCardProps {
  id: string
  title: string
  img: string
  ads: number
}

const GameCard = (props: IGameCardProps) => {
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger className='card__game'>
          <img src={props.img} alt={props.title} />
          <div className='card__game__content'>
            <h2 className='card__game__title'>{props.title}</h2>
            <p className='card__game__ads'>{props.ads} anúncios</p>
          </div>
        </Dialog.Trigger>

        <ShowAdModal
          game_id={props.id}
          game_title={props.title}
          game_img={props.img}
          game_ads={props.ads}
        />
      </Dialog.Root>
    </>
  )
}

export default GameCard
