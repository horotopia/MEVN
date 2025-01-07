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
    tel: '0102030405',
    password: "$2a$10$HdhL0Nwy2AQrAwyVxQ9HMuhpz5cgczdhrRPY4ePCh.gseXHniOYvS",
    role: "ROLE_ADMIN",
    isEmailVerified: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Horotopia",
    email: "guirado.leo@gmail.com",
    tel: '0102030405',
    password: "$2y$10$YQgt4OqsN4VgY67W.9xBkeGdEXBeeCRID8TBMjN2.vNbpL0IftGn2",
    role: "ROLE_USER",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b99"),
    name: "Arthur serenne",
    email: "arthur.serenne@gmail.com",
    tel: '0102030405',
    password: "$2a$10$Npo0D5N/jiazF4P2sU.yzO0EC.pVs./paGxrvZuRgtmbrYfW0z6g6",
    role: "ROLE_USER",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b51"),
    name: "Jane Doe",
    email: "fake2@mail.com",
    password: null,
    role: "ROLE_USER",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b52"),
    name: "Alice Smith",
    email: "alice@mail.com",
    password: null,
    role: "ROLE_USER",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b53"),
    name: "Bob Johnson",
    email: "bob@mail.com",
    password: null,
    role: "ROLE_USER",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b70"),
    name: "Alice Smith",
    email: "alice@mail.com",
    password: null,
    role: "ROLE_USER",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b71"),
    name: "Bob Johnson",
    email: "bob@mail.com",
    password: null,
    role: "ROLE_USER",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b54"),
    name: "User 3",
    email: "user3@mail.com",
    password: null,
    role: "ROLE_USER",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b55"),
    name: "User 4",
    email: "user4@mail.com",
    password: null,
    role: "ROLE_USER",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b56"),
    name: "User 5",
    email: "user5@mail.com",
    password: null,
    role: "ROLE_USER",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b57"),
    name: "User 6",
    email: "user6@mail.com",
    password: null,
    role: "ROLE_USER",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b58"),
    name: "User 7",
    email: "user7@mail.com",
    password: null,
    role: "ROLE_USER",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b59"),
    name: "User 8",
    email: "user8@mail.com",
    password: null,
    role: "ROLE_USER",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b5a"),
    name: "User 9",
    email: "user9@mail.com",
    password: null,
    role: "ROLE_USER",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b5b"),
    name: "User 10",
    email: "user10@mail.com",
    password: null,
    role: "ROLE_USER",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b5c"),
    name: "User 11",
    email: "user11@mail.com",
    password: null,
    role: "ROLE_USER",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b5d"),
    name: "User 12",
    email: "user12@mail.com",
    password: null,
    role: "ROLE_USER",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b5e"),
    name: "User 13",
    email: "user13@mail.com",
    password: null,
    role: "ROLE_USER",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b5f"),
    name: "User 14",
    email: "user14@mail.com",
    password: null,
    role: "ROLE_USER",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b60"),
    name: "User 15",
    email: "user15@mail.com",
    password: null,
    role: "ROLE_USER",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b61"),
    name: "User 16",
    email: "user16@mail.com",
    password: null,
    role: "ROLE_USER",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b62"),
    name: "User 17",
    email: "user17@mail.com",
    password: null,
    role: "ROLE_USER",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b63"),
    name: "User 18",
    email: "user18@mail.com",
    password: null,
    role: "ROLE_USER",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b64"),
    name: "User 19",
    email: "user19@mail.com",
    password: null,
    role: "ROLE_USER",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b65"),
    name: "User 20",
    email: "user20@mail.com",
    password: null,
    role: "ROLE_USER",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b66"),
    name: "User 21",
    email: "user21@mail.com",
    password: null,
    role: "ROLE_USER",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b67"),
    name: "User 22",
    email: "user22@mail.com",
    password: null,
    role: "ROLE_USER",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b68"),
    name: "User 23",
    email: "user23@mail.com",
    password: null,
    role: "ROLE_USER",
    createdAt: new Date('2024-12-10T00:00:00Z'),
    updatedAt: new Date('2024-12-10T00:00:00Z'),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b69"),
    name: "User 24",
    email: "user24@mail.com",
    password: null,
    role: "ROLE_USER",
    createdAt: new Date('2024-12-10T00:00:00Z'),
    updatedAt: new Date('2024-12-10T00:00:00Z'),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b6a"),
    name: "User 25",
    email: "user25@mail.com",
    password: null,
    role: "ROLE_USER",
    createdAt: new Date('2024-12-10T00:00:00Z'),
    updatedAt: new Date('2024-12-10T00:00:00Z'),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b6b"),
    name: "User 26",
    email: "user26@mail.com",
    password: null,
    role: "ROLE_USER",
    createdAt: new Date('2024-12-10T00:00:00Z'),
    updatedAt: new Date('2024-12-10T00:00:00Z'),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b6c"),
    name: "User 27",
    email: "user27@mail.com",
    password: null,
    role: "ROLE_USER",
    createdAt: new Date('2024-12-10T00:00:00Z'),
    updatedAt: new Date('2024-12-10T00:00:00Z'),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b6d"),
    name: "User 28",
    email: "user28@mail.com",
    password: null,
    role: "ROLE_USER",
    createdAt: new Date('2024-12-10T00:00:00Z'),
    updatedAt: new Date('2024-12-10T00:00:00Z'),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b6e"),
    name: "User 29",
    email: "user29@mail.com",
    password: null,
    role: "ROLE_USER",
    createdAt: new Date('2024-12-10T00:00:00Z'),
    updatedAt: new Date('2024-12-10T00:00:00Z'),
  },
  {
    _id: ObjectId("60f4b6e1e9f0f4001f6b3b6f"),
    name: "User 30",
    email: "user30@mail.com",
    password: null,
    role: "ROLE_USER",
    createdAt: new Date('2024-12-10T00:00:00Z'),
    updatedAt: new Date('2024-12-10T00:00:00Z'),
  },
]);

db.createCollection("product");
db.product.insertMany([
  {
    _id: ObjectId("60f4b6e1e9f0f4001b111111"),
    name: "Bulbizarre",
    description: "Bulbizarre est un Pokémon de type Plante et Poison, connu pour la graine qu’il porte sur son dos. Cette graine grandit avec lui et stocke de l’énergie solaire, ce qui lui permet d’utiliser de puissantes attaques de type Plante, comme Fouet Lianes ou Vampigraine. Bulbizarre est souvent vu en train de se reposer au soleil pour alimenter cette graine en énergie. Sa nature calme et son attachement à son dresseur en font un excellent compagnon pour les débutants.",
    habitat: "Bulbizarre préfère les prairies et les forêts denses où il peut se cacher parmi la végétation. Il s’installe souvent dans des zones ensoleillées pendant la journée pour absorber l’énergie solaire nécessaire à la graine sur son dos. La nuit, Bulbizarre dort dans des nids de feuilles ou de mousse, souvent à l’ombre des arbres pour rester camouflé. Ces abris naturels offrent à Bulbizarre la tranquillité et la sécurité dont il a besoin pour se reposer pleinement.",
    habitude: "Bulbizarre est un Pokémon calme et méthodique qui tire son énergie du soleil. Il passe de longues heures à se reposer dans des clairières ensoleillées, absorbant la lumière grâce à la graine sur son dos, qui agit comme une source d’énergie interne. Il se nourrit principalement de feuilles, de baies et de racines qu’il trouve en utilisant ses lianes. Bien que peu agressif, Bulbizarre s’entraîne régulièrement à utiliser ses capacités de type Plante, comme Vampigraine ou Fouet Lianes, pour rester en forme. La nuit, il dort profondément dans des herbes hautes ou des abris naturels, souvent entouré d’autres Pokémon, car il apprécie la compagnie pour se sentir en sécurité.",
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
    description: "Salamèche est un Pokémon de type Feu de la première génération. Reconnaissable à sa petite taille, sa peau orange et la flamme qui brûle constamment au bout de sa queue, Salamèche est connu pour sa nature amicale mais ardente. La flamme de sa queue reflète son état émotionnel : elle vacille doucement quand il est calme et brûle intensément lorsqu’il est en colère. Salamèche évolue en Reptincel puis en Dracaufeu.",
    habitat: "Salamèche aime les zones rocheuses ou volcaniques, où il peut profiter de la chaleur naturelle. Il dort souvent dans des grottes ou sous des surplombs rocheux qui protègent sa flamme des intempéries. Ce Pokémon veille à ce que sa flamme reste toujours allumée, même en dormant, et il choisit donc des endroits où le vent est faible. Salamèche peut aussi se blottir contre des sources de chaleur pour se détendre et récupérer après une journée active.",
    habitude: "Salamèche est un Pokémon énergique et curieux qui vit souvent près de sources de chaleur naturelles comme des volcans ou des champs de lave. Il se nourrit principalement de baies, de fruits cuits par sa flamme, et de petits insectes. Son activité physique est intense : il aime courir, grimper et s’exercer à projeter des flammes. La flamme de sa queue est un indicateur constant de son humeur et de sa vitalité. Le soir, Salamèche cherche un lieu abrité où il peut se reposer en toute sécurité, comme une caverne ou un endroit protégé du vent. Sa flamme éclaire doucement les environs, dissuadant les prédateurs et créant une ambiance apaisante pendant son sommeil.",
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
    description: "Carapuce est un Pokémon de type Eau de petite taille, reconnaissable à sa carapace dure et brillante. Lorsqu'il se sent menacé, il peut rentrer entièrement dans sa carapace pour se protéger des attaques ennemies. Il est capable de projeter de puissants jets d'eau à haute pression pour repousser ses adversaires ou éteindre des incendies. Carapuce est un compagnon fidèle et plein d'énergie, apprécié pour son courage et son esprit joueur. Il évolue en Carabaffe, puis en Tortank.",
    habitat: "Carapuce préfère vivre dans des environnements aquatiques comme des rivières, des lacs ou des étangs calmes. Il se loge souvent dans des zones peu profondes où il peut facilement accéder à la terre ferme pour se reposer. La nuit, Carapuce se protège en dormant partiellement immergé, avec juste sa carapace visible, ce qui lui offre un camouflage naturel contre les prédateurs. En cas de menace, il se cache dans sa carapace, une véritable forteresse mobile.",
    habitude: "Carapuce vit dans des environnements aquatiques comme les lacs, les rivières ou les plages, où il se sent le plus à l’aise. Il est omnivore, se nourrissant principalement de petits poissons, d’algues et parfois d’insectes aquatiques. Pour trouver sa nourriture, il plonge souvent sous l'eau, utilisant ses puissantes pattes palmées pour nager rapidement. Son activité physique est variée : il alterne entre des périodes de nage active, des jeux aquatiques et des entraînements où il perfectionne son jet d’eau à haute pression. Lorsqu'il est fatigué, Carapuce aime s’exposer au soleil sur des rochers ou la berge, sa carapace absorbant une partie de la chaleur pour réguler sa température. La nuit, il dort dans des cavités rocheuses ou sur des fonds sablonneux, rentrant entièrement dans sa carapace pour se protéger des prédateurs.",
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
    description: "Roucool est un Pokémon de type Normal et Vol connu pour sa nature discrète et prudente. Ce petit oiseau préfère éviter les conflits en se cachant dans les hautes herbes ou en s'envolant rapidement. Malgré sa petite taille, Roucool est un excellent éclaireur grâce à sa vue perçante. Lorsqu'il est menacé, il peut battre des ailes pour projeter des nuages de poussière et aveugler ses ennemis. Avec de l'entraînement, il évolue en Roucoups, puis en Roucarnage, un puissant prédateur aérien.",
    habitat: "Roucool niche généralement dans les branches des arbres ou dans les hautes herbes des prairies. Il préfère des endroits discrets et bien cachés pour éviter les prédateurs. Ses nids sont faits de brindilles et de feuilles, lui offrant un abri confortable et sûr. Pendant la nuit, il dort dans ces refuges naturels, toujours prêt à s'envoler au moindre bruit suspect grâce à sa nature prudente.",
    habitude: "Roucool est un Pokémon diurne qui préfère les zones ouvertes avec de hautes herbes, des forêts clairsemées ou des collines. Son régime alimentaire se compose principalement de graines, de baies et parfois de petits insectes. Il utilise son bec précis et ses pattes agiles pour extraire des aliments dans des endroits difficiles d'accès. Ce petit oiseau est constamment en mouvement, effectuant des vols courts mais fréquents pour surveiller son territoire et éviter les prédateurs. Roucool est également un expert en camouflage, se dissimulant dans les feuillages ou les buissons lorsqu’il sent le danger. Il dort profondément la nuit, niché dans des branches ou des crevasses, où il est hors de portée des prédateurs terrestres.",
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
    description: "Goupix est un Pokémon de type Feu, distingué par sa fourrure orange soyeuse et ses queues élégantes. À sa naissance, il n'a qu'une seule queue, mais celle-ci se divise en plusieurs au fil de sa croissance. Goupix est connu pour sa grâce et son intelligence. Il peut produire des flammes d'une chaleur intense pour se défendre ou intimider ses ennemis. En évoluant grâce à une Pierre Feu, Goupix devient Feunard, un Pokémon majestueux et énigmatique.",
    habitat: "Goupix s'installe souvent dans des endroits chauds comme des collines ensoleillées ou des forêts proches de sources thermales. Il se creuse des tanières peu profondes dans le sol ou utilise des cavités naturelles pour se protéger du froid et des intrus. Ses tanières sont souvent tapissées de mousse ou de fourrure perdue, offrant un endroit douillet où dormir. Goupix aime aussi se reposer près de foyers ou de feux de camp lorsqu’il est en compagnie de son dresseur.",
    habitude: "Goupix est un Pokémon crépusculaire, plus actif lorsque la lumière du jour faiblit. Il se nourrit d’un mélange de baies sucrées, de fruits mûrs, et de petits mammifères qu’il chasse avec une précision impressionnante. Sa fourrure soyeuse et ses queues élégantes nécessitent un entretien méticuleux, et Goupix consacre du temps à se toiletter quotidiennement. Lorsqu’il n’est pas en chasse ou en exploration, il s’entraîne à contrôler ses flammes en lançant de petites boules de feu sur des cibles naturelles comme des pierres ou des arbres. Son sommeil est stratégique : il choisit des lieux chauds comme des grottes volcaniques ou des terriers secs, où il peut s’enrouler autour de lui-même, ses queues protégeant son corps du froid.",
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
    name: "Rondoudou",
    description: "Rondoudou est un Pokémon de type Normal et Fée célèbre pour sa voix mélodieuse. Lorsqu'il chante, il émet une mélodie si apaisante qu'elle endort instantanément quiconque l'écoute, y compris ses adversaires en combat. Sa forme ronde et ses grands yeux pétillants le rendent irrésistiblement mignon. Bien qu'il soit doux et amical, Jigglypuff peut être assez rancunier si on ignore son chant. Il évolue en Rondoudou grâce à une Pierre Lune.",
    habitat: "Rondoudou recherche des environnements tranquilles et sécurisés comme des clairières ombragées ou des cavernes peu fréquentées. Il construit souvent son nid dans des endroits moelleux, utilisant des feuilles, des plumes ou même des objets trouvés pour créer une surface confortable. La nuit, il aime s’endormir en chantant doucement pour se bercer. Sa forme ronde lui permet de se blottir dans des espaces confinés, augmentant son sentiment de sécurité.",
    habitude: "Rondoudou mène une vie paisible et détendue, où la recherche de confort est prioritaire. Il se nourrit principalement de baies juteuses et sucrées, et apprécie particulièrement les fruits rares qu’il peut trouver grâce à son ouïe fine. Peu actif physiquement, il passe ses journées à chanter pour le plaisir ou à s’entourer d’autres Pokémon qui aiment sa compagnie apaisante. Son chant est si efficace pour endormir qu’il n’a presque jamais besoin de fuir les conflits. Lorsqu'il dort, ce Pokémon choisit des endroits doux et moelleux, comme des clairières herbeuses ou des lits de mousse, où il peut s’enfoncer pour un sommeil réparateur. Il est connu pour faire des rêves paisibles qui renforcent son énergie.",
    type: "fée",
    evolutionLevel: 1,
    evolutionReference: "Grosdoudou",
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
    description: "Mélofée est un Pokémon de type Fée souvent associé à la lune et aux étoiles. Ce petit Pokémon magique est connu pour sa nature joyeuse et curieuse. On dit qu'il danse sous la lumière de la lune dans des lieux secrets. Sa capacité à absorber la lumière lunaire et à utiliser des pouvoirs mystérieux fascine les dresseurs. Mélofée est aussi très affectueux et devient rapidement attaché à son dresseur. Il évolue en Mélodelfe grâce à une Pierre Lune.",
    habitat: "Mélofée adore les montagnes et les collines où la lumière de la lune est visible. Il se loge dans des cavernes ou des crevasses rocheuses, souvent en groupe, créant des habitats collectifs où il peut se sentir en sécurité. Ces lieux sont souvent tapissés de poussière stellaire qu’il semble collecter instinctivement. Mélofée dort en cercle avec ses congénères, profitant de l'énergie lunaire pour se revitaliser.",
    habitude: "Mélofée est un Pokémon nocturne et mystérieux qui adore les environnements calmes et isolés, comme les montagnes ou les clairières lumineuses. Il se nourrit principalement de baies lumineuses et de nectar, mais il apprécie aussi les champignons rares qu’il déniche grâce à son odorat. La nuit, Mélofée se rassemble souvent avec d’autres Pokémon de son espèce pour des danses sous la lune, un rituel qui semble amplifier son énergie magique. Pendant ces danses, il absorbe l’énergie lunaire, qu'il stocke dans son corps pour l'utiliser en cas de besoin. Après ces rituels, il dort profondément dans des recoins sombres et sécurisés, souvent à l’intérieur de petites cavernes. Son sommeil est long et réparateur, indispensable pour régénérer sa puissance magique.",
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
    description: "Fantominus est un Pokémon de type Spectre et Poison, composé presque entièrement de gaz toxique. Il peut se rendre invisible et traverser les murs, ce qui le rend très difficile à capturer. Malgré son apparence effrayante, Fantominus est joueur et adore effrayer ses cibles pour s’amuser. Ses attaques spectrales le rendent redoutable en combat, surtout face à ceux qui ne savent pas comment gérer un Pokémon fantôme. Avec de l'entraînement, il évolue en Spectrum, puis en Ectoplasma.",
    habitat: "Fantominus choisit des lieux sombres et isolés pour habiter, comme des tours abandonnées, des grottes ou des cimetières. Contrairement à d'autres Pokémon, il ne construit pas de nids ou d'abris fixes, préférant flotter librement dans son environnement. Pendant la journée, il se repose dans les coins les plus obscurs qu'il peut trouver, souvent suspendu à quelques centimètres du sol, invisible à l’œil nu.",
    habitude: "Fantominus mène une existence nocturne et insaisissable. N’ayant pas de corps solide, il se nourrit de manière unique : il absorbe l’énergie des émotions humaines ou Pokémon, en particulier la peur. Très joueur, il passe ses nuits à flotter silencieusement dans les ombres, s’amusant à surprendre les passants ou à espionner les lieux animés. Sa capacité à devenir invisible et à traverser les murs lui permet d’explorer des endroits inaccessibles. La journée, il se retire dans des lieux sombres et humides, comme des caves ou des vieilles tours, où il entre dans un état de sommeil léger. Ce repos est entrecoupé de moments où il se dissipe dans l’air pour se protéger des éventuels dangers.",
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
    description: "Machoc est un Pokémon de type Combat au corps musclé. Toujours en quête de force, il passe son temps à s'entraîner pour développer ses capacités physiques. Il est capable de soulever des objets bien plus lourds que lui sans effort apparent. Machoc rêve de devenir un combattant inégalé et participe souvent à des combats amicaux pour s'améliorer. Avec de l'entraînement, il évolue en Machopeur, puis en Mackogneur, un véritable colosse.",
    habitat: "Machoc vit dans des zones rocheuses ou montagneuses, où il peut trouver des endroits stables pour s'entraîner. Il construit souvent des abris rudimentaires en empilant des rochers pour créer un espace protégé contre les intempéries. La nuit, Machoc dort profondément sur des surfaces dures, utilisant parfois des pierres plates comme lits. Son environnement est toujours proche de son terrain d’entraînement, car il aime optimiser chaque moment pour développer sa force.",
    habitude: "Machoc est un modèle de discipline et d’endurance. Ce Pokémon passe presque toute sa journée à s’entraîner, soulevant des pierres, courant sur des terrains accidentés, ou exécutant des séries de coups pour perfectionner sa technique de combat. Son alimentation est riche en protéines : il consomme des baies énergétiques, des noix, et parfois de la viande. Sa routine stricte inclut également des étirements et des exercices de méditation pour améliorer sa concentration. Bien qu’il soit actif toute la journée, il respecte un cycle de sommeil rigoureux pour permettre à ses muscles de récupérer. Machoc dort souvent dans des grottes fraîches ou sous des arbres, où il peut s'étendre confortablement après une journée d'efforts.",
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
    description: "Évoli est un Pokémon de type Normal très spécial, connu pour son incroyable capacité d'adaptation. Sa composition génétique instable lui permet de s’adapter à divers environnements et de changer de forme en conséquence. Grâce à des pierres évolutives ou des conditions spécifiques, Évoli peut évoluer en plusieurs Pokémon, chacun ayant des types et capacités uniques, comme Aquali (Eau), Voltali (Électrique), ou Pyroli (Feu). Ce Pokémon curieux et sociable est un favori des dresseurs.",
    habitat: "Évoli s’adapte à une grande variété d’habitats, que ce soit dans des forêts, des plaines ou même des zones urbaines. Il préfère les abris naturels comme des creux d’arbres, des buissons denses ou des coins chauds dans des bâtiments. Lorsqu'il dort, Évoli cherche un endroit sûr et isolé, souvent en hauteur ou caché pour se protéger des prédateurs. Son adaptabilité exceptionnelle lui permet de trouver refuge dans presque tous les environnements.",
    habitude: "Évoli est un Pokémon adaptable, capable de vivre dans presque tous les environnements grâce à sa composition génétique unique. Il explore son territoire avec curiosité, cherchant des fruits, des baies, et parfois des champignons pour se nourrir. Son activité physique inclut des courses rapides et des jeux avec d’autres Pokémon, ce qui l’aide à maintenir sa souplesse et son endurance. Très sociable, Évoli aime interagir avec ses dresseurs et les autres Pokémon, ce qui le rend facile à entraîner. Le soir, il trouve un abri naturel comme un terrier ou un nid improvisé, et son sommeil est léger, car il est toujours prêt à réagir en cas de danger.",
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
  {
    "_id": ObjectId("60f4b6e1e9f0f4001b111122"),
    "name": "Laisse Rétractable",
    "description": "Laisse rétractable de 5 mètres, idéale pour les promenades.",
    "habitat": "Extérieur, pour balades en parc ou en ville.",
    "habitude": "Facile à utiliser et adaptée pour tous les animaux domestiques.",
    "type": "Accessoire de promenade",
    "evolutionLevel": 0,
    "evolutionReference": "",
    "weight": 300,
    "height": 0.15,
    "age": 0,
    price: 2500,
    "category": "accessoire",
    "stock": 50
  },
  {
    "_id": ObjectId("60f4b6e1e9f0f4001b111123"),
    "name": "Panier Douillet",
    "description": "Panier en tissu moelleux pour le confort de votre animal.",
    "habitat": "Intérieur, idéal pour le salon ou la chambre.",
    "habitude": "Convient pour un sommeil paisible et confortable.",
    "type": "Lit pour animaux",
    "evolutionLevel": 0,
    "evolutionReference": "",
    "weight": 1200,
    "height": 0.3,
    "age": 0,
    price: 4500,
    "category": "accessoire",
    "stock": 20
  },
  {
    "_id": ObjectId("60f4b6e1e9f0f4001b111124"),
    "name": "Balle Interactive",
    "description": "Jouet qui libère des friandises pour stimuler l'activité de votre animal.",
    "habitat": "Intérieur et extérieur.",
    "habitude": "Parfait pour les jeux interactifs et l'entraînement.",
    "type": "Jouet pour animaux",
    "evolutionLevel": 0,
    "evolutionReference": "",
    "weight": 200,
    "height": 0.1,
    "age": 0,
    price: 1500,
    "category": "accessoire",
    "stock": 35
  },
  {
    "_id": ObjectId("60f4b6e1e9f0f4001b111125"),
    "name": "Gamelle Anti-Glouton",
    "description": "Gamelle conçue pour ralentir la prise de nourriture.",
    "habitat": "Intérieur, adaptée à tous les espaces.",
    "habitude": "Idéale pour réguler la digestion des animaux gourmands.",
    "type": "Accessoire de repas",
    "evolutionLevel": 0,
    "evolutionReference": "",
    "weight": 400,
    "height": 0.1,
    "age": 0,
    price: 2000,
    "category": "accessoire",
    "stock": 40
  },
  {
    "_id": ObjectId("60f4b6e1e9f0f4001b111126"),
    "name": "Arbre à jeu",
    "description": "Structure pour grimper, se cacher et se reposer.",
    "habitat": "Intérieur, pour espaces de toutes tailles.",
    "habitude": "Favorise l'activité physique et le repos.",
    "type": "Accessoire de jeu",
    "evolutionLevel": 0,
    "evolutionReference": "",
    "weight": 5000,
    "height": 1.5,
    "age": 0,
    price: 10000,
    "category": "accessoire",
    "stock": 15
  },
  {
    "_id": ObjectId("60f4b6e1e9f0f4001b111127"),
    "name": "Croquettes Premium 5kg",
    "description": "Croquettes riches en protéines et en nutriments.",
    "habitat": "Pour tous types d'animaux domestiques.",
    "habitude": "Repas équilibré pour maintenir la vitalité de votre animal.",
    "type": "Nourriture pour animaux",
    "evolutionLevel": 0,
    "evolutionReference": "",
    "weight": 5000,
    "height": 0.4,
    "age": 0,
    price: 8000,
    "category": "accessoire",
    "stock": 60
  },
  {
    "_id": ObjectId("60f4b6e1e9f0f4001b111128"),
    "name": "Pokéball",
    "description": "Pokéball pour transporter votre animal.",
    "habitat": "Idéal pour voyages et déplacements.",
    "habitude": "Assure la sécurité et le confort de l'animal.",
    "type": "Accessoire de transport",
    "evolutionLevel": 0,
    "evolutionReference": "",
    "weight": 1500,
    "height": 0.5,
    "age": 0,
    price: 6000,
    "category": "accessoire",
    "stock": 25
  },
  {
    "_id": ObjectId("60f4b6e1e9f0f4001b111129"),
    "name": "Fontaine à Eau Automatique",
    "description": "Fontaine pour garder l'eau fraîche et en mouvement.",
    "habitat": "Intérieur, pratique pour la maison.",
    "habitude": "Encourage les animaux à boire plus d'eau.",
    "type": "Accessoire d'hydratation",
    "evolutionLevel": 0,
    "evolutionReference": "",
    "weight": 2500,
    "height": 0.3,
    "age": 0,
    price: 7500,
    "category": "accessoire",
    "stock": 18
  },
  {
    "_id": ObjectId("60f4b6e1e9f0f4001b111130"),
    "name": "Griffoir en Sisal",
    "description": "Accessoire pour les griffes des chats, avec base stable.",
    "habitat": "Intérieur, adapté aux chats actifs.",
    "habitude": "Aide à protéger les meubles et à entretenir les griffes.",
    "type": "Accessoire pour chats",
    "evolutionLevel": 0,
    "evolutionReference": "",
    "weight": 1200,
    "height": 0.8,
    "age": 0,
    price: 3500,
    "category": "accessoire",
    "stock": 30
  },
  {
    "_id": ObjectId("60f4b6e1e9f0f4001b111131"),
    "name": "Jouet à Plumes",
    "description": "Jouet interactif pour éveiller l'instinct de chasse des chats.",
    "habitat": "Intérieur, idéal pour les séances de jeu.",
    "habitude": "Stimule l'activité physique et mentale.",
    "type": "Jouet pour chats",
    "evolutionLevel": 0,
    "evolutionReference": "",
    "weight": 150,
    "height": 0.3,
    "age": 0,
    price: 1200,
    "category": "accessoire",
    "stock": 45
  },
  {
    "_id": ObjectId("60f4b6e1e9f0f4001b111132"),
    "name": "Superball",
    "description": "Superball pour transporter votre animal.",
    "habitat": "Idéal pour voyages et déplacements.",
    "habitude": "Assure la sécurité et le confort de l'animal.",
    "type": "Accessoire de transport",
    "evolutionLevel": 0,
    "evolutionReference": "",
    "weight": 1500,
    "height": 0.5,
    "age": 0,
    price: 16000,
    "category": "accessoire",
    "stock": 25
  },
  {
    "_id": ObjectId("60f4b6e1e9f0f4001b111133"),
    "name": "Hyperball",
    "description": "Hyperball pour transporter votre animal.",
    "habitat": "Idéal pour voyages et déplacements.",
    "habitude": "Assure la sécurité et le confort de l'animal.",
    "type": "Accessoire de transport",
    "evolutionLevel": 0,
    "evolutionReference": "",
    "weight": 1500,
    "height": 0.5,
    "age": 0,
    price: 26000,
    "category": "accessoire",
    "stock": 25
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
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    street: "2 rue de la liberté",
    city: "Lyon",
    postalCode: "69000",
    country: "France",
    userId: ObjectId("677c182040bdca0c615e739c"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    street: "3 rue de la fraternité",
    city: "Marseille",
    postalCode: "13000",
    country: "France",
    userId: ObjectId("60f4b6e1e9f0f4001f6b3b99"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    street: "4 rue de l'égalité",
    city: "Bordeaux",
    postalCode: "33000",
    country: "France",
    userId: ObjectId("60f4b6e1e9f0f4001f6b3b52"),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    street: "5 rue de la justice",
    city: "Lille",
    postalCode: "59000",
    country: "France",
    userId: ObjectId("60f4b6e1e9f0f4001f6b3b53"),
    createdAt: new Date(),
    updatedAt: new Date(),
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
    status: 'completed',
    createdAt: new Date('2024-05-18T13:00:00Z'),
    updatedAt: new Date('2024-05-20T12:00:00Z')
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
    status: "pending",
    createdAt: new Date('2024-05-18T13:00:00Z'),
    updatedAt: new Date('2024-05-20T12:00:00Z')
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
    status: "cancelled",
    createdAt: new Date('2024-05-18T13:00:00Z'),
    updatedAt: new Date('2024-05-20T12:00:00Z')
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
    status: 'completed',
    createdAt: new Date('2024-05-18T13:00:00Z'),
    updatedAt: new Date('2024-05-20T12:00:00Z')
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
    status: "pending",
    createdAt: new Date('2024-05-18T13:00:00Z'),
    updatedAt: new Date('2024-05-20T12:00:00Z')
  },
  {
    _id: ObjectId('677ba9272b2996c7e63840c1'),
    userId: ObjectId('677ba5466d3761f898e9496a'),
    items: [
      {
        productId: ObjectId('60f4b6e1e9f0f4001b111111'),
        quantity: 2,
        price: 40000,
        _id: ObjectId('677ba9272b2996c7e63840c2')
      }
    ],
    totalAmount: 80000,
    status: 'completed',
    createdAt: new Date('2024-01-10T10:00:00Z'),
    updatedAt: new Date('2024-01-12T12:00:00Z')
  },
  {
    _id: ObjectId('677ba9272b2996c7e63840c3'),
    userId: ObjectId('677ba5466d3761f898e9496b'),
    items: [
      {
        productId: ObjectId('60f4b6e1e9f0f4001b111112'),
        quantity: 1,
        price: 25000,
        _id: ObjectId('677ba9272b2996c7e63840c4')
      },
      {
        productId: ObjectId('60f4b6e1e9f0f4001b111113'),
        quantity: 3,
        price: 20000,
        _id: ObjectId('677ba9272b2996c7e63840c5')
      }
    ],
    totalAmount: 85000,
    status: 'pending',
    createdAt: new Date('2024-02-15T15:00:00Z'),
    updatedAt: new Date('2024-02-15T15:00:00Z')
  },
  {
    _id: ObjectId('677ba9272b2996c7e63840c6'),
    userId: ObjectId('677ba5466d3761f898e9496c'),
    items: [
      {
        productId: ObjectId('60f4b6e1e9f0f4001b111114'),
        quantity: 1,
        price: 120000,
        _id: ObjectId('677ba9272b2996c7e63840c7')
      }
    ],
    totalAmount: 120000,
    status: 'completed',
    createdAt: new Date('2024-03-05T11:00:00Z'),
    updatedAt: new Date('2024-03-07T14:00:00Z')
  },
  {
    _id: ObjectId('677ba9272b2996c7e63840c8'),
    userId: ObjectId('677ba5466d3761f898e9496d'),
    items: [
      {
        productId: ObjectId('60f4b6e1e9f0f4001b111115'),
        quantity: 2,
        price: 35000,
        _id: ObjectId('677ba9272b2996c7e63840c9')
      }
    ],
    totalAmount: 70000,
    status: 'pending',
    createdAt: new Date('2024-04-25T16:30:00Z'),
    updatedAt: new Date('2024-04-25T16:30:00Z')
  },
  {
    _id: ObjectId('677ba9272b2996c7e63840ca'),
    userId: ObjectId('677ba5466d3761f898e9496e'),
    items: [
      {
        productId: ObjectId('60f4b6e1e9f0f4001b111116'),
        quantity: 4,
        price: 15000,
        _id: ObjectId('677ba9272b2996c7e63840cb')
      }
    ],
    totalAmount: 60000,
    status: 'completed',
    createdAt: new Date('2024-05-18T13:00:00Z'),
    updatedAt: new Date('2024-05-20T12:00:00Z')
  },
  {
    _id: ObjectId('677ba9272b2996c7e63840cc'),
    userId: ObjectId('677ba5466d3761f898e9496f'),
    items: [
      {
        productId: ObjectId('60f4b6e1e9f0f4001b111117'),
        quantity: 2,
        price: 60000,
        _id: ObjectId('677ba9272b2996c7e63840cd')
      },
      {
        productId: ObjectId('60f4b6e1e9f0f4001b111118'),
        quantity: 1,
        price: 40000,
        _id: ObjectId('677ba9272b2996c7e63840ce')
      }
    ],
    totalAmount: 160000,
    status: 'cancelled',
    createdAt: new Date('2024-06-30T10:15:00Z'),
    updatedAt: new Date('2024-07-01T08:00:00Z')
  },
  {
    _id: ObjectId('677ba9272b2996c7e63840cf'),
    userId: ObjectId('677ba5466d3761f898e94960'),
    items: [
      {
        productId: ObjectId('60f4b6e1e9f0f4001b111119'),
        quantity: 1,
        price: 45000,
        _id: ObjectId('677ba9272b2996c7e63840d0')
      }
    ],
    totalAmount: 45000,
    status: 'pending',
    createdAt: new Date('2024-07-20T09:00:00Z'),
    updatedAt: new Date('2024-07-20T09:00:00Z')
  },
  {
    _id: ObjectId('677ba9272b2996c7e63840d1'),
    userId: ObjectId('677ba5466d3761f898e94961'),
    items: [
      {
        productId: ObjectId('60f4b6e1e9f0f4001b111120'),
        quantity: 3,
        price: 30000,
        _id: ObjectId('677ba9272b2996c7e63840d2')
      }
    ],
    totalAmount: 90000,
    status: 'completed',
    createdAt: new Date('2024-08-14T10:00:00Z'),
    updatedAt: new Date('2024-08-15T15:00:00Z')
  },
  {
    _id: ObjectId('677ba9272b2996c7e63840d4'),
    userId: ObjectId('677ba5466d3761f898e94961'),
    items: [
      {
        productId: ObjectId('60f4b6e1e9f0f4001b111120'),
        quantity: 3,
        price: 40000,
        _id: ObjectId('677ba9272b2996c7e63840d2')
      }
    ],
    totalAmount: 120000,
    status: 'completed',
    createdAt: new Date('2024-11-14T10:00:00Z'),
    updatedAt: new Date('2024-11-15T15:00:00Z')
  },
  {
    _id: ObjectId('677ba9272b2996c7e63840d5'),
    userId: ObjectId('677ba5466d3761f898e94961'),
    items: [
      {
        productId: ObjectId('60f4b6e1e9f0f4001b111120'),
        quantity: 3,
        price: 60000,
        _id: ObjectId('677ba9272b2996c7e63840d2')
      }
    ],
    totalAmount: 180000,
    status: 'completed',
    createdAt: new Date('2025-01-06T10:00:00Z'),
    updatedAt: new Date('2025-01-06T15:00:00Z')
  },
//   {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x7300ab38ca2bc7e2748574e5'),
//             quantity: 8,
//             price: 6835
//         },
//         {
//             productId: ObjectId('0x3a88c7b03ac06dc434f66a70'),
//             quantity: 10,
//             price: 28969
//         }
//     ],
//     totalAmount: 344370,
//     status: 'completed',
//     createdAt: "2024-06-26T00:00:00Z",
//     updatedAt: "2024-07-19T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xfbcf98b4e2730fae13dff474'),
//             quantity: 6,
//             price: 32446
//         }
//     ],
//     totalAmount: 194676,
//     status: 'completed',
//     createdAt: "2024-03-29T00:00:00Z",
//     updatedAt: "2024-04-13T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x7a0965775ad9fd45db374571'),
//             quantity: 1,
//             price: 24147
//         },
//         {
//             productId: ObjectId('0x192d75813e8ac624bf14dde1'),
//             quantity: 2,
//             price: 27442
//         },
//         {
//             productId: ObjectId('0x6dd7c26aea9a9526334ac21c'),
//             quantity: 4,
//             price: 23870
//         }
//     ],
//     totalAmount: 174511,
//     status: 'completed',
//     createdAt: "2024-11-19T00:00:00Z",
//     updatedAt: "2024-11-30T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x4e558cec5c88b3a1732dd6c0'),
//             quantity: 3,
//             price: 18223
//         }
//     ],
//     totalAmount: 54669,
//     status: 'completed',
//     createdAt: "2024-01-21T00:00:00Z",
//     updatedAt: "2024-02-07T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xe402d453d8dd9f9adee1738e'),
//             quantity: 10,
//             price: 17205
//         }
//     ],
//     totalAmount: 172050,
//     status: 'completed',
//     createdAt: "2024-09-21T00:00:00Z",
//     updatedAt: "2024-10-07T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x5661b114d3d7c3d2d6a78830'),
//             quantity: 2,
//             price: 42057
//         }
//     ],
//     totalAmount: 84114,
//     status: 'completed',
//     createdAt: "2024-03-13T00:00:00Z",
//     updatedAt: "2024-03-18T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xb83d34db903c4fb8b682039c'),
//             quantity: 10,
//             price: 28045
//         },
//         {
//             productId: ObjectId('0x14f738b62e15bac0c183a136'),
//             quantity: 9,
//             price: 10924
//         }
//     ],
//     totalAmount: 378766,
//     status: 'completed',
//     createdAt: "2024-05-19T00:00:00Z",
//     updatedAt: "2024-06-18T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x2b9945aa23853429d5111eae'),
//             quantity: 1,
//             price: 28556
//         }
//     ],
//     totalAmount: 28556,
//     status: 'completed',
//     createdAt: "2024-02-11T00:00:00Z",
//     updatedAt: "2024-02-25T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x166547034b382675a7ba0746'),
//             quantity: 4,
//             price: 49595
//         },
//         {
//             productId: ObjectId('0x2705a6b8c1328c367527cd62'),
//             quantity: 6,
//             price: 29689
//         },
//         {
//             productId: ObjectId('0xff3372f6546290ab09f2a422'),
//             quantity: 6,
//             price: 12511
//         }
//     ],
//     totalAmount: 451580,
//     status: 'completed',
//     createdAt: "2024-03-03T00:00:00Z",
//     updatedAt: "2024-03-22T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x21ce4d188f3903f792da3a36'),
//             quantity: 4,
//             price: 35595
//         }
//     ],
//     totalAmount: 142380,
//     status: 'completed',
//     createdAt: "2024-11-30T00:00:00Z",
//     updatedAt: "2024-12-27T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x803c1e179b3e58d96d8606bf'),
//             quantity: 1,
//             price: 29496
//         },
//         {
//             productId: ObjectId('0xc21e6945e6c37133621858f7'),
//             quantity: 1,
//             price: 43706
//         },
//         {
//             productId: ObjectId('0x36962c76503a32651af5685c'),
//             quantity: 2,
//             price: 12003
//         }
//     ],
//     totalAmount: 97208,
//     status: 'completed',
//     createdAt: "2024-11-16T00:00:00Z",
//     updatedAt: "2024-12-02T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x38218d28137cfa321193cf5f'),
//             quantity: 9,
//             price: 12620
//         },
//         {
//             productId: ObjectId('0x491b7d1647ffa5c8e3dba7cf'),
//             quantity: 8,
//             price: 19813
//         }
//     ],
//     totalAmount: 272084,
//     status: 'completed',
//     createdAt: "2024-11-12T00:00:00Z",
//     updatedAt: "2024-12-11T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xc3fc87150fe8e1d4f960f885'),
//             quantity: 8,
//             price: 20429
//         },
//         {
//             productId: ObjectId('0x3325b8cea934a8323b01de62'),
//             quantity: 10,
//             price: 23864
//         },
//         {
//             productId: ObjectId('0x99ed1a1d5e108af1353132b3'),
//             quantity: 1,
//             price: 10288
//         }
//     ],
//     totalAmount: 412360,
//     status: 'completed',
//     createdAt: "2024-10-20T00:00:00Z",
//     updatedAt: "2024-11-05T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x5c2cbc6df9599244b6a6f905'),
//             quantity: 6,
//             price: 6801
//         }
//     ],
//     totalAmount: 40806,
//     status: 'completed',
//     createdAt: "2024-11-04T00:00:00Z",
//     updatedAt: "2024-11-20T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x5a1ba02d33c13ef68766e07e'),
//             quantity: 3,
//             price: 16454
//         },
//         {
//             productId: ObjectId('0xe28711d3c4766411f8223628'),
//             quantity: 9,
//             price: 8314
//         },
//         {
//             productId: ObjectId('0x4588b206abdfdd28218d22de'),
//             quantity: 6,
//             price: 20865
//         }
//     ],
//     totalAmount: 249378,
//     status: 'completed',
//     createdAt: "2024-05-03T00:00:00Z",
//     updatedAt: "2024-05-20T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xd9bd185623f69c1c8b717cd5'),
//             quantity: 10,
//             price: 34363
//         },
//         {
//             productId: ObjectId('0xa381621da2a662fe4e503bbd'),
//             quantity: 2,
//             price: 42571
//         }
//     ],
//     totalAmount: 428772,
//     status: 'completed',
//     createdAt: "2024-10-09T00:00:00Z",
//     updatedAt: "2024-10-26T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x88c8a180d90cf295c476885a'),
//             quantity: 3,
//             price: 16318
//         }
//     ],
//     totalAmount: 48954,
//     status: 'completed',
//     createdAt: "2024-10-13T00:00:00Z",
//     updatedAt: "2024-10-25T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xc8de58441a2165ba8c09e767'),
//             quantity: 6,
//             price: 44996
//         },
//         {
//             productId: ObjectId('0x99cc9ef93b216ea8be6004a2'),
//             quantity: 8,
//             price: 46713
//         }
//     ],
//     totalAmount: 643680,
//     status: 'completed',
//     createdAt: "2024-02-18T00:00:00Z",
//     updatedAt: "2024-03-07T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x4e04428f455a9b02556ee4d5'),
//             quantity: 8,
//             price: 3529
//         }
//     ],
//     totalAmount: 28232,
//     status: 'completed',
//     createdAt: "2024-09-08T00:00:00Z",
//     updatedAt: "2024-09-20T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x8f09d920b2af3f6f830ee8cb'),
//             quantity: 1,
//             price: 6783
//         },
//         {
//             productId: ObjectId('0xebe33706943039e9034b1bbb'),
//             quantity: 8,
//             price: 37336
//         },
//         {
//             productId: ObjectId('0x3143041751f2874e21ef6098'),
//             quantity: 1,
//             price: 37650
//         }
//     ],
//     totalAmount: 343121,
//     status: 'completed',
//     createdAt: "2024-06-04T00:00:00Z",
//     updatedAt: "2024-06-26T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x3e9f1a6575488a61dac09db5'),
//             quantity: 7,
//             price: 1940
//         }
//     ],
//     totalAmount: 13580,
//     status: 'completed',
//     createdAt: "2024-02-28T00:00:00Z",
//     updatedAt: "2024-03-25T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x437f0e15f5f32bcdf1746be3'),
//             quantity: 3,
//             price: 8198
//         }
//     ],
//     totalAmount: 24594,
//     status: 'completed',
//     createdAt: "2024-12-25T00:00:00Z",
//     updatedAt: "2025-01-09T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xbc13320d566d89f158a307c9'),
//             quantity: 6,
//             price: 39143
//         }
//     ],
//     totalAmount: 234858,
//     status: 'completed',
//     createdAt: "2024-09-25T00:00:00Z",
//     updatedAt: "2024-09-28T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xdc0fd124c602f18ac4a4c12c'),
//             quantity: 9,
//             price: 7614
//         }
//     ],
//     totalAmount: 68526,
//     status: 'completed',
//     createdAt: "2024-12-26T00:00:00Z",
//     updatedAt: "2024-12-27T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x6fabb85b80c5259f8ab97aaa'),
//             quantity: 7,
//             price: 22610
//         },
//         {
//             productId: ObjectId('0x3ef4b4387084cad67e2f2118'),
//             quantity: 7,
//             price: 30519
//         }
//     ],
//     totalAmount: 371903,
//     status: 'completed',
//     createdAt: "2024-04-20T00:00:00Z",
//     updatedAt: "2024-04-29T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xec7ddc1ca39864dc418198af'),
//             quantity: 6,
//             price: 40619
//         }
//     ],
//     totalAmount: 243714,
//     status: 'completed',
//     createdAt: "2024-08-28T00:00:00Z",
//     updatedAt: "2024-09-27T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xad05da5ba4411bb7c0956d44'),
//             quantity: 1,
//             price: 42799
//         },
//         {
//             productId: ObjectId('0xc4a1e78490deb1e38489f934'),
//             quantity: 8,
//             price: 43309
//         }
//     ],
//     totalAmount: 389271,
//     status: 'completed',
//     createdAt: "2024-02-14T00:00:00Z",
//     updatedAt: "2024-02-17T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xe9d1eb602ab5581d79ff07ba'),
//             quantity: 4,
//             price: 45201
//         },
//         {
//             productId: ObjectId('0xbd08826ed9f726d7005402ab'),
//             quantity: 4,
//             price: 39482
//         },
//         {
//             productId: ObjectId('0xe8c93afc64ace303cfd16dbc'),
//             quantity: 4,
//             price: 20130
//         }
//     ],
//     totalAmount: 419252,
//     status: 'completed',
//     createdAt: "2024-01-26T00:00:00Z",
//     updatedAt: "2024-02-25T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x2d935af049a6204b9dbc5c8f'),
//             quantity: 8,
//             price: 19049
//         },
//         {
//             productId: ObjectId('0xdad645dda71757e7aeba8c99'),
//             quantity: 2,
//             price: 21323
//         }
//     ],
//     totalAmount: 195038,
//     status: 'completed',
//     createdAt: "2024-08-14T00:00:00Z",
//     updatedAt: "2024-08-24T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xd5d0a2d909f150735d79feca'),
//             quantity: 10,
//             price: 26531
//         },
//         {
//             productId: ObjectId('0xca097489c1474605800a9dc4'),
//             quantity: 8,
//             price: 22048
//         },
//         {
//             productId: ObjectId('0xa9e187efb3d2e4d4ee40e37f'),
//             quantity: 1,
//             price: 41112
//         }
//     ],
//     totalAmount: 482806,
//     status: 'completed',
//     createdAt: "2024-01-27T00:00:00Z",
//     updatedAt: "2024-01-29T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xc513cd7908ffbbb9105a5435'),
//             quantity: 4,
//             price: 35349
//         },
//         {
//             productId: ObjectId('0x584b09c13ed00353a0268e09'),
//             quantity: 5,
//             price: 32149
//         },
//         {
//             productId: ObjectId('0x3959886fcb0772cc7d8bbb44'),
//             quantity: 8,
//             price: 31241
//         }
//     ],
//     totalAmount: 552069,
//     status: 'completed',
//     createdAt: "2024-05-09T00:00:00Z",
//     updatedAt: "2024-06-05T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x1dd012e5cb042c517794ccd3'),
//             quantity: 3,
//             price: 45233
//         }
//     ],
//     totalAmount: 135699,
//     status: 'completed',
//     createdAt: "2024-04-28T00:00:00Z",
//     updatedAt: "2024-05-15T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xc5425680861167382b771bff'),
//             quantity: 10,
//             price: 10662
//         }
//     ],
//     totalAmount: 106620,
//     status: 'completed',
//     createdAt: "2024-09-15T00:00:00Z",
//     updatedAt: "2024-09-27T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x2f3e31917e2f8ae3263e89fd'),
//             quantity: 4,
//             price: 9108
//         }
//     ],
//     totalAmount: 36432,
//     status: 'completed',
//     createdAt: "2024-11-22T00:00:00Z",
//     updatedAt: "2024-12-17T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x4dfdbe9fc565354ac461b200'),
//             quantity: 7,
//             price: 8660
//         },
//         {
//             productId: ObjectId('0xb14a6841cf14e45683b4d999'),
//             quantity: 1,
//             price: 15836
//         },
//         {
//             productId: ObjectId('0x1954e08d214f14835ce28a55'),
//             quantity: 7,
//             price: 25046
//         }
//     ],
//     totalAmount: 251778,
//     status: 'completed',
//     createdAt: "2024-07-21T00:00:00Z",
//     updatedAt: "2024-08-14T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x1a88d7bdeabc1176529c78d3'),
//             quantity: 4,
//             price: 24775
//         },
//         {
//             productId: ObjectId('0x316db6d9a6b4604ba26c08aa'),
//             quantity: 9,
//             price: 48314
//         },
//         {
//             productId: ObjectId('0xe2cbd79e44754749381ac84d'),
//             quantity: 3,
//             price: 5730
//         }
//     ],
//     totalAmount: 551116,
//     status: 'completed',
//     createdAt: "2024-03-19T00:00:00Z",
//     updatedAt: "2024-04-08T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xb6f7d962c64f8563b1c7f4ed'),
//             quantity: 4,
//             price: 16306
//         }
//     ],
//     totalAmount: 65224,
//     status: 'completed',
//     createdAt: "2024-10-14T00:00:00Z",
//     updatedAt: "2024-10-31T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x8675876ee666e1496d4623b2'),
//             quantity: 3,
//             price: 17588
//         }
//     ],
//     totalAmount: 52764,
//     status: 'completed',
//     createdAt: "2024-10-17T00:00:00Z",
//     updatedAt: "2024-11-02T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xb8ca57b1310372aca03aa86d'),
//             quantity: 7,
//             price: 14223
//         }
//     ],
//     totalAmount: 99561,
//     status: 'completed',
//     createdAt: "2024-02-04T00:00:00Z",
//     updatedAt: "2024-02-20T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x351535572337cd240772d053'),
//             quantity: 7,
//             price: 44337
//         },
//         {
//             productId: ObjectId('0x3818d2eb48aaca1349b5eb4a'),
//             quantity: 2,
//             price: 15869
//         },
//         {
//             productId: ObjectId('0xa1a0398a5842becb577acb67'),
//             quantity: 2,
//             price: 7727
//         }
//     ],
//     totalAmount: 357551,
//     status: 'completed',
//     createdAt: "2024-05-17T00:00:00Z",
//     updatedAt: "2024-06-05T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x574efb10da7c8f2d121e0d51'),
//             quantity: 6,
//             price: 1985
//         },
//         {
//             productId: ObjectId('0x4fd625aeeda640e0c34059d7'),
//             quantity: 2,
//             price: 13697
//         }
//     ],
//     totalAmount: 39304,
//     status: 'completed',
//     createdAt: "2024-08-23T00:00:00Z",
//     updatedAt: "2024-08-27T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xb3ed8275008491d59c8d747c'),
//             quantity: 4,
//             price: 39889
//         }
//     ],
//     totalAmount: 159556,
//     status: 'completed',
//     createdAt: "2024-04-22T00:00:00Z",
//     updatedAt: "2024-05-08T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xcd3d845065d7a67903883492'),
//             quantity: 9,
//             price: 19374
//         }
//     ],
//     totalAmount: 174366,
//     status: 'completed',
//     createdAt: "2024-12-13T00:00:00Z",
//     updatedAt: "2025-01-01T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x12e94a84f80bfaa95bd2e6f7'),
//             quantity: 2,
//             price: 34869
//         },
//         {
//             productId: ObjectId('0x66314b734ff2e920b9c8f18d'),
//             quantity: 10,
//             price: 39342
//         },
//         {
//             productId: ObjectId('0xf15fb48639e9b8c4af47ec2a'),
//             quantity: 3,
//             price: 4037
//         }
//     ],
//     totalAmount: 475269,
//     status: 'completed',
//     createdAt: "2024-09-24T00:00:00Z",
//     updatedAt: "2024-09-29T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xc5337d6c90ad49d31b75d9b0'),
//             quantity: 3,
//             price: 49555
//         }
//     ],
//     totalAmount: 148665,
//     status: 'completed',
//     createdAt: "2024-06-13T00:00:00Z",
//     updatedAt: "2024-07-02T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xf212a971f3b78b979e34911d'),
//             quantity: 2,
//             price: 8616
//         }
//     ],
//     totalAmount: 17232,
//     status: 'completed',
//     createdAt: "2024-12-10T00:00:00Z",
//     updatedAt: "2025-01-09T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xeeb144257610d84b07c55345'),
//             quantity: 4,
//             price: 39499
//         },
//         {
//             productId: ObjectId('0x9625fe569b504304c115c081'),
//             quantity: 2,
//             price: 42092
//         },
//         {
//             productId: ObjectId('0x6a7700a7fc170ed1c8834bd4'),
//             quantity: 10,
//             price: 17650
//         }
//     ],
//     totalAmount: 418680,
//     status: 'completed',
//     createdAt: "2024-11-26T00:00:00Z",
//     updatedAt: "2024-12-14T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xaddc49d57e7b089cbe2cad3d'),
//             quantity: 2,
//             price: 36304
//         }
//     ],
//     totalAmount: 72608,
//     status: 'completed',
//     createdAt: "2024-05-22T00:00:00Z",
//     updatedAt: "2024-06-08T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x1d422c3264c6649d5ba76336'),
//             quantity: 1,
//             price: 37051
//         }
//     ],
//     totalAmount: 37051,
//     status: 'completed',
//     createdAt: "2024-03-10T00:00:00Z",
//     updatedAt: "2024-03-13T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x5ab9dd925319704a521b32cd'),
//             quantity: 7,
//             price: 4766
//         },
//         {
//             productId: ObjectId('0x9dec5a8cdf4623d0f1afb303'),
//             quantity: 1,
//             price: 48406
//         },
//         {
//             productId: ObjectId('0xf6087e5ed64b47cccf0f2761'),
//             quantity: 10,
//             price: 4113
//         }
//     ],
//     totalAmount: 122898,
//     status: 'completed',
//     createdAt: "2024-03-30T00:00:00Z",
//     updatedAt: "2024-04-26T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xb6500b47b9e414b55db4e545'),
//             quantity: 2,
//             price: 8435
//         }
//     ],
//     totalAmount: 16870,
//     status: 'completed',
//     createdAt: "2024-01-28T00:00:00Z",
//     updatedAt: "2024-02-20T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xc9268ac529168d95207874d4'),
//             quantity: 1,
//             price: 17642
//         }
//     ],
//     totalAmount: 17642,
//     status: 'completed',
//     createdAt: "2024-11-16T00:00:00Z",
//     updatedAt: "2024-12-11T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x699be834a80798345f43e8a4'),
//             quantity: 5,
//             price: 24503
//         },
//         {
//             productId: ObjectId('0x1f63c7382b3a6d42f73d4319'),
//             quantity: 6,
//             price: 10469
//         }
//     ],
//     totalAmount: 185329,
//     status: 'completed',
//     createdAt: "2024-01-19T00:00:00Z",
//     updatedAt: "2024-01-21T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x675a4b197e05025a80fd5c6e'),
//             quantity: 7,
//             price: 31929
//         }
//     ],
//     totalAmount: 223503,
//     status: 'completed',
//     createdAt: "2024-03-24T00:00:00Z",
//     updatedAt: "2024-04-06T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xbefe7668676e43835eaa5e14'),
//             quantity: 1,
//             price: 28372
//         },
//         {
//             productId: ObjectId('0x1fa55f5b16020e73612666eb'),
//             quantity: 5,
//             price: 23527
//         }
//     ],
//     totalAmount: 146007,
//     status: 'completed',
//     createdAt: "2024-09-13T00:00:00Z",
//     updatedAt: "2024-09-24T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x2e8f2693f131bd16f7ad2322'),
//             quantity: 10,
//             price: 15714
//         }
//     ],
//     totalAmount: 157140,
//     status: 'completed',
//     createdAt: "2024-07-30T00:00:00Z",
//     updatedAt: "2024-08-06T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x24a274d17f0ba3a0e1b62e0e'),
//             quantity: 8,
//             price: 40521
//         }
//     ],
//     totalAmount: 324168,
//     status: 'completed',
//     createdAt: "2024-08-22T00:00:00Z",
//     updatedAt: "2024-09-09T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x4cc5720b2c7bbcc1ad11dc85'),
//             quantity: 5,
//             price: 47613
//         }
//     ],
//     totalAmount: 238065,
//     status: 'completed',
//     createdAt: "2024-05-19T00:00:00Z",
//     updatedAt: "2024-05-22T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xc49f4bad31e92167295a6e9e'),
//             quantity: 2,
//             price: 15014
//         },
//         {
//             productId: ObjectId('0x511beb8850982265cdbda632'),
//             quantity: 3,
//             price: 13657
//         },
//         {
//             productId: ObjectId('0x692605eafaa2695042491968'),
//             quantity: 8,
//             price: 21064
//         }
//     ],
//     totalAmount: 239511,
//     status: 'completed',
//     createdAt: "2024-08-06T00:00:00Z",
//     updatedAt: "2024-08-19T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x84ff754dc3533cf86d016cdf'),
//             quantity: 5,
//             price: 34661
//         },
//         {
//             productId: ObjectId('0x28161beb553b5e1c12af8102'),
//             quantity: 9,
//             price: 1324
//         }
//     ],
//     totalAmount: 185221,
//     status: 'completed',
//     createdAt: "2024-06-30T00:00:00Z",
//     updatedAt: "2024-07-12T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x937851cd3a507903bbd8929d'),
//             quantity: 4,
//             price: 29666
//         },
//         {
//             productId: ObjectId('0x2bbe25ca29486cace64b38be'),
//             quantity: 3,
//             price: 21576
//         }
//     ],
//     totalAmount: 183392,
//     status: 'completed',
//     createdAt: "2024-03-01T00:00:00Z",
//     updatedAt: "2024-03-08T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x51e399cc630a3b3d39f89547'),
//             quantity: 5,
//             price: 21429
//         },
//         {
//             productId: ObjectId('0x586070422f93ecdae2fc0f34'),
//             quantity: 9,
//             price: 29395
//         }
//     ],
//     totalAmount: 371700,
//     status: 'completed',
//     createdAt: "2024-02-08T00:00:00Z",
//     updatedAt: "2024-03-04T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x2cdb07d8427fc521a1b30bcf'),
//             quantity: 9,
//             price: 25678
//         },
//         {
//             productId: ObjectId('0x539a649e068e1fa9eeabe257'),
//             quantity: 5,
//             price: 10396
//         }
//     ],
//     totalAmount: 283082,
//     status: 'completed',
//     createdAt: "2024-11-11T00:00:00Z",
//     updatedAt: "2024-11-24T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x3321c63397d37259cee0b920'),
//             quantity: 10,
//             price: 38421
//         },
//         {
//             productId: ObjectId('0xd0666a4634d03179bd5691a7'),
//             quantity: 2,
//             price: 49766
//         },
//         {
//             productId: ObjectId('0xa17f76d9261f1d80babbcda3'),
//             quantity: 4,
//             price: 35085
//         }
//     ],
//     totalAmount: 624082,
//     status: 'completed',
//     createdAt: "2024-03-26T00:00:00Z",
//     updatedAt: "2024-04-14T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xc7ce2f38280e65caa2df5f27'),
//             quantity: 10,
//             price: 17542
//         },
//         {
//             productId: ObjectId('0x9a2f21138e17c13a9af7e6dc'),
//             quantity: 6,
//             price: 34429
//         }
//     ],
//     totalAmount: 381994,
//     status: 'completed',
//     createdAt: "2024-11-22T00:00:00Z",
//     updatedAt: "2024-11-29T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x14c6249d573a6a0afdfe4b58'),
//             quantity: 2,
//             price: 20397
//         },
//         {
//             productId: ObjectId('0x8ba70796f7d3e5331fdf78b7'),
//             quantity: 4,
//             price: 39510
//         }
//     ],
//     totalAmount: 198834,
//     status: 'completed',
//     createdAt: "2024-11-14T00:00:00Z",
//     updatedAt: "2024-11-27T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x2d583277bb3a8aacfff6614b'),
//             quantity: 5,
//             price: 6830
//         },
//         {
//             productId: ObjectId('0x4cfc2db2ca54023926a2643b'),
//             quantity: 8,
//             price: 21703
//         }
//     ],
//     totalAmount: 207774,
//     status: 'completed',
//     createdAt: "2024-06-12T00:00:00Z",
//     updatedAt: "2024-07-09T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xfcda1bc122d7fbe8fc76f7b4'),
//             quantity: 1,
//             price: 6044
//         },
//         {
//             productId: ObjectId('0xb25ec3c142a4148f05e63a1e'),
//             quantity: 7,
//             price: 30093
//         },
//         {
//             productId: ObjectId('0x8da7b8af2a7a59e3054261a1'),
//             quantity: 6,
//             price: 1774
//         }
//     ],
//     totalAmount: 227339,
//     status: 'completed',
//     createdAt: "2024-04-04T00:00:00Z",
//     updatedAt: "2024-05-01T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xe7250bd5c1f19bd20cdcc2b1'),
//             quantity: 9,
//             price: 7648
//         },
//         {
//             productId: ObjectId('0x95dafebe451531c567e1b771'),
//             quantity: 1,
//             price: 22374
//         },
//         {
//             productId: ObjectId('0xd4535751921c71e32551f32b'),
//             quantity: 10,
//             price: 48721
//         }
//     ],
//     totalAmount: 578416,
//     status: 'completed',
//     createdAt: "2024-11-04T00:00:00Z",
//     updatedAt: "2024-11-29T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x74eb0014772846713c29782c'),
//             quantity: 1,
//             price: 16654
//         },
//         {
//             productId: ObjectId('0x60fc71bbe103273c0ad17c45'),
//             quantity: 5,
//             price: 29717
//         },
//         {
//             productId: ObjectId('0xa9adbed7e91df7020d748189'),
//             quantity: 6,
//             price: 11532
//         }
//     ],
//     totalAmount: 234431,
//     status: 'completed',
//     createdAt: "2024-07-25T00:00:00Z",
//     updatedAt: "2024-08-12T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xf8bd1ce72bba4be3462100f7'),
//             quantity: 4,
//             price: 45086
//         },
//         {
//             productId: ObjectId('0x5eca806cc7d158d79386c2b0'),
//             quantity: 4,
//             price: 27147
//         }
//     ],
//     totalAmount: 288932,
//     status: 'completed',
//     createdAt: "2024-05-07T00:00:00Z",
//     updatedAt: "2024-05-29T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xfd4df8f42608668634a3d4b0'),
//             quantity: 4,
//             price: 5834
//         },
//         {
//             productId: ObjectId('0xdac27bf15ef1c3bdb40cad77'),
//             quantity: 2,
//             price: 26282
//         },
//         {
//             productId: ObjectId('0xcec7f7576bd54647b2f8ca8e'),
//             quantity: 6,
//             price: 14803
//         }
//     ],
//     totalAmount: 164718,
//     status: 'completed',
//     createdAt: "2024-04-07T00:00:00Z",
//     updatedAt: "2024-04-25T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x2c6466da0948619a16a8f633'),
//             quantity: 5,
//             price: 46143
//         },
//         {
//             productId: ObjectId('0x3d1f70e89e8e42b5be6c33c3'),
//             quantity: 7,
//             price: 15149
//         },
//         {
//             productId: ObjectId('0x2618282d16ec2831bcf7db77'),
//             quantity: 8,
//             price: 48792
//         }
//     ],
//     totalAmount: 727094,
//     status: 'completed',
//     createdAt: "2024-04-18T00:00:00Z",
//     updatedAt: "2024-04-24T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x7d2db9cece23721b5305782b'),
//             quantity: 7,
//             price: 27889
//         },
//         {
//             productId: ObjectId('0x6a4c4d655324e5de11532594'),
//             quantity: 6,
//             price: 47244
//         },
//         {
//             productId: ObjectId('0x3f05203cdced65927e215760'),
//             quantity: 10,
//             price: 21913
//         }
//     ],
//     totalAmount: 697817,
//     status: 'completed',
//     createdAt: "2024-09-21T00:00:00Z",
//     updatedAt: "2024-10-15T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xa6e2c3495213581c699734c6'),
//             quantity: 4,
//             price: 39098
//         },
//         {
//             productId: ObjectId('0x2df16c89e38f5d34c4fa3f23'),
//             quantity: 2,
//             price: 49147
//         },
//         {
//             productId: ObjectId('0x542c2955602d4df6e4dbd142'),
//             quantity: 6,
//             price: 22031
//         }
//     ],
//     totalAmount: 386872,
//     status: 'completed',
//     createdAt: "2024-11-26T00:00:00Z",
//     updatedAt: "2024-12-20T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x4f53341d312c3b51dd567a8e'),
//             quantity: 3,
//             price: 13559
//         }
//     ],
//     totalAmount: 40677,
//     status: 'completed',
//     createdAt: "2024-06-05T00:00:00Z",
//     updatedAt: "2024-06-10T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x8547fc1e796d46df6f8b0a3a'),
//             quantity: 6,
//             price: 23455
//         },
//         {
//             productId: ObjectId('0x4afdd09e6745e0c89596a443'),
//             quantity: 1,
//             price: 32810
//         }
//     ],
//     totalAmount: 173540,
//     status: 'completed',
//     createdAt: "2024-07-21T00:00:00Z",
//     updatedAt: "2024-08-16T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x9f6e59a7a7c0be5050581b44'),
//             quantity: 9,
//             price: 28985
//         },
//         {
//             productId: ObjectId('0xa5836585b3ad76359980d482'),
//             quantity: 5,
//             price: 42168
//         },
//         {
//             productId: ObjectId('0x22d8ea57d28d9ca98fbde6e1'),
//             quantity: 5,
//             price: 28830
//         }
//     ],
//     totalAmount: 615855,
//     status: 'completed',
//     createdAt: "2024-09-30T00:00:00Z",
//     updatedAt: "2024-10-16T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x84570ccc89f5ba4ac1e1900a'),
//             quantity: 5,
//             price: 19547
//         },
//         {
//             productId: ObjectId('0x5c120b502792b472bf381de1'),
//             quantity: 2,
//             price: 35783
//         }
//     ],
//     totalAmount: 169301,
//     status: 'completed',
//     createdAt: "2024-12-16T00:00:00Z",
//     updatedAt: "2025-01-12T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x43d96d717e19c1f18455230c'),
//             quantity: 10,
//             price: 2432
//         },
//         {
//             productId: ObjectId('0x2490a06469d430dcf3e8a8af'),
//             quantity: 3,
//             price: 10456
//         },
//         {
//             productId: ObjectId('0xb21f45f1fdc20a9fbb8f6a36'),
//             quantity: 3,
//             price: 42042
//         }
//     ],
//     totalAmount: 181814,
//     status: 'completed',
//     createdAt: "2024-09-06T00:00:00Z",
//     updatedAt: "2024-10-03T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xec3f6c678609e7d56c9e6c0b'),
//             quantity: 2,
//             price: 34630
//         },
//         {
//             productId: ObjectId('0xf34ee6639d131e878ef9d1b6'),
//             quantity: 9,
//             price: 43842
//         },
//         {
//             productId: ObjectId('0x410b7f1821efd292b3118231'),
//             quantity: 5,
//             price: 9918
//         }
//     ],
//     totalAmount: 513428,
//     status: 'completed',
//     createdAt: "2024-07-03T00:00:00Z",
//     updatedAt: "2024-07-05T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x4cc5a3465875b3a7b4c8924a'),
//             quantity: 1,
//             price: 1586
//         }
//     ],
//     totalAmount: 1586,
//     status: 'completed',
//     createdAt: "2024-07-30T00:00:00Z",
//     updatedAt: "2024-08-24T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xaa09c3ec43668c9639f158ab'),
//             quantity: 7,
//             price: 40964
//         },
//         {
//             productId: ObjectId('0xdabab814f85d04a7f2ba4fb3'),
//             quantity: 1,
//             price: 33155
//         }
//     ],
//     totalAmount: 319903,
//     status: 'completed',
//     createdAt: "2024-05-25T00:00:00Z",
//     updatedAt: "2024-05-27T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x94b3a44c6fc3487d733165f3'),
//             quantity: 7,
//             price: 26232
//         }
//     ],
//     totalAmount: 183624,
//     status: 'completed',
//     createdAt: "2024-12-19T00:00:00Z",
//     updatedAt: "2025-01-07T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xffd0d756b3ea6d74a5e8b47a'),
//             quantity: 8,
//             price: 47652
//         }
//     ],
//     totalAmount: 381216,
//     status: 'completed',
//     createdAt: "2024-02-09T00:00:00Z",
//     updatedAt: "2024-03-04T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xd13d0af9f968b0129a3df551'),
//             quantity: 5,
//             price: 4787
//         }
//     ],
//     totalAmount: 23935,
//     status: 'completed',
//     createdAt: "2024-04-27T00:00:00Z",
//     updatedAt: "2024-05-09T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xe3a0bed1438c977dd3fec401'),
//             quantity: 4,
//             price: 20690
//         },
//         {
//             productId: ObjectId('0x705b2bcf77d97921411f5649'),
//             quantity: 6,
//             price: 18310
//         }
//     ],
//     totalAmount: 192620,
//     status: 'completed',
//     createdAt: "2024-09-10T00:00:00Z",
//     updatedAt: "2024-09-14T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x45a8e669e3b55c447c28df5c'),
//             quantity: 7,
//             price: 39628
//         },
//         {
//             productId: ObjectId('0xcefcaf973606813c8a124e31'),
//             quantity: 1,
//             price: 49294
//         },
//         {
//             productId: ObjectId('0x7b3fca5251127521a515dd9f'),
//             quantity: 3,
//             price: 18965
//         }
//     ],
//     totalAmount: 383585,
//     status: 'completed',
//     createdAt: "2024-10-29T00:00:00Z",
//     updatedAt: "2024-11-24T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xc0123216c77a9f8f346c0ef3'),
//             quantity: 2,
//             price: 15376
//         },
//         {
//             productId: ObjectId('0xe751bacc83dc1777583e53e4'),
//             quantity: 3,
//             price: 1739
//         }
//     ],
//     totalAmount: 35969,
//     status: 'completed',
//     createdAt: "2024-04-13T00:00:00Z",
//     updatedAt: "2024-04-18T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xf3d0f1389c1ee613c20a86e2'),
//             quantity: 3,
//             price: 37752
//         },
//         {
//             productId: ObjectId('0xd6b3034b3a6a84a6f63ba8b4'),
//             quantity: 4,
//             price: 10021
//         },
//         {
//             productId: ObjectId('0x8652ff0e0037390111237022'),
//             quantity: 3,
//             price: 35604
//         }
//     ],
//     totalAmount: 260152,
//     status: 'completed',
//     createdAt: "2024-01-01T00:00:00Z",
//     updatedAt: "2024-01-18T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x3f58b459e9a9d9c6e4517985'),
//             quantity: 2,
//             price: 21711
//         },
//         {
//             productId: ObjectId('0x5687db34160589eccece37a7'),
//             quantity: 1,
//             price: 20893
//         }
//     ],
//     totalAmount: 64315,
//     status: 'completed',
//     createdAt: "2024-10-31T00:00:00Z",
//     updatedAt: "2024-11-23T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xdeac48c057f4401299cee9b4'),
//             quantity: 1,
//             price: 17612
//         },
//         {
//             productId: ObjectId('0x7cbf6808c4e0373b0f0ed1a4'),
//             quantity: 9,
//             price: 31090
//         },
//         {
//             productId: ObjectId('0x35856cf779fa87a5046d666a'),
//             quantity: 5,
//             price: 39651
//         }
//     ],
//     totalAmount: 495677,
//     status: 'completed',
//     createdAt: "2024-07-08T00:00:00Z",
//     updatedAt: "2024-07-16T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xf1d11cbb27a5eed4f4780e48'),
//             quantity: 3,
//             price: 33843
//         },
//         {
//             productId: ObjectId('0xa9ba530b8b05a90e46755757'),
//             quantity: 6,
//             price: 41173
//         },
//         {
//             productId: ObjectId('0x5fa144c4f7d8dc5d0e89774d'),
//             quantity: 8,
//             price: 13233
//         }
//     ],
//     totalAmount: 454431,
//     status: 'completed',
//     createdAt: "2024-05-13T00:00:00Z",
//     updatedAt: "2024-06-10T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x891cc254ad25877d3bde1f18'),
//             quantity: 10,
//             price: 35253
//         }
//     ],
//     totalAmount: 352530,
//     status: 'completed',
//     createdAt: "2024-12-05T00:00:00Z",
//     updatedAt: "2024-12-10T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x9b148cf8803c590930c9a91c'),
//             quantity: 10,
//             price: 31331
//         }
//     ],
//     totalAmount: 313310,
//     status: 'completed',
//     createdAt: "2024-08-30T00:00:00Z",
//     updatedAt: "2024-09-27T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x6b8cfca56c29faf9b7d9e0eb'),
//             quantity: 1,
//             price: 36606
//         }
//     ],
//     totalAmount: 36606,
//     status: 'completed',
//     createdAt: "2024-08-05T00:00:00Z",
//     updatedAt: "2024-08-20T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xd47e71891e995382a2c92820'),
//             quantity: 5,
//             price: 19390
//         },
//         {
//             productId: ObjectId('0x665e478081d9e754bf48a1ab'),
//             quantity: 8,
//             price: 8877
//         }
//     ],
//     totalAmount: 167966,
//     status: 'completed',
//     createdAt: "2024-04-06T00:00:00Z",
//     updatedAt: "2024-04-12T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xee1fe8c86e797d7a40fea097'),
//             quantity: 8,
//             price: 43999
//         },
//         {
//             productId: ObjectId('0x92a03d033176e726249a2261'),
//             quantity: 6,
//             price: 33870
//         }
//     ],
//     totalAmount: 555212,
//     status: 'completed',
//     createdAt: "2024-01-17T00:00:00Z",
//     updatedAt: "2024-01-30T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0xa1a6a8142685d6d22d3b0fb8'),
//             quantity: 7,
//             price: 5062
//         },
//         {
//             productId: ObjectId('0xf156b2b221154c396d95adaa'),
//             quantity: 2,
//             price: 12573
//         },
//         {
//             productId: ObjectId('0xda3ca8a59765c313e619cb6c'),
//             quantity: 6,
//             price: 8922
//         }
//     ],
//     totalAmount: 114112,
//     status: 'completed',
//     createdAt: "2024-12-04T00:00:00Z",
//     updatedAt: "2024-12-07T00:00:00Z"
// },
// {
//     userId: ObjectId('677c1371ee194dc8f05e739c'),
//     items: [
//         {
//             productId: ObjectId('0x264a32c65fa31dfc7b7b6205'),
//             quantity: 1,
//             price: 39985
//         },
//         {
//             productId: ObjectId('0x653a04d13ce664ce1bb595c2'),
//             quantity: 6,
//             price: 32398
//         },
//         {
//             productId: ObjectId('0xc2cc071c658ad25e4e39d2f7'),
//             quantity: 2,
//             price: 41761
//         }
//     ],
//     totalAmount: 317895,
//     status: 'completed',
//     createdAt: "2024-10-31T00:00:00Z",
//     updatedAt: "2024-11-22T00:00:00Z"
// },
// {
//   userId: ObjectId('677c1371ee194dc8f05e739c'),
//   items: [
//       {
//           productId: ObjectId('0xdef63147afc5d2e58b9d9796'),
//           quantity: 10,
//           price: 27234
//       },
//       {
//           productId: ObjectId('0x6a46a2fae53535cd3724fbf6'),
//           quantity: 8,
//           price: 34910
//       }
//   ],
//   totalAmount: 551620,
//   status: 'completed',
//   createdAt: new Date(),
//   updatedAt: new Date()
// },
// {
//   userId: ObjectId('677c1371ee194dc8f05e739c'),
//   items: [
//       {
//           productId: ObjectId('0x90a9ff937379d8f4fa94e523'),
//           quantity: 8,
//           price: 27723
//       },
//       {
//           productId: ObjectId('0xe45fdd6dae5be837e0f9a4b9'),
//           quantity: 2,
//           price: 14874
//       }
//   ],
//   totalAmount: 251532,
//   status: 'completed',
//   createdAt: new Date(),
//   updatedAt: new Date()
// },
// {
//   userId: ObjectId('677c1371ee194dc8f05e739c'),
//   items: [
//       {
//           productId: ObjectId('0xd2b3adde5f67e66b099782b1'),
//           quantity: 1,
//           price: 6783
//       }
//   ],
//   totalAmount: 6783,
//   status: 'completed',
//   createdAt: new Date(),
//   updatedAt: new Date()
// },
// {
//   userId: ObjectId('677c1371ee194dc8f05e739c'),
//   items: [
//       {
//           productId: ObjectId('0x73d073063fcb104f1db9e49b'),
//           quantity: 4,
//           price: 41800
//       },
//       {
//           productId: ObjectId('0x16b99c976caaa8ee1b7ffa0e'),
//           quantity: 2,
//           price: 24571
//       },
//       {
//           productId: ObjectId('0x4a63d505c96921a79cfb774b'),
//           quantity: 4,
//           price: 21006
//       }
//   ],
//   totalAmount: 300366,
//   status: 'completed',
//   createdAt: new Date(),
//   updatedAt: new Date()
// },
// {
//   userId: ObjectId('677c1371ee194dc8f05e739c'),
//   items: [
//       {
//           productId: ObjectId('0x65d8d3b98bb7c8ad12cb8d47'),
//           quantity: 3,
//           price: 30824
//       },
//       {
//           productId: ObjectId('0x3cf4d8143f342b25a72b38bf'),
//           quantity: 6,
//           price: 5489
//       }
//   ],
//   totalAmount: 125406,
//   status: 'completed',
//   createdAt: new Date(),
//   updatedAt: new Date()
// },
// {
//   userId: ObjectId('677c1371ee194dc8f05e739c'),
//   items: [
//       {
//           productId: ObjectId('0xc2007fa39d317ac221e9a20d'),
//           quantity: 7,
//           price: 36312
//       },
//       {
//           productId: ObjectId('0x8ee0a09592a6108527c03501'),
//           quantity: 10,
//           price: 28873
//       }
//   ],
//   totalAmount: 542914,
//   status: 'completed',
//   createdAt: new Date(),
//   updatedAt: new Date()
// },
// {
//   userId: ObjectId('677c1371ee194dc8f05e739c'),
//   items: [
//       {
//           productId: ObjectId('0xa39a32c253aa98877efb1b98'),
//           quantity: 9,
//           price: 42755
//       },
//       {
//           productId: ObjectId('0x49474ee651b502d9b644a10f'),
//           quantity: 5,
//           price: 21306
//       },
//       {
//           productId: ObjectId('0xf3278ce0a4054c4e741f60f3'),
//           quantity: 1,
//           price: 33874
//       }
//   ],
//   totalAmount: 525199,
//   status: 'completed',
//   createdAt: new Date(),
//   updatedAt: new Date()
// },
// {
//   userId: ObjectId('677c1371ee194dc8f05e739c'),
//   items: [
//       {
//           productId: ObjectId('0x2ac11efb02ff4a1b48076d9c'),
//           quantity: 9,
//           price: 34294
//       },
//       {
//           productId: ObjectId('0x31781074445bc432998ac80c'),
//           quantity: 4,
//           price: 39329
//       },
//       {
//           productId: ObjectId('0xcd97b06ca94fd9a55cac81d4'),
//           quantity: 9,
//           price: 33336
//       }
//   ],
//   totalAmount: 765986,
//   status: 'completed',
//   createdAt: new Date(),
//   updatedAt: new Date()
// },
// {
//   userId: ObjectId('677c1371ee194dc8f05e739c'),
//   items: [
//       {
//           productId: ObjectId('0x4fd40e54a8a0cfece1c41e52'),
//           quantity: 7,
//           price: 44833
//       },
//       {
//           productId: ObjectId('0x36d0a0613fcb33195eb63412'),
//           quantity: 3,
//           price: 27562
//       }
//   ],
//   totalAmount: 396517,
//   status: 'completed',
//   createdAt: new Date(),
//   updatedAt: new Date()
// },
// {
//   userId: ObjectId('677c1371ee194dc8f05e739c'),
//   items: [
//       {
//           productId: ObjectId('0x82eecda5aaec5c893353e1b6'),
//           quantity: 1,
//           price: 24007
//       }
//   ],
//   totalAmount: 24007,
//   status: 'completed',
//   createdAt: new Date(),
//   updatedAt: new Date()
// },
// {
//   userId: ObjectId('677c1371ee194dc8f05e739c'),
//   items: [
//       {
//           productId: ObjectId('0x6f345e127e9524b48a0a738e'),
//           quantity: 3,
//           price: 49957
//       }
//   ],
//   totalAmount: 149871,
//   status: 'completed',
//   createdAt: new Date(),
//   updatedAt: new Date()
// },
// {
//   userId: ObjectId('677c1371ee194dc8f05e739c'),
//   items: [
//       {
//           productId: ObjectId('0xe1512436a4ba8c319681b8a2'),
//           quantity: 5,
//           price: 18548
//       }
//   ],
//   totalAmount: 92740,
//   status: 'completed',
//   createdAt: new Date(),
//   updatedAt: new Date()
// },
// {
//   userId: ObjectId('677c1371ee194dc8f05e739c'),
//   items: [
//       {
//           productId: ObjectId('0x7cd6fbca61364e85505ef167'),
//           quantity: 4,
//           price: 35019
//       },
//       {
//           productId: ObjectId('0xd12caaa24a9af3b1ae6d5573'),
//           quantity: 9,
//           price: 20753
//       },
//       {
//           productId: ObjectId('0x61b486fa13236a562092bcee'),
//           quantity: 2,
//           price: 42833
//       }
//   ],
//   totalAmount: 412519,
//   status: 'completed',
//   createdAt: new Date(),
//   updatedAt: new Date()
// },
// {
//   userId: ObjectId('677c1371ee194dc8f05e739c'),
//   items: [
//       {
//           productId: ObjectId('0x47f7d5acfde4a922733891eb'),
//           quantity: 4,
//           price: 47092
//       }
//   ],
//   totalAmount: 188368,
//   status: 'completed',
//   createdAt: new Date(),
//   updatedAt: new Date()
// },
// {
//   userId: ObjectId('677c1371ee194dc8f05e739c'),
//   items: [
//       {
//           productId: ObjectId('0x64503712707edd385538be38'),
//           quantity: 2,
//           price: 32318
//       }
//   ],
//   totalAmount: 64636,
//   status: 'completed',
//   createdAt: "2025-01-09T00:00:00Z",
//   updatedAt: "2025-01-21T00:00:00Z"
// },
// {
//   userId: ObjectId('677c1371ee194dc8f05e739c'),
//   items: [
//       {
//           productId: ObjectId('0xf2ef1f03694fcdd30f671b60'),
//           quantity: 6,
//           price: 42959
//       }
//   ],
//   totalAmount: 257754,
//   status: 'completed',
//   createdAt: new Date(),
//   updatedAt: new Date()
// },
// {
//   userId: ObjectId('677c1371ee194dc8f05e739c'),
//   items: [
//       {
//           productId: ObjectId('0x4a61cea5c81d03849fcff9ab'),
//           quantity: 10,
//           price: 36249
//       },
//       {
//           productId: ObjectId('0xf5a6250b03bbbf1012290a51'),
//           quantity: 10,
//           price: 16055
//       },
//       {
//           productId: ObjectId('0x2b46a12a29a6d77fd27d0b3b'),
//           quantity: 6,
//           price: 11464
//       }
//   ],
//   totalAmount: 591824,
//   status: 'completed',
//   createdAt: new Date(),
//   updatedAt: new Date()
// },
// {
//   userId: ObjectId('677c1371ee194dc8f05e739c'),
//   items: [
//       {
//           productId: ObjectId('0x3a1d1085825acbb8bbfe4602'),
//           quantity: 8,
//           price: 35398
//       },
//       {
//           productId: ObjectId('0xa628977a0515302d048d46ca'),
//           quantity: 3,
//           price: 32662
//       },
//       {
//           productId: ObjectId('0xeb1677c0dc45bc196eabb201'),
//           quantity: 8,
//           price: 43657
//       }
//   ],
//   totalAmount: 730426,
//   status: 'completed',
//   createdAt: new Date(),
//   updatedAt: new Date()
// },
]);
