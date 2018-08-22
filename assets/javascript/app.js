

//check response from the 2 api selected
var queryURL = "https://restcountries.eu/rest/v2/all?fields=name;currencies";

// Performing an AJAX request with the queryURL
$.ajax({
  url: queryURL,
  method: "GET"
})
  // After data comes back from the request
  .then(function (response) {
    console.log(response);
    $("#inputCountry1").append('<option value =' + response[239].name + '>' + response[239].name + "-" + response[239].currencies[0].code + '</option>' + "<br>");
    for (var i = 0; i < response.length; i++) {
      //  console.log(response[i].name);

      $("#inputCountry2").append('<option value =' + response[i].currencies[0].code + '-' + response[i].currencies[0].symbol + '>' + response[i].name + "-" + response[i].currencies[0].code + '</option>' + "<br>");
    }
    // console.log(response[42].currencies[0].code);
    //console.log(response.name[0]);
    var queryURL = "http://www.apilayer.net/api/live?access_key=7b22f43a5fc06496f1f1de807d226428&currencies=CAD,CNY,EUR,GBP,MXN,SAR,INR";

    // Performing an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After data comes back from the request
      .then(function (response) {
        console.log(response.quotes);
        $(".live-row-md-12").append("<div class = 'col-md-1'>"+ "CAD "+"<br>" +response.quotes.USDCAD + "</div>");
        $(".live-row-md-12").append("<div class = 'col-md-1'>"+"CYN "+"<br>" +response.quotes.USDCNY + "</div>");
        $(".live-row-md-12").append("<div class = 'col-md-1'>"+"EUR "+"<br>" +response.quotes.USDEUR + "</div>");
        $(".live-row-md-12").append("<div class = 'col-md-1'>"+"GBP "+"<br>" +response.quotes.USDGBP + "</div>");
        $(".live-row-md-12").append("<div class = 'col-md-1'>"+"INR "+"<br>" +response.quotes.USDINR + "</div>");
        $(".live-row-md-12").append("<div class = 'col-md-1'>"+"MXN "+"<br>" +response.quotes.USDMXN + "</div>");
        $(".live-row-md-12").append("<div class = 'col-md-1'>"+"SAR "+"<br>" +response.quotes.USDSAR + "</div>");
      });
//USDCAD: 1.30362USDCNY: 6.847503USDEUR: 0.864102USDGBP: 0.7749USDINR: 69.815033USDMXN: 18.876201USDSAR: 3.75075__proto__: Object
    //ul2
    $("#submit").on("click", function (event) {
      event.preventDefault()
      $('#display').empty()
      $('#rate').empty()
      var currencycode = $("#inputCountry2").val();
      var field = currencycode.split('-');
      console.log("code:", field[0]);
      console.log(field[1]);

      var queryURL = `http://www.apilayer.net/api/live?access_key=7b22f43a5fc06496f1f1de807d226428&currencies=${field[0]}`;

      // Performing an AJAX request with the queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // After data comes back from the request
        .then(function (response) {
          console.log(response.quotes)


          var value
          // rates loop of objecty
          for (props in response.quotes){
            console.log(response.quotes[props]);
            value = response.quotes[props]
          }

          // var value = response.quotes["USD" + currencycode]
          
         var amount = $("#amount").val();
           var calc = amount * value
           console.log("calculated amount", calc);
           console.log(response)

           var reduceDecimaltoTwo = calc.toFixed(2)
          // var threeFromEnd = reduceDecimaltoTwo.length -3
          // var country = reduceDecimaltoTwo.slice(threeFromEnd, 0)

           console.log(reduceDecimaltoTwo);
           //console.log(threeFromEnd);
           //console.log(country);
           $("#result").show();
           $('#display').append('<p class="amount">'+ amount +' USD-$ = '+ reduceDecimaltoTwo+' '+ field[0]+'-'+ field[1] + '</p>')

           $('#rate').append('Rate 1 USD = ' + value + " " + field[0])
           var result = response
           console.log(result);
          //  +"<br>"
          //  +"<p>"+ amount+"</p>"+"<p>"+ currencycode+"</p>" +"<p>"+ calc +"</p>");
            // result.html("<h2"> + "This the country" + currencycode + "</h2>")
           $('#form').hide();
            $("#display").append(result)
        });

        });
       ////next ajax call
    //  var qURL = ;


    //on submit click take country code from field 1 and assign it to response.source
    //search for country code in field 2 in response.code field and get the rate
    //append this data to new screen with amount country 1 and country 2 and converted rate
  });