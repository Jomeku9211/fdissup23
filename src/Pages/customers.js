import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import config from "../Config";
import AdminLayout from "../Layouts/admin.layout";
import { FaTrash, FaEdit } from "react-icons/fa";
import CreateCustomers from "../Components/Create_Customers";
import EditCustomers from "../Components/Edit_Customer";
import IndustryName from "../Components/IndustryName";
import ResetPassword from "../Components/reset_password";
const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [successfull, setSuccessfull] = useState(false);
  const [failure, setFailure] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const inputElement = useRef("");

  //get all customers
  // useEffect( () => {
  //   const clientData = async () => {
  //     await axios
  //       .get(`http://18.192.51.153:4002/api/v1/dashboard/userClient`)
  //       .then((res) => {
  //         const response = res.data.data;
  //         setCustomers(response);
  //         console.log(response)
  //       })
  //       .catch((error) => {
  //         console.log(error);
  //       });
  //   };
  //   clientData();
  // },[]);
  useEffect(() => {
    const clientData = async () => {
      try {
        const response = await axios.get("http://18.192.51.153:4002/api/v1/dashboard/userClient");
        setCustomers(response.data.data); // Assuming the customer data is in the 'data' property of the response
        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    clientData();
  }, []); 

  console.log("this is customer" , customers)
  

  // delete customers
  const onDelete = async (id) => {
    const DELETE = window.confirm("Are you sure to delete ?" + id);
    if (DELETE) {
      setTimeout(async () => {
        await axios
          .delete(`${config.API_URL}/userClient/${id}`)
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

  //search handler
  const getSearchTerm = () => {
    searchHandler(inputElement.current.value);
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newCustomersList = customers.filter((customer) => {
        // console.log(Object.values(performer));
        return Object.values(customer)
          .join("")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newCustomersList);
    } else {
      setSearchResults(customers);
    }
  };

  // pagination

  let [initial, setInitial] = useState(0);
  let [final, setFinal] = useState(10);
  let [page, setPage] = useState(1);

  const previous = () => {
    if (page <= 1) {
      setInitial(initial - 10);
      setFinal(final - 10);
      setPage(parseInt(customers.length / 10) + 1);
    } else {
      setInitial(initial - 10);
      setFinal(final - 10);
      setPage(page - 1);
    }
  };

  console.log(  "customers", customers)

  const next = () => {
    if (page >= parseInt(customers.length / 10) + 1) {
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
        <h3 className="text-2xl font-semibold">customers</h3>

        <CreateCustomers />

        {/* Filter */}

        <div className="lg:flex lg:items-center lg:gap-20 lg:w-full lg:p-4">
          <div className="lg:w-full">
            <label
              htmlFor="small"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Active
            </label>
            <select
              id="small"
              className="block p-2 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            >
              <option value="">all</option>
              <option value="yes">Yes</option>
              <option value="no">No</option>
            </select>
          </div>

          <div className="lg:w-full">
            <label
              htmlFor="small"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
            >
              Modules
            </label>
            <select
              id="small"
              className="block p-2 mb-6 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            >
              <option value="option">select</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>

          <div className="lg:w-full">
            <form>
              <label
                htmlFor="default-search"
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
                  className="text-white absolute right-0.5 bottom-0.5 bg-sky-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 "
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
                  Company
                </th>
                <th scope="col" className="px-6 py-3">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3">
                  Active
                </th>
                <th scope="col" className="px-6 py-3">
                  Industry
                </th>
                <th scope="col" className="px-6 py-3"></th>
                <th scope="col" className="px-6 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {searchTerm.length < 1
                ? customers.slice(initial, final).map((element, index) => (
                    <tr className="bg-white border-b " key={index}>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap"
                      >
                        {element.User.UserName}
                      </th>
                      
                      <td className="px-6 py-4">{element.CompanyName}</td>
                      <td className="px-6 py-4">{element.ContactPerson}</td>
                      <td className="px-6 py-4">no</td>
                      <td className="px-6 py-4"><IndustryName id={element.Branch_Id} /></td>
                      <td className="px-6 py-4">
                      <ResetPassword id={element?.Id} />
                      </td>
                      <td className="flex items-center px-6 py-4">
                        <EditCustomers id={element.Id} />
                        <FaTrash
                          className="text-red-500 text-base cursor-pointer"
                          onClick={() => onDelete(element.Id)}
                        />{" "}
                      </td>
                    </tr>
                  ))
                : searchResults.map((element, index) => (
                    <tr className="bg-white border-b " key={index}>
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap"
                      >
                        {element.UserName}
                      </th>
                      <td className="px-6 py-4">{element.CompanyName}</td>
                      <td className="px-6 py-4">{element.ContactPerson}</td>
                      <td className="px-6 py-4">no</td>
                      <td className="px-6 py-4">Cleaning Industry</td>
                      <td className="px-6 py-4">
                        
                      </td>
                      <td className="flex items-center px-6 py-4">
                        <EditCustomers id={element.Id} />
                        <FaTrash
                          className="text-red-500 text-base cursor-pointer"
                          onClick={() => onDelete(element.Id)}
                        />{" "}
                      </td>
                    </tr>
                  ))}
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

export default Customers;
