Metric-Imperial Converter

Write the following tests in tests/1_unit-tests.js:

convertHandler should correctly read a whole number input.<br>
convertHandler should correctly read a decimal number input.<br>
convertHandler should correctly read a fractional input.<br>
convertHandler should correctly read a fractional input with a decimal.<br>
convertHandler should correctly return an error on a double-fraction (i.e. 3/2/3).<br>
convertHandler should correctly default to a numerical input of 1 when no numerical input is provided.<br>
convertHandler should correctly read each valid input unit.<br>
convertHandler should correctly return an error for an invalid input unit.<br>
convertHandler should return the correct return unit for each valid input unit.<br>
convertHandler should correctly return the spelled-out string unit for each valid input unit.<br>
convertHandler should correctly convert gal to L.<br>
convertHandler should correctly convert L to gal.<br>
convertHandler should correctly convert mi to km.<br>
convertHandler should correctly convert km to mi.<br>
convertHandler should correctly convert lbs to kg.<br>
convertHandler should correctly convert kg to lbs.<br>


Write the following tests in tests/2_functional-tests.js:

Convert a valid input such as 10L: GET request to /api/convert.<br>
Convert an invalid input such as 32g: GET request to /api/convert.<br>
Convert an invalid number such as 3/7.2/4kg: GET request to /api/convert.<br>
Convert an invalid number AND unit such as 3/7.2/4kilomegagram: GET request to /api/convert.<br>
Convert with no number such as kg: GET request to /api/convert.<br>
