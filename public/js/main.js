$(document).ready(function() {
  paypal.Buttons({
    createOrder: function() {
      var apiUrl = 'http://localhost:3000/api/order/payment';
      var selected = $('input[type=radio][name=product]:checked').attr('data-id');
      var data = { id: selected };

      return new Promise(function(resolve, reject) {
        $.ajax({
          type: 'POST',
          url: apiUrl,
          data: JSON.stringify(data),
          success: function(res) {
            if (res && res.token) {
              resolve(res.token);
            } else {
              reject(res);
            }
          },
          contentType: 'application/json',
        });
      });
    }
  }).render('#paypal-button-container');

  $(document).off('change', 'input[type=radio][name=payment_method]');
  $(document).on('change click', 'input[type=radio][name=payment_method]', function () {
    var val = $(this).val();
    if (val == 'CREDITCARD') {
      $('.cc-form,.btn-cc').addClass('active');
      $('.btn-paypal').removeClass('active');
      $('.warrent-container').hide();
      $('.shipping').show();
    } else {
      $('.cc-form,.btn-cc').removeClass('active');
      $('.btn-paypal').addClass('active');
      $('.warrent-container').show();
      $('.shipping').hide();
    }
  });

  $('[name=payment_method]').on("click", function () {
    if ($(this).val() == 'CREDITCARD') {
      $(".shipping").find('input, select').attr('required', 'required');
      $(".shipping").find('input, select').attr('required', 'required');
      $(".cc-form").find('input, select').attr('required', 'required');
      $(".cc-form").slideDown("slow");
    } else {
      $(".shipping").find('input, select').removeAttr('required');
      $(".cc-form").find('input, select').removeAttr('required');
      $(".cc-form").slideUp("slow");
    }
  });

  $('[name=payment_method]:checked').trigger('click');

  var newFlag = false;
  var comnFlag = '';
  $(document).off('mouseout', '#top_bar');
  $(document).on('mouseout', '#top_bar', function () {
    if (!newFlag) {
      newFlag = true;
      comnFlag = '';
      countDown();
      $('#exitpopup-overlay').show();
    }
  });

  $(document).off('click', '.closeBtn');
  $(document).on('click', '.closeBtn', function () {
    $('#exitpopup-overlay').hide();
  });
});
