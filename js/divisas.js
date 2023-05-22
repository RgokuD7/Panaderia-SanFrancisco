$(document).ready(function () {
  const miLocalStorage = window.localStorage;
  function cargarDivisa() {
    if (miLocalStorage.getItem("divisa") !== null) {
      // Carga la información
      var divisa = JSON.parse(miLocalStorage.getItem("divisa"));
      return divisa;
    } else {
      var divisa = "CLP";
      return divisa;
    }
  }
  cargarDivisa();
  $.get(
    "https://api.apilayer.com/exchangerates_data/latest?&base=clp&apikey=Q1exC7SAvRnriSeSLUqW7ziTlZUn2hxV",
    function (data) {
      $.each(data.rates, function (i, item) {
        if (i == cargarDivisa()) {
          $(".divisas").append(
            '<option value="' + item + '"selected>' + i + "</option>"
          );
        } else {
          $(".divisas").append('<option value="' + item + '">' + i + "</option>");
        }
      });
    }
  );
});
