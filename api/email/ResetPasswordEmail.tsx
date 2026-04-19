import {
    Body,
    Container,
    Head,
    Heading,
    Html,
    Img,
    Link,
    Section,
    Text,
    Tailwind,
    Button
  } from "@react-email/components";
  import * as React from "react";

  interface ResetPasswordEmailProps{
    name: string,
    secretCode: string
  }

  export const ResetPasswordEmail = (props: ResetPasswordEmailProps) => {
    return (
    <Tailwind>
        <Html>
        <Head />
        <Body className="bg-black" style={{fontFamily: "monospace"}}>
        <Container className="flex flex-col text-white">
            <Img src="/static/logo.png" className="w-[15%]"/>
            <Text className="text-xl">Reset Your Password</Text>
            <Text>Hi {props.name ? props.name:"Tigran"},</Text>
            <Text>Someone recently requested a password change for your Dropbox account. If this was you, you can set a new password by entering this secret code on the website:</Text>
            <Text className="text-3xl font-bold">{props.secretCode ? props.secretCode:"5w6f8q6"}</Text>
            <Text>If you don't want to change your password or didn't request this, just ignore and delete this message.</Text>
            <Text>To keep your account secure, please don't forward this email to anyone</Text>
            <Text>Have a Good Night!</Text>
        </Container>
        </Body>
    </Html>
    </Tailwind>
    )
  }

  export default ResetPasswordEmail;