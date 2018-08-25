

let button = $("#back").hide()
$(".card").hide();
$(".card-header").hide();
//check response from the 2 api selected
var queryURL = "https://restcountries.eu/rest/v2/all?fields=name;currencies;flag";

// Performing an AJAX request with the queryURL
$.ajax({
  url: queryURL,
  method: "GET"
})
  // After data comes back from the request
  .then(function (response) {
    console.log(response);
   
   
    //$("#inputCountry1").append()
  //$("#img-1").append("<img src ="+ response[239].flag +">")
$("#inputCountry1").append('<option value =' + response[239].name + '>'+ response[239].name + "-" + response[239].currencies[0].code + '</option>' + "<br>");
// $("#inputCountry1").append()   


    for (var i = 0; i < response.length; i++) {
      //  console.log(response[i].name);
        // $("#img-2").append("<img src ="+ response[i].flag +">")
      $("#inputCountry2").append('<option value ="' + response[i].name +
      "-" + response[i].currencies[0].code +"-"+ response[i].currencies[0].symbol +'">'+ response[i].name +
      "-" + response[i].currencies[0].code + '</option>' + "<br>");
         }


        
    //$(".#img2").append("<div class = 'col-2'><img src ="+response[239].flag+">"+ "USD"+"<br>" + "1"+ "</div>");
    var country = $("#inputCountry2").val().split("-")
    var countryname;
    //console.log(countryname)
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
        console.log(response);
        $("#img2").append("<div class = 'col-auto '>"+"USD"+"<br>" + "1"+ "</div>");
        $("#img2").append("<div class = 'col-auto'>"+ "CAD"+"<br>" +response.quotes.USDCAD + "</div>");
        $("#img2").append("<div class = 'col-auto'>"+"CYN "+"<br>" +response.quotes.USDCNY + "</div>");
        $("#img2").append("<div class = 'col-auto'>"+"EUR "+"<br>" +response.quotes.USDEUR + "</div>");
        $("#img2").append("<div class = 'col-auto'>"+"GBP "+"<br>" +response.quotes.USDGBP + "</div>");
        $("#img2").append("<div class = 'col-auto'>"+"INR "+"<br>" +response.quotes.USDINR + "</div>");
        $("#img2").append("<div class = 'col-auto'>"+"MXN "+"<br>" +response.quotes.USDMXN + "</div>");
        $("#img2").append("<div class = 'col-auto'>"+"SAR "+"<br>" +response.quotes.USDSAR + "</div>");
      });

    $("#submit").on("click", function (event) {
      event.preventDefault()
      $('#form').hide();
      $("#articles").empty()
      $('#display').empty()
      $('#rate').empty()
      $("#map").empty()
      
      country = $("#inputCountry2").val().split("-")
      var currencycode = country[1]
      //var currencycode = $("#inputCountry2").val();
            countryname = country[0]
      var symbol = country[2];
      console.log("code:", currencycode);
      //console.log(field[1]);

      var queryURL = `http://www.apilayer.net/api/live?access_key=7b22f43a5fc06496f1f1de807d226428&currencies=${currencycode}`;

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
           $('#display').append('<p class="amount">'+ amount +' USD-$ = '+ reduceDecimaltoTwo +'-'+ currencycode + '-'+ symbol +'</p>')

           $('#rate').append('Rate 1 USD = ' + value + " " + currencycode)
           var result = response
           console.log(result);
          //  +"<br>"
          //  +"<p>"+ amount+"</p>"+"<p>"+ currencycode+"</p>" +"<p>"+ calc +"</p>");
            // result.html("<h2"> + "This the country" + currencycode + "</h2>")
          $("#display").append(result)
        });
             getnews()
    // var map = $("<img>").attr("src","https://maps.googleapis.com/maps/api/staticmap?center=Brooklyn+Bridge,New+York,NY&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:S%7C40.702147,-74.015794&markers=color:green%7Clabel:G%7C40.711614,-74.012318&markers=color:red%7Clabel:C%7C40.718217,-73.998284&key=AIzaSyCY4ikZrWDzixZRNFVjpj7nwYtXar2ehKg")


   
    var map = $("<img>").attr("src", "https://maps.googleapis.com/maps/api/staticmap?center=" + countryname +  "&zoom=5&size=400x250&maptype=roadmap&key=AIzaSyCY4ikZrWDzixZRNFVjpj7nwYtXar2ehKg")

    $("#map").append(map)
    // console.log(map)
       $("#back").show(); 
       show();       
        });

        function getnews ()
        {
            var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
            url += '?' + $.param({
              'api-key': "a9ecb5738d60419e8e79c89bba6714d4",
              'q': countryname
              
          });
            console.log(countryname)
              $.ajax({
                url: url,
                method: 'GET',
              }).done(function(result) 
                    {
                      console.log(result);
                      console.log(result.response.docs[4].snippet)
                      var snip = result.response.docs
          
                          for (var i=0; i< snip.length; i++ )
                          {
                            var weburl = result.response.docs[i].web_url
                            var snippet = result.response.docs[i].snippet

                            snippet  = snippet.substring(0,60) + "..."

                            // console.log(snippet)
                            
                               
                           
                            $("#articles").append("<div>"+"<a target=_blank  href="+ weburl +">" + snippet + "<br>"+"</div>")
                          }
                    }).fail(function(err) 
                    {
                        // th#img2 err;
                    });
                  }  
       ////next ajax call
    //  var qURL = ;

    $("#back").on("click",function(){
      $('#form').show();
      $("#articles").hide()
      $('#display').hide()
      $('#rate').hide()
      $("#map").hide()
      $("#result").hide()
      $("#back").hide()
      $(".card").hide();
      $(".card-header").hide();
      
    });

function show(){
  $("#articles").show()
  $("#display").show()
  $("#rate").show()
  $("#result").show()
  $("#map").show()
  $(".card").show();
   $(".card-header").show();

}

    //on submit click take country code from field 1 and assign it to response.source
    //search for country code in field 2 in response.code field and get the rate
    //append this data to new screen with amount country 1 and country 2 and converted rate
  });