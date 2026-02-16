import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const loremWords = [
  "lorem",
  "ipsum",
  "dolor",
  "sit",
  "amet",
  "consectetur",
  "adipiscing",
  "elit",
  "sed",
  "do",
  "eiusmod",
  "tempor",
  "incididunt",
  "ut",
  "labore",
  "et",
  "dolore",
  "magna",
  "aliqua",
  "enim",
  "ad",
  "minim",
  "veniam",
  "quis",
  "nostrud",
  "exercitation",
  "ullamco",
  "laboris",
  "nisi",
  "aliquip",
  "ex",
  "ea",
  "commodo",
  "consequat",
  "duis",
  "aute",
  "irure",
  "in",
  "reprehenderit",
  "voluptate",
  "velit",
  "esse",
  "cillum",
  "fugiat",
  "nulla",
  "pariatur",
  "excepteur",
  "sint",
  "occaecat",
  "cupidatat",
  "non",
  "proident",
  "sunt",
  "culpa",
  "qui",
];

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateLoremIpsum(wordCount: number): string {
  const words: string[] = [];
  for (let i = 0; i < wordCount; i++) {
    words.push(loremWords[i]);
  }
  return words.join(" ");
}

function generatePostContent(): string {
  const wordCount = getRandomInt(8, 30);
  return generateLoremIpsum(wordCount);
}

async function main() {
  const users = await prisma.user.findMany();

  if (users.length === 0) {
    console.log("No users found. Please create users first.");
    return;
  }

  const postsPerUser = 15;
  const totalPosts = users.length * postsPerUser;

  console.log(`Creating ${totalPosts} posts for ${users.length} users...`);

  for (const user of users) {
    for (let i = 0; i < postsPerUser; i++) {
      await prisma.post.create({
        data: {
          content: generatePostContent(),
          userId: user.id,
        },
      });
    }
    console.log(`Created ${postsPerUser} posts for user: ${user.username}`);
  }

  console.log(`Successfully created ${totalPosts} posts!`);
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
