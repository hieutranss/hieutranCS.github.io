	function indexFunction() {
	$('[data-toggle="tooltip"]').tooltip()   

		$('#default_button').click(function() {
			$("#about").css('color', 'black')
			$(".button").css('color','black')
		})
		$('#button1').click(function() {
			$("#about").css('color', 'yellow')
			$(".button").css('color','white')

		})
		$('#button2').click(function() {
			$("#about").css({'color': '#FC9602', "font-weight" : "bold"})
			$(".button").css('color','white')

		})

		$('#button3').click(function() {
			$("#about").css({'color': '#F007FF',"font-weight" : "bold"})
			$(".button").css('color','white')

		})
	}