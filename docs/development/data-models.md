# Data Models - Rate Together

> **For**: AI assistants
> **Purpose**: Data structure patterns and types

---

## Core Entities

### User Entity
- Unique identifier
- Display name
- Email address
- Optional profile picture
- Timestamp metadata

### Board Entity
- Unique identifier
- Name and description
- Owner reference
- List of members with roles
- List of content items
- Timestamp metadata

### Member Association
- User reference
- Permission role
- Join timestamp

### Content Entity (Movies/Series)
- Unique identifier
- Title
- Optional poster image
- Optional external reference (IMDb)
- Category tags (multiple allowed)
- Creator reference
- Timestamp metadata
- Aggregated rating statistics

### Rating Entity
- User reference
- Content reference
- Board reference
- Numeric value (0-10 scale)
- Timestamp metadata

---

## Permission Roles

Hierarchical role system:
- **Lowest tier**: View-only access
- **Basic tier**: View + edit own data
- **Content moderator**: Basic + manage content items
- **User moderator**: Basic + manage users and permissions
- **Full moderator**: Both moderator tiers combined
- **System admin**: Unrestricted access

Each role inherits permissions from lower tiers.

---

## Data Transfer Objects

### Authentication DTOs
- Login request (credentials)
- Registration request (user details + credentials)
- Auth response (user data + access tokens)

### Board DTOs
- Create request (name, description)
- Update request (partial fields)
- Member addition request (user reference + role)
- Role update request (new role)

### Content DTOs
- Create request (title, metadata, tags)
- Update request (partial fields)

### Rating DTOs
- Upsert request (references + value)

---

## Common Patterns

### Timestamps
All entities should track:
- Creation time
- Last modification time

### Relationships
- One-to-many: Board → Members
- One-to-many: Board → Content items
- Many-to-many: Content ↔ Boards (content can exist in multiple boards)
- Many-to-many: Users ↔ Boards (via membership)

### Validation Rules
- Ratings: 0-10 numeric range
- Names: Required, minimum length
- Tags: At least one required
- Roles: Must be valid enum value

---

**Version**: 1.0
**Updated**: 2025-11-10
