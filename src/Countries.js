import Country from './Country'

export default function Countries({countries, selectAnswer}){
    return (
        <div>
          {countries.map(country=><Country selectAnswer={selectAnswer}>{country}</Country>)}
        </div>
    )
    
}

