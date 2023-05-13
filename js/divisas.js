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
    "https://api.fastforex.io/fetch-all?from=CLP&api_key=304cd94304-b2b9b338cf-rukn9q",
    function (data) {
      $.each(data.results, function (i, item) {
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
