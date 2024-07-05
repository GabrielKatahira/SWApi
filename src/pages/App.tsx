import { useState } from 'react'
import './App.css'

function App() {

  const [text, setText] = useState('')
  const [type, setType] = useState('')
  const [parameter, setParameter] = useState('people')


  async function getName(url:String) {
    if (url) {
    const response = await fetch(`${url}`);
        const data = await response.json();
        console.log(data.name);
        return data.name;
        } else {
          return "Dado não encontrado"
        }
  }

  async function getTitle(url:String) {
    if (url) {
    const response = await fetch(`${url}`);
        const data = await response.json();
        console.log(data.title);
        return data.title;
        } else {
          return "Dado não encontrado"
        }
  }

  function handleRequest () {
    const requestResult = fetch(`https://swapi.dev/api/${parameter}/${type}${text}`).then(res=>res.json())
    let result1 = document.getElementById('result1') as HTMLElement
    let result2 = document.getElementById('result2') as HTMLElement
    let result3 = document.getElementById('result3') as HTMLElement
    let result4 = document.getElementById('result4') as HTMLElement
    let result5 = document.getElementById('result5') as HTMLElement

    result1.innerText = "carregando..."
    result2.innerText = "carregando..."
    result3.innerText = "carregando..."
    result4.innerText = "carregando..."
    result5.innerText = "carregando..."

    requestResult.then((res)=>{
      var resObject; 
      switch (type) {
        case "": resObject = res
        console.log(resObject)
        break
        case "?search=": resObject = res.results[0]
        console.log(resObject)
      }

      switch (parameter) {
        case "people":
        result1.innerText = `Nome: ${resObject.name}`
        result2.innerText = `Ano do Nascimento: ${resObject.birth_year}`
        getTitle(resObject.films[0]).then(title=>{result3.innerText = `Primeira aparição: ${title}`})
        getName(resObject.homeworld).then(name =>{result4.innerText = `Planeta natal: ${name}`})
        getName(resObject.species[0]).then(name =>{result5.innerText = `Espécie: ${name}`})
        break
        case "planets":
        result1.innerText = `Nome: ${resObject.name}`
        result2.innerText = `Diâmetro: ${resObject.diameter}`
        getTitle(resObject.films[0]).then(title=>{result3.innerText = `Primeira aparição: ${title}`})
        result4.innerText = `População: ${resObject.population}`
        result5.innerText = `Tempo da rotação: ${resObject.rotation_period}`
        break
        case "species":
        result1.innerText = `Nome: ${resObject.name}` 
        result2.innerText = `Altura média: ${resObject.average_height}`
        result3.innerText = `Expectativa de vida: ${resObject.average_lifespan}`
        getTitle(resObject.films[0]).then(title=>{result4.innerText = `Primeira aparição: ${title}`})
        getName(resObject.homeworld).then(name =>{result5.innerText = `Planeta natal: ${name}`})
        break
        case "vehicles":
        result1.innerText = `Nome: ${resObject.name}`
        result2.innerText = `Capacidade de carga: ${resObject.cargo_capacity}`
        result3.innerText = `Velocidade máxima: ${resObject.max_atmosphering_speed}`
        getTitle(resObject.films[0]).then(title=>{result4.innerText = `Primeira aparição: ${title}`})
        result5.innerText = `Número de passageiros: ${resObject.passengers}`
        break
        case "starships":
        result1.innerText = `Nome: ${resObject.name}`
        result2.innerText = `Capacidade de carga: ${resObject.cargo_capacity}`
        result3.innerText = `Velocidade máxima: ${resObject.max_atmosphering_speed}`
        getTitle(resObject.films[0]).then(title=>{result4.innerText = `Primeira aparição: ${title}`})
        result5.innerText = `Modelo: ${resObject.model}`
        break
        case "films":
        result1.innerText = `Título: ${resObject.title}`
        result2.innerText = `Número do episódio: ${resObject.episode_id}`
        result3.innerText = `Diretor: ${resObject.director}`
        result4.innerText = `Data de lançamento: ${resObject.release_date}`
        result5.innerText = `Produtor(es): ${resObject.producer}`
      }
    })
  }

  return(
    <main>
      <h1 id="title">SWApi</h1>
      <div className="container">
        <header>
          <div className="cell">
          <div className="set">
          <h1>Item da busca:</h1>
          <select value={parameter} onChange={(e)=>{setParameter(e.target.value)}}>
            <option value="people">Pessoas</option>
            <option value="planets">Planetas</option>
            <option value="species">Espécies</option>
            <option value="vehicles">Veículos</option>
            <option value="starships">Naves</option>
            <option value="films">Filmes</option>
          </select>
          </div>
          <div className="set">
            <h1>Texto de busca:</h1>
          <input type="text" value={text} onChange={(e)=>{setText(e.target.value)}}
          onKeyUp={(e)=>{
            if(e.key === 'Enter'){
              handleRequest()
            }
          }}/>
          </div>
          <div className="set">
          <h1>Forma de busca:</h1>
          <select value={type} onChange={(e)=>{setType(e.target.value)}}>
            <option value="">Id</option>
            <option value="?search=">Nome</option>
          </select>
          </div>
          </div>
          <button onClick={handleRequest}>Buscar!</button>
        </header>
        <section>
          <h1 id="result1">Faça uma busca!</h1>
          <h1 id="result2"></h1>
          <h1 id="result3"></h1>
          <h1 id="result4"></h1>
          <h1 id="result5"></h1>
        </section>
      </div>
    </main>
  )
}

export default App
