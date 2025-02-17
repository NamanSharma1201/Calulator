const buttons = document.querySelectorAll(".btn");
const screen = document.getElementById("expression");
let expression = "";

// Add event listener to each button
buttons.forEach((button) => {
  const type = button.getAttribute("data-type");
  const value = button.getAttribute("data-value");

  button.addEventListener("click", () => {
    if (expression === "Invalid") {
      expression = "";
    }
    if (type === "number") {
      expression += value;
    } else if (type === "operator") {
      expression += ` ${value} `;
    } else if (type === "action") {
      if (value === "AC") {
        expression = "";
      } else if (value === "DEL") {
        helper();
      } else {
        expression = evaluate(expression);
      }
    }

    update();
  });
});

function evaluate(expression) {
  console.log(expression);
  if (
    expression.length < 3 ||
    expression[0] == " " ||
    expression[expression.length - 1] == " "
  )
    return "Invalid";
  const tokens = expression.split(" ");
  let operations = [];
  let res = 0;
  let n = tokens.length;

  if (n % 2 == 0 || n < 3) {
    return "Invalid";
  }
  let num1, num2;

  for (let i = 0; i < n; i++) {
    if (tokens[i] === "*" || tokens[i] === "/") {
      if (
        operations.length === 0 ||
        operations[operations.length - 1] === "-" ||
        operations[operations.length - 1] === "+" ||
        i + 1 >= n
      ) {
        res = NaN;
        break;
      }
      if (tokens[i] === "/" && tokens[i + 1] === 0) {
        res = NaN;
        break;
      }
      if (tokens[i] === "/") {
        operations[operations.length - 1] =
          Number(operations[operations.length - 1]) / Number(tokens[i + 1]);
      } else {
        operations[operations.length - 1] =
          Number(operations[operations.length - 1]) * Number(tokens[i + 1]);
      }
      i++;
    } else {
      operations.push(tokens[i]);
    }
  }

  if (operations.length % 2 == 0 || isNaN(res)) {
    return "Invalid";
  }
  n = operations.length;
  if (operations.length == 1) return operations[0];
  for (let i = n - 1; i >= 2; i -= 2) {
    num1 = res;
    if (i === n - 1) {
      num1 = Number(operations[i]);
    }
    let operator = operations[i - 1];
    num2 = Number(operations[i - 2]);
    if (isNaN(num1) || isNaN(num2)) {
      return "Invalid";
    }

    if (operator === "+") {
      res = num1 + num2;
    } else {
      res = num2 - num1;
    }
  }

  if (isNaN(res)) {
    return "Invalid";
  }

  return res;
}

function helper() {
  let n = expression.length;
  if (n > 0) {
    if (n == 1) {
      expression = "";
      return;
    }
    const lastChar = expression[n - 1];
    if (lastChar === " ") {
      expression = expression.slice(0, -3);
    } else {
      expression = expression.slice(0, -1);
    }
  }
}

function update() {
  screen.innerText = expression;
}
