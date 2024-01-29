import { prisma } from "lib/Prisma";

class userRepository {
  // Register User
  async register(name: string, email: string, password: string) {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });

    return user;
  }

  // Get User by id
  async getUserById(id: string) {
    return await prisma.user.findUnique({ where: { id } });
  }
  // Get user by email
  async getUserByEmail(email: string) {
    return await prisma.user.findUnique({ where: { email } });
  }
  // Get All User
  async getAllUser() {
    return await prisma.user.findMany();
  }
  // Update user
  // Delete User
}

export default new userRepository();
