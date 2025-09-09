import axios from "axios";
import { BACKEND_URL } from "./config";
import { password } from "bun";


const USER_NAME = Math.random().toString();

export async function createUser(): Promise<{id: string, jwt: string}> {
    const res = await axios.post(`${BACKEND_URL}/user/sign-up`, {
        name: USER_NAME,
        password: "1223455",
        email: `${USER_NAME}@gmail.com`
    })

    const signin =await axios.post(`${BACKEND_URL}/user/sign-in`, {
        password: "1223455",
        email: `${USER_NAME}@gmail.com`
    })

    return {
        id: res.data.id,
        jwt: signin.data.jwt
    }

}