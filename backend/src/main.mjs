import express from "express"
import cors from "cors"
import sqlite3 from 'sqlite3';

const app = express()
app.use(cors())
app.use(express.json())

const db = new sqlite3.Database('./base-de-datos.db', (error)=> {
    if (error) console.error(error)
    else console.log('Conectada coa base de datos.');

});
db.run(`
CREATE TABLE
    IF NOT EXISTS
    tarefas(
        id INTEGER PRIMARY KEY,
        descripcion TEXTO NON null,
        rematada BOOLEAN NOT NULL
    )
`);

app.post("/tarefa/", (peticion, respuesta)=>{
    db.run( // Exemplo de inserción na base de datos
    `INSERT INTO tarefas(id, descripcion, rematada) VALUES (?, ?, ?)`,
    [peticion.body.id, peticion.body.descripcion, peticion.body.rematada],
    (error) => {
        if (error) {
            console.error(error) 
            respuesta.status(500)
            respuesta.send(`Erro accedendo a base de datos.
            Consulta a consola do backend para máis información`)
        } else {
            respuesta.status(200)
            respuesta.send("Ok")
        }
    }
)
})
app.put("/tarefa/", (peticion, respuesta)=>{
    db.run(
        'UPDATE tarefas SET descripcion = ?, rematada = ? WHERE id = ?',
        [peticion.body.descripcion, peticion.body.rematada, peticion.body.id],
        (error)=>{
            if (error) {
                console.error(error) 
                respuesta.status(500)
                respuesta.send(`Erro accedendo a base de datos.
                Consulta a consola do backend para máis información`)
            } else {
                respuesta.status(200)
                respuesta.send("Ok")
            }
        }
    )
})
app.delete("/tarefa/", (peticion, respuesta)=>{
    db.run(
        'DELETE FROM tarefas WHERE id = ?',
        [peticion.body.id],
        (error)=>{
            if (error) {
                console.error(error) 
                respuesta.status(500)
                respuesta.send(`Erro accedendo a base de datos.
                Consulta a consola do backend para máis información`)
            } else {
                respuesta.status(200)
                respuesta.send("Ok")
            }
        }
    )
})
app.get("/tarefa/", (peticion, respuesta)=>{
    if (peticion.query.id) {
        db.get( // Ejemplo de consulta para obter unha tarefa específica
            `SELECT id, descripcion, rematada FROM tarefas WHERE id = ?`,
            [peticion.query.id],
            (error, tarefas) => {
                if (error) {
                    console.error(error)
                    respuesta.status(500)
                    respuesta.send(`Error accediendo a la base de datos.
                    Consulta la consola del backend para más información`)
                }
                else {
                    if (tarefas) {
    respuesta.status(200)
    respuesta.send(JSON.stringify(tarefas))
} else {
    respuesta.status(404)
    respuesta.send(`Non se atopou a tarefa con id ${peticion.query.id}`)
}  
}
}
)
} else  {
db.all( // Se non se especifica unha tarefa, entreganse todas
`SELECT id, descripcion, rematada FROM tarefas`,
(error, datos) => {
    if (error) {
        console.error(error)
        respuesta.status(500)
        respuesta.send(`Erro o acceder a base de datos.
        Consulta a consola do backend para máis información`)
    }
    else {
        const JSONdatos = JSON.stringify(datos)
        respuesta.status(200)
        respuesta.send(JSONdatos)
    }
}
)
}      
})

app.listen( 8000,()=>{
    console.log("Express traballando...");
})
