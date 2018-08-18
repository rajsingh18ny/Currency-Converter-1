//check response fronm the 2 api selected
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

      $("#inputCountry2").append('<option value =' + response[i].currencies[0].code + '>' + response[i].name + "-" + response[i].currencies[0].code + '</option>' + "<br>");
    }
    // console.log(response[42].currencies[0].code);
    //console.log(response.name[0]);
    //

    //populate the respective country div as per the user selection 
    //on submit click convert the amount into other currency
    //on submit click creat div and display c1 c2 and converion amount

    //ul2
    $("#submit").on("click", function (event) {
      event.preventDefault()
      var currencycode = $("#inputCountry2").val();
      console.log("code:", currencycode);
   
      var queryURL = `http://www.apilayer.net/api/live?access_key=7b22f43a5fc06496f1f1de807d226428&currencies=${currencycode}`;

      // Performing an AJAX request with the queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        // After data comes back from the request
        .then(function (response) {
          console.log(response.quotes)
  
          var value = response.quotes["USD" + currencycode] 
         
           var amount = $("#amount").val();
           var calc = amount * value 
           console.log("calculated amount", calc);     
           console.log(response)
           var result = response.source
          //  +"<br>" 
          //  +"<p>"+ amount+"</p>"+"<p>"+ currencycode+"</p>" +"<p>"+ calc +"</p>");
            // result.html("<h2"> + "This the country" + currencycode + "</h2>")
           $('#form').show();
            $("#display").append(result)
        });
        
        });
       ////next ajax call
    //  var qURL = ;


    //on submit click take country code from field 1 and assign it to response.source
    //search for country code in field 2 in response.code field and get the rate
    //append this data to new screen with amount country 1 and country 2 and converted rate
  });