import * as readline from "readline-sync";
import data from "./todos.json";
import { todo } from "node:test";
import { REPL_MODE_SLOPPY } from "repl";


// interface Todo {
//     id: number;
//     title: string;
//     completed: boolean;
// }


// while (true) {
    
//     const actions : string[] = ["Add task", "Show tasks", "Mark as done", "Exit"]
    
//     const choice : number = rl.keyInSelect(actions,"What would like you to do ?",{cancel:false});
    
//     if(choice === 3) break;

//     if(choice === 0) {

//         const taskToAdd : Todo = {
//         id: data.length + 1,
//         title: rl.question("Enter a task: "),
//         completed: false
//         };    
//         data.push(taskToAdd);

//     } 
//     else if(choice === 1) {
//         for (let i = 0; i < data.length; i++) {
//             if(data[i].completed){
//               console.log(`${i + 1}. [X] ${data[i].title}`)  
//             } else {
//                 console.log(`${i + 1}. [ ] ${data[i].title}`) 
//             }
//         }
//     }
//     else if(choice === 2) {
        
//         const todosDone : Todo[] = [];

//         for (let i = 0; i < data.length; i++) {

//             if(!data[i].completed){
//                 todosDone.push(data[i]);
//             } 

//         }
        
//         let counter : number = 1;
//         todosDone.forEach((e) => {
//             console.log(`[${counter}]. ${e.title}`);
//             counter++;
//         });

//         let index : number | undefined = undefined;
        
//         do {
            
    
//             console.log("");
//             index = rl.questionInt("What did you do? ") - 1;

//             if(!(index >= 0 && index < todosDone.length)) {
//                 console.log("")
//                 console.log("Maak een geldige keuze");
//             }  

//         } while (!(index >= 0 && index < todosDone.length));
        
//         const idDone : number = todosDone[index].id;

//         data.forEach((e) => {
//             if(e.id === idDone) {
//                 e.completed = true;
//             }
//         });
        

//     }   
    

// }





interface Todo {
    userId?: number;
    id: number;
    title: string;
    completed: boolean;
  }
  
  const menuItems: string[] = [
    "Add a task",
    "Show tasks",
    "Check a task",
    "Exit"
  ];


 async function dataTodo() {

    const response = await fetch("https://jsonplaceholder.typicode.com/todos/");
    const data: Todo[] = await response.json();

    let todos: Todo[] = [];

    for (let i = 0; i < 15; i++) {
      todos.push(data[i]);  
    }



    let nextId: number = todos.length + 1;
  
    let running: boolean = true;

  do {


    let option: number = readline.keyInSelect(menuItems, "What do you want to do?", { cancel: false });
    if (option === 0) {
      let title: string = readline.question("Enter a task: ");
      todos.push({ id: nextId++, title: title, completed: false });


    } else if (option === 1) {

      for (let todo of todos) {
          console.log(`${todo.id}. [${todo.completed ? 'X' : ' '}] ${todo.title}`);
      }


    } else if (option === 2) {


      let todoTitles : string[] = [];
      
      for (let todo of todos) {
          if (!todo.completed) {
              todoTitles.push(todo.title);        
          }
      }
      let taskIndex: number = readline.keyInSelect(todoTitles, "Which task did you complete?", { cancel: false });
      let todoTitle: string = todoTitles[taskIndex];
      for (let todo of todos) {
          if (todo.title === todoTitle) {
              todo.completed = true;
          }
      }
    } else if (option === 3) {
      running = false;
    }
  } while (running);

}

dataTodo();