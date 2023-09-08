const readline = require("readline");
const fs = require("fs");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const todosFile = "todos.json";
let todos = [];

if (fs.existsSync(todosFile)) {
  const data = fs.readFileSync(todosFile, "utf8");
  todos = JSON.parse(data);
}

function saveTodos() {
  const data = JSON.stringify(todos);
  fs.writeFileSync(todosFile, data, "utf8");
}

function addTodo() {
  rl.question("Enter new entry: ", function (description) {
    todos.push(description);
    console.log("Added!");
    saveTodos();
    showMenu();
  });
}

function markTodo() {
  listTodos();
  rl.question(
    "Enter entry number to be marked as done: ",
    function (todoNumber) {
      const index = parseInt(todoNumber) - 1;

      if (index >= 0 && index < todos.length) {
        console.log(`Marked "${todos[index]}" as done.`);
        todos.splice(index, 1);
        saveTodos();
      } else {
        console.log("Invalid");
      }

      showMenu();
    }
  );
}

function updateTodo() {
  listTodos();
  rl.question("Enter entry number to update: ", function (todoNumber) {
    const index = parseInt(todoNumber) - 1;

    if (index >= 0 && index < todos.length) {
      rl.question(
        `Enter Updated Info "${todos[index]}": `,
        function (newDescription) {
          todos[index] = newDescription;
          console.log("Updated!");
          saveTodos();
          showMenu();
        }
      );
    } else {
      console.log("Invalid");
      showMenu();
    }
  });
}

function deleteTodo() {
  listTodos();
  rl.question("Enter entry number to delete: ", function (todoNumber) {
    const index = parseInt(todoNumber) - 1;

    if (index >= 0 && index < todos.length) {
      console.log(`Deleted "${todos[index]}".`);
      todos.splice(index, 1);
      saveTodos();
    } else {
      console.log("Invalid");
    }

    showMenu();
  });
}

function listTodos() {
  console.log("\nTodo List:");
  todos.forEach(function (todo, index) {
    console.log(`${index + 1}. ${todo}`);
  });
}

function showMenu() {
  listTodos();
  console.log("\nOptions:");
  console.log("1. Add an entry");
  console.log("2. Mark an entry as done");
  console.log("3. Update an entry");
  console.log("4. Delete an entry");
  console.log("5. Quit");

  rl.question("Enter your choice: ", function (choice) {
    switch (choice) {
      case "1":
        addTodo();
        break;
      case "2":
        markTodo();
        break;
      case "3":
        updateTodo();
        break;
      case "4":
        deleteTodo();
        break;
      case "5":
        console.log("boop");
        rl.close();
        break;
      default:
        console.log("Wake up cocksucker");
        showMenu();
    }
  });
}

showMenu();
