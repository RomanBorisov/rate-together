# Features - Rate Together

> **For**: AI assistants
> **Purpose**: Detailed feature specifications

---

## 1. Authentication

### Login
- Email + password authentication
- "Remember me" option (optional)
- Forgot password link (future)
- Redirect to `returnUrl` after login
- Show validation errors

### Register
- Username (unique)
- Email (unique, validated)
- Password (min 8 chars)
- Confirm password (must match)
- Redirect to login after success
- Show validation errors

### Session Management
- JWT access token (expires in 1 hour)
- Refresh token (expires in 30 days)
- Auto-logout on 401
- Persist tokens in localStorage

---

## 2. Rating Boards

### Board List
- Display all user's boards
- Show board name, description
- Show member count, movie count
- Grid layout (responsive)
- "Create Board" button
- Click board to navigate to detail

### Board Detail
- Display board name, description
- Show rating table (users × movies)
- Show members list with roles
- Show movies list
- "Add Member" button (if permission)
- "Add Movie" button (if permission)
- "Edit Board" button (if permission)
- "Delete Board" button (admin only)

### Create Board
- Form: name (required), description (optional)
- Create and navigate to new board
- Creator becomes owner (global_moderator role)

### Edit Board
- Form: name, description
- Only global_moderator+ can access
- Update and stay on detail page

### Delete Board
- Confirm modal
- Only admin can delete
- Navigate to board list after delete

---

## 3. Members Management

### Add Member
- Search users by username/email
- Select user from results
- Choose role for new member
- Add to board
- Refresh members list

### Change Role
- Dropdown with all roles
- Only user_moderator+ can change
- Cannot change owner's role
- Update immediately

### Remove Member
- "Remove" button next to member
- Confirm modal
- Only user_moderator+ can remove
- Cannot remove owner
- Refresh members list

### Members List Display
- Avatar (if exists)
- Username
- Role badge
- Join date
- Actions (change role, remove) if has permission

---

## 4. Movies Management

### Add Movie to Board
- Form fields:
  - Title (required)
  - Poster URL (optional)
  - IMDb URL (optional)
  - Tags (required, multi-select)
- Only movie_moderator+ can add
- Add to board and refresh movie list

### Edit Movie
- Same form as add
- Only movie_moderator+ can edit
- Update and refresh

### Remove Movie
- "Remove" button
- Confirm modal (warns about losing ratings)
- Only movie_moderator+ can remove
- Delete all ratings for this movie
- Refresh movie list

### Movie Detail Page
- Display:
  - Poster image (large)
  - Title
  - Tags
  - IMDb link (if exists)
  - Average rating
  - All user ratings (list)
  - Boards where this movie appears

---

## 5. Rating System

### Rating Table
- Grid layout:
  - First row: movie titles (or posters)
  - First column: usernames (or avatars)
  - Cells: ratings (0-10)
- Cells are:
  - Empty if no rating
  - Show rating number if exists
  - Editable on click (if participant+)
  - Different color for own rating

### Rate Movie
- Click on cell
- Show input/slider (0-10)
- Save immediately
- Update table without reload

### Edit Rating
- Click existing rating
- Change value
- Save (PUT request, same endpoint)

### Delete Rating
- Right-click → "Delete" (or button in input modal)
- Confirm
- Set to empty

### View Ratings
- Anyone (including guests) can view all ratings
- Show average rating for each movie
- Show count of ratings

---

## 6. Theme System

### Theme Toggle
- Button in header (sun/moon icon)
- Switch between light and dark
- Persist to localStorage
- Apply immediately (no reload)

### Theme Support
- All components styled for both themes
- Smooth transitions
- Consistent colors via CSS variables

---

## 7. Internationalization

### Language Switcher
- Dropdown in header (EN/RU)
- Change language immediately
- Persist to localStorage
- All text updated

### Supported Languages
- English (default)
- Russian

### Coverage
- All UI text
- Error messages
- Validation messages
- Placeholders

---

## 8. User Profile

### View Profile
- Display:
  - Avatar
  - Username
  - Email
  - Join date
  - Statistics:
    - Boards count
    - Total ratings count
    - Average rating

### Edit Profile (future)
- Change avatar
- Change username
- Change password

---

## 9. Search & Filter (future)

### Search Movies
- Search by title
- Filter by tags
- Sort by:
  - Title
  - Average rating
  - Date added

### Search Users
- For adding members
- By username or email

---

## 10. Notifications (future)

- New movie added to board
- Member joined board
- Someone rated a movie you also rated

---

## 11. Statistics (future)

### Board Stats
- Most rated movie
- Highest rated movie
- Most active user
- Rating distribution chart

### User Stats
- Total boards
- Total ratings given
- Favorite genres (from tags)
- Rating patterns

---

**Version**: 1.0
**Updated**: 2025-11-10
