export interface UserIndicatedInterface{
    userIndicated: number,
}

export interface CreateIndication{
    userIndication?: number;
    indicateds: UserIndicatedInterface[];
}