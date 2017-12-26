jQuery(function ($) {
    tagIt(document.body); //tag all tickers which are in the loaded page 
    document.body.addEventListener('DOMNodeInserted', function (event) {
      tagIt(event.target); //tag newly loaded tickers from endless scroll
    }, false);

    function tagIt(selector) {  
        $(selector).find('.userContent').each(function(){                         // go through each user content div
            var $post = $(this);
            var data = getExchangeData()
            //go through all symbols in Bitfinex:
            //##########################################################
            $.each(data.bitfinex, function(id, data) {                             // a reference to the single post
            // $.each(hightlightKeys, function( i, value ) {
              if ($post.text().toLowerCase().indexOf(data.name) != -1){            // check if the word e.g. "Bitcoin" is within
                highlight(data.name, data.url, $post);
              }
              else if  ($post.text().toLowerCase().indexOf(data.short) != -1){     // check if the word "BTC" is within
                highlight(data.short, data.url, $post);
              }
            });
          });
    }


    function highlight(key, url, selector){
      var element = $(selector);
      var rgxp = new RegExp(' ' + key , 'gi');
      var repl = ' ' + '<span>' + '<a class="marker" href=' + getUrlOnExchange(url) + ' target="_blank">' + key.toUpperCase() + '</a></span>';
      element.html(element.html().replace(rgxp, repl));
      selector.find( "a.marker" )
          .miniPreview({ prefetch: 'parenthover' })
          .hover(function() {
            $( this ).addClass( "hilite" );
          }, function() {
            $( this ).removeClass( "hilite" );
          })
          //.click(function() { openURLtoWatch(url);})
        .end()
    }
    
    function getUrlOnExchange(urlPair){
      var watchURL = 'https://cryptowat.ch/bitfinex/' + urlPair;
      return watchURL; //window.open(watchURL, '_blank');
    }

    function getExchangeData(){
      return exchanges; //in cryptoList.js
    }

  });