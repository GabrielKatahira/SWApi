import { useState } from 'react'
import './App.css'

function App() {

  const [text, setText] = useState('')
  const [type, setType] = useState('')
  const [parameter, setParameter] = useState('people')

  function getName(url:String) {
    const requestName = fetch(`${url}`).then(res=>res.json())
    requestName.then((res)=>{
      return res.name
    })
  }
  function handleRequest () {
    const requestResult = fetch(`https://swapi.dev/api/${parameter}/${type}${text}`).then(res=>res.json())
    let result1 = document.getElementById('result1') as HTMLElement
    let result2 = document.getElementById('result2') as HTMLElement
    let result3 = document.getElementById('result3') as HTMLElement
    if (result1){
      result1.innerText = "carregando..."
      result2.innerText = "carregando..."
      result3.innerText = "carregando..."
    }
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
        result2.innerText = `Planeta Natal: ${getName(resObject.homeworld)}`
      }
    })
  }

  return(
    <main>
      <div className="container">
        <header>
          <div className="set">
            <h1>Texto de busca:</h1>
          <input type="text" value={text} onChange={(e)=>{setText(e.target.value)}}/>
          </div>
          <div className="set">
          <h1>Item da busca:</h1>
          <select value={parameter} onChange={(e)=>{setParameter(e.target.value)}}>
            <option value="people">Pessoas</option>
            <option value="planets">Planetas</option>
            <option value="species">Espécies</option>
            <option value="vehicles">Veículos</option>
            <option value="spaceships">Naves</option>
            <option value="films">Filmes</option>
          </select>
          </div>
          <div className="set">
          <h1>Forma de busca:</h1>
          <select value={type} onChange={(e)=>{setType(e.target.value)}}>
            <option value="">Id</option>
            <option value="?search=">Nome</option>
          </select>
          </div>
          <button onClick={handleRequest}>request</button>
        </header>
        <section>
          <h1 id="result1">Faça uma busca!</h1>
          <h1 id="result2"></h1>
          <h1 id="result3"></h1>
        </section>
      </div>
    </main>
  )
}

export default App
