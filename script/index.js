	function indexFunction() {
		$('[data-toggle="tooltip"]').tooltip()   

		$('#default_button').click(function() {
			$("#about").css('color', 'black')
			$(".button").css('color','black')
			$("#nav li a").css('color', 'black')
		})
		$('#button1').click(function() {
			$("#about").css('color', 'yellow')
			$(".button").css('color','white')
			$("#nav li a").css('color', 'white')
		})
		$('#button2').click(function() {
			$("#about").css({'color': '#0099ff', "font-weight" : "bold"})
			$(".button").css('color','white')
			$("#nav li a").css('color', '#0099ff')
		})
		$('#button3').click(function() {
			$("#about").css({'color': '#00ff99',"font-weight" : "bold"})
			$("#nav li a").css('color', '#00ff99')
			$(".button").css('color','white')
		})
		$(".main-containter.collapse").on('shown.bs.collapse', function () {    
			$(".main-containter.collapse").not($(this)).collapse('hide');
		});

	}