# BackEnd
## List of available endpoints
### GET
- http://localhost:8080/backend/rest/listPosts

Input: ```None```

Output example (JSON):
```
{
    "posts": [{
        "id": 1,
        "filename": "example.jpg",
        "post": "base64-encoded-image-content",
        "likes": 5,
        "tag": "",
        "general_tag": "example",
        "user": {
            "username": "tzsedgfu",
            "bio": "",
            "followers": 0,
            "following": 0,
            "posts_count": 5,
            "avatar": "base64-encoded-image-content"
        }
    },

    ...

    ]
}
```

### POST
- http://localhost:8080/backend/rest/login

Input example (JSON):
```
{
    "username": "tzsedgfu",
    "password": "123456"
}
```

Output example (JSON):
```
{
    "success": true,
    "id": 1
}
```

- http://localhost:8080/backend/rest/signup

Input example (JSON):
```
{
    "username": "tzsedgfu",
    "password": "123456"
}
```

Output example (JSON):
```
{
    "success": false,
    "message": "Username already exists"
}
```
```
{
    "success": true,
    "message": "User created successfully"
}
```

- http://localhost:8080/backend/rest/upload

Input example (JSON):
```
{
  "filename": "example.jpg",
  "id": 1,
  "content": [
    {
      "stream": "base64-encoded-image-content"
    }
  ]
}
```

Output example (JSON):
```
{
    "success": true,
    "id": 5,
    "general_tag" : "example",
    "message": "Image uploaded successfully"
}
```

- http://localhost:8080/backend/rest/like

Input example (JSON):
```
{
  "id_post" : 1
}
```

Output example (JSON):
```
{
    "success": true,
    "like_count": 5,
    "message": "Like added successfully"
}
```

- http://localhost:8080/backend/rest/changeAvatar

Input example (JSON):
```
{
  "filename": "example.jpg",
  "id": 1,
  "content": [
    {
      "stream": "base64-encoded-image-content"
    }
  ]
}
```

Output example (JSON):
```
{
    "success": true,
    "message": "Avatar changed successfully"
}
```

- http://localhost:8080/backend/rest/profile

Input example (JSON):
```
{
  "id_user": 1
}
```

Output example (JSON):
```
{
    "success": true,
    "user": {
        "id_user": 1,
        "username": "tzsedgfu",
        "followers": 0,
        "following": 0,
        "post_count": 5,
        "avatar": "base64-encoded-image-content",
        "filename": "example.jpg",
        "following_list": [{
            "id_user": 2,
            "username": "oezrifdrhgegni",
            "avatar": "base64-encoded-image-content",
            "filename": "example.jpg"
        }]
    },
    "posts": [{
        "id_post": 1,
        "title": "example.jpg",
        "date": "",
        "likes": 5,
        "tag": "",
        "general_tag": "example",
        "image": "base64-encoded-image-content"
    },

    ...

    ]
}
```

- http://localhost:8080/backend/rest/savedPosts

Input example (JSON):
```
{
  "id_user": 1
}
```

Output example (JSON):
```
{
    "success": true,
    "savedPosts": [{
        "id_post": 2,
        "title": "example.jpg",
        "date": "",
        "likes": 0,
        "tag": "",
        "general_tag": "example",
        "image": "base64-encoded-image-content"
    },
    
    ...
    
    ]
}
```

- http://localhost:8080/backend/rest/save

Input example (JSON):
```
{
  "id_user": 1,
  "id_post": 1
}
```

Output example (JSON):
```
{
    "success": true,
    "message": "Post saved successfully"
}
```
```
{
    "success": false,
    "message": "Post already saved by the user"
}
```

- http://localhost:8080/backend/rest/unsave

Input example (JSON):
```
{
  "id_user": 1,
  "id_post": 1
}
```

Output example (JSON):
```
{
    "success": true,
    "message": "Post removed from saved posts successfully"
}
```
```
{
    "success": false,
    "message": "Post not saved by the user"
}
```

- http://localhost:8080/backend/rest/follow

Input example (JSON):
```
{
  "id_user": 1,
  "id_creator": 2
}
```

Output example (JSON):
```
{
    "success": true,
    "message": "User followed successfully"
}
```
```
{
    "success": false,
    "message": "User is already following the creator"
}
```

- http://localhost:8080/backend/rest/unpost

Input example (JSON):
```
{
  "id_user": 1,
  "id_post": 2
}
```

Output example (JSON):
```
{
  "success": true,
  "message": "Post successfully removed"
}

```
```
{
  "success": false,
  "message": "User or post not found"
}
```
```
{
  "success": false,
  "message": "Post does not belong to the user"
}
```