db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE);

db.createUser({
  user: process.env.MONGO_USER,
  pwd: process.env.MONGO_PASSWORD,
  roles: [
    {
      role: "readWrite",
      db: process.env.MONGO_INITDB_DATABASE,
    },
  ],
});

db.createCollection("users");
db.users.insertMany([
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b4f"),
    name: "LeGrizzly",
    email: "LeGrizzly@hotmail.fr",
    password: "$2a$10$HdhL0Nwy2AQrAwyVxQ9HMuhpz5cgczdhrRPY4ePCh.gseXHniOYvS", // password: "LeGrizzly@hotmail.fr"
    role: "ROLE_ADMIN"
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b50"),
    name: "John Doe",
    email: "fake@mail.com",
    password: null,
    role: "ROLE_USER"
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b51"),
    name: "Jane Doe",
    email: "fake2@mail.com",
    password: null,
    role: "ROLE_USER"
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b52"),
    name: "Alice Smith",
    email: "alice@mail.com",
    password: null,
    role: "ROLE_USER"
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b53"),
    name: "Bob Johnson",
    email: "bob@mail.com",
    password: null,
    role: "ROLE_USER"
  },
  {
    name: "Charlie Brown",
    email: "charlie@mail.com",
    password: null,
    role: "ROLE_USER"
  },
]);

db.createCollection("product");
db.product.insertMany([
  {
    _id: ObjectId("60f4b6e1e9f0f4001b111111"),
    name: "Bulbizarre",
    description: "Pokémon plante et poison",
    type: "plante",
    evolutionLevel: 1,
    evolutionReference: "Herbizarre",
    weight: 6900,
    height: 70,
    age: 5,
    price: 40000,
    category: "pokémon",
    stock: 8,
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001b111112"),
    name: "Salamèche",
    description: "Pokémon feu",
    type: "feu",
    evolutionLevel: 1,
    evolutionReference: "Reptincel",
    weight: 8500,
    height: 60,
    age: 3,
    price: 45001,
    category: "pokémon",
    stock: 10,
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001b111113"),
    name: "Carapuce",
    description: "Pokémon eau",
    type: "eau",
    evolutionLevel: 1,
    evolutionReference: "Carabaffe",
    weight: 9000,
    height: 50,
    age: 4,
    price: 42000,
    category: "pokémon",
    stock: 7,
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001b111114"),
    name: "Roucool",
    description: "Pokémon vol et normal",
    type: "vol",
    evolutionLevel: 1,
    evolutionReference: "Roucoups",
    weight: 1800,
    height: 30,
    age: 2,
    price: 15001,
    category: "pokémon",
    stock: 15,
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001b111115"),
    name: "Goupix",
    description: "Pokémon feu",
    type: "feu",
    evolutionLevel: 1,
    evolutionReference: "Feunard",
    weight: 990,
    height: 60,
    age: 3,
    price: 35001,
    category: "pokémon",
    stock: 6,
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001b111116"),
    name: "Jigglypuff",
    description: "Pokémon normal et fée",
    type: "fée",
    evolutionLevel: 1,
    evolutionReference: "Wigglytuff",
    weight: 550,
    height: 50,
    age: 4,
    price: 20000,
    category: "pokémon",
    stock: 20,
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001b111117"),
    name: "Mélofée",
    description: "Pokémon fée",
    type: "fée",
    evolutionLevel: 1,
    evolutionReference: "Mélodelfe",
    weight: 750,
    height: 60,
    age: 3,
    price: 25001,
    category: "pokémon",
    stock: 18,
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001b111118"),
    name: "Fantominus",
    description: "Pokémon spectre et poison",
    type: "spectre",
    evolutionLevel: 1,
    evolutionReference: "Spectrum",
    weight: 1,
    height: 130,
    age: 6,
    price: 30000,
    category: "pokémon",
    stock: 12,
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001b111119"),
    name: "Machoc",
    description: "Pokémon combat",
    type: "combat",
    evolutionLevel: 1,
    evolutionReference: "Machopeur",
    weight: 19500,
    height: 80,
    age: 4,
    price: 38000,
    category: "pokémon",
    stock: 9,
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001b111120"),
    name: "Évoli",
    description: "Pokémon normal",
    type: "normal",
    evolutionLevel: 1,
    evolutionReference: "plusieurs évolutions possibles",
    weight: 6500,
    height: 30,
    age: 3,
    price: 60000,
    category: "pokémon",
    stock: 5,
  },
]);

db.createCollection("address");
db.address.insertMany([
  {
    street: "1 rue de la paix",
    city: "Paris",
    postalCode: "75001",
    country: "France",
    userId: ObjectId("60f4b6e1e9f0f4001f6b3b4f"),
  },
  {
    street: "2 rue de la liberté",
    city: "Lyon",
    postalCode: "69000",
    country: "France",
    userId: ObjectId("60f4b6e1e9f0f4001f6b3b50"),
  },
  {
    street: "3 rue de la fraternité",
    city: "Marseille",
    postalCode: "13000",
    country: "France",
    userId: ObjectId("60f4b6e1e9f0f4001f6b3b51"),
  },
  {
    street: "4 rue de l'égalité",
    city: "Bordeaux",
    postalCode: "33000",
    country: "France",
    userId: ObjectId("60f4b6e1e9f0f4001f6b3b52"),
  },
  {
    street: "5 rue de la justice",
    city: "Lille",
    postalCode: "59000",
    country: "France",
    userId: ObjectId("60f4b6e1e9f0f4001f6b3b53"),
  },
]);

db.createCollection("orders");
db.orders.insertMany([
  {
    userId: ObjectId("60f4b6e1e9f0f4001f6b3b4f"),
    items: [
      {
        productId: ObjectId("60f4b6e1e9f0f4001b111111"),
        quantity: 2,
        price: 80000,
      },
      {
        productId: ObjectId("60f4b6e1e9f0f4001b111112"),
        quantity: 1,
        price: 45001,
      },
    ],
    totalAmount: 125001,
    status: "completed"
  },
  {
    userId: ObjectId("60f4b6e1e9f0f4001f6b3b50"),
    items: [
      {
        productId: ObjectId("60f4b6e1e9f0f4001b111113"),
        quantity: 3,
        price: 126000,
      },
    ],
    totalAmount: 126000,
    status: "pending"
  },
  {
    userId: ObjectId("60f4b6e1e9f0f4001f6b3b53"),
    items: [
      {
        productId: ObjectId("60f4b6e1e9f0f4001b111111"),
        quantity: 1,
        price: 35001,
      },
      {
        productId: ObjectId("60f4b6e1e9f0f4001b111114"),
        quantity: 2,
        price: 70002,
      },
    ],
    totalAmount: 105003,
    status: "cancelled"
  },
  {
    userId: ObjectId("60f4b6e1e9f0f4001f6b3b51"),
    items: [
      {
        productId: ObjectId("60f4b6e1e9f0f4001b111116"),
        quantity: 4,
        price: 180004,
      },
    ],
    totalAmount: 180004,
    status: "completed"
  },
  {
    userId: ObjectId("60f4b6e1e9f0f4001f6b3b4f"),
    items: [
      {
        productId: ObjectId("60f4b6e1e9f0f4001b111117"),
        quantity: 2,
        price: 80000,
      },
      {
        productId: ObjectId("60f4b6e1e9f0f4001b111118"),
        quantity: 1,
        price: 35001,
      },
    ],
    totalAmount: 115001,
    status: "pending"
  },
]);
