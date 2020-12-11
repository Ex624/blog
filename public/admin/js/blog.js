$(() => {
  let panelID = 0;
  let data = null;

  $(document).ajaxStart(() => {
    NProgress.start();
    console.log();
  });
  $(document).ajaxComplete(() => {
    NProgress.done();
  });

  const editorInstance = new FroalaEditor("#edit", {
    enter: FroalaEditor.ENTER_P,
    events: {
      initialized: function () {
        const editor = this;
        document.getElementById("preview").innerHTML = editor.html.get();
      },
      contentChanged: function () {
        const editor = this;
        document.getElementById("preview").innerHTML = editor.html.get();
      },
    },
  });

  $(".next-btn").click(() => {
    let form = $(`form#form-step-${panelID}`);
    console.log(form.serializeArray());

    if (panelID == 0) {
      data = form.serializeArray().reduce(function (obj, item) {
        obj[item.name] = item.value;
        return obj;
      }, {});
      data.tags = data.tags.split(",");

      if (!(data.title || data.shortContent || data.content || data.category))
        return;
    } else if (panelID == 1) {
      data.content = $("#preview").html();
    }

    panelID++;
    console.log(data);
    console.log(panelID);
  });
  $(".prev-btn").click(() => panelID--);
  $(".finish-btn").click(() => {
    if (!(data.title || data.shortContent || data.content || data.category))
      return;
    panelID = 2;
    $.ajax({
      url: "/admin/blog/add",
      contentType: "application/json",
      method: "POST",
      data: JSON.stringify(data),
    }).done((r) => {
      console.log(r);
      if (r.success) {
        iziToast.success({
          title: "Başarılı",
          message: r.message,
        });
      } else
        iziToast.error({
          title: "Başarısız",
          message: r.message,
        });
    });
  });
});
