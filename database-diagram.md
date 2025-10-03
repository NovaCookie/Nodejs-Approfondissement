+-------------------+       +-------------------+
| Users             |       | Articles          |
+-------------------+       +-------------------+
| id (ObjectId)     |1-----*| id (ObjectId)     |
| username (String) |       | title (String)    |
| email (String)    |       | content (String)  |
| password (String) |       | status (Enum)     |
| role (String)     |       | createdAt (Date)  |
| createdAt (Date)  |       | updatedAt (Date)  |
+-------------------+       | userId (ObjectId) |
                            +-------------------+
