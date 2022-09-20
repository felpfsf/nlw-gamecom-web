import * as Dialog from '@radix-ui/react-dialog'
import { useEffect, useState } from 'react'
import { httpRequest } from '../../api/api'

interface IAd {
  id: string
  title: string
  img: string
}
const ShowAdModal = (props: IAd) => {
  const test = () => {
    console.log(`${httpRequest.defaults.baseURL}games/${props.id}/ads`)
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='fixed inset-0 bg-black/60' />
      <Dialog.Content className='dialog__content'>
        <Dialog.Title>{props.title}</Dialog.Title>
        <div>
          <button onClick={test}>Clic</button>
          <img src={props.img} alt='' />
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  )
}

export default ShowAdModal
