export interface UserIndicatedInterface{
    userIndicated: string,
}

export interface CreateIndication{
    userIndication?: string;
    indicateds: UserIndicatedInterface[];
}