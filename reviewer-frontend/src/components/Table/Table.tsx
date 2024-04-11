import React from "react"
import { SparkCheckboxGroup } from "@bosch-web-dds/spark-ui-react"

export interface TableUser{

}

export const TableUser:React.FC = () =>{
    return(
        <div id="tableUser" className="w-auto h-72 max-h-72 bg-boschWhite overflow-y-auto">
            <table className="w-full justify-start flex flex-col p-3">
                <thead className="w-full bg-boschWhite h-9 flex items-center p-3">
                    <th>Nomes</th>
                </thead>
                <tbody className="w-full h-auto bg-red-200">
                    <tr className="w-full h-12 flex flex-row items-center justify-between bg-boschWhite p-3 hover:bg-boschBlue hover:text-white">
                        <td className="w-[3%] h-full flex justify-center items-center"><input type="checkbox" name="" id="" /></td>
                        <td className="w-[90%]">Juliana Brito</td>
                        <td className="w-[5%]"><div className="w-8 h-8 bg-teal-200 rounded-full"></div></td>
                    </tr>
                    <tr className="w-full h-12 flex flex-row items-center justify-between bg-boschWhite p-3 hover:bg-boschBlue hover:text-white">
                        <td className="w-[3%] h-full flex justify-center items-center"><input type="checkbox" name="" id="" /></td>
                        <td className="w-[90%]">Juliana Brito</td>
                        <td className="w-[5%]"><div className="w-8 h-8 bg-teal-200 rounded-full"></div></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}