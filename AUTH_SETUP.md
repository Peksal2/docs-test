# Authentication Setup

This Docusaurus site now has authentication and role-based access control.

## How It Works

1. **Login Required**: Users must log in before accessing any documentation pages
2. **Role-Based Access**: Each markdown file can have an `access` field that restricts who can view it
3. **Admin Override**: Users with `admin` role can access all pages
4. **Logout Button**: Appears in the navbar when logged in

## Test User

The server comes with a pre-configured admin user:
- **Email**: `admin@example.com`
- **Password**: `password`
- **Access**: `warehouse`, `intro`

## Adding Access Control to Pages

Add the `access` field to the frontmatter of any markdown file:

```markdown
---
title: My Page
access: warehouse
---
```

Now only users with `warehouse` in their access array (or `admin` role) can view this page.

## Running the System

1. Start the authentication server:
   ```bash
   cd server
   npm start
   ```

2. Start Docusaurus (in another terminal):
   ```bash
   npm start
   ```

3. Visit http://localhost:3000 and log in

## Managing Users (Admin Only)

Admins can manage users via the API:

- `GET /api/users` - List all users
- `POST /api/users` - Create a user
- `PUT /api/users/:id` - Update a user
- `DELETE /api/users/:id` - Delete a user

## Access Roles

Users have an `access` array that can contain any string values. Common examples:
- `admin` - Full access to everything
- `warehouse` - Access to warehouse documentation
- `intro` - Access to intro/tutorial pages
- `it` - Access to IT documentation
- `customers` - Access to customer-facing docs

Add any custom roles you need!
