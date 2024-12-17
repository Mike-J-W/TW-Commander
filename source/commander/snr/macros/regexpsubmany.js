/*\
type: application/javascript
title: $:/plugins/kookma/commander/snr/macros/regexpsubmany.js
module-type: macro

\*/
(function(){

  /*jslint node: true, browser: true */
  "use strict";
  
  exports.name = "regexpsubmany";
  
  exports.params = [
    {name: "listText"},
    {name: "sourceText"},
    {name: "flags"},
    {name: "wholeWords"}
  ];
  
  /*
  Run the macro
  */
  exports.run = function(listText, sourceText, flags = "gi", wholeWords = "characters") {
    try {
      var bracketRegex = /^\[+/;
      var trimmedListText = listText.replace(bracketRegex, '');
      bracketRegex = /\]+$/;
      trimmedListText = trimmedListText.replace(bracketRegex, '');
      var revisedText = sourceText;
      const re = /\s*(?:\*|$)\s*/;  
      function isNotEmpty(term) {
        return term !== "";
      }
      const listSplit = trimmedListText.split(re);
      const pairs = listSplit.filter(isNotEmpty);
      pairs.forEach((pair) => {
        const pairSplit = pair.split("|")
        const terms = pairSplit.filter(isNotEmpty);
        if (terms.length != 2) {
          throw new Error();
        }
        const searchValue = terms[0].trim();
        const replaceValue = terms[1].trim();
  
        var searchText;
        if(wholeWords.toLowerCase() === 'words'){
        searchText = "\\b" + searchValue + "\\b";
        } else{
        searchText = searchValue;
        }
        
        searchText = new RegExp(searchText, flags);
        revisedText = revisedText.replace(searchText,replaceValue);  
      });
      return revisedText;
    } 
    catch(err) { 
      return "ERROR IN REG EXPRESSION. YOU MAY NEED TO ESCAPE VALUES"; 
    }
    
    };
  
  })();
  