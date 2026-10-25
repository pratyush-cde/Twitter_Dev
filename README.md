# Requirements

- User should be able to create a post
  - [The post/tweet cannot be more than 250 chars]
  - [Every post/tweet will be having support for image upload]

- Any post should be visible to all those users who follows the author
- Anyone who follows you can comment on a post/tweet
- Anyone who follows you can like on a post/tweet
- We can comment on a comment
- We can like any comment also
- Retweeting

- User profile:
  - Name
  - Follower count
  - Bio
  - Last 10 tweets from the user

- Pagination on tweets
- User auth

- Every tweet might be having a hashtag

## JWT authentication

Set `JWT_SECRET` to a long, random value in `.env`. `JWT_EXPIRES_IN` controls token
lifetime and defaults to `1d`.

Create an account with `POST /api/v1/users`, then log in with
`POST /api/v1/users/login` using `{ "email": "...", "password": "..." }`.
The login response contains a bearer token. Send it to authenticated endpoints
as `Authorization: Bearer <token>`; the authenticated user is available as
`req.user`. `GET /api/v1/users/me` returns that user.

// https://how-to.dev/how-to-set-up-jest-for-es-module
