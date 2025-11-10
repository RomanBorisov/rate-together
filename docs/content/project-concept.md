# Project Concept - Rate Together

> **For**: AI assistants
> **Purpose**: Core concept and business logic

---

## Overview

**Rate Together** is a collaborative movie rating application where users create shared boards to rate and discuss movies with friends.

---

## Core Concept

### Rating Boards

A **Rating Board** is a group where:
- Multiple users can join
- Movies/series/anime are added to the board
- Each member rates the content (0-10 scale)
- All ratings are displayed in a table format

### Table Structure

```
             Movie 1   Movie 2   Movie 3
User 1         8         9         7
User 2         9         8         10
User 3         7         9         8
```

**Table Layout**:
- **Rows**: Users (board members)
- **Columns**: Movies/Series/Anime
- **Cells**: Individual ratings (0-10)

---

## User Roles & Permissions

### Permission Hierarchy

```
admin (4)
  ↑
global_moderator (3)
  ↑         ↑
user_moderator (2)  movie_moderator (2)
  ↑         ↑
participant (1)
  ↑
guest (0)
```

### Role Definitions

| Role | Permissions |
|------|------------|
| **guest** | - View board<br>- View all ratings<br>- Cannot edit anything |
| **participant** | - All guest permissions<br>- Edit own ratings |
| **user_moderator** | - All participant permissions<br>- Add/remove members<br>- Change member roles<br>- Edit any user's rating |
| **movie_moderator** | - All participant permissions<br>- Add/remove movies<br>- Edit movie information |
| **global_moderator** | - All user_moderator permissions<br>- All movie_moderator permissions |
| **admin** | - Full access to everything<br>- Delete boards<br>- Manage all boards site-wide |

### Permission Matrix

| Action | guest | participant | user_mod | movie_mod | global_mod | admin |
|--------|-------|-------------|----------|-----------|------------|-------|
| View board | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Edit own rating | ❌ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Edit any rating | ❌ | ❌ | ✅ | ❌ | ✅ | ✅ |
| Add/remove users | ❌ | ❌ | ✅ | ❌ | ✅ | ✅ |
| Change user roles | ❌ | ❌ | ✅ | ❌ | ✅ | ✅ |
| Add/remove movies | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| Edit movie info | ❌ | ❌ | ❌ | ✅ | ✅ | ✅ |
| Edit board settings | ❌ | ❌ | ❌ | ❌ | ✅ | ✅ |
| Delete board | ❌ | ❌ | ❌ | ❌ | ❌ | ✅* |

*Admin can delete any board. Board owner (who created it) becomes global_moderator automatically.

---

## Movie Content

### Content Types (Tags)

Each movie can have multiple tags:

- **movie** - Feature film
- **series** - TV series
- **anime** - Anime content
- **feature** - Full-length (>40 minutes)
- **short** - Short film (<40 minutes)

**Examples**:
- "Inception" → [`movie`, `feature`]
- "Breaking Bad" → [`series`]
- "Attack on Titan" → [`anime`, `series`]
- "Spirited Away" → [`anime`, `movie`, `feature`]

### Movie Information

- Title (required)
- Poster image URL
- IMDb link
- IMDb rating (auto-fetched or manual)
- Release year
- Director
- Tags (required, at least 1)

---

## Rating System

### Rating Scale

- **Range**: 0-10
- **Precision**: Whole numbers only
- **Meaning**:
  - 0-3: Poor
  - 4-6: Average
  - 7-8: Good
  - 9-10: Excellent

### Rating Statistics

For each movie, calculate:
- **Average rating**: Mean of all user ratings
- **Rating count**: Number of users who rated
- Display both in movie card/detail view

---

## Board Ownership

### Owner vs Admin

- **Owner**: User who created the board
  - Automatically gets `global_moderator` role
  - Cannot be removed from board
  - Cannot delete their own board (only admin can)

- **Admin**: Site-wide role
  - Can access any board
  - Can delete any board
  - Can override any permission

---

## User Flows

### Creating a Board

1. User clicks "Create Board"
2. Enters board name + optional description
3. Board is created with user as owner (global_moderator)
4. User can now add members and movies

### Adding Members

1. User_moderator+ clicks "Add Member"
2. Searches for user by username/email
3. Selects user and assigns role
4. User is added to board with specified role
5. User can now see board in their board list

### Rating a Movie

1. Participant+ views board
2. Sees rating table with all movies and users
3. Clicks on their own cell for a movie
4. Enters rating 0-10
5. Rating is saved and visible to all

### Viewing Statistics

1. Any user views board detail
2. Sees average rating for each movie
3. Can sort movies by:
   - Average rating
   - Number of ratings
   - Date added
   - Title

---

## Future Features (Not in Current Scope)

- Comments on movies
- Recommendations based on ratings
- Export table to CSV/PDF
- Real-time updates (WebSocket)
- Email notifications
- Public/private boards
- Movie suggestions from TMDb API
- Watch status tracking
- Personal watchlists

---

**Version**: 1.0
**Updated**: 2025-11-10
