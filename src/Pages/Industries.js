import React, { useState, useEffect } from "react";
import axios from "axios";
import config from "../Config";
import AdminLayout from "../Layouts/admin.layout";
import { FaTrash } from "react-icons/fa";
import CreateIndustry from "../Components/Create_Industries";
import EditIndustry from "../Components/Edit_Industries";

const Industries = () => {
  const [industries, setIndustries] = useState([]);
  const [successfull, setSuccessfull] = useState(false);
  const [failure, setFailure] = useState(false);

  const clientData = async () => {
    await axios
      .get(`${config.API_URL}/branch`)
      .then((res) => {
        const response = res.data.data.rows;
        setIndustries(response);
        console.log("data recieved",response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    clientData();
  }, []);

  //delete Industry
  const onDelete = async (id) => {
    const DELETE = window.confirm("Are you sure to delete ?" + id);
    if (DELETE) {
      setTimeout(async () => {
        await axios
          .delete(`${config.API_URL}/branch/${id}`)
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
      setPage(parseInt(industries.length / 10) + 1);
    } else {
      setInitial(initial - 10);
      setFinal(final - 10);
      setPage(page - 1);
    }
  };

  const next = () => {
    if (page >= parseInt(industries.length / 10) + 1) {
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
    <>
      <AdminLayout>
        <div className="w-full">
          <h3 className="text-2xl font-semibold">Industries</h3>

          <CreateIndustry />
          {/* Table */}

          <div className=" mt-8 relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 bg-gray-50">
                <tr className="text-base">
                  <th scope="col" className="px-6 py-3"></th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {industries.slice(initial, final).map((element, index) => (
                  <tr className="bg-white border-b " key={index}>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap"
                    ></th>
                    <td className="px-6 py-4">{element.BranchName}</td>
                    <td className="flex px-6 py-4 items-center">
                      <EditIndustry id={element.Id} />
                      <button>
                        <FaTrash
                          className="text-red-500 text-base cursor-pointer"
                          onClick={() => onDelete(element.Id)}
                        />{" "}
                      </button>
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
    </>
  );
};

export default Industries;
