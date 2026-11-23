import { headers } from "next/headers";
import { auth } from "../auth";
import { redirect } from "next/navigation";

const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(), // you need to pass the headers object.
  });
  return session;
};

const getToken = async () => {
  const session = await getSession();
  if(!session || !session.session?.token){
    redirect("/unauthorized");
  }
  const token = session?.session.token;
  return token;
}

export const authFetch = async(api:string)=>{
  const token = await getToken();
  const res = await fetch(api,{
    headers:{
      authorization: `Bearer ${token}`
    }
  });
  return res;
}

export const authDelete = async(api:string)=>{
  const token = await getToken();
  const res = await fetch(api,{
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  return res;
}

export const authPost = async(api:string, method:string ,data?: unknown)=>{
  const token = await getToken();
  const res = await fetch(api,{
    method:method,
    headers:{"Content-Type": "application/json",authorization: `Bearer ${token}`},
    body: data ? JSON.stringify(data) : null
  })
  return res;
}

export const requireRole = async (role: string) => {
  const session = await getSession();
  if(!session || session.user.role !== role){
    redirect("/unauthorized");
  }
  return session;
};
