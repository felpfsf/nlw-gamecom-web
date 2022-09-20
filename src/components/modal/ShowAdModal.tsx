import { useEffect, useState } from 'react'
import { httpRequest } from '../../api/api'

import * as Dialog from '@radix-ui/react-dialog'
import { GameController } from 'phosphor-react'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

interface IGame {
  game_id: string
  game_title: string
  game_img: string
  game_ads: number
}

interface IAds {
  id: string
  name: string
  yearsPlaying: number
  weekDays: string[]
  hourStart: string
  hourEnd: string
  useVoiceChannel: boolean
}

const ShowAdModal = (props: IGame) => {
  const [adsId, setAdsId] = useState<IAds[]>([])
  const [discordUser, setDiscordUser] = useState()

  console.log(props.game_ads)

  const test = () => {
    console.log(`${httpRequest.defaults.baseURL}games/${props.game_id}/ads`)
  }

  useEffect(() => {
    httpRequest.get(`games/${props.game_id}/ads`).then(response => {
      setAdsId(response.data)
    })
  }, [])

  // useEffect(() => {
  //   httpRequest.get(`ads/${adsId}/discord`).then(response => {
  //     setAdsId(response.data)
  //   })
  // }, [])

  async function getDiscordUser(adsId: string) {
    httpRequest.get(`ads/${adsId}/discord`).then(response => {
      setDiscordUser(response.data.discord)
      // //  const discordUserName = discordUser
      // //  console.log(discordUser)
      // navigator.clipboard.writeText(discordUser!)
      // // toastMsg(discordUser!)
      // alert(`${discordUser} copiado`)
    })
  }

  const copyDiscordUserName = (discordUser: string) => {
    navigator.clipboard.writeText(discordUser)
    toastMsg(discordUser)
  }

  const toastMsg = (discordUser: string) => {
    console.log(discordUser)

    toast.info(`Usuário "${discordUser}" Copiado`, {
      position: toast.POSITION.TOP_CENTER,
      className: 'w-auto text-sm p-2',
      pauseOnHover: true
    })
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='fixed inset-0 bg-black/60' />
      <Dialog.Content className='dialog__content'>
        <Dialog.Title className='hidden md:block'>
          {props.game_title} - anúncios {props.game_ads}
        </Dialog.Title>
        <div className='grid md:grid-cols-2 gap-6'>
          <div className='flex justify-center md:justify-start'>
            <img
              src={props.game_img}
              alt=''
              className='w-44 md:w-full rounded overflow-hidden'
            />
            <div className='hidden md:block ml-3 border-r-[1px] border-r-slate-400'></div>
          </div>
          <Dialog.Title className='md:hidden'>
            {props.game_title} - anúncios {props.game_ads}
          </Dialog.Title>
          {/* ads row */}
          <div className='whitespace-nowrap overflow-x-auto scroll-smooth scrollbar-hide'>
            {/* ads cards */}
            {adsId.map(ad => (
              <>
                <div
                  key={ad.id}
                  className='w-48 h-64 mr-4 px-2 py-2 inline-block md:border-r-[1px] md:border-r-slate-400'>
                  <h1 className='text-sm text-zinc-500'>Name</h1>
                  <h2 className='mt-1 text-sm font-bold'>{ad.name}</h2>

                  <h1 className='mt-2 text-sm text-zinc-500'>Tempo de jogo</h1>
                  <h2 className='mt-1 text-sm font-bold'>
                    {ad.yearsPlaying} anos
                  </h2>

                  <h1 className='mt-2 text-sm text-zinc-500'>
                    Disponibilidade
                  </h1>
                  <h2 className='mt-1 text-sm font-bold'>{`${ad.weekDays.length} dias \u2022 ${ad.hourStart}h - ${ad.hourEnd}h`}</h2>

                  <h1 className='mt-2 text-sm text-zinc-500'>
                    Chamada de aúdio?
                  </h1>
                  <h2
                    className={
                      ad.useVoiceChannel === true
                        ? 'mt-1 text-sm font-bold text-emerald-600'
                        : 'mt-1 text-sm font-bold text-red-600'
                    }>
                    {ad.useVoiceChannel === true ? 'Sim' : 'Não'}
                  </h2>
                  {/*
                  <button onClick={() => getDiscordUser(ad.id)}>
                    Get Discord User
                  </button>
                  <ToastContainer />
                  */}
                  {/* Modal Discord UserName */}
                  <Dialog.Root>
                    <Dialog.Trigger
                      onClick={() => getDiscordUser(ad.id)}
                      className='mt-2 py-2 px-2 rounded-md flex items-center gap-1 button__violet'>
                      <GameController size={20} />
                      Conectar
                    </Dialog.Trigger>
                    {/* Modal com nome do discord */}
                    <Dialog.Portal>
                      <Dialog.Overlay className='fixed inset-0 bg-black/60' />
                      <Dialog.Content className='dialog__content w-auto flex flex-col items-center gap-2'>
                        <h2
                          onClick={() => copyDiscordUserName(discordUser!)}
                          className='hover:underline hover:underline-offset-4 cursor-pointer'>
                          {discordUser}
                        </h2>
                        <sub className='text-[10px]'>
                          Clique no nome para copiar
                        </sub>
                        <ToastContainer />
                      </Dialog.Content>
                    </Dialog.Portal>
                    {/* Fim modal */}
                  </Dialog.Root>
                  <div className='border-r-[1px] border-r-slate-400'></div>
                </div>
              </>
            ))}
          </div>
        </div>
      </Dialog.Content>
    </Dialog.Portal>
  )
}

export default ShowAdModal
