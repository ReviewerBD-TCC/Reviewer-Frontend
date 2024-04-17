import React from "react"

export interface TableUser{
    guid: number
    nameCheckbox: string
    
}

export const TableUser:React.FC = () =>{
    return(
        <div id="tableUser" className="w-auto h-72 max-h-72 bg-boschWhite overflow-y-auto">
            <table className="w-full justify-start flex flex-col border-collapse">
                <thead className="w-full bg-boschWhite h-9 flex items-center p-6 border-b-[1.5px] border-boschBlack">
                    <th>Nomes</th>
                </thead>
                <tbody className="w-full h-auto bg-red-200 overflow-y-auto">
                    <tr className="border-b border-slate-300 w-full h-12 flex flex-row items-center justify-between bg-boschWhite p-3 hover:bg-boschLightGray">
                        <td className="w-[3%] h-full flex justify-center items-center"><input type="checkbox" className="w-4 h-4 bg-gray-200 " name="checkbox" id="" /></td>
                        <td className="w-[90%]">Juliana Brito</td>
                        <td className="w-[5%]"><div className="w-8 h-8 bg-teal-200 rounded-full"></div></td>
                    </tr>

                    <tr className="border-b border-slate-300 w-full h-12 flex flex-row items-center justify-between bg-boschWhite p-3 hover:bg-boschLightGray">
                        <td className="w-[3%] h-full flex justify-center items-center"><input type="checkbox" className="w-4 h-4 bg-gray-200 " name="checkbox" id="" /></td>
                        <td className="w-[90%]">Juliana Brito</td>
                        <td className="w-[5%]"><div className="w-8 h-8 bg-teal-200 rounded-full"></div></td>
                    </tr>

                    <tr className="border-b border-slate-300 w-full h-12 flex flex-row items-center justify-between bg-boschWhite p-3 hover:bg-boschLightGray">
                        <td className="w-[3%] h-full flex justify-center items-center"><input type="checkbox" className="w-4 h-4 bg-gray-200 " name="checkbox" id="" /></td>
                        <td className="w-[90%]">Juliana Brito</td>
                        <td className="w-[5%]"><div className="w-8 h-8 bg-teal-200 rounded-full"></div></td>
                    </tr>

                    <tr className="border-b border-slate-300 w-full h-12 flex flex-row items-center justify-between bg-boschWhite p-3 hover:bg-boschLightGray">
                        <td className="w-[3%] h-full flex justify-center items-center"><input type="checkbox" className="w-4 h-4 bg-gray-200 " name="checkbox" id="" /></td>
                        <td className="w-[90%]">Juliana Brito</td>
                        <td className="w-[5%]"><div className="w-8 h-8 bg-teal-200 rounded-full"></div></td>
                    </tr>

                    <tr className="border-b border-slate-300 w-full h-12 flex flex-row items-center justify-between bg-boschWhite p-3 hover:bg-boschLightGray">
                        <td className="w-[3%] h-full flex justify-center items-center"><input type="checkbox" className="w-4 h-4 bg-gray-200 " name="checkbox" id="" /></td>
                        <td className="w-[90%]">Juliana Brito</td>
                        <td className="w-[5%]"><div className="w-8 h-8 bg-teal-200 rounded-full"></div></td>
                    </tr>

                    <tr className="border-b border-slate-300 w-full h-12 flex flex-row items-center justify-between bg-boschWhite p-3 hover:bg-boschLightGray">
                        <td className="w-[3%] h-full flex justify-center items-center"><input type="checkbox" className="w-4 h-4 bg-gray-200 " name="checkbox" id="" /></td>
                        <td className="w-[90%]">Juliana Brito</td>
                        <td className="w-[5%]"><div className="w-8 h-8 bg-teal-200 rounded-full"></div></td>
                    </tr>

                    <tr className="border-b border-slate-300 w-full h-12 flex flex-row items-center justify-between bg-boschWhite p-3 hover:bg-boschLightGray">
                        <td className="w-[3%] h-full flex justify-center items-center"><input type="checkbox" className="w-4 h-4 bg-gray-200 " name="checkbox" id="" /></td>
                        <td className="w-[90%]">Juliana Brito</td>
                        <td className="w-[5%]"><div className="w-8 h-8 bg-teal-200 rounded-full"></div></td>
                    </tr>

                    <tr className="border-b border-slate-300 w-full h-12 flex flex-row items-center justify-between bg-boschWhite p-3 hover:bg-boschLightGray">
                        <td className="w-[3%] h-full flex justify-center items-center"><input type="checkbox" className="w-4 h-4 bg-gray-200 " name="checkbox" id="" /></td>
                        <td className="w-[90%]">Juliana Brito</td>
                        <td className="w-[5%]"><div className="w-8 h-8 bg-teal-200 rounded-full"></div></td>
                    </tr>

                    <tr className="border-b border-slate-300 w-full h-12 flex flex-row items-center justify-between bg-boschWhite p-3 hover:bg-boschLightGray">
                        <td className="w-[3%] h-full flex justify-center items-center"><input type="checkbox" className="w-4 h-4 bg-gray-200 " name="checkbox" id="" /></td>
                        <td className="w-[90%]">Juliana Brito</td>
                        <td className="w-[5%]"><div className="w-8 h-8 bg-teal-200 rounded-full"></div></td>
                    </tr>

                    <tr className="border-b border-slate-300 w-full h-12 flex flex-row items-center justify-between bg-boschWhite p-3 hover:bg-boschLightGray">
                        <td className="w-[3%] h-full flex justify-center items-center"><input type="checkbox" className="w-4 h-4 bg-gray-200 " name="checkbox" id="" /></td>
                        <td className="w-[90%]">Juliana Brito</td>
                        <td className="w-[5%]"><div className="w-8 h-8 bg-teal-200 rounded-full"></div></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}