"use client";

import { db } from "@/configs/db";
import { usersTable } from "@/configs/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import  { useEffect } from "react";

function Provider({children}) {


  const { user } = useUser();

  useEffect(() => {

    user && checkNewUser();


  }, [user]);

  const checkNewUser = async () => {
    const res = await db
      .select()
      .from(usersTable)
      .where(eq(user?.primaryEmailAddress?.emailAddress, usersTable.email));
    console.log(res);
    if (res.length == 0) {
      const newuser = await db
        .insert(usersTable)
        .values({
          email: user?.primaryEmailAddress.emailAddress,
          name: user?.fullName,
        })
        .returning({ id: usersTable.id });
      console.log(newuser);
    }
  };
  return <div>{children}</div>
}



export default Provider;
