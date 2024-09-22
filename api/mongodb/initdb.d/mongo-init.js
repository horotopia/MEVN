db = db.getSiblingDB("ecommerce");

// db.createUser({
//     user: "user",
//     pwd: "passuser",
//     roles: [
//         {
//         role: 'readWrite', 
//         db: 'ecommerce'
//         },
//     ],
// });

db.createCollection("user");

db.users.insertMany([
    {
        name: "John Doe",
        email: "fake@mail.com",
        password: null,
        role: "ROLE_USER",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        name: "Jane Doe",
        email: "fake2@mail.com",
        password: null,
        role: "ROLE_USER",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        name: "Alice Smith",
        email: "alice@mail.com",
        password: null,
        role: "ROLE_USER",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        name: "Bob Johnson",
        email: "bob@mail.com",
        password: null,
        role: "ROLE_USER",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        name: "Charlie Brown",
        email: "charlie@mail.com",
        password: null,
        role: "ROLE_USER",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
]);
