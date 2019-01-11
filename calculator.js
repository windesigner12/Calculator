    // Operation functions
    function add(a, b) {
      return (+a + +b);
    };
    function subtract(a, b) {
      return a - b;
    };
    function multiply(a, b) {
      return a * b;
    };
    function divide(a, b) {
      if (b == 0){
        return "WRONG";
      } else {
        return a / b;
      }
    };
    function operate(operator, a, b) {
      return operator == "+" ? add(a, b) : operator == "-" ? subtract(a, b) :
      operator == "*" ? multiply(a, b) : operator == "/" ? divide(a, b) : "error";
    };
    function operateAndReplace(x) {
      let op = operate(problem[x], problem[x - 1], problem[x + 1]);
      problem.splice(x - 1, 3, op);
      problemIndex = (problem.length -1);
      problem[problemIndex] = problem[problemIndex].toString();
    };

    // Variables and functions for calculator display
    let problem = [""];
    let problemIndex = (problem.length - 1);

    function numToDisp(x) {
      if (problem.join("").length < 10) {
        problem[problemIndex] += x;
        document.getElementById("displayTwo").innerText = problem.join("");
      };
    };

    document.getElementById("numPad").addEventListener("click", (e) => {
      let dispNum = e.target.innerText;
      document.getElementById("displayOne").innerText = "";
      if (dispNum == ".") {
        if (problem.join("").includes(".") == false) {
          numToDisp(dispNum);
        }
      } else if (dispNum == "="){
        document.getElementById("displayOne").innerText = problem.join("") + " =";
        while(problem.length > 1) {
          if ((problem.indexOf("*") != -1) && (problem.indexOf("/") != -1)) {
            if (problem.indexOf("*") < problem.indexOf("/")) {
              operateAndReplace(problem.indexOf("*"));
            } else {
              operateAndReplace(problem.indexOf("/"));
            };
          } else if (problem.indexOf("*") != -1) {
            operateAndReplace(problem.indexOf("*"));
          } else if (problem.indexOf("/") != -1) {
            operateAndReplace(problem.indexOf("/"));
          } else if ((problem.indexOf("+") != -1) && (problem.indexOf("-") != -1)) {
            if (problem.indexOf("+") < problem.indexOf("-")) {
              operateAndReplace(problem.indexOf("+"));
            } else {
              operateAndReplace(problem.indexOf("-"));
            };
          } else if (problem.indexOf("+") != -1) {
            operateAndReplace(problem.indexOf("+"));
          } else if (problem.indexOf("-") != -1) {
            operateAndReplace(problem.indexOf("-"));
          };
        }
        problemIndex = (problem.length - 1);
        if (problem[problemIndex].length < 10) {
          document.getElementById("displayTwo").innerText = problem[problemIndex];
        } else {
          if ((problem[problemIndex].indexOf(".") != -1) && (problem[problemIndex].indexOf(".") < 10)) {
            problem[problemIndex] = problem[problemIndex].slice(0, 10);
            document.getElementById("displayTwo").innerText = problem[problemIndex];
          } else {
            document.getElementById("displayTwo").innerText = "oops";
          }
        };
      } else {
        numToDisp(dispNum);
      }
    });

    document.getElementById("operators").addEventListener("click", (e) => {
      if (e.target.innerText == "DEL") {
        document.getElementById("displayOne").innerText = "";
        if ((problem[problemIndex].length == 1) && (problemIndex != 0)) {
          problem.pop();
          problemIndex = (problem.length - 1);
          document.getElementById("displayTwo").innerText = problem.join("");
        } else if (problem[problemIndex].length > 1) {
          problem[problemIndex] = problem[problemIndex].slice(0, -1);
          document.getElementById("displayTwo").innerText = problem.join("");
        } else if ((problem[problemIndex].length == 1) && (problemIndex == 0)) {
          problem[problemIndex] = "";
          document.getElementById("displayTwo").innerText = problem.join("");
        }else if ((problem[problemIndex].length == 0) && (problemIndex != 0)) {
          problem.pop();
          problem.pop();
          problemIndex = (problem.length - 1);
          document.getElementById("displayTwo").innerText = problem.join("");
        }
      } else {
        if (problem[problemIndex].length != 0) {
          problem.push("");
          problemIndex = (problem.length - 1);
          numToDisp(e.target.innerText);
          problem.push("");
          problemIndex = (problem.length - 1);
        }
      }
    });
