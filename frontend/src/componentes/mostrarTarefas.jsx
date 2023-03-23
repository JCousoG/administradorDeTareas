function MostrarTarefa({tarefas}) {
    return(
        <ol>
            {
                tarefas.map(
                    tarefa=><li key={tarefa.id}>{tarefa.id}{tarefa.descripcion} <input type="checkbox" checked={tarefa.rematada}></input></li>
                )
            }
        </ol>
    )
}
export default MostrarTarefa