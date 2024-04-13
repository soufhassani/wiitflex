import User from "../entities/User";
import { eraseCookie, getCookie, setCookie } from "../utils/cookies";
import idProvider from "../utils/idProvider";
import tokenProvider from "../utils/tokenProvider";
import useAuthQuery from "../store/authStore";

type SignupUser = {
  fullName: string;
  username: string;
  email: string;
  password: string;
  token?: string;
};
type LoginUser = {
  email: string;
  password: string;
};

type Res = {
  message: string;
  status: number;
};

const signup = async (user: SignupUser) => {
  const res = await addUser(user);
  return res;
};

const login = async (user: LoginUser) => {
  const res = await checkToLogin(user);
  return res;
};

const _setIsLoggedin = (setIsLogged: (isLogged: boolean) => void) => {
  const lastUser = getCookie("lg-u");
  if (!lastUser) {
    eraseCookie("lg-u");
    setIsLogged(false);
    return false;
  }

  setIsLogged(true);
  return true;
};

const setLogout = (setIsLogged: (isLogged: boolean) => void) => {
  eraseCookie("lg-u");
  setIsLogged(false);
};
const getUser = () => {
  const lastUser = getCookie("lg-u");
  if (!lastUser) return;
  const users = getCookie("users");
  if (!users) return;
  const _users: User[] = JSON.parse(users);
  const _lastUser: User = JSON.parse(lastUser);

  const user: User | undefined = _users.find(
    (u) => u.email === _lastUser.email
  );
  if (!user) return;

  return user;
};

const getUsers = () => {
  const users = getCookie("users");
  if (!users) return;
  const _users: User[] = JSON.parse(users);
  return _users;
};

const useAuth = () => {
  const setIsLoggedin = useAuthQuery((s) => s.setIsLoggedin);
  const logout = () => {
    setLogout(setIsLoggedin);
  };
  const isLoggedin = () => {
    _setIsLoggedin(setIsLoggedin);
  };
  return { signup, login, logout, isLoggedin, getUser, getUsers };
};
export default useAuth;

async function addUser({ fullName, username, email, password }: SignupUser) {
  const prev = getCookie("users");
  const id = idProvider();
  const userData = {
    id,
    fullName,
    username,
    email,
    password,
    watchList: [],
  };

  console.log("add user prev", prev);
  if (!prev) {
    console.log("after add use prev is null", prev);
    const data = [userData];
    const res = await fakeCreation(data);
    return res;
  }

  const prevUsers: User[] = JSON.parse(prev);
  for (const user of prevUsers) {
    const prevUsername = user.username;
    if (username === prevUsername) {
      const error: Error = {
        message: "Username already exist",
        name: "username",
      };
      const res = await fakeCreation(error, true);
      return res;
    }
    const prevEmail = user.email;
    if (email === prevEmail) {
      const error: Error = { message: "Email already exist", name: "email" };
      const res = await fakeCreation(error, true);
      return res;
    }
  }

  prevUsers.push(userData);
  const res = await fakeCreation(prevUsers);
  return res;
}

function createAccount(data: SignupUser | SignupUser[]) {
  setCookie({ name: "users", value: JSON.stringify(data), days: 30 });
  const prev = getCookie("users");
  console.log(prev);

  return { message: "Sign-up successfully", status: 201 };
}

async function checkToLogin(user: LoginUser) {
  const prev = getCookie("users");
  if (!prev) {
    const error: Error = { message: "Email doesn't exist", name: "email" };
    const res = await fakeCreation(error, true);
    return res;
  }
  const prevUsers: User[] = JSON.parse(prev);
  const userFound = prevUsers.find((u) => u.email === user.email);
  if (!userFound) {
    const error: Error = { message: "Email doesn't exist", name: "email" };
    const res = await fakeCreation(error, true);
    return res;
  }
  if (userFound.password !== user.password) {
    const error: Error = { message: "Password incorrect", name: "password" };
    const res = await fakeCreation(error, true);
    return res;
  }

  const userArr = [user];
  const res = await fakeLogin(userArr);

  return res;
}

function loginUser(user: LoginUser) {
  const token = tokenProvider();
  const userData = { ...user, token: token };
  setCookie({ name: "lg-u", value: JSON.stringify(userData), days: 30 });
  return { message: "Logged-in successfully", status: 200 };
}

function fakeCreation(data: SignupUser[] | Error, isRejected?: boolean) {
  console.log(data);
  return new Promise<Res | Error>((resolve, reject) => {
    setTimeout(() => {
      if (isRejected) reject(data);

      if (Array.isArray(data)) resolve(createAccount(data));
    }, 2000);
  });
}
function fakeLogin(data: LoginUser[] | Error, isRejected?: boolean) {
  return new Promise<Res | Error>((resolve, reject) => {
    setTimeout(() => {
      if (isRejected) reject(data);

      if (Array.isArray(data)) {
        const [user] = data;
        resolve(loginUser(user));
      }
    }, 2000);
  });
}
