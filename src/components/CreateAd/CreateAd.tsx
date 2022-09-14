import Buttons from '../ui/buttons/Buttons'

const CreateAd = () => {
  return (
    <div className='card__publi__grad'>
      <div className='card__publi'>
        <div>
          <h2 className='card__publi__title'>Não encontrou seu duo?</h2>
          <p className='card__publi__subtitle'>
            Publique um anúncio para encontrar novos players!
          </p>
        </div>
        {/* Button Variant */}
        <Buttons variant='lupa' />
      </div>
    </div>
  )
}

export default CreateAd
