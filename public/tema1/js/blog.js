$(() => {
  //add comment
  let commentForm = $("form[name='comment']");
  let commentList = $("ol.commentlist");

  $(document).ajaxStart(() => {
    NProgress.start();
  });
  $(document).ajaxComplete(() => {
    NProgress.done();
  });

  commentForm.submit(function (e) {
    e.preventDefault();

    const data = $(this)
      .serializeArray()
      .reduce(function (obj, item) {
        obj[item.name] = item.value;
        return obj;
      }, {});

    if (!(data.comment || data.author || data.email)) return;

    data.postID = $("article.hentry").attr("data-id");

    $.ajax({
      url: "/blog/comment",
      contentType: "application/json",
      method: "POST",
      data: JSON.stringify(data),
    }).done((r) => {
      if (r.success) {
        iziToast.success({
          title: "Başarılı",
          message: r.message,
        });
        commentForm[0].reset();

        commentList.prepend(`
        <li class="comment even thread-even depth-1">
        <article class="comment">
                      <!-- .comment-meta -->
                      <header class="comment-meta comment-author vcard">
                        <img alt="" src="/tema1/images/site/testo-01.jpg" class="avatar" height="75" width="75">
                        <cite class="fn"><a href="#" rel="external nofollow" class="url cool-link">${data.author}</a></cite>
                        <span class="comment-date">${r.time}</span>
                      </header>
                      <!-- .comment-meta -->

                      <!-- .comment-content -->
                      <section class="comment-content comment">
                        <p>${data.comment}</p>
                      </section>
                      <!-- .comment-content -->

                      <!-- .reply -->
                      <div class="reply">
                        <a class="comment-reply-link cool-link" href="#">Reply</a>
                      </div>
                      <!-- .reply -->
                    </article>
                    </li>
        `);

        $(window).scrollTop($("#comments").offset().top);
      } else
        iziToast.error({
          title: "Başarısız",
          message: r.message,
        });
    });
  });
});
