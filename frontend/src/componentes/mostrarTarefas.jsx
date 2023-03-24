import EliminarTarefas from "./eliminarTarefas"

function MostrarTarefa({tarefas}) {
   
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
    
   
   
   
    return(
        <ol>
            {
                tarefas.map(
                    tarefa=><li key={tarefa.id}>{tarefa.id}{tarefa.descripcion} <input type="checkbox" checked={tarefa.rematada}></input><EliminarTarefas tarefaId={tarefa.id}/></li>
                )
            }
            
        </ol>
    )
}
export default MostrarTarefa