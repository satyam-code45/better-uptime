import axios from "axios";
import { describe, expect, it, test } from "bun:test";
import { BACKEND_URL } from "./config";

const USER_NAME = Math.random().toString();

describe("Signup endpoints", () => {
  it("Isn't able to sign up if body is incorrect", async () => {
    try {
      await axios.post(`${BACKEND_URL}/user/sign-up`, {
        email: USER_NAME,
        password: "password",
      });
      expect(false, "Control should not reach here");
    } catch (error) {
    //   console.log(error);
    }
  });

  it("Is able to sign up if body is correct", async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/user/sign-up`, {
        email: `${USER_NAME}random@gmail.com`,
        password: "password",
        name: USER_NAME,
      });
      expect(res.status).toBe(200);
      expect(res.data.id).toBeDefined();
    } catch (error) {
    //   console.log(error);
    }
  });
});

describe("Signin endpoints", () => {
  it("Isn't able to sign in if body is incorrect", async () => {
    try {
      await axios.post(`${BACKEND_URL}/user/sign-in`, {
        email: USER_NAME,
        password: "password",
      });
      expect(false, "Control should not reach here");
    } catch (error) {
    //   console.log(error);
    }
  });

  it("Is able to sign in if body is correct", async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/user/sign-in`, {
        email: `${USER_NAME}random@gmail.com`,
        password: "password",
      });
      expect(res.status).toBe(200);
      expect(res.data.jwt).toBeDefined();
    } catch (error) {
    //   console.log(error);
    }
  });
});
