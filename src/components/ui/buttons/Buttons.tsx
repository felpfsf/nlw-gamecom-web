import iconLupa from '/assets/lupa_icon.png'
import iconJoystick from '/assets/icon_joystick.png'
import * as Dialog from '@radix-ui/react-dialog'

interface IButtonsProps {
  variant: string
  onClick: () => void
}

const Buttons = (props: IButtonsProps) => {
  return (
    <>
      {props.variant === 'lupa' ? (
        <Dialog.Trigger className='button button__violet'>
          <img src={iconLupa} alt='' />
          Publicar anúncio
        </Dialog.Trigger>
      ) : null}
      {props.variant === 'joystick' ? (
        <button type='submit' className='button button__violet font-semibold'>
          <img src={iconJoystick} alt='' />
          Encontrar duo
        </button>
      ) : null}
      {props.variant === 'cancelar' ? (
        <button type='button' className='button button__zinc'>
          Cancelar
        </button>
      ) : null}
      {props.variant === 'pesquisar' ? (
        <button
          type='button'
          className='button button__violet'
          onClick={props.onClick}>
          <img src={iconLupa} alt='' />
          Pesquisar
        </button>
      ) : null}
    </>
  )
}

export default Buttons
