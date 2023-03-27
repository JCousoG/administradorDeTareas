import { useState } from "react"
import EliminarTarefas from "./eliminarTarefas"
function Tarefa ({tarefas, actualizarTarefas}) {

    const [descripcion, setDescripcion] = useState(tarefas.descripcion)
    const [rematada, setRematada] = useState(tarefas.rematada)

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
      function tarefaAModificar() {
        fetch(
          "http://localhost:8000/tarefa/",
          {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                  id: tarefas.id,
                  descripcion: descripcion,
                  rematada: rematada
                }
            )
          }
        )
        
      }
    
      function manexadorDescripcion(evento) {
        setDescripcion(evento.target.value)
        tarefaAModificar()
      }
      function manexadorRematada() {
        setRematada(!rematada)
        tarefaAModificar()
      }



    return(
        <li key={tarefas.id}>{tarefas.id}<input type = "text" value={descripcion} onInput={manexadorDescripcion}/> <input type="checkbox" checked={rematada} onClick={manexadorRematada}></input><EliminarTarefas tarefaId={tarefas.id} actualizarTarefas={actualizarTarefas}/></li>
    )
}
export default Tarefa

