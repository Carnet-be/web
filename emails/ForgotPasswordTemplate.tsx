import {
    Body,
    Container,
    Column,
    Head,
    Html,
    Img,
    Link,
    Preview,
    Row,
    Section,
    Text,
} from "@react-email/components";
import * as React from "react";

interface ResetPasswordEmailProps {
    username?: string;
    updatedDate?: Date;
}

const imgLogo = 'https://okeyo.ma/wp-content/uploads/2023/12/cropped-iconsblog-2.png';
// const iconeLogo = 'https://okeyo.ma/wp-content/uploads/2023/12/2ZXzoDbcLSrNASXVQyvQQOTPTX4.svg';
export const ResetPasswordEmail = ({
    username,
    updatedDate,
}: ResetPasswordEmailProps) => {
    const formattedDate = new Intl.DateTimeFormat("en", {
        dateStyle: "medium",
        timeStyle: "medium",
    }).format(updatedDate);

    return (
        <Html>
            <Head />
            <Preview>You updated the password for your OKEYO account</Preview>
            <Body style={main}>
                <Container style={container}>
                    <Section style={logo}>
                        <Img width={114} src={imgLogo} alt="OKEYO" />
                    </Section>
                    <Section style={content}>
                        <Text style={paragraph}>Hi {username},</Text>
                        <Text style={paragraph}>
                            You updated the password for your OKEYO account on {formattedDate}. If this was you, then no further action is required.
                        </Text>
                        <Text style={paragraph}>
                            However, if you did NOT perform this password change, please{" "}
                            <Link href="https://okeyo.ma/reset-password" style={link}>
                                reset your account password
                            </Link>{" "}
                            immediately.
                        </Text>
                        <Text style={paragraph}>
                            Remember to use a password that is both strong and unique to your OKEYO account. To learn more about how to create a strong and unique password,{" "}
                            <Link href="https://okeyo.ma/strong-password-tips" style={link}>
                                click here.
                            </Link>
                        </Text>
                        <Text style={paragraph}>
                            Still have questions? Please contact{" "}
                            <Link href="https://okeyo.ma/support" style={link}>
                                OKEYO Support
                            </Link>.
                        </Text>
                        <Text style={paragraph}>
                            Thanks,
                            <br />
                            The OKEYO Support Team
                        </Text>
                    </Section>
                </Container>

                <Section style={footer}>
                    {/* <Row>
                        <Column align="right" style={{ width: "50%", paddingRight: "8px" }}>
                            <Img src={imgLogo} alt="OKEYO" />
                        </Column>
                        <Column align="left" style={{ width: "50%", paddingLeft: "8px" }}>
                            <Img src={imgLogo} alt="OKEYO" />
                        </Column>
                    </Row> */}
                    <Row>
                        <Text style={{ textAlign: "center", color: "#706a7b" }}>
                            © 2024 OKEYO.MA, All Rights Reserved <br />
                            Your Company Address, City, Morocco
                        </Text>
                    </Row>
                </Section>
            </Body>
        </Html>
    );
};

ResetPasswordEmail.PreviewProps = {
    username: "alanturing",
    updatedDate: new Date("June 23, 2022 4:06:00 pm UTC"),
} as ResetPasswordEmailProps;

export default ResetPasswordEmail;

const fontFamily = "HelveticaNeue,Helvetica,Arial,sans-serif";

const main = {
    backgroundColor: "#efeef1",
    fontFamily,
};

const paragraph = {
    lineHeight: 1.5,
    fontSize: 14,
};

const container = {
    maxWidth: "580px",
    margin: "30px auto",
    backgroundColor: "#ffffff",
};

const footer = {
    maxWidth: "580px",
    margin: "0 auto",
};

const content = {
    padding: "5px 20px 10px 20px",
};

const logo = {
    display: "flex",
    justifyContent: "center",
    alingItems: "center",
    padding: 30,
    backgroundColor: "#000",
};

const sectionsBorders = {
    width: "100%",
    display: "flex",
};

const sectionBorder = {
    borderBottom: "1px solid rgb(238,238,238)",
    width: "249px",
};

const sectionCenter = {
    borderBottom: "1px solid rgb(145,71,255)",
    width: "102px",
};

const link = {
    textDecoration: "underline",
};