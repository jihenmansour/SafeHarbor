'use server'

import { ID } from "node-appwrite"
import { createAdminClient, createSessionClient } from "../appwrite"
import { cookies } from "next/headers"
import { parseStringify } from "../utils"

export const signIn = async ({email, password}: signInProps) => {
    try {
     const { account } = await createAdminClient();

     const session  = await account.
     createEmailPasswordSession(email, password)

     cookies().set("my-custom-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

     return parseStringify(session)

    } catch (error) {
        console.error('Error', error)
    }
}

export const signUp = async (userData: SignUpParams) => {

    const {email, password, firstName, lastName} = userData;
    try {
        const { account } = await createAdminClient();

        const newUserAccount = await account.create(ID.unique(), 
        email, 
        password, 
        `${firstName} ${lastName}`);
        const session = await account.
        createEmailPasswordSession(email, password);
      
        cookies().set("my-custom-session", session.secret, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });
      return parseStringify(newUserAccount);
    } catch (error) {
        console.log('Error', error)
    }
}



export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    const result = await account.get();
   console.log(result)
    return parseStringify(result);
  } catch (error) {
    console.log(error)
    return null;
  }
}
  
export const logoutAccount = async () => {
 try {
  const {account} = await createSessionClient()

  cookies().delete('my-custom-session');
 } catch (error) {
  return null
 }
}