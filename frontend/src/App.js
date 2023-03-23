import "./App.css"
import { useEffect, useState } from "react";
import NovaTarefa from "./componentes/novatarefa";
import MostrarTarefas from "./componentes/mostrarTarefas";
import EliminarTarefas from "./componentes/eliminarTarefas";
function App() {

  const [tarefas, setTarefas] = useState([])
  useEffect(
    obterTarefasActualizadas,
    []
  )
  useEffect(
    tarefaAEliminar,
    []
  )
  function tarefaAEliminar() {
    fetch("http://localhost:8000/tarefa/")
    .then(reaccionParaRespostaEliminar)
    .catch(reaccionErroRespostaEliminar)
  }
  function reaccionParaRespostaEliminar(resposta) {
    resposta.json().then(tarefaAEliminar)
  }
  function reaccionErroRespostaEliminar(erro) {
    erro("Estamos tendo problemas coa conexión neste momento, probe a intentalo máis tarde")
  }

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
      <MostrarTarefas tarefas={tarefas}/>
      <EliminarTarefas tarefaAEliminar={tarefaAEliminar}/>
      
    </main>
  );
 
}


export default App;