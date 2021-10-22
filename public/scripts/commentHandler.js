// helper function for comments
const  createCommentElement = function (comment) {
  return `<div style="background-color: lightgray">
    <p>
      ${comment.msg_text}
      user:${comment.user_id}
    </p>
</div>`
}

$(() => {
    $("#comment-form").on("submit", function (event) {
      event.preventDefault();
      const url = this.action
      const $form = $(this)
      const data = $form.serialize()
      $.post(url, data)
        .then((response) => {
          const element = createCommentElement(response)
          $("#comment-container").append(element)
        })
        .catch((error) => {
          console.log(error)
        })
    });

});

