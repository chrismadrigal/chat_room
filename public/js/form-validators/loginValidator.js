function LoginValidator(){

  this.controlGroups = [$('#username-cg'), $('#password-cg')];

  // bind a simple alert window to this controller to display any errors //
  this.loginErrors = $('.modal-alert');
  this.loginErrors.modal({ show : false, keyboard : true, backdrop : true });

  this.showLoginError = function(title, message) {
    $('.modal-alert .modal-header h3').text(title);
    $('.modal-alert .modal-body p').text(message);
    this.loginErrors.modal('show');
  }

}

LoginValidator.prototype.validateForm = function() {
  // Clear all old errors.
  for (var i=0; i < this.controlGroups.length; i++) this.controlGroups[i].removeClass('error');

  // Simple validate fields before submit.
  if ($('#field-username').val() == ''){
    this.showLoginError('Whoops!', 'Please enter a valid username');
    this.controlGroups[0].addClass('error');
    return false;
  } else if ($('#field-password').val() == ''){
    this.showLoginError('Whoops!', 'Please enter a valid password');
    this.controlGroups[1].addClass('error');
    return false;
  } else{
    return true;
  }
}
