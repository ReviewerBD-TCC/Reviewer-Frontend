import React, { useContext, useEffect, useState } from "react"
import { UserService } from "services/UserService";
import { useAuth } from "context/AuthProvider";
import { mailSender } from "services/EmailServices";
import { Email } from "interfaces/Emaill";
import { useQuery } from "react-query";
import { SparkSearchBar, SparkTextfield } from "@bosch-web-dds/spark-ui-react";
import { User } from "interfaces/CreateUser";

export interface TableUser{
    guid: number
    nameCheckbox: string
}

export const TableUser:React.FC = () =>{
    const token = useAuth()
    
    const dataUser = UserService.getUsers(token.accessToken)

    useEffect(()=>{
        dataUser.then(function(response){
            const user = response.map((user:any)=>{
               return user
            })
            setUsers(user)
        })
    }, [])

    const [users, setUsers] = useState<User[]>([])
    const {selectedUsers, selectUser, user} = useAuth()
    const [search, setSearch] = useState('')

    const checkedUsers = (value: any, checked:boolean)=>{
        if (checked == true){
           const user:any = users.find((each:User)=>each.id == value)
            console.log(value)
            selectUser(user)
            
        }else{
            selectedUsers.findIndex((e, i)=>{
               if(e == value){
                selectedUsers.splice(i, 1)
               }
              
            })
        }
    };

    const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()));

    users.findIndex((each:any, index)=>{
        if(each.name == user.name){
            users.splice(index, 1)
        }
    })


    return(
        <div className="">
        <div className="flex w-full max-w-full">
            <SparkTextfield type="search" placeholder="Digite o nome do colaborador." value={search} onClick={(e)=>setSearch(e.target.value)} />
        </div>
        <div id="tableUser" className="w-auto h-40 max-h-62 bg-boschWhite overflow-y-auto p-1">
            <table className="w-full justify-start flex flex-col border-collapse">
                <thead className="w-full bg-boschWhite h-9 flex items-center p-3 border-b-[1.5px] border-boschBlack">
                    <th>Nomes</th>
                </thead>
                <tbody className="w-full h-auto bg-red-200 overflow-y-auto">
                {
                    filteredUsers?.map((user:any) => (
                    <tr className="border-b border-slate-300 w-full h-12 flex flex-row items-center justify-between bg-boschWhite p-3 hover:bg-boschLightGray">
                        <td className="w-[4%] h-full flex justify-center items-center"><input type="checkbox" className="w-4 h-4 bg-gray-200 " value={user.id} name="checkbox" id="inputId" onClick={(e)=>{
                            
                            checkedUsers(e.target.value, e.target.checked)
                            console.log(selectedUsers)
                            }}/></td>
                        <td className="w-[90%] truncate">{user.name}</td>
                        {/* <td className="w-[5%]"><div className="w-8 h-8 bg-teal-200 rounded-full"></div></td> */}
                    </tr>
                    ))
                } 
                </tbody>
            </table>
        </div>
        </div>

    )
}