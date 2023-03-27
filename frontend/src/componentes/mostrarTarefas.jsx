import Tarefa from "./tarefa"
function MostrarTarefa({tarefas, actualizarTarefas}) {
   
   
   
   
   
    return(
        <ol>
            {
                tarefas.map(
                    tarefa=> <Tarefa tarefas={tarefa} actualizarTarefas={actualizarTarefas}/>
                )
            }
            
        </ol>
    )
}
export default MostrarTarefa