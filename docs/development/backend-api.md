# Backend API - Rate Together

> **For**: AI assistants
> **Purpose**: API endpoints reference

---

## Base URL

- **Production**: `https://api.rate-together.com/v1`
- **Development**: `http://localhost:3000/api`

---

## Authentication

All authenticated endpoints require:
```
Authorization: Bearer {access_token}
```

---

## Endpoints

### Auth

```
POST   /auth/register
POST   /auth/login
POST   /auth/logout
POST   /auth/refresh
GET    /auth/me
```

### Rating Boards

```
GET    /boards                    - List user's boards
GET    /boards/:id                - Get board details
POST   /boards                    - Create board
PATCH  /boards/:id                - Update board
DELETE /boards/:id                - Delete board (admin only)
```

### Board Members

```
POST   /boards/:id/members                - Add member
PATCH  /boards/:id/members/:userId        - Update member role
DELETE /boards/:id/members/:userId        - Remove member
```

### Movies

```
GET    /boards/:id/movies                     - List board movies
GET    /movies/:id                            - Get movie details
POST   /boards/:id/movies                     - Add movie to board
PATCH  /boards/:boardId/movies/:movieId      - Update movie
DELETE /boards/:boardId/movies/:movieId      - Remove movie from board
```

### Ratings

```
GET    /boards/:id/ratings        - Get all board ratings
PUT    /ratings                   - Upsert rating
DELETE /ratings                   - Delete rating
```

Query params for DELETE:
- `boardId` (required)
- `movieId` (required)
- `userId` (optional, for moderators)

### Users

```
GET    /users/search              - Search users (query param: query, limit)
GET    /users/:id                 - Get user profile
PATCH  /users/me                  - Update own profile
```

---

## Error Codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 409 | Conflict |
| 422 | Validation Error |
| 500 | Server Error |

---

## Error Response Format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Invalid email format"
      }
    ]
  }
}
```

---

**Version**: 1.0
**Updated**: 2025-11-10
