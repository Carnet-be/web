import {
    Body,
    Button,
    Container,
    Head,
    // Heading,
    // Hr,
    Html,
    Img,
    Link,
    Preview,
    Section,
    Text,
} from "@react-email/components";
import * as React from "react";

interface LoginCodeEmailProps {
    validationCode?: string;
}

const imgLogo = 'https://okeyo.ma/wp-content/uploads/2023/12/cropped-iconsblog-2.png';

export const LoginCodeEmail = ({
    validationCode,
}: LoginCodeEmailProps) => (
    <Html>
        <Head />
        <Preview>Your OKEYO.MA Account is Confirmed!</Preview>
        <Body style={main}>
            <Container style={container}>
                <Section style={logo}>
                    <Img width={170} height={50} src={imgLogo} alt="OKEYO" />
                </Section>
                <Section style={content}>
                    <Text style={paragraph}>
                        Your OKEYO.MA account has been successfully confirmed! We’re excited to see what you have to offer and help you grow your business on our platform.
                    </Text>
                    <Text style={paragraph}>
                        If you have any questions or need support, feel free to{" "}
                        <Link href="https://okeyo.ma/support" style={link}>
                            contact us
                        </Link>. We’re here to help you every step of the way.
                    </Text>
                    <Text style={paragraph}>
                        Best regards,
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

LoginCodeEmail.PreviewProps = {
    validationCode: "tt226-5398x",
} as LoginCodeEmailProps;

export default LoginCodeEmail;

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

const link = {
    textDecoration: "underline",
};

const footer = {
    maxWidth: "580px",
    margin: "0 auto",
};