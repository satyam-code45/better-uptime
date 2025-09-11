import { describe, it, expect, beforeAll } from "bun:test";
import axios from "axios";
import { createUser } from "./testUtils";
import { BACKEND_URL } from "./config";

describe("Website gets created", () => {
  let token: string;

  beforeAll(async () => {
    const data = await createUser();
    token = data.jwt;
  });

  it("Website not created if url is not present", async () => {
    try {
      await axios.post(
        `${BACKEND_URL}/website`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      expect(false, "Website created when it should not.");
    } catch (error) {}
  });

  it("Website is created if url is  present", async () => {
    const response = await axios.post(
      `${BACKEND_URL}/website`,
      {
        url: "https://google.com",
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    expect(response.data.id).not.toBeNull;
  });

  it("Website is not created if header is not  present", async () => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/website`,
        {
          url: "https://google.com",
        },
        {}
      );
      expect(false, "Website should not be created if no auth header");
    } catch (e) {}
  });
});

describe("Can fetch websites", () => {
  let token1: string, userId1: string;
  let token2: string, userId2: string;

  beforeAll(async () => {
    const data1 = await createUser();
    token1 = data1.jwt;
    userId1 = data1.id;

    const data2 = await createUser();
    token2 = data2.jwt;
    userId2 = data2.id;
  });

  it("Is able to fetch a website that the user created", async () => {
    const websiteResponse = await axios.post(
      `${BACKEND_URL}/website`,
      {
        url: "https://google.com",
      },
      {
        headers: {
          Authorization: token1,
        },
      }
    );

    const getWebsiteResponse = await axios.get(
      `${BACKEND_URL}/status/${websiteResponse.data.id}`,
      {
        headers: {
          Authorization: token1,
        },
      }
    );
    console.log(getWebsiteResponse.data);
    
    expect(getWebsiteResponse.data.id).toBe(websiteResponse.data.id);
    expect(getWebsiteResponse.data.user_id).toBe(userId1);
  });

  it("Can't access website created by other user", async () => {
    const websiteResponse = await axios.post(
      `${BACKEND_URL}/website`,
      {
        url: "https://google.com",
      },
      {
        headers: {
          Authorization: token1,
        },
      }
    );

    try {
      await axios.get(
        `${BACKEND_URL}/status/${websiteResponse.data.id}`,
        {
          headers: {
            Authorization: token2,
          },
        }
      );
      expect(false, "Shouldn't be able to access website of another user");
    } catch (error) {}
  });
});
