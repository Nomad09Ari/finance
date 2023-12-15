// user interface ugiin tovchlol bolgoj uiController huvisagch uusgelee
// Ugugdliin daldlalt hiih buyu IIFE ashiglaad anonymous bichiglel hiij bna

// Delgetstei ajillah controller
var uiController = (function () {})();

// Sanhuutei ajillah controller
var financeController = (function () {})();

// Programm holbogch controller
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    // 1. Oruulah ugugdluudiig delgetsees olj avna
    console.log("delgetsees ugugdul avah heseg");
    // 2. Olj avsan ugugdluudee sanhuugiin controllert damjuulj tend hadgalna
    // 3. Olj avsan ugugdluudee web deeree gargaj uzuulne
    // 4. Tusviig tootsoolno
    // 5. Etssiin uldegdel, tootsoog delgetsend gargana.
  };

  document.querySelector(".add__btn").addEventListener("click", function () {
    ctrlAddItem();
  });

  document.addEventListener("keypress", function (event) {
    if (event.keyCode === 13 || event.which === 13) {
      ctrlAddItem();
    }
  });
})(uiController, financeController);

// Event Listener tohiruulah
