import express from "express";
import type { Request, Response } from "express";
import { readFile, writeFile } from "fs/promises";
import path from "path";

const app = express();
app.use(express.json());

const usersFilePath = path.join(__dirname, "../files/users.json");

async function getUsersData(): Promise<any[]> {
  try {
    const data = await readFile(usersFilePath, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function saveUsersData(users: any[]): Promise<void> {
  await writeFile(usersFilePath, JSON.stringify(users, null, 2), "utf-8");
}

app.get("/", (req: Request, res: Response) => {
  res.json({ author: "User123" });
});

app.get("/users", async (req: Request, res: Response) => {
  const users = await getUsersData();
  res.json(users);
});

app.post("/users", async (req: Request, res: Response) => {
  const { user, email } = req.body;
  const users = await getUsersData();

  const newUser = {
    id: Date.now().toString(),
    user,
    email,
  };

  users.push(newUser);
  await saveUsersData(users);

  res.status(201).json(newUser);
});

app.patch("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const updates = req.body;
  const users = await getUsersData();

  const userIndex = users.findIndex((u) => u.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ message: "User not found" });
  }

  users[userIndex] = { ...users[userIndex], ...updates };
  await saveUsersData(users);

  res.json(users[userIndex]);
});

app.delete("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const users = await getUsersData();

  const filteredUsers = users.filter((u) => u.id !== id);

  if (users.length === filteredUsers.length) {
    return res.status(404).json({ message: "User not found" });
  }

  await saveUsersData(filteredUsers);
  res.status(204).send();
});

app.listen(3000, () => {
  console.log("server is running on http://localhost:3000");
});
