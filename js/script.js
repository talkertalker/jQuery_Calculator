$(document).ready(function() {

  var display = $(".screen__view"),
    numberButton = $(".keypad__num .keypad__button"),
    operationsButton = $(".keypad__symbols .keypad__button"),
    //--currentBank is the array used to temporarily
    //--store the numbers that the user has punched in
    //--for the current screen. userBank is where they
    //--get pushed after the user hits an operations
    //--button on the calculator.
    currentBank = [],
    userBank = [],
    toScreen = "",
    continuedEquation = false,
    isResult = false;

  numberButton.click(function() {
    if ($(this).hasClass("clearBtn")) {
      display.html("0");
      currentBank = [];
      toScreen = "";
      userBank = [];
      continuedEquation = false;
      isResult = false;
    } else {
      if (continuedEquation) {
        //--This checks to see if, when the user
        //--pushes a number, he or she needs
        //--the screen cleared because they
        //--just pushed an operator button.
        display.html("");
      }
      currentBank.push($(this).html());
      toScreen = currentBank.join("");
      display.html(toScreen);
      if (display.html().length > 7) {
        var myTemp = display.html();
        display.html(myTemp.slice(0, 7));
      }
    }
  });

  operationsButton.click(function() {
    if ($(this).hasClass("equalSign")) {
      var result = 0;
      userBank.push(parseFloat(currentBank.join("")));
      currentBank = [];
      result = math.eval(userBank.join(""));
      userBank = [];
      if (result.toString().length > 7) {
        result = result.toString().slice(0, 7);
      }
      display.html(result);
      isResult = true;
    } else if ($(this).hasClass("multiSign")) {
      if (isResult) {
        userBank.push(parseFloat(display.html()));
        isResult = false;
      } else {
        userBank.push(parseFloat(currentBank.join("")));
      }
      currentBank = [];
      userBank.push("*");
      continuedEquation = true;
      console.log(userBank);
    } else {
      if (isResult) {
        userBank.push(parseFloat(display.html()));
        isResult = false;
      } else {
        userBank.push(parseFloat(currentBank.join("")));
      }
      currentBank = [];
      userBank.push($(this).html());
      continuedEquation = true;
      console.log(userBank);
    }
  });

});
