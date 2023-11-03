import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../Config";
import AdminLayout from "../Layouts/admin.layout";
import { FaTrash, FaEdit } from "react-icons/fa";
import CreateAdmin from "../Components/Create_Admin";
import EditAdmin from "../Components/Edit_Admin";
import ResetPassword from "../Components/reset_password";











const Admistrators = () => {
  const [admin, setAdmin] = useState([]);
  const [failure, setFailure] = useState(false);
  const [successfull, setSuccessfull] = useState(false);
  const [loading, setLoading] = useState(true);
  const [seacrhInput, setSeacrhInput] = useState("");



  useEffect(() => {
    const clientData = async () => {
      try {
        const response = await axios.get(`${config.API_URL}/SuperAdmin/Administrator/`);
        const responseData = response.data.data;
        setAdmin(responseData);
        console.log("admin data",responseData);
      } catch (error) {
        console.log(error);
        setFailure(true);
      } finally {
        setLoading(false);
      }
    };

    clientData();
  }, []);

  const onDelete = async (id) => {
    const DELETE = window.confirm("Are you sure to delete ?" + id);
    if (DELETE) {
      setTimeout(async () => {
        await axios
          .delete(`${config.API_URL}/SuperAdmin/Administrator/${id}`)
          .then((response) => {
            if (response) {
              console.log(response);
              setSuccessfull(true);
            }
          });
        setTimeout(() => {
          setSuccessfull(false);
        }, 3000);
      });
    } else {
      setFailure(true);
      setTimeout(() => {
        setFailure(false);
      }, 3000);
    }
  };

  // pagination

  let [initial, setInitial] = useState(0);
  let [final, setFinal] = useState(9);
  let [page, setPage] = useState(1);

  const previous = () => {
    if (page <= 1) {
      setInitial(initial - 10);
      setFinal(final - 10);
      setPage(parseInt(admin.length / 10) + 1);
    } else {
      setInitial(initial - 10);
      setFinal(final - 10);
      setPage(page - 1);
    }
  };

  const next = () => {
    if (page >= parseInt(admin.length / 10) + 1) {
      setInitial(0);
      setFinal(9);
      setPage(1);
    } else {
      setInitial(initial + 10);
      setFinal(final + 10);
      setPage(page + 1);
    }
  };

  return (
    <AdminLayout>
      <div className="w-full mt-4">
        <h3 className="text-2xl font-semibold">adminstrators</h3>

        

        <CreateAdmin />
        {/* Table */}

        <div className=" mt-8 relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 bg-gray-50">
              <tr className="text-base">
                <th scope="col" className="px-6 py-3">
                  User name
                </th>
                <th scope="col" className="px-6 py-3">
                  First name
                </th>
                <th scope="col" className="px-6 py-3">
                  Last name
                </th>
                <th scope="col" className="px-6 py-3">
                  E-mail address
                </th>
                <th scope="col" className="px-6 py-3">
                  Active
                </th>
                <th scope="col" className="px-6 py-3"></th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7" className="text-center">
                    <div className="text-center">
                      <svg
                        role="status"
                        className="inline w-8 h-8 mr-2 text-gray-200 animate-spin fill-blue-600"
                        viewBox="0 0 100 101"
                        fill="none"
                        // xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </div>
                  </td>
                </tr>
              ) : (
                admin.slice(initial, final).map((element, index) => (
                  <tr className="bg-white border-b " key={index}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap"
                    >
                      {element.UserName}
                    </th>
                    <td className="px-6 py-4">{element?.FirstName}</td>
                    <td className="px-6 py-4">{element?.LastName}</td>
                    <td className="px-6 py-4">{element?.Email}</td>
                    <td className="px-6 py-4"> Yes </td>
                    <td className="px-6 py-4">
                      <ResetPassword id={element?.UserId} />
                    </td>
                    <td className="flex px-6 py-4 items-center">
                      <EditAdmin id={element?.UserId} />
                      <button>
                        <FaTrash
                          className="text-red-500 text-base cursor-pointer"
                          onClick={() => onDelete(element.UserId)}
                        />{" "}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className=" flex gap-14 justify-center items-center mt-4">
          <button
            onClick={previous}
            className="text-white bg-sky-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Prev
          </button>
          <h1>Page {page} </h1>
          <button
            onClick={next}
            className="text-white bg-sky-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Next
          </button>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Admistrators;
