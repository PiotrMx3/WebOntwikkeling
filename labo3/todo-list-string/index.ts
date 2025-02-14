import * as rl from "readline-sync";

let todoTasks : string[] = []
let completedTasks : string[] = [];

const actions : string[] = ["Add a task", "Show tasks", "Check tasks", "Exit"];


let isRunning : boolean = true;    

while (isRunning) {
    
    const choice : number = rl.keyInSelect(actions, "What would you like to do ? ",{cancel: false});
    switch (choice) {
        case 0:
            const taskToAdd = rl.question("Enter a task: ")
            todoTasks.push(taskToAdd);
            break;

            case 1:
            const allTasks : string[] = [...todoTasks,...completedTasks];

            for (let i = 0; i < allTasks.length; i++) {
                if(completedTasks.includes(allTasks[i])) {
                    console.log(`${i + 1} [X] ${allTasks[i]}`)
                } else {
                    console.log(`${i + 1} [ ] ${allTasks[i]}`)
                }
            }
            break;
        case 2:
                const finishTask = rl.keyInSelect(todoTasks, "What did you do ? ", {cancel: false});
                if(!completedTasks.includes(todoTasks[finishTask])){
                    completedTasks.push(todoTasks[finishTask]);
                    todoTasks.splice(finishTask , 1);
                }

            break;
        case 3:
                isRunning = false;
            break;

        default:
                console.log("Maakk een geldige keuze !")        
            break;
    }
    
}





// import readline from 'readline-sync';

// const tasks: string[] = [];
// const checkedTasks: string[] = [];

// const menuItems : string[] = [
//     "Add a task",
//     "Show tasks",
//     "Check a task",
//     "Exit"
// ];

// let running: boolean = true;
// do {
// let option : number = readline.keyInSelect(menuItems, "What do you want to do?", {cancel: false});

// if (option === 0) {
//     let task: string = readline.question("Enter a task: ");
//     tasks.push(task);
// } else if (option === 1) {
//     for (let i = 0; i < tasks.length; i++) {
//         console.log(`${i + 1}. [ ] ${tasks[i]}`);
//     }
//     for (let i = 0; i < checkedTasks.length; i++) {
//         console.log(`${i + 1}. [X] ${checkedTasks[i]}`);
//     }
// } else if (option === 2) {
//     let taskIndex: number = readline.keyInSelect(tasks, "What did you do?", { cancel: false });
//     checkedTasks.push(tasks[taskIndex - 1]);
//     tasks.splice(taskIndex, 1);
// } else if (option === 3) {
//     running = false;
// }
// } while (running);




// export {}

    
    




