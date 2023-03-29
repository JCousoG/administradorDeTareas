import { useEffect, useState } from "react"
import EliminarTarefas from "./eliminarTarefas"
function Tarefa ({tarefas, actualizarTarefas}) {

    const [descripcion, setDescripcion] = useState(tarefas.descripcion)
    const [rematada, setRematada] = useState(tarefas.rematada)
    useEffect(
      tarefaAModificar,
      [descripcion, rematada]
    )
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
      }
      function manexadorRematada() {
        setRematada(!rematada)
      }



    return(
        <li>{tarefas.id}<input type = "text" value={descripcion} onInput={manexadorDescripcion}/> <input type="checkbox" checked={rematada} onClick={manexadorRematada}></input><EliminarTarefas tarefaId={tarefas.id} actualizarTarefas={actualizarTarefas}/></li>
    )
}
export default Tarefa

