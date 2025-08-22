import { error } from "console";
import { Request, Response } from "express";


const todos = [
    { id: 1, text: 'Buy Milk', completedAt: new Date() },
    { id: 2, text: 'Buy Bread', completedAt: new Date() },
    { id: 3, text: 'Buy Butter', completedAt: new Date() },
]


export class TodosController {

    // * DI (dependention injection)
    constructor() { };



    public getTodos = (req: Request, res: Response) => {
        return res.json(todos);
    }


    public getTodoById = (req: Request, res: Response) => {
        //La expresión const id = +req.params.id; convierte el valor de req.params.id (que es un string) a número usando el operador + (unario). Si req.params.id es "5", entonces id será 5 (número). Si no lo convierte correctamente, asegúrate de que req.params.id realmente contiene un valor numérico válido.
        //const id = +req.params.id;
    
        const id = Number(req.params.id);
        if ( isNaN(id) ) return res.status(400).json( { error: 'ID argument is not a number'});      

        const todo = todos.find( todo => todo.id === id);

        ( todo )
            ? res.json( todo )
            : res.status(404).json( {errro: `TODO with id ${ id } not found`} )        
    };


    public createTodo = (req: Request, res: Response) => {
        const { text } = req.body;

        if ( !text) return res.status(400).json( { error: 'Text property is required' } );

        const newTodo = {
            id: todos.length + 1,
            text: text, 
            completedAt: null
        }

        todos.push( newTodo )

        return res.json( newTodo );
    };


    public updateTodo = (req: Request, res: Response) => {

        const id = Number(req.params.id);
        if ( isNaN(id) ) return res.status(400).json( { error: 'ID argument is not a number'});      

        const todo = todos.find( todo => todo.id === id);
        if ( !todo ) return res.status( 404 ).json( { error: `Todo with id ${ id } not found` } );

        const { text, completedAt } = req.body;
    
        todo.text = text || todo.text;
        ( completedAt === 'null')
            ? todo.completedAt = null
            : todo.completedAt = new Date( completedAt || todo.completedAt);

        res.json( todo );
    }


    public deleteTodo = (req: Request, res: Response) => {

        const id = +req.params.id;
        if ( isNaN(id) ) return res.status(400).json( { error: 'ID argument is not a number'});

        const todo = todos.find( todo => todo.id === id);
        if (!todo) return res.status( 404 ).json( { error: `Todo with id ${ id } not found` } );

        todos.splice( todos.indexOf(todo), 1 );
        res.json( todo );
        
        // const index = todos.findIndex( todo => todo.id === id) ;
        // if ( index === -1) return res.status( 404 ).json( { error: `Todo with id ${ id } not found` } );
        // const deleted = todos.splice(index, 1)[0]  
    }





}