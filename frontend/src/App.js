import "./App.css"
import { useEffect, useState } from "react";
import NovaTarefa from "./componentes/novatarefa";
import MostrarTarefas from "./componentes/mostrarTarefas";

function App() {

  const [tarefas, setTarefas] = useState([])
  useEffect(
    obterTarefasActualizadas,
    []
  )
 
 
  function obterTarefasActualizadas(){
    fetch("http://localhost:8000/tarefa/")
    .then(reaccionParaResposta)
    .catch(reaccionErroResposta)
  }

  function reaccionParaResposta(resposta){
    resposta.json().then(reaccionParaNovosDatos)
  }
  function reaccionErroResposta(erro) {
    erro("Estamos tendo problemas coa conexión neste momento, probe a intentalo máis tarde")
  }

  function reaccionParaNovosDatos(novosDatos){
    setTarefas(novosDatos)
  }
  function manexadorActualizar() {
    window.location.reload()
  }

  return (
    <main>
      <button onClick={manexadorActualizar}>Actualizar</button>
      <h1>Administrador de tarefas</h1>
      <NovaTarefa actualizarTarefas={obterTarefasActualizadas}/>
      <MostrarTarefas tarefas={tarefas} actualizarTarefas={obterTarefasActualizadas}/>
      
      
    </main>
  );
 
}


export default App;