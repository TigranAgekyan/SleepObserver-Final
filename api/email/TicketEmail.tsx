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
    Button,
    Hr
} from "@react-email/components";
import * as React from "react";

interface TicketEmailInterface{
    name: string,
    from: string,
    message: string
}

export const TicketEmail = (props: TicketEmailInterface) => {
    return (
        <Tailwind>
            <Html>
                <Head/>
                <Body  className="bg-black" style={{fontFamily: "monospace"}}>
                    <Container className="flex flex-col text-white">
                        <Img src="/static/logo.png" className="w-[20%]"/>
                        <Text className="text-4xl">New Ticket Recieved!</Text>
                        <Text>Name: {props.name}</Text>
                        <Text>From: {props.from}</Text>
                        <Text className="text-xl font-semibold">Message:</Text>
                        <Text>{props.message}</Text>
                        <Hr/>
                        <Text>You can respond to this ticket through the Administrator panel on the website.</Text>
                    </Container>
                </Body>
            </Html>
        </Tailwind>
    )
}

export default TicketEmail;