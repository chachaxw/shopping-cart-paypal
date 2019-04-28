function getDate(days) {
  var dayNames = new Array("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday");
  var monthNames = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
  var now = new Date();
  now.setDate(now.getDate() + days);
  var nowString = monthNames[now.getMonth()] + " " + now.getDate() + ", " + now.getFullYear();
  document.write(nowString);
}

function countDown() {
  var start_mnt = 5;
  var start_sec = 0;
  var int = setInterval(function () {
    $(".min_count").html(minTwoDigits(start_mnt));
    if (start_mnt == 0 && start_sec == 0) {
      clearInterval(int);
    }
    $(".sec_count").html(minTwoDigits(start_sec));
    if (start_sec == 0) {
      start_sec = 59;
      start_mnt--;
    }
    --start_sec;
  }, 1000);
}

function minTwoDigits(n) {
  return (n < 10 ? '0' : '') + n;
}
