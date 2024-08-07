import { IoMdSearch } from "react-icons/io";
import { useState } from "react";
import './style.css'
import api from "./services/api";
function App() {
  const [input,setInput] = useState('')
  const [cep, setCep] = useState('')
  async function handleSearch(){
      if(input === ''){
        alert("preencha algum cep")
        return;
      }

      try{
        const response = await api.get(`${input}/json`);
        console.log(response.data)
        setCep(response.data)
        setInput("")
      }catch{
        alert("ops erro ao buscar")
        setInput("")
      }
  }
  return (
    <div className="container">
      <h1 className="title" >Buscador CEP</h1>
      <div className="containerInput">
        <input type="text" placeholder="Digite seu CEP..." value={input}
        onChange={(e) => setInput(e.target.value)}>
        </input>

        <button className="buttonSearch" onClick={handleSearch}>
          <IoMdSearch size={25} color="#fff" ></IoMdSearch>

        </button>
      </div >
      {Object.keys(cep).length > 0 &&(
        <main className="main">
        <h2>CEP: {cep.cep} </h2>
        <span>{cep.logradouro}</span>
        <span>{cep.complemento}</span>
        <span>Bairro {cep.bairro}</span>
        <span>{cep.localidade} - {cep.uf}</span>
      </main>
      )} 
      
    </div>
  );
}

export default App;
