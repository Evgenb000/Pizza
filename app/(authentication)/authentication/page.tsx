import { AuthLog } from "@/components/shared/authLog";
import { AuthReg } from "@/components/shared/authReg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

export default function Authentication() {
  return (
    <Tabs
      defaultValue="account"
      className="w-[400px] bg-white rounded-md shadow-md p-6"
    >
      <TabsList className="w-full border shadow-md">
        <TabsTrigger value="Login" className="w-full">
          Login
        </TabsTrigger>
        <TabsTrigger value="Register" className="w-full">
          Register
        </TabsTrigger>
      </TabsList>

      <TabsContent value="Login">
        <AuthLog className="flex flex-col gap-2" />
      </TabsContent>

      <TabsContent value="Register">
        <AuthReg className="flex flex-col gap-2" />
      </TabsContent>
    </Tabs>
  );
}
