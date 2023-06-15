export interface ISmtpAccount {
    attributes: {
        name: string;
        username: string;
        hostname: string;
        port: string | number;
    },
    id: string;
    type: string;
}