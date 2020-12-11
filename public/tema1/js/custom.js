$(() => {
  $(document).ajaxStart(() => {
    NProgress.start();
    console.log();
  });
  $(document).ajaxComplete(() => {
    NProgress.done();
  });

  $("#fast-login").click(() => {
    let email = "",
      password = "";
    iziToast.info({
      timeout: 20000,
      overlay: true,
      displayMode: "once",
      id: "inputs",
      zindex: 999,
      position: "center",
      drag: false,
      inputs: [
        [
          '<input type="text" placeholder="email">',
          "keyup",
          function (instance, toast, input, e) {
            email = input.value;
          },
          true,
        ],
        [
          '<input type="password" placeholder="password">',
          "keydown",
          function (instance, toast, input, e) {
            password = input.value;
          },
        ],
        [
          '<input type="button" value="login">',
          "click",
          function (instance, toast, input, e) {
            if (email && password)
              $.ajax({
                url: "/admin/login",
                contentType: "application/json",
                method: "POST",
                data: JSON.stringify({ email, password }),
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
          },
        ],
      ],
    });
  });
});
