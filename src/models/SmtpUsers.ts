export interface SmtpUserModel {
    id: number;
    type: string;
    attributes: {
        hostname: string;
        name: string;
        port: string
        username: string;
    }
}