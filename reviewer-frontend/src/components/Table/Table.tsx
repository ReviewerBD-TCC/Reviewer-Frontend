import React, { useEffect, useState } from "react"
import { UserService } from "services/UserService";
import { useAuth } from "context/AuthProvider";

export interface TableUser{
    guid: number
    nameCheckbox: string
}

export const TableUser:React.FC = () =>{
    const token = useAuth()
    
    const dataUser = UserService.getUsers(token.accessToken)

    useEffect(()=>{
        dataUser.then(function(response){
            const user = response.map((user)=>{
               return user
            })
            setUsers(user)
        })
    }, [])



    const [users, setUsers] = useState<string[]>([])
   
    return(
        <div id="tableUser" className="w-auto h-62 max-h-62 bg-boschWhite overflow-y-auto p-1">
            <table className="w-full justify-start flex flex-col border-collapse">
                <thead className="w-full bg-boschWhite h-9 flex items-center p-3 border-b-[1.5px] border-boschBlack">
                    <th>Selected</th>
                    <th>Nomes</th>
                </thead>
                <tbody className="w-full h-auto bg-red-200 overflow-y-auto">
                {
                    users?.map((user:any) => (
                    <tr className="border-b border-slate-300 w-full h-12 flex flex-row items-center justify-between bg-boschWhite p-3 hover:bg-boschLightGray">
                        <td className="w-[4%] h-full flex justify-center items-center"><input type="checkbox" className="w-4 h-4 bg-gray-200 " name="checkbox" id="" /></td>
                        <td className="w-[90%] truncate">{user.name}</td>
                        <td className="w-[5%]"><div className="w-8 h-8 bg-teal-200 rounded-full"></div></td>
                    </tr>
                    ))
                } 
                </tbody>
            </table>
        </div>
    )
}