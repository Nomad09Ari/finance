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
    tusuvLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expenseLabel: ".budget__expenses--value",
    percentagelabel: ".budget__expenses--percentage",
    containerDiv: ".container",
    expensePercentageLabel: ".item__percentage",
    dateLabel: ".budget__title--month",
  };

  var nodeListForEach = function (list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };

  var formatMoney = function (too, type) {
    // toog temdegt mur bolgoj hurvuuleh
    too = "" + too;

    var x = too.split("").reverse().join("");
    // console.log("2 too = " + x);
    // Output===> '987654321'

    var y = "";
    var count = 1;

    for (var i = 0; i < x.length; i++) {
      y = y + x[i];

      if (count % 3 === 0) y = y + ",";
      count++;
    }

    // console.log("3 too = " + y);
    // Output===> 987,654,321

    var z = y.split("").reverse().join("");
    // console.log("4 too = " + z);
    // Output===> ,123,456,789

    if (z[0] === ",") z = z.substring(1, z.length - 1);
    // console.log("5 too = " + z);
    // Output===> 123,456,789

    if (type === "inc") z = "+ " + z;
    else z = "- " + z;

    return z;
  };

  // Public service
  return {
    displayDate: function () {
      var unuudur = new Date();
      document.querySelector(DOMstrings.dateLabel).textContent =
        unuudur.getFullYear() + " оны " + unuudur.getMonth() + " сарын ";
    },

    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        // parseInt ni string-iig too-ruu hurwuulne
        value: parseInt(document.querySelector(DOMstrings.inputValue).value),
      };
    },

    displayPercentages: function (allPercentages) {
      // Zarlagiin NodeList-iig oloh ===> DOM-iin neg elementiig node gj nerlene
      var elements = document.querySelectorAll(
        DOMstrings.expensePercentageLabel
      );
      // element bolgonii huvid zarlagiin huviig massivaas avch shivj oruulah
      nodeListForEach(elements, function (el, index) {
        el.textContent = allPercentages[index];
      });
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

    tusviigUzuuleh: function (tusuv) {
      var type;
      if (tusuv.tusuv > 0) type = "inc";
      else type = "exp";
      document.querySelector(DOMstrings.tusuvLabel).textContent = formatMoney(
        tusuv.tusuv,
        type
      );
      document.querySelector(DOMstrings.incomeLabel).textContent =
        tusuv.totalInc;
      document.querySelector(DOMstrings.expenseLabel).textContent =
        tusuv.totalExp;

      if (tusuv.percent !== 0) {
        document.querySelector(DOMstrings.percentagelabel).textContent =
          tusuv.percent + "%";
      } else {
        document.querySelector(DOMstrings.percentagelabel).textContent =
          tusuv.percent;
      }
    },

    deleteListItem: function (id) {
      var el = document.getElementById(id);
      //  element uuriiguu ustgah tohioldold
      el.parentNode.removeChild(el);
    },

    addListItem: function (item, type) {
      // Orlogo zarlagiin elementiig aguulsan html beltgene.
      var html, list;
      if (type === "inc") {
        list = DOMstrings.incomeList;
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">&&VALUE&&</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        list = DOMstrings.expenseList;
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">&&VALUE&&</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      }

      // Ter html dotroo orlogo zarlagiin utguudiig REPLACE ashiglan uurcilj ugnu.
      html = html.replace("%id%", item.id);
      html = html.replace("$$DESCRIPTION$$", item.description);
      html = html.replace("&&VALUE&&", formatMoney(item.value, type));

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
    this.percentage = -1;
  };

  // Object dotorh prototype dotor ni calcPercentage bolon getPercentage gsen function bii
  Expense.prototype.calcPercentage = function (totalIncome) {
    if (totalIncome > 0)
      this.percentage = Math.round((this.value / totalIncome) * 100);
    else this.percentage = 0;
  };

  Expense.prototype.getPercentage = function () {
    return this.percentage;
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
      if (data.totals.inc > 0)
        data.percent = Math.round((data.totals.exp / data.totals.inc) * 100);
      else data.percent = 0;
    },

    calculatePercentages: function () {
      data.items.exp.forEach(function (el) {
        el.calcPercentage(data.totals.inc);
      });
    },

    getPercentages: function () {
      var allPercentages = data.items.exp.map(function (el) {
        return el.getPercentage();
      });

      return allPercentages;
    },

    tusuvAvah: function () {
      return {
        tusuv: data.tusuv,
        percent: data.percent,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
      };
    },

    deleteItem: function (type, id) {
      // Map function ni forEach-tei adil 3 utga avna. element burt bolovsruulalt hiij shineer massive uusgene.
      var ids = data.items[type].map(function (el) {
        return el.id;
      });
      // indexOf ni massive dotroos indeex-iig ni olj ugnu
      var index = ids.indexOf(id);
      // splice ni massive dotroos element ustgahad ashiglana. Massive dotroos element ustgahad id-aar ni haij ustgah ni tohiromjtoi.
      if (index !== -1) {
        data.items[type].splice(index, 1);
      }
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
      //  Tusviig shineer tootsoolood delgestend uzuulne.
      updateTusuv();
    }
  };

  var updateTusuv = function () {
    // 4. Tusviig tootsoolno
    financeController.tusuvTootsooloh();

    // 5. Etssiin uldegdel
    var tusuv = financeController.tusuvAvah();

    // 6. Tusviin tootsoog delgetsend gargana.
    uiController.tusviigUzuuleh(tusuv);

    // 7. Elementuudiin huviig tootsoolno
    financeController.calculatePercentages();

    // 8. Elementuudiin huviig huleej avna
    var allPercentages = financeController.getPercentages();

    // 9. Edgeer huviig delgetsend gargana
    uiController.displayPercentages(allPercentages);
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

    document
      .querySelector(DOM.containerDiv)
      .addEventListener("click", function (event) {
        // elementiin parentiig oloh (parentNode)
        var id = event.target.parentNode.parentNode.parentNode.parentNode.id;
        // split ni inc-1 geh bichigleliig "inc" bolon "1" bolgon zadalj ugnu
        if (id) {
          var arr = id.split("-");
          var type = arr[0];
          // parseInt ashiglan temdegt muruus buhel toog gargaj avna
          var itemId = parseInt(arr[1]);

          //  1. Sanhuugiin modulias type, id ashiglan ustgana
          financeController.deleteItem(type, itemId);

          // 2. Delgets deerees ene elementiig ustgana
          uiController.deleteListItem(id);

          // 3. Uldegdel tootsoog shinechlj haruulna
          //  Tsusviig shineer tootsoolood delgestend uzuulne.
          updateTusuv();
        }
      });
  };

  return {
    init: function () {
      console.log("App started...");
      uiController.displayDate();
      uiController.tusviigUzuuleh({
        tusuv: 0,
        percent: 0,
        totalInc: 0,
        totalExp: 0,
      });
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
