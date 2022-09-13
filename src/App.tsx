import Buttons from './components/ui/buttons/Buttons'
import GameCard from './components/ui/gameCard/GameCard'
import logoNLW from '/assets/logo-nlw-esports.svg'

function App() {
  return (
    <div className='main__wrapper'>
      <img src={logoNLW} alt='' />
      <h1 className='main__title'>
        Seu <span>duo</span> está aqui
      </h1>

      {/* games grid */}
      <div className='grid__games'>
        <GameCard img='/assets/game_1.png' title='World of Warcraft' ads={4} />
        <GameCard img='/assets/game_2.png' title='League of Legends' ads={4} />
        <GameCard img='/assets/game_3.png' title='Dota 2' ads={4} />
        <GameCard img='/assets/game_4.png' title='Counter Strike' ads={4} />
        <GameCard img='/assets/game_5.png' title='Apex Legends' ads={4} />
        <GameCard img='/assets/game_6.png' title='Fortnite' ads={4} />
      </div>

      {/* Card publi */}
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
    </div>
  )
}

export default App
