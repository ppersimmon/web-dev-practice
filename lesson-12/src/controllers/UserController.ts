import {
  JsonController,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from "routing-controllers";
import { readFile, writeFile } from "fs/promises";
import path from "path";
import { CreateUserDto, UpdateUserDto } from "../dto/UserDto";

const usersFilePath = path.join(__dirname, "../../files/users.json");

@JsonController()
export class UserController {
  private async getUsersData(): Promise<any[]> {
    try {
      const data = await readFile(usersFilePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  private async saveUsersData(users: any[]): Promise<void> {
    await writeFile(usersFilePath, JSON.stringify(users, null, 2), "utf-8");
  }

  @Get("/")
  getAuthor() {
    return { author: "User123" };
  }

  @Get("/users")
  async getAllUsers() {
    return await this.getUsersData();
  }

  @Post("/users")
  async createUser(@Body() userData: CreateUserDto) {
    const users = await this.getUsersData();
    const newUser = { id: Date.now().toString(), ...userData };

    users.push(newUser);
    await this.saveUsersData(users);

    return newUser;
  }

  @Patch("/users/:id")
  async updateUser(@Param("id") id: string, @Body() updates: UpdateUserDto) {
    const users = await this.getUsersData();
    const userIndex = users.findIndex((u) => u.id === id);

    if (userIndex === -1) {
      return { message: "User not found" };
    }

    users[userIndex] = { ...users[userIndex], ...updates };
    await this.saveUsersData(users);

    return users[userIndex];
  }

  @Delete("/users/:id")
  async deleteUser(@Param("id") id: string) {
    const users = await this.getUsersData();
    const filteredUsers = users.filter((u) => u.id !== id);

    await this.saveUsersData(filteredUsers);
    return { success: true };
  }
}
