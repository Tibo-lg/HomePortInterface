angular.module('app')
.filter('unit', function() {
  return function(input, unit) {
    input = input || '';
    if(input == ''){
      return "---";
    }else{
      if(unit === "Open/Close"){
	console.log(input);
	if(input === "1"){
	  return "Opened";
	}else{
	  return "Closed"
	}
      }else if(unit === "On/Off"){
	if(input == "1"){
	  return "On";
	}else{
	  return "Off"
	}
      }else{
	return input;
      }
    }
  }
});
