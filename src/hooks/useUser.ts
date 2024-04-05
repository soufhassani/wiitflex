import User from "../entities/User";
import { getCookie, setCookie } from "../utils/cookies";
import idProvider from "../utils/idProvider";

type SignupUser = {
    fullName: string;
    username: string;
    email: string;
    password: string;
    token?: string;
  };

  type Res = {
    message: string
    status: number
  }
  
  export type ResError = {
    message: string
    status: number
    input?:"username" | "email"
  }

  const storeUser = async ({ fullName, username, email, password }:SignupUser) => {
    const prev = getCookie("user");
    const id = idProvider()
    const userData = {
        id,
        fullName,
        username,
        email,
        password,
    };

    if (!prev) {
        const data = [userData]
        const res = await fakeCreation(data)
        return res
    }

    const prevUsers:User[] = JSON.parse(prev);
    for(const user of prevUsers){
        const prevUsername = user.username
        if(username === prevUsername) {
            const error:Error = {message: 'Username already exist', name:'username'}
            const res = await fakeCreation(error, true)
            return res
        }
        const prevEmail = user.email
        if(email === prevEmail){ 
            const error:Error = {message: 'Email already exist',name:"email"}
            const res = await fakeCreation(error, true)
            return res
        }
    }

    prevUsers.push(userData)
    const res = await fakeCreation(prevUsers)
    return res
  };

  function fakeCreation(data: SignupUser[] | Error, isRejected?:boolean) {
    return new Promise<Res| Error>((resolve, reject) => {
      setTimeout(() => {
        if(isRejected)
            reject(data);

        if(Array.isArray(data))
            resolve(createAccount(data))
        }, 2000);
    });
  }
  
  const createAccount = (data:SignupUser | SignupUser[]) => {
      setCookie({ name: "user", value: JSON.stringify(data), days: 30 });
      return {message:'Sign-up successfully', status: 201};
  }

const addUser = async (user:SignupUser) => {
    const res = await storeUser(user)
    return res
}



const useUser = () => {
return {addUser}
}
export default useUser