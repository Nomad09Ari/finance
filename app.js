// user interface ugiin tovchlol bolgoj uiController huvisagch uusgelee
// Ugugdliin daldlalt hiih buyu IIFE ashiglaad anonymous bichiglel hiij bna

// Delgetstei ajillah controller
var uiController = (function () {
  // Private data
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
  };
  // Public servers
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value,
      };
    },

    getDOMstrings: function () {
      return DOMstrings;
    },
  };
})();

// Sanhuutei ajillah controller
var financeController = (function () {
  // Orlogo zarlagaa burtgeh function ni baiguulagch function ashiglay
  var Income = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };
  var Expense = function (id, description, value) {
    this.id = id;
    this.description = description;
    this.value = value;
  };

  // Orlogo zarlaguud bolon buh orlogo zaralguudiig neg object uusgeed tuun dotroo bairluulah
  var data = {
    allItems: {
      inc: [],
      exp: [],
    },
    
    totals: {
      inc: [],
      exp: [],
    },
  };

})();

// Programm holbogch controller
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    // 1. Oruulah ugugdluudiig delgetsees olj avna
    console.log(uiController.getInput());

    // 2. Olj avsan ugugdluudee sanhuugiin controllert damjuulj tend hadgalna
    // 3. Olj avsan ugugdluudee web deeree tohiroh hesegt gargaj uzuulne
    // 4. Tusviig tootsoolno
    // 5. Etssiin uldegdel, tootsoog delgetsend gargana.
  };

  setupEventListener = function () {
    var DOM = uiController.getDOMstrings();

    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });
    // Event Listener tohiruulah
    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) {
        ctrlAddItem();
      }
    });
  };

  return {
    init: function () {
      console.log("App started...");
      setupEventListener();
    },
  };
})(uiController, financeController);

// App-iig dahin ehluuleh
appController.init();

/*
// Orlogo hiij uzetsgeey

var i1 = new Income(1, "Salary", 2000000);
var i2 = new Income(2, "Bingo", 100000);

// console.log(i1);
// console.log(i2);

var incomes = [];

incomes.push(i1);
incomes.push(i2);

console.log(incomes[i1].description);
*/
