
interface IGameCardProps {
  img: string
  title: string
  ads: number
}

const GameCard = (props: IGameCardProps) => {
  return (
    <a className='card__game' href='#'>
      <img src={props.img} alt={props.title} />
      <div className='card__game__content'>
        <h2 className='card__game__title'>{props.title}</h2>
        <p className='card__game__ads'>{props.ads} anúncios</p>
      </div>
    </a>
  )
}

export default GameCard
