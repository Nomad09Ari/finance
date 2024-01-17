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
    incomeList: ".income__list",
    expenseList: ".expenses__list",
  };
  // Public service
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseInt(document.querySelector(DOMstrings.inputValue).value),
      };
    },

    getDOMstrings: function () {
      return DOMstrings;
    },

    clearFields: function () {
      var fields = document.querySelectorAll(
        DOMstrings.inputDescription + ", " + DOMstrings.inputValue
      );

      // Convert List to Array
      // Slice ni Array eh function-ees udamshij irsen tul slice.call ashiglan this-iig ni uurchilj bna
      var fieldsArr = Array.prototype.slice.call(fields);
      // ES6 nemelt uurchlult
      fieldsArr.forEach(function (el, index, array) {
        el.value = "";
      });

      // for (var i = 0; i < fieldsArr.length; i++) {
      //   fieldsArr[i].value = "";
      // }

      // Ustgasnii daraa cursor-iig tohiruulah
      fieldsArr[0].focus();
    },

    addListItem: function (item, type) {
      // Orlogo zarlagiin elementiig aguulsan html beltgene.
      var html, list;
      if (type === "inc") {
        list = DOMstrings.incomeList;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">&&VALUE&&</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        list = DOMstrings.expenseList;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">&&VALUE&&</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      // Ter html dotroo orlogo zarlagiin utguudiig REPLACE ashiglan uurcilj ugnu.
      html = html.replace("%id%", item.id);
      html = html.replace("$$DESCRIPTION$$", item.description);
      html = html.replace("&&VALUE&&", item.value);

      // Beltgesen html-ee DOM ruu hiij ugnu.
      document.querySelector(list).insertAdjacentHTML("beforeend", html);
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

  var calculateTotal = function (type) {
    var sum = 0;
    data.items[type].forEach(function (el) {
      sum = sum + el.value;
    });

    data.totals[type] = sum;
  };

  // Orlogo zarlaguud bolon buh orlogo zaralguudiig neg object uusgeed tuun dotroo bairluulah
  var data = {
    items: {
      inc: [],
      exp: [],
    },

    totals: {
      inc: 0,
      exp: 0,
    },

    tusuv: 0,

    percent: 0,
  };

  return {
    tusuvTootsooloh: function () {
      // Niit orlogiin niilberiig tootsoolno
      calculateTotal("inc");
      // niit zarlagiin tusviig tootsoolno
      calculateTotal("exp");
      // Tusviig shineer tootsoolno
      data.tusuv = data.totals.inc - data.totals.exp;

      // orlogo zarlagiin huviig tootsoolno
      data.percent = Math.round((data.totals.exp / data.totals.inc) * 100);
    },

    tusuvAvah: function () {
      return {
        tusuv: data.tusuv,
        percent: data.percent,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
      };
    },

    addItem: function (type, desc, val) {
      var item, id;

      if (data.items[type].length === 0) id = 1;
      else {
        id = data.items[type][data.items[type].length - 1].id + 1;
      }

      if (type === "inc") {
        item = new Income(id, desc, val);
      } else {
        item = new Expense(id, desc, val);
      }

      data.items[type].push(item);

      return item;
    },

    seeData: function () {
      return data;
    },
  };
})();

// Programm holbogch controller
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    // 1. Oruulah ugugdluudiig delgetsees olj avna
    var input = uiController.getInput();

    if (input.description !== "" && input.value !== "") {
      // 2. Olj avsan ugugdluudee sanhuugiin controllert damjuulj tend hadgalna
      var item = financeController.addItem(
        input.type,
        input.description,
        input.value
      );
      // 3. Olj avsan ugugdluudee web deeree tohiroh hesegt gargaj uzuulne
      uiController.addListItem(item, input.type);
      uiController.clearFields();

      // 4. Tusviig tootsoolno
      financeController.tusuvTootsooloh();

      // 5. Etssiin uldegdel
      var tusuv = financeController.tusuvAvah();

      // 6. Tusviin tootsoog delgetsend gargana.
      console.log(tusuv);
    }
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
