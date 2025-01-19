import { User } from "../types/auth";
import dummyUsers from "../../public/api/user.json";

const LOCAL_STORAGE_KEY = "users";

export const initializeDummyDataUser = () => {
  const users = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!users) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(dummyUsers));
  }
};

export const getUsers = () => {
  const users = localStorage.getItem(LOCAL_STORAGE_KEY);
  return users ? JSON.parse(users) : [];
};

export const saveUsers = (users: User) => {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users));
};

export const createUser = (user: User) => {
  const users = getUsers();
  user.id = Date.now().toString();
  users.push(user);
  saveUsers(users);
};

export const loginUser = (email: string, password: string): User | null => {
  const users = getUsers();
  const user = users.find(
    (user: User) => user.email === email && user.password === password
  );
  return user || null;
};
