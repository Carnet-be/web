import {
    Body,
    Button,
    Container,
    Head,
    Hr,
    Html,
    Img,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import * as React from "react";

interface WelcomeEmailProps {
    userFirstname: string;
}

const imgLogo = 'https://okeyo.ma/wp-content/uploads/2023/12/cropped-iconsblog-2.png';

export const WelcomeEmail = ({
    userFirstname,
}: WelcomeEmailProps) => (
    <Html>
        <Head />
        <Preview>Welcome to OKEYO.MA - Your Ultimate Online Selling Experience in Morocco!</Preview>
        <Body style={main}>
            <Container style={container}>
                <Section style={logo}>
                    <Img width={170} height={50} src={imgLogo} alt="OKEYO" />
                </Section>
                <Section style={content}>
                    <Text style={paragraph}>Hello {userFirstname},</Text>
                    <Text style={paragraph}>
                        Welcome to <strong>OKEYO.MA</strong>! We are thrilled to have you join our community of sellers. Discover a new way of online selling in Morocco, where you can showcase your products through exclusive videos and reach a wider audience.
                    </Text>
                    <Text style={paragraph}>
                        Start expressing yourself by creating engaging content, connecting directly with your customers, and expanding your business like never before!
                    </Text>
                    <Section style={btnContainer}>
                        <Button style={button} href="https://okeyo.ma">
                            Start Your Journey
                        </Button>
                    </Section>
                    <Text style={paragraph}>
                        Looking forward to seeing you succeed on <strong>OKEYO.MA</strong>!
                        <br />
                        The OKEYO Team
                    </Text>
                </Section>
            </Container>
            <Section style={footer}>
                <Text style={{ textAlign: "center", color: "#706a7b" }}>
                    © 2024 OKEYO.MA, All Rights Reserved <br />
                    Your Company Address, City, Morocco
                </Text>
            </Section>
        </Body>
    </Html>
);

WelcomeEmail.PreviewProps = {
    userFirstname: "Alan",
} as WelcomeEmailProps;

export default WelcomeEmail;
const main = {
    backgroundColor: "#efeef1",
    fontFamily: "HelveticaNeue,Helvetica,Arial,sans-serif",
};

const container = {
    maxWidth: "580px",
    margin: "30px auto",
    backgroundColor: "#ffffff",
};

const logo = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: "#000",
};

const content = {
    padding: "5px 20px 10px 20px",
};

const paragraph = {
    lineHeight: 1.5,
    fontSize: 14,
};

const btnContainer: React.CSSProperties = {
    textAlign: 'center',
};

const button: React.CSSProperties = {
    backgroundColor: "#f97316",
    borderRadius: "3px",
    color: "#fff",
    fontSize: "16px",
    textDecoration: "none",
    textAlign: "center",
    display: "block",
    padding: "12px",
};

const footer = {
    maxWidth: "580px",
    margin: "0 auto",
};