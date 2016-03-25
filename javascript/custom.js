$(function(){
  $("input,textarea").jqBootstrapValidation({
    preventSubmit: true,
    submitError: function($form, event, errors){
      //additional error messages or events
    },
    submitSuccess: function($form, event){
      event.preventDefault();
      var name = $('input#name').val();
      var email = $('input#email').val();
      var message = $('textarea#message').val();
      var firstname = name;
      // Check the whitespace in name for success or fail message
      if( firstname.indexOf(' ') >= 0){
        firstname = name.split(' ').slice(0,-1).join(' ');
      }
      $.ajax({
        url: "//formspree.io/passion.rails@gmail.com", 
        type: "POST",
        data: {
          name: name,
          email: email,
          message: message
        },
        cache: false,
        complete: function(){
          //success message
          $('#success').html("<div class='alert alert-success'>");
          $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert'>x").
             append("</button>");
          $('#success > .alert-success'). 
             append("<strong>Your message has been sent.</strong>");
          $('#success > .alert-success'). 
             append("</div>");
          //clear all fields
          $('#contactForm').trigger("reset");
        }
      });/* ajax*/
    },/* submitSuccess*/
    filter: function(){
      return $(this).is("visible");
    }
  }); /*jq validation*/
});