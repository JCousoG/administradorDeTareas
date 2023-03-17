import { useState } from "react";

function NovaTarefa({actualizarTarefas}){
    const [descripcion, setDescripcion] = useState("")
    function manexadorInput(evento) {
        setDescripcion(evento.target.value)
    }
    function manexadorClick() {
        const paraId = Date.now()
        const tarefa = {
            id: paraId,
            descripcion: descripcion,
            rematada: false,
        }
        const JSONTarefa = JSON.stringify(tarefa)
   
    fetch( 
        "http://localhost:8000/tarefa/",
        {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSONTarefa,
        }
        )
        .then(reaccionParaResposta)
        .catch(reaccionParaErroResposta)
}
    function reaccionParaResposta(resposta) {
        if (resposta.ok) {
            setDescripcion("")
            actualizarTarefas()
        } else {
            alert(`A petición non foi aceptada ${resposta.status}`)
        }
    }
    function reaccionParaErroResposta(erro) {
        alert("Estamos tendo problemas coa conexión neste momento, probe a intentalo máis tarde")
    }
    return(
        <>
        <label>
            Engade unha nova tarefa
            <input type="text" value={descripcion} onInput={manexadorInput}/>
        </label>
        <button onClick={manexadorClick}>+</button>
        
        </>
    )
}
export default NovaTarefa