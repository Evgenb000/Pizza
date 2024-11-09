"use client";

import { AuthLog } from "@/components/shared/authLog";
import { AuthReg } from "@/components/shared/authReg";
import { buttonVariants } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  authenticationFormSchemaLogin,
  authenticationFormSchemaRegister,
  TAuthenticationFormSchemaLogin,
  TAuthenticationFormSchemaRegister,
} from "@/shared/constants/checoutFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function Authentication() {
  const formLogin = useForm<TAuthenticationFormSchemaLogin>({
    resolver: zodResolver(authenticationFormSchemaLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const formRegister = useForm<TAuthenticationFormSchemaRegister>({
    resolver: zodResolver(authenticationFormSchemaRegister),
    defaultValues: {
      name: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmitLogin = (data: TAuthenticationFormSchemaLogin) => {
    console.log("TODO: Implement login", data);
  };

  const onSubmitRegister = (data: TAuthenticationFormSchemaRegister) => {
    console.log("TODO: Implement register", data);
  };

  return (
    <div className="flex flex-col gap-4">
      <Tabs
        defaultValue="login"
        className="w-[400px] bg-white rounded-md shadow-md p-6"
      >
        <TabsList className="w-full border shadow-md">
          <TabsTrigger value="login" className="w-full">
            Login
          </TabsTrigger>
          <TabsTrigger value="register" className="w-full">
            Register
          </TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <FormProvider {...formLogin}>
            <form onSubmit={formLogin.handleSubmit(onSubmitLogin)}>
              <AuthLog className="flex flex-col gap-2" />
            </form>
          </FormProvider>
        </TabsContent>

        <TabsContent value="register">
          <FormProvider {...formRegister}>
            <form onSubmit={formRegister.handleSubmit(onSubmitRegister)}>
              <AuthReg className="flex flex-col gap-2" />
            </form>
          </FormProvider>
        </TabsContent>
      </Tabs>

      <section className="w-[400px] bg-white rounded-md shadow-md p-6">
        <Link
          href="/"
          className={cn(buttonVariants({ variant: "default" }), "w-full")}
        >
          Go to Home
        </Link>
      </section>
    </div>
  );
}
