$(() => {
  $(document).ajaxStart(() => {
    NProgress.start();
    console.log();
  });
  $(document).ajaxComplete(() => {
    NProgress.done();
  });

  $("form[name='login']").submit(function (e) {
    e.preventDefault();

    data = $(this)
      .serializeArray()
      .reduce(function (obj, item) {
        obj[item.name] = item.value;
        return obj;
      }, {});

    $.ajax({
      url: "/admin/login",
      contentType: "application/json",
      method: "POST",
      data: JSON.stringify(data),
    }).done((r) => {
      if (r.success) {
        iziToast.success({
          title: "Başarılı",
          message: `${r.message}. ${r.user.name} yönlendiriliyorsun...`,
        });
        setTimeout(() => {
          window.location = "/admin";
        }, 3 * 1000);
      } else
        iziToast.error({
          title: "Başarısız",
          message: r.message,
        });
    });
  });
});
