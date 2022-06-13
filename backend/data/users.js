import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Minjae Lee",
    email: "minjae@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Kimiko Kai",
    email: "kimiko@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
