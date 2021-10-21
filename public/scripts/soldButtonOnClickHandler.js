//document ready function
$(() => {
  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);

  $('#sold-button').on("click'", function (event) {
    event.preventDefault();
    $.ajax({
    method: "POST",
    url: `/listings/${id}/edit`,
    data:
  })


  })

    (`/api/listings/${id}`)
      .then((listing) => {
        const listingStatus = listing.sold;
        const $soldButtonContainer = $("#sold-button");
        if (listingStatus) {
          $soldButtonContainer.append($soldButton);
        } else {
          $soldButtonContainer.append($soldButton);
        }
      })
      .catch((error) => {
        console.log(error);
      });




  };

