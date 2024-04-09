export interface Email {
    body: string;
    bcc: (string | undefined)[];
    cc: (string | undefined)[];
    to: string;
    subject: string;
}