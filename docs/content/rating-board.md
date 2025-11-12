# Rating Boards

A **Rating Board** is a group where:

- Multiple users can join. They might be invited or might send a request for joining.
- Movies/series/anime and other content are added to the board
- Each member rates the content (0.0-10.0 scale)
- All ratings are displayed in a table format

## Table Structure

| Movie   | Tags        | User1_small_rounded_avatar User1 | User2_small_rounded_avatar User2 | ... | UserN_small_rounded_avatar UserN | Average | Rating count |
|---------|-------------|----------------------------------|----------------------------------|-----|----------------------------------|---------|--------------|
| Movie 1 | Anime Movie | 8.5⭐                             | 9.0                              | ... | 1.0                              | 2.44    | 4            |
| Movie 2 | TvSeries    | 9.0                              | 8.0⭐                             | ... | 2.0                              | 3.44    | 5            |
| Movie 3 | Movie       | 7.1⭐                             | 9.0                              | ... | 3.0                              | 5.22    | 7            |

**Table Layout**:

- **Rows**: Name of columns. Users (board members), Average rating
- **Columns**: Movies/Series/Anime and other stuff that will be rated in the row. If you click on movie name it should
  redirect on link which was added during add movie process.
- **Cells**: Individual ratings (0-10) + ⭐ (OPTIONAL: might be added by moderator to highlight the user as a person who
  offered to watch this movie)

## Sorting, Filtering, Tags

### Sorting

You can sort table by specific column.
If you click on:

* **'Movie'** column (first cell) - table must to order by movie column
* **'Tags'** column (first cell) - table must to order by Tags column. If there is more then one tag - check the first
  one and.
* **'User'** column (first cell) - table must to order by user's ratings.
* **'Average'** column (first cell) - table must to order by Average ratings.
* **'Rating count'** column (first cell) - table must to order by ratings count.

After fist click sorting must be ASC, the second click - DESC, third click - sort must NOT be attached at all.
At the same time might be only one sort: if you have sort by 'movie' column and click on 'tags' column, sorting by movie
must be cancelled and sorting by tags must be applied.

### Filtering

You can filter table. On the top of the table should be raw with filter: by user, by tag, by rating, by average (<>=
specific rating).

## Access

Every board has page with settings. This page available only for specific roles.
There is 3 tabs/subpages here:

1. **General**. In this page moderators can:
    * Edit name of board
    * Checkbox "Can guest see this board?". Yes - everyone can watch this board, No - only participant can see this
      board
    * Delete the board
    * Export board from other (csv table and so on)
2. **Members**. In this page moderators can:
    * Add new Members to the board/table
    * Edit existing Members
    * Remove Members from board/table
    * List of request to join
3. **Content**. In this page moderators can:
    * Add movie to board/table
    * Edit existing item (edit movie name, link and so on)
    * Remove movie from board/table
    * Mange existing tags (for example he can rename tag "Anime" to "Animeeeeeeeeeeeeeee" or delete it or something
      else). It looks like a table with `Name`, `Description`, `Color` and `edit` icon. If you click on edit - modal
      with form opens. Also there is 'plus' button to add new tag.

## Adding Members

When you click to "add Members" or 'edit Members' should open modal with form. Form contain:

1. Select (with search) Members from all Members on site and who was NOT added to board yet. (select with search,
   Required)
2. Add role (default participant). (select, Optional)

## Adding content item

When you click to "add content item" or 'edit content item' should open modal with form. Form contain:

1. **Name** (Text input, Required)
2. **Tags** (Select, Required at least one)
3. **Who offered to watch**. Select from Members inside this board. (Select with search, Optional)
4. **Custom Link** (Input text, Optional)
5. **Poster** (Text input or Upload file, Optional)

## Tags

When you want to add or edit tag the modal is opening. Modal contain form:
When you hover on tag in table appear tooltip with description (if it was added).

1. **Name**   (Text input, Required)
2. **Description**  (Text input, Optional)
3. **Color**  (Color picker, Optional (default value - random color))

More about tags see [here](tags.md)

## Comments

Also in the table user can send a comment There might be multiple
comments - one after another. Comment must have a date and author.

1. In the cell after RIGHT CLICK appear context menu with "add comment" item.
2. If you on it - modal (or just popup) with list of comments and single input(below) appears and you can type
   something.
3. All people can see all comments.
4. If Cell have at least one comment in the top left corner will be small orange triangle. Nothing - in another way

Every comment has: author avatar, author, date, text.
