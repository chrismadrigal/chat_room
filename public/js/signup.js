
$(document).ready(function(){

  var av = new AccountValidator();

  $('#signup-form').ajaxForm({
    beforeSubmit : function(formData, jqForm, options){
      return av.validateForm();
    },
    success : function(responseText, status, xhr, $form){
      if (status == 'success') $('.modal-alert').modal('show');
    },
    error : function(e){
      if (e.responseText == 'email-taken'){
          av.showInvalidEmail();
      } else if (e.responseText == 'username-taken'){
          av.showInvalidUserName();
      }
    }
  });
  $('field-name').focus();

// setup the alert that displays when an account is successfully created //

  $('.modal-alert').modal({ show : false, keyboard : false, backdrop : 'static' });
  $('.modal-alert .modal-header h3').text('Success!');
  $('.modal-alert .modal-body p').html('Your account has been created.</br>Click OK to return to the login page.');

  // redirect to homepage when cancel button is clicked //
  $('#account-form-btn2').click(function(){ window.location.href = '/login';});

// redirect to homepage on new account creation, add short delay so user can read alert window //
  $('.modal-alert #ok').click(function(){ setTimeout(function(){window.location.href = '/login';}, 300)});

})
