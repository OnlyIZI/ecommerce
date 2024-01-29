import { BadRequest } from "exceptions/badRequest";
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
  async updateUser(name: string, email: string, password: string) {
    const user = await prisma.user.update({
      where: {
        email,
      },
      data: {
        name,
        password,
      },
    });

    return user;
  }
  // Delete User
  async deleteUser(id: string) {
    const user = await prisma.user.delete({ where: { id } });

    if (!user) {
      throw new BadRequest("User not exist.");
    }

    return user;
  }
}

export default new userRepository();
