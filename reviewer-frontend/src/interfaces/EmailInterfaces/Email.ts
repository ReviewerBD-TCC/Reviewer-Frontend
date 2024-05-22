export interface Email {
    body: string;
    bcc: (string)[];
    to?: string;
    subject: string;
}