# User Roles & Permissions

The web-app has a permission mechanism.

## Permission Hierarchy

```
admin
  ↑
board_global_moderator
  ↑         ↑
board_user_moderator  board_movie_moderator 
  ↑         ↑
participant 
  ↑
guest
```

## Role Definitions

| Role                       | Permissions                                                                                                                   |
|----------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| **guest**                  | - View board<br>- View all ratings<br>- Cannot edit anything                                                                  |
| **participant**            | - All guest permissions<br>- Edit own ratings                                                                                 |
| **board_user_moderator**   | - All participant permissions <br>- Add/remove members<br>- Change member roles<br>- Edit any user's rating                   |
| **board_movie_moderator**  | - All participant permissions<br>- Add/remove movies<br>- Edit movie information                                              |
| **board_global_moderator** | - All board_user_moderator  permissions and all board_movie_moderator  permissions<br> - Edit board settings (name and so on) |
| **admin**                  | - Full access to everything<br>- Delete boards<br>- Manage all boards site-wide                                               |

## Permission Matrix

| Action              | guest | participant | board_user_moderator | board_movie_moderator | board_global_moderator | admin |
|---------------------|-------|-------------|----------------------|-----------------------|------------------------|-------|
| View board          | ✅     | ✅           | ✅                    | ✅                     | ✅                      | ✅     |
| Edit own rating     | ❌     | ✅           | ✅                    | ✅                     | ✅                      | ✅     |
| Edit any rating     | ❌     | ❌           | ✅                    | ❌                     | ✅                      | ✅     |
| Add/remove users    | ❌     | ❌           | ✅                    | ❌                     | ✅                      | ✅     |
| Change user roles   | ❌     | ❌           | ✅                    | ❌                     | ✅                      | ✅     |
| Add/remove movies   | ❌     | ❌           | ❌                    | ✅                     | ✅                      | ✅     |
| Edit movie info     | ❌     | ❌           | ❌                    | ✅                     | ✅                      | ✅     |
| Edit board settings | ❌     | ❌           | ❌                    | ❌                     | ✅                      | ✅     |
| Delete board        | ❌     | ❌           | ❌                    | ❌                     | ❌                      | ✅*    |

* Admin can delete and change any board.
* Board owner (who created it) becomes board_global_moderator automatically.
* board_user_moderator and board_movie_moderator and board_global_moderator might be selected from users by
  board_global_moderator or admin
* participant - a person who was invited in specific board
* guest - person who was not invited to specific board

---

Permissions might be:

* LOCAL - attached to specific rating board and can do something ONLY on this board. For example: board_user_moderator -
  might
  change user (username, user's rating ang so on) only on this specific board. board_global_moderator - might do
  everything (
  delete/add movie, delete/add user and so on) on specific board. So, his responsibility cover only this specific board.
* GLOBAL - it means this permission cover all the app. For example: global moderator might do everything except deleting
  boards. admin - has full access to all available features on site

## Examples

- Alice creates a board → becomes **board_global_moderator**
- Alice invites Bob → Bob becomes **participant**
- Alice promotes Bob to **board_movie_moderator** → Bob can now add/edit movies

## User flow by roles

More [Here](user-flow.md)
