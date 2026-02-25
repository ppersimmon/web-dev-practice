import {
  JsonController,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from "routing-controllers";
import { CreateUserDto, UpdateUserDto } from "../dto/UserDto";
import { AppDataSource } from "../ormconfig";
import { User } from "../entities/User";

@JsonController()
export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  @Get("/")
  getAuthor() {
    return { author: "User123" };
  }

  @Get("/users")
  async getAllUsers() {
    return await this.userRepository.find();
  }

  @Post("/users")
  async createUser(@Body() userData: CreateUserDto) {
    const newUser = this.userRepository.create(userData);
    await this.userRepository.save(newUser);
    return newUser;
  }

  @Patch("/users/:id")
  async updateUser(@Param("id") id: string, @Body() updates: UpdateUserDto) {
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      return { message: "User not found" };
    }

    this.userRepository.merge(user, updates);
    await this.userRepository.save(user);

    return user;
  }

  @Delete("/users/:id")
  async deleteUser(@Param("id") id: string) {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      return { message: "User not found" };
    }

    return { success: true };
  }
}
