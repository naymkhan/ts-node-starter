import { PrismaClient } from "@prisma/client";

new PrismaClient()
  .$connect()
  .then(() => console.log("databse connected"))
  .catch((err: any) => {
    throw new Error(err);
  });

if (!process.env.JWT_PRIVATE_KEY) {
  throw new Error(`ENV variables JWT_PRIVATE_KEY is not found.`);
}

export default {};
