"use strict";
$(document).ready(function () {

    var ln = 0;
  function createTable() {
    $("#container").append(
      "<table class='table'>" +
        "<thead>" +
        "<tr><th>Id</th><th>Tâches</th><th>Etat</th><th>Supprimer</th></tr>" +
        "</thead>" +
        "<tbody></tbody>" +
        "</table>"
    );

    $("table").hide();

    let apiLink = "https://jsonplaceholder.typicode.com/todos/";

    $.getJSON(apiLink, function (data) {
      // console.log(data);
      ln = data.length;
      $.each(data, function (k, v) {
        var ligne =
          "<tr>" +
          "<td class='id'>" +
          "<p class='valeurCellule'> "+ v.id + "</p>"+  
          "<p class='champModification'> <input type='number' name='id' id='id' min=" + ln +
          "> <button class='validation'> OK </button> <button class='annulation'> Annuler </button></p>" +
          "</td>" +
          "<td>" +
          "<p class='valeurCellule'> "+ v.title + "</p>"+  
          "<p class='champModification'> <input type='text' name='textTache' id='textTache'>"+
          " <button class='validation'> OK </button> <button class='annulation'> Annuler </button></p>" +
          "</td>" +
          "<td>" +
          "<p class='valeurCellule'> "+ v.completed + "</p>"+  
          "<p class='champModification'> "+ 
          "<select title='modifEtat' name='modifEtat' id='modifEtat'>" +
          "<option value='1'> Complétée </option>" +
          "<option value='0'> Non Complétée </option>" +
          "</select>"+
          " <button class='validation'> OK </button> <button class='annulation'> Annuler </button></p>"+
          "</td>" +
          "<td > <button class='suppression' > Supprimer </button> </td>" +
          "</tr>";
        // $("p").hide();
        $("tbody").append(ligne);
      });
      $(".champModification").hide();
    });

    $("table").append("<button class='ajout' > Ajouter </button>" + 
    "<div id='form' class='form'>"+ 
    "<label for='nomTache'>Tache : </label><input type='text' name='nomTache' id='nomTache'>" +
    "<label for='etat'>Etat : </label>"+
    "<select title='etat' name='etat' id='etat'>" +
    "<option value='1'> Complétée </option>" +
    "<option value='0'> Non Complétée </option>" +
    "</select>" + "<div/>"+
    "<button id='valideAjout'> Valider </button>"
  );

  $("#form").hide();

  }

  createTable();

  $("button#creeTodo").click(function () {
  
    $("table").show();

    //suppresion 
    $(".suppression").click(function () {
      var reponse = confirm("Are you sure you want to delete this entry ?");
      if (reponse) {
        alert("suppression");
        $(this).parent().parent().remove();
      }
    });

    //ajout d'une tâche 
    $("button.ajout").click(function () {
    //   alert("Ajouter");
      $("#form").show();
    });

    function ifTrue(value){
      if (value == '1'){
        return true;
      }
      return false;
    }

    

    //modification d'une tâche
    $(".valeurCellule").click(function () {
      //faire apparaite le champ de saisie
      $(this).next().slideToggle();

      // //valider le champ de saisie et le modifier 
      $(this).next('.champModification').find(".validation").click(function(contenu){
        $(this).parent().parent().find(".valeurCellule").text($(this).prev().val());  
        $(this).parent().slideUp();
        });
    });

    //cacher le champ de saisie
    $('.champModification').find(".annulation").click(function(){
      $(this).parent().slideUp();
      
    
    
    });

    
  $("button#valideAjout").click(function () {
    //   alert("Ajouter");
      // $("#form").show();
      var ligneA =
          "<tr>" +
          "<td class='id'>" +
          "<p class='valeurCellule'> "+ ++ln + "</p>"+
          "<p class='champModification'> <input type='number' name='id' id='id' min=" +
          ln +
          "> <button  class='validation'> OK </button> "+
          "<button class='annulation > Annuler </button> </p>" +
          "</td> ";
      var suite =
          "<td>" +
          "<p class='valeurCellule'> "+ $("input#nomTache").val() + "</p>"+  
          "<p class='champModification'> <input type='text' name='textTache' id='textTache'>"+
          " <button class='validation'> OK </button> <button class='annulation'> Annuler </button></p>" +
          "</td>" +
          "<td>" +
          "<p class='valeurCellule'> "+ ifTrue($("select#etat").val())+ "</p>"+  
          "<p class='champModification'> "+ 
          "<select title='modifEtat' name='modifEtat' id='modifEtat'>" +
          "<option value='1'> Complétée </option>" +
          "<option value='0'> Non Complétée </option>" +
          "</select>"+
          " <button class='validation'> OK </button> <button class='annulation'> Annuler </button></p>"+
          "</td>" +
          "<td > <button class='suppression' > Supprimer </button> </td>" +
          "</tr>";

        
        $("tbody").append(ligneA);
        $("tr").last().append(suite);
  
        $(".champModification").hide();

        //modification d'une cellule ajoutée
        $(".valeurCellule").click(function () {
          //faire apparaite le champ de saisie
          $(this).next().slideToggle();
    
          // //valider le champ de saisie et le modifier 
          $(this).next('.champModification').find(".validation").click(function(contenu){
            $(this).parent().parent().find(".valeurCellule").text( ifTrue($(this).prev().val()));  
            $(this).parent().slideUp();
            });
        });

        //suppression d'une cellule ajoutée
        $(".suppression").click(function () {
          var reponse = confirm("Are you sure you want to delete this entry ?");
          if (reponse) {
            alert("suppression");
            $(this).parent().parent().remove();
          }
        });
    
    });
  });
  
});
