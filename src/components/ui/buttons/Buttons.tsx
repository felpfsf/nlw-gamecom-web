import iconLupa from '/assets/lupa_icon.png'
import iconJoystick from '/assets/icon_joystick.png'
import * as Dialog from '@radix-ui/react-dialog'

interface IButtonsProps {
  variant: string
}

const Buttons = (props: IButtonsProps) => {
  return (
    <>
      {props.variant === 'lupa' ? (
        <Dialog.Trigger className='card__publi__button'>
          <img src={iconLupa} alt='' />
          Publicar anúncio
        </Dialog.Trigger>
      ) : null}
      {props.variant === 'joystick' ? (
        <button className='card__publi__button'>
          <img src={iconJoystick} alt='' />
          Encontrar duo
        </button>
      ) : null}
      {props.variant === 'cancelar' ? (
        <button className='card__publi__button'>
          Cancelar
        </button>
      ) : null}
    </>
  )
}

export default Buttons
