// {
//     "userIndication": 0,
//     "indicateds": [
//       {
//         "userIndicated": 0
//       }
//     ]
//   }


export interface CreateIndication{
    userIndication: number;
    indicateds: {
        userIndicated: number;
    }[]
}