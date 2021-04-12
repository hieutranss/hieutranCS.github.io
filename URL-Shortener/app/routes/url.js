 
  $(function() {
        $('#urlForm').submit(function() {
          event.preventDefault();
          $.ajax({
            url: '/new',
            type: 'get',
            data: $('#urlForm').serialize(),
            success: function(data) {
              $('#urlResult').text(JSON.stringify(data));
            }
          });
        });
      });
    
  $(function() {
        $('#redirectForm').submit(function() {
          event.preventDefault();
          $.ajax({
            url: '/new/id',
            type: 'get',
            data: $('#redirectForm').serialize(),
            success: function(data) {
              if(data === "f"){
                $('#urlResult').text("Invalid URL")
              }
              else if(data === "f1"){
              $('#urlResult').text("Error! Database is empty. Please convert url first")
              }
              else{
          window.open("https://"+data, '_blank')
              $('#urlResult').text("Success")
              }
            }
          });
        });
      });
    
    $(function() {
         
      $('#allURL').submit(function() {
          event.preventDefault();
            $.ajax({
            url: '/all',
            type: 'post',
            data: $('#allURL').serialize(),
            success: function(data) {
              $('#urlResult').text(JSON.stringify(data));
            }
          });
        });
  
       
      
      }); 

  
