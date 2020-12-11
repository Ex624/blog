$(() => {
  $(document).ajaxStart(() => {
    NProgress.start();
    console.log();
  });
  $(document).ajaxComplete(() => {
    NProgress.done();
  });

  $("a[data-target='#comment-information']").click(function (e) {
    let id = $(this).attr("data-id");
    $.ajax({
      url: `/admin/commentDetails/${id}`,
      contentType: "application/json",
      method: "GET",
    }).done((r) => {
      if (r) {
        $("#comment-information #comment_name").text(r.name);
        $("#comment-information #comment").text(r.comment);
        $("#comment-information #comment_ip").text(r.ipAdress);
        $("#comment-information #comment_email").text(r.email);
        $("#comment-information #comment_website").text(r.website);
        $("#comment-information #comment_time").text(r.createdDate);
        $("#comment-information #comment_title").html(
          `<b>${r.name}</b> kullanıcısının yorumu`
        );
      }
    });
  });
});
