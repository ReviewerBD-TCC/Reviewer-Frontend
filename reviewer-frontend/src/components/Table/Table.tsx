import React, { useEffect, useState } from "react";
import { UserService } from "services/UserService";
import { SparkSearchBar } from "@bosch-web-dds/spark-ui-react";
import { User } from "interfaces/UserInterfaces/CreateUser";
import { useAuth } from "context/AuthProvider";
import { useMsal } from "@azure/msal-react";

export const TableUser: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { selectedUsers, selectUser } = useAuth();
  const [search, setSearch] = useState("");

  const { instance } = useMsal()

  const account = instance.getActiveAccount();

  const dataUser = UserService.getUsers();

  useEffect(() => {
    dataUser.then(function (response) {
      const user = response.map((user: User) => {
        const each: User = {
          email: user.email,
          id: user.id,
          name: user.name.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
        };
        return each;
      });
      setUsers(user);
    });
  }, []);

  const checkedUsers = (value: User, checked: boolean) => {
    if (checked == true) {
      const user = users.find((each: User) => each.id == value.id);
      if (user) {
        selectUser(user);
      }
    } else {
      const index = selectedUsers.findIndex(
        (user: User) => user.id == value.id
      );
      selectedUsers.splice(index, 1);
    }
  };

  const filteredUsers = users.filter((user: User) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  users.findIndex((each: User, index: number) => {
    if (each.name == account?.name) {
      users.splice(index, 1);
    }
  });

  return (
    <div className="w-full">
      {/* <div className="flex w-full max-w-full"> */}
        <SparkSearchBar
          inputs='{"placeholder":"Pesquise sua indicação"}'
          button-label="Search"
          whenSearch={(value: any) => setSearch(value)}
        ></SparkSearchBar>
      {/* </div> */}
      <div
        id="tableUser"
        className="w-auto h-40 max-h-62 bg-boschWhite overflow-y-auto p-1"
      >
        <table className="w-full justify-start flex flex-col border-collapse">
          <thead className="w-full bg-boschWhite h-9 flex items-center p-3 border-b-[1.5px] border-boschBlack">
            <th>Nomes</th>
          </thead>
          <tbody className="w-full h-auto bg-red-200 overflow-y-auto">
            {filteredUsers?.map((user: any) => (
              <tr className="border-b border-slate-300 w-full h-12 flex flex-row items-center justify-between bg-boschWhite p-3 hover:bg-boschLightGray">
                <td className="w-[4%] h-full flex justify-center items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 bg-gray-200 "
                    value={user.id}
                    name="checkbox"
                    id="inputId"
                    onClick={(e) => {
                      checkedUsers(e.target.value, e.target.checked);
                    }}
                  />
                </td>
                <td className="w-[90%] truncate">{user.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
