import { InputHTMLAttributes } from 'react'

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = (props: IInputProps) => {
  return (
    <input
      {...props}
      className='form__input'
    />
  )
}

export default Input
