let btns = document.getElementsByClassName("btn");
let output = document.getElementById("output");
let result = document.getElementById("result");
let outputStr = "0";
let symbols = "*/-+%";
let numbers = "1234567890";
let isNewOperation = false;

function evil(fn) {
  return new Function("return " + fn)();
}

for (let i = 0; i < btns.length; i++) {
  btns[i].addEventListener("click", (e) => {
    let inputSymbol = btns[i].children[0].innerHTML;

    if (isNewOperation && !symbols.includes(inputSymbol)) {
      outputStr = "0";
      result.innerText = "";
      isNewOperation = false;
    } else if (isNewOperation && symbols.includes(inputSymbol)) {
      outputStr = result.innerText;
      result.innerText = "";
      isNewOperation = false;
    }

    if (
      numbers.includes(inputSymbol) &&
      outputStr[0] == "0" &&
      !outputStr.includes(".") &&
      !outputStr.includes("/") &&
      !outputStr.includes("*") &&
      !outputStr.includes("+") &&
      !outputStr.includes("-")
    ) {
      outputStr = outputStr.substring(1);
      console.log(true);
    }

    if (inputSymbol == "C") {
      outputStr = "0";
    } else if (
      symbols.includes(inputSymbol) &&
      symbols.includes(outputStr[outputStr.length - 1])
    ) {
      outputStr = outputStr.slice(0, -1);
      outputStr += inputSymbol;
    } else if (btns[i].classList.contains("remove")) {
      outputStr = outputStr.slice(0, -1);
      if(outputStr < 1) {
        outputStr = "0"
      }
    } else if (inputSymbol == "=") {
      result.innerText = evil(outputStr);
      isNewOperation = true;
    } else if (inputSymbol != "+/_") {
      outputStr += inputSymbol;
    }

    output.innerText = outputStr;
  });
}
