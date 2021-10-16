# Project: Buy/Sell Listing Website

## Schedule

- Daily meeting 9:30 AM PST
- Lunch Break: 12:00 PM - 12:30 PM PST
- Break: 6:30 PM - 7:00 PM PST

## Trello Board:

- https://trello.com/b/pM2DjnuA/midterm-project
  <<<<<<< HEAD

## Requirements

- Buyer
  - users can see featured items on a main feed
  - users can filter items by price,
  - users can favourite items to check up on them later
  - users can send messages to the user that is listing the item
- Seller
  -post items, which can be seen by others
  - remove items site
  - mark items as SOLD!,
  - send a message via app, email, or text back on negotiations in buying the said item

### Core User Stories

- Logged in User

  - As a user that is logged in, I can do everything that a logged out user is able to do.
  - As a user that is logged in, I can see my favorited listings.
  - As a user that is logged in, I can send messages to other users.
  - As user that is logged in, I can post new listings (ex. with searchable parameters) which can be seen by others.
  - As user that is logged in, I can remove my listing from the site.
  - As user that is logged in, I can edit my listings (ex.mark as sold).

- Logged out User
  - As a user that is logged out, I can search for items and see items from my search (ex. category, price).
  - As a user that is logged out, I can see most recent listing (paginated).

### Stretch User Stories

- Logged out User

- Logged in User
- As a user that is logged in, I can see my purchase history.
- As a user that is logged in, I can see my current postings on the site.
- As a user that is logged in, I can search by categories
- As a user that is logged in, we can delete my own comments.

### ERD

### Routes

(clarify when to use id parameter)

- Get Routes
  GET / (Home Page: (NAV bar: Search bar, login), (page body: most recent listings))

  GET /favorites/:userid (render a favorites page with users favorites)

  GET /listings/new (render a from which would allow users to enter information about there product they are selling (ex. price, condition, images, etc))

  GET /listings/:listingid (render a page with just that posting, will show comments (if any) for that posting)

  GET /listings/:listingid/edit (verify: sessionid is in browser so we check for that to ensure a user is can only edit there own listing)

- Post Routes
  POST /comments (a button to create create a new comment, in the comments section under a listing)

  POST /listings (post new created posting to posting table, and then redirect to /)

  POST /login/:id (login user id, render / show loggedin as: and logout button )
  POST /logout (clear cookes, redirect to /, show loggedin field)
  POST /favorites (with userID, and postID and turn the liked bool to true or false)

- DELETE ROUTES
  -- DELETE /listings/:listingsid (verify: sessionid is in browser so we check for that to ensure a user is can only edit there own listing)

### Wireframes
