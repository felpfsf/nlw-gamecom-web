import iconLupa from '/assets/lupa_icon.png'
import iconJoystick from '/assets/icon_joystick.png'

interface IButtonsProps {
  variant: string
}

const Buttons = (props: IButtonsProps) => {
  return (
    <>
      {props.variant === 'lupa' ?
        <a className='card__publi__button' href='#'>
          <img src={iconLupa} alt='' />
          Publicar anúncio
        </a>
        : null
      }
      {props.variant === 'joystick' ?
        <a className='card__publi__button' href='#'>
          <img src={iconJoystick} alt='' />
          Encontrar duo
        </a>
        : null
      }
    </>
  )
}

export default Buttons