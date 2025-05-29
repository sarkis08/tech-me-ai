"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";

export default function Home() {

  const {data: session} = authClient.useSession()

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    authClient.signUp.email({
      email,
      name,
      password
    })
    onError: () => {
      window.alert("Some went wrong!")
    }
    onSuccess: () => {
      window.alert("Success")
    }
  }

  if(session) {
    return (
      <div className="flex flex-col p-4 gap-y-4">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()}>
          Sign out
        </Button>
      </div>
    )
  }

  return <div className="p-4 flex flex-col gap-y-4">
    <input placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
    <input placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} />
    <input placeholder="Enter Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

    <Button onClick={onSubmit}>
      Create User
    </Button>
  </div>;
}
