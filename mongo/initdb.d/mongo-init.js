db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE);

db.createUser({
    user: process.env.MONGO_USER,
    pwd: process.env.MONGO_PASSWORD,
    roles: [
        {
            role: 'readWrite', 
            db: process.env.MONGO_INITDB_DATABASE
        }
    ]
});

db.createCollection('users');

db.users.insertMany([
    {
        _id: ObjectId("111111111111111111111111"),
        name: "LeGrizzly",
        email: "LeGrizzly@hotmail.fr",
        password: "$2a$10$HdhL0Nwy2AQrAwyVxQ9HMuhpz5cgczdhrRPY4ePCh.gseXHniOYvS", // password: "LeGrizzly@hotmail.fr"
        role: "ROLE_ADMIN",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
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

db.createCollection('addresses');

db.addresses.insertMany([
    {
        _id: ObjectId("111111111111111111111111"),
        userId: ObjectId("111111111111111111111111"),
        street: "Rue Faubourg Saint-Antoine",
        city: "Paris",
        postalCode: "75012",
        country: "France",
        createdAt: new Date(),
        updatedAt: new Date()
    }
]);
