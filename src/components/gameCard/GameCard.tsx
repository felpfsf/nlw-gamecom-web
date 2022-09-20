import * as Dialog from '@radix-ui/react-dialog'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { httpRequest } from '../../api/api'
import ShowAdModal from '../modal/ShowAdModal'

interface IGameCardProps {
  img: string
  title: string
  ads: number
  id: string
}

const GameCard = (props: IGameCardProps) => {
  const [showAd, setShowAd] = useState([])

  const openModal = useCallback(() => {
    httpRequest.get(`games/${props.id}/ads`).then(response => {
      setShowAd(response.data)
    })
  }, [])

  useEffect(() => {
    openModal()
  }, [openModal])


  // console.log(showAd)
  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger className='card__game' onClick={openModal}>
          <img src={props.img} alt={props.title} />
          <div className='card__game__content'>
            <h2 className='card__game__title'>{props.title}</h2>
            <p className='card__game__ads'>{props.ads} anúncios</p>
          </div>
        </Dialog.Trigger>
        {showAd.filter(({id, name})=>{
      console.log(name);
      
    })}
        {/* <ShowAdModal id={props.id} title={props.title} img={props.img} /> */}
      </Dialog.Root>
    </>
  )
}

export default GameCard
