//reads the boolean field to see if item is sold or not,
//when i submit mark as sold button,
//this updates the database
//for that userID, and listingID the sold field

//document ready function
$(() => {
  const url = window.location.pathname;
  const id = url.substring(url.lastIndexOf("/") + 1);
  const createNotSoldButton = () => {
    const $notsoldButton = $(
      `
      <div class ='sold-button'>
        <button type="submit" class="btn btn-primary">
          Mark as sold
        </button>
      </div>
      `
    );
    return $notsoldButton;
  };
  console.log(createNotSoldButton());
  const createSoldButton = () => {
    const $soldButton = $(
      `
      <div class ='sold-button'>
        <button type="submit" class="btn btn-primary">
          Mark as sold
        </button>
      </div>
      `
    );
    return $soldButton;
  };
  const renderButton = () => {
    $.get(`/api/listings/${id}`)
      .then((listing) => {
        const listingStatus = listing.sold;
        if (listingStatus) {
          createSoldButton();
        } else {
          createNotSoldButton();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
});
