function ConvertHandler() {
      var units = ["gal", "L", "lbs", "kg", "mi", "km" , "l"]

  this.getNum = function(input) {
    var result = input.split(/[A-Za-z]/);
    var dec = 0
    var frac =0
    if(input.length == 0){
     return "invalid number"
    }
    
   if(result[0] ==""){
    return 1 
   }
    

for(var i in result[0]){
  if(result[0][i].includes('.')){
   dec++ 
  }
  if(result[0][i].includes('/')){
   frac++ 
  }
}
 if(frac >= 2){
     return "invalid input" 
    }
    else if (frac == 1){
       result = result[0].split('/');
      result = result[0] / result[1];
      return result
    }
    return result[0]
  }
  
this.getUnit = function(input) {
    var result = input.match(/[A-Za-z]+/)
     result = result[0].toLowerCase()
    for(var i  in units){
      if(result == units[i]){
       return  units[i]
      }
    }
      return "invalid unit" 

}
  
  this.getReturnUnit = function(initUnit) {
     switch(initUnit) {
        case 'mi': return 'km';
         break;
        case 'km': return 'mi'; 
         break;
        case 'lbs': return 'kg';
         break;
        case 'kg': return 'lbs';
         break;
        case 'gal': return 'l'; 
         break;
        case 'l': return 'gal'; 
         break;
        default:
          return 'invalid unit';
      }
  }

  this.spellOutUnit = function(unit) {
      switch(unit) {
         case 'mi': return 'miles';
         break;
        case 'km': return 'kilometers'; 
         break;
        case 'lbs': return 'pounds';
         break;
        case 'kg': return 'kilograms';
         break;
        case 'gal': return 'gallons'; 
         break;
        case 'l': return 'litres'; 
         break;
        default:
          return 'invalid unit';
      }
  }
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    switch(initUnit) {
         case 'mi': return initNum * miToKm;
         break;
        case 'km': return initNum / miToKm; 
         break;
        case 'lbs': return initNum * lbsToKg;
         break;
        case 'kg': return initNum / lbsToKg;
         break;
        case 'gal': return initNum * galToL; 
         break;
        case 'l': return initNum / galToL; 
         break;
        default:
          return 'invalid unit';
      }
  }
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result = {initNum: initNum, initUnit: initUnit, returnNum: returnNum, returnUnit: returnUnit, string: `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`}
   if(initNum  === 'invalid input' && initUnit !== 'invalid unit' ){
    return 'invalid number' 
   }
     else if(initUnit  === 'invalid unit' && initNum !== 'invalid input' ){
    return 'invalid unit' 
   }
     else if(initNum  === 'invalid input' && initUnit === 'invalid unit' ){
    return 'invalid number and unit' 
   }
    return result;
      
  }
  
}

module.exports = ConvertHandler;
