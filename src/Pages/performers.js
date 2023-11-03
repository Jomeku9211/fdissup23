import React, { useEffect, useState, useRef } from "react";
import config from "../Config";
import AdminLayout from "../Layouts/admin.layout";
import { FaTrash } from "react-icons/fa";
import CreatePerformers from "../Components/Create_Performers";
import EditPerformers from "../Components/Edit_performers";
import axios from "axios";
import ResetPassword from "../Components/reset_password";

const Performers = () => {
  const [newPerformer, setnewPerformer] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [successfull, setSuccessfull] = useState(false);
  const [failure, setFailure] = useState(false);
  const inputElement = useRef("");

  // get performers
  useEffect(async () => {
    const clientData = async () => {
      
      await axios
        .get(`http://18.192.51.153:4002/api/v1/dashboard/newPerformer`)
        .then((res) => {
          const response = res.data.data.rows;
          setnewPerformer(response);
          console.log("agaya data",response);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    clientData();
  }, []);


  //search handler
  const getSearchTerm = () => {
    searchHandler(inputElement.current.value);
  };

  console.log("performer" , newPerformer)
  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newPerformersList = newPerformer.filter((performer) => {
        // console.log(Object.values(performer));
        return Object.values(performer)
          .join("")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newPerformersList);
    } else {
      setSearchResults(newPerformer);
    }
  };

  //delete performers

  // delete customers
  const onDelete = async (id) => {
    const DELETE = window.confirm("Are you sure to delete ?" + id);
    if (DELETE) {
      setTimeout(async () => {
        await axios
          .delete(`http://18.192.51.153:4002/api/v1/dashboard/newPerformer/${id}`)
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
      setPage(parseInt(newPerformer.length / 10) + 1);
    } else {
      setInitial(initial - 10);
      setFinal(final - 10);
      setPage(page - 1);
    }
  };

  const next = () => {
    if (page >= parseInt(newPerformer.length / 10) + 1) {
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
        <h3 className="text-2xl font-semibold">Performers</h3>

        <CreatePerformers />

        <div className="lg:flex lg:items-center lg:gap-20 lg:w-full lg:p-4">
          {/* <div>
            <select
              id="small"
              className="block w-36 p-2 mb-6 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            >
              <option selected>select</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div> */}

          <div className="lg:w-full">
            <label
              for="small"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Active
            </label>
            <select
              id="small"
              className="block p-2 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            >
              <option selected>all</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="lg:w-full">
            <label
              for="small"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Auditor
            </label>
            <select
              id="small"
              className="block p-2 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            >
              <option selected>select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="lg:w-full">
            <label
              for="small"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Project Leader
            </label>
            <select
              id="small"
              className="block p-2 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            >
              <option selected>select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

          <div className="lg:w-full">
            <form>
              <label
                for="default-search"
                className="mb-2 text-sm font-medium text-gray-900 sr-only"
              >
                Search
              </label>
              <div className="relative">
                <input
                  type="search"
                  id="default-search"
                  className="block p-2 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                  value={searchTerm}
                  ref={inputElement}
                  onChange={getSearchTerm}
                  required
                />
                <button
                  type="submit"
                  className="text-white absolute right-0.5 bottom-0.5 bg-sky-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Table */}

        <div className=" mt-8 relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 bg-gray-50">
              <tr className="text-base">
                <th scope="col" className="px-6 py-3">
                  User name
                </th>
                <th scope="col" className="px-6 py-3">
                  First Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Last Name
                </th>
                <th scope="col" className="px-6 py-3">
                  E-mail address
                </th>
                <th scope="col" className="px-6 py-3">
                  Active
                </th>
                <th scope="col" className="px-6 py-3">
                  auditor
                </th>
                <th scope="col" className="px-6 py-3">
                  Project Leader
                </th>
                <th scope="col" className="px-6 py-3"></th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {searchTerm.length < 1
                ? newPerformer.slice(initial, final).map((element, index) => (
                    <tr className="bg-white border-b ">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap"
                        key={index}
                      >
                        {element.UserName}
                      </th>
                      <td className="px-6 py-4">{element.FirstName}</td>
                      <td className="px-6 py-4">{element.LastName}</td>
                      <td className="px-6 py-4">{element.Email}</td>
                      <td className="px-6 py-4">
                        {element.PerformerTypes_Id ? "Yes" : "No"}
                      </td>
                      <td className="px-6 py-4">
                        {element.Name == "Auditor" ? "Yes" : "No"}
                      </td>
                      <td className="px-6 py-4">
                        {element.Name == "Project Leader" ? "Yes" : "No"}
                      </td>
                      <td className="px-6 py-4">
                        <ResetPassword id={element.UserId} />
                      </td>
                      <td className="flex items-center px-6 py-4">
                      
                        <EditPerformers id={element.UserId} />
                        <FaTrash
                          className="text-red-500 text-base cursor-pointer"
                          onClick={() => onDelete(element.UserId)}
                        />{" "}
                      </td>
                    </tr>
                  ))
                : searchResults.map((element, index) => (
                    <tr className="bg-white border-b ">
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap"
                        key={index}
                      >
                        {element.UserName}
                      </th>
                      <td className="px-6 py-4">{element.FirstName}</td>
                      <td className="px-6 py-4">{element.LastName}</td>
                      <td className="px-6 py-4">{element.EmailAddress}</td>
                      <td className="px-6 py-4">
                        {element.PerformerTypes_Id ? "Yes" : "No"}
                      </td>
                      <td className="px-6 py-4">
                        {element.Name == "Auditor" ? "Yes" : "No"}
                      </td>
                      <td className="px-6 py-4">
                        {element.Name == "Project Leader" ? "Yes" : "No"}
                      </td>
                      <td className="px-6 py-4">
                        <ResetPassword id={element.UserId} />
                      </td>
                      <td className="flex items-center px-6 py-4">
                        <EditPerformers id={element.UserId} />
                        <FaTrash
                          className="text-red-500 text-base cursor-pointer"
                          onClick={() => onDelete(element.UserId)}
                        />{" "}
                      </td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>

        <div className=" flex gap-14 items-center justify-center mt-4">
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

export default Performers;
