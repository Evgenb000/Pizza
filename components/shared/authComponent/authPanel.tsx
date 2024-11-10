import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { ContentBlock } from "../common/contentBlock";
import { AuthLog } from "./authLog";
import { AuthReg } from "./authReg";
import {
  authenticationFormSchemaLogin,
  authenticationFormSchemaRegister,
  TAuthenticationFormSchemaLogin,
  TAuthenticationFormSchemaRegister,
} from "@/shared/constants/checoutFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const AuthPanel = () => {
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
    <ContentBlock>
      <Tabs defaultValue="login" className="w-[360px]">
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
    </ContentBlock>
  );
};
