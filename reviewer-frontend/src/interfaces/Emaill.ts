export interface Email {
    body: string;
    bcc: (string)[];
    cc: (string)[];
    to: string;
    subject: string;
}