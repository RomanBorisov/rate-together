# User Flows

## Guest

1. User register on site
2. User try to watch specific board.
    * If board settings allow, he can see the board and somewhere on the top button "Ask to join". It will send a
      request for joining. There request will be checked by moderator of board.
    * If board settings NOT allow there will be text "This is a private board, you can ask to join and if moderator
      can....." and button for sending request

## Participant

1. User go to specific board and can see all table (can filter, sort and so on).
2. Clicks on their own cell for a movie and enter number 0.0 - 10.0
3. Rating is saved and visible to all.

## board_user_moderator

He can do everything that participant can do. His responsibilities cover only specific board where he/she was added as a
moderator (by role)

### Adding Members

1. Goes to board settings->Users and clicks "Add Member" or "Edit Member" or "Delete member"
2. Selects user and assigns role (if need, default = participant)
3. User is added to board with specified role

### Request to join

1. Goes to board settings->Users and see table with active request to joining in group
2. He can "accept request" or "decline request'

## board_user_movie

### Adding movie

1. Goes to board settings->Content and clicks "Add content item" or "Edit content item" or "Delete content item"
2. Fill the form
3. Movie will be added in table

## board_global_moderator

Has board_user_moderator and flow and ONLY IN SPECIFIC board. If he join in another board, he will no be able to
moderate (if he does not have the role in this one board)

## admin

Can do  everything in the site
