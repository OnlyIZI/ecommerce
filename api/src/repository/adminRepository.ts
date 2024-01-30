import { prisma } from "lib/Prisma";

class adminRepository {
  async adminRegister(name: string, email: string, password: string) {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        role: "admin",
      },
    });

    return user;
  }
}

export default new adminRepository();
