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

  var person = [
    ["Bojan Mehle", "Ljubljana", "x1"],
    ['Sonya georgalis', "Red hikl, ACT",'x1'],
    ['Jancele Jump', "Grants Pass, OR",'x2'],
    ['Ginellie Uribe', "Oceanside, CA",'x2'],
    ['Adriana Montesinos', "Lawrence, KS",'x3'],
    ['Edith Diaz', "chicago, IL",'x3'],
    ['Mary thompson', "coxs creek, KY",'x1'],
    ['Thomas Kenney', "Fullerton, CA",'x2'],
    ['Suze Benson', "Seabrook, TX",'x2'],
    ['Lucinda Rave', "Glendale, AZ",'x3'],
    ['Monica Fishwick', "Sheel Cove, NSW",'x1'],
    ['Terri liesman', "Hampton, GA",'x1'],
    ['teresa duke', "OWENSBORO, KY",'x1']
  ];

  chgValue();

  setInterval(function(){
    $(".custom-social-proof").stop().slideToggle('slow', function () {
      if ($(this).is(':visible')) {
        setTimeout(function(){
          chgValue();
        }, 3500);
      }
    });
  }, 3000);

  function chgValue(){
    var rand = person[Math.floor(Math.random() * person.length)];
    $('#purchased_person').text(rand[0]);
    $('#purchased_country').text(rand[1]);
    $('#purchased_qty').text(rand[2]);
  }

  $(".custom-close").click(function() {
    $(".custom-social-proof").stop().slideToggle('slow');
  });
});
