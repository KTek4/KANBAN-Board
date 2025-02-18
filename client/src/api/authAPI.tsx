import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  try {
    const resp = await fetch("auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const loginResponse = await resp.json();

    // if there is an error in the response, throw an error. typically this is due to login info being incorrect, so we specify that the cause is likely that
    if (!resp.ok) {
      throw new Error(
        "Error in fetch response, is the users login information correct? Check network tab for more information"
      );
    }

    return loginResponse;
  } catch (err: any) {
    console.error("Error when attempting to authenticate user:", err);
    return Promise.reject("Is the users login information correct?");
  }
};

export { login };
