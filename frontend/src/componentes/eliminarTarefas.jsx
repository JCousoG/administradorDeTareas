import { useState } from "react";

function EliminarTarefas({tarefaAEliminar}) {
    const [idEliminar, setIdEliminar] = useState()
    function manexadorInput(evento) {
        setIdEliminar(evento.target.value)
        console.log(idEliminar);
    }
    
    function manexadorClick() {
        console.log(idEliminar);
        fetch( 
            "http://localhost:8000/tarefa/",
            {
                method: "DELETE",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(
                    {
                    id: parseInt(idEliminar)
                    }
                )
            }
            )
            .then(reaccionParaResposta)
            .catch(reaccionParaErroResposta)
    }
        
        function reaccionParaResposta(resposta) {
            if (resposta.ok) {
                setIdEliminar()
                tarefaAEliminar()
            } else {
                alert(`A petición non foi aceptada ${resposta.status}`)
            }
        }
        function reaccionParaErroResposta(erro) {
            alert("Estamos tendo problemas coa conexión neste momento, probe a intentalo máis tarde")
    }
    return (
        <>
        <label>
            Introduce o número de Id para eliminar unha tarefa
            <input type="text" value={idEliminar} onInput={manexadorInput} />
        </label>
        <button onClick={manexadorClick}>-</button>
        
        </>
    )
}
export default EliminarTarefas