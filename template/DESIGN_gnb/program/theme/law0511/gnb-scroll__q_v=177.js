$(window).load(function () {
  $(this).scroll(function () {
    if ($(this).scrollTop() > ctop) {
      $("#ABA-body").addClass("fixedgnb");
    } else {
      $("#ABA-body").removeClass("fixedgnb");
    }
  });
  if ($(this).scrollTop() > ctop) {
    $("#ABA-body").addClass("fixedgnb");
  } else {
    $("#ABA-body").removeClass("fixedgnb");
  }
});