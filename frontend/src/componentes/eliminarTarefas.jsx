function EliminarTarefas({tarefaId, actualizarTarefas}) {
   
    
    function manexadorClick() {
      
        fetch( 
            "http://localhost:8000/tarefa/",
            {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                    id: tarefaId
                    }
                )
            }
            )
            .then(reaccionParaResposta)
            .catch(reaccionParaErroResposta)
    }
        
        function reaccionParaResposta(resposta) {
            if (resposta.ok) {
                actualizarTarefas()
            } else {
                alert(`A petición non foi aceptada ${resposta.status}`)
            }
        }
        function reaccionParaErroResposta(erro) {
            alert("Estamos tendo problemas coa conexión neste momento, probe a intentalo máis tarde")
    }
    return (
        <>

        <button onClick={manexadorClick}>x</button>
        
        </>
    )
}
export default EliminarTarefas