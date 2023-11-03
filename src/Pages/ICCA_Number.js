import React from "react";
import AdminLayout from "../Layouts/admin.layout";
import ResetPassword from "../Components/reset_password";
import img from "../images/img.png";
import LineChart from "../Components/LineChart";

const IccaNumber = () => {
  return (
    <AdminLayout>
      <div className="w-full mt-4">
        <div>
          <img src={img} className="w-full h-full" />
        </div>

        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <input
              type="text"
              id="first_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Organization"
              required
            />
          </div>
          <div>
            <input
              type="text"
              id="last_name"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Project"
              required
            />
          </div>
          <div>
            <input
              type="text"
              id="company"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Report Number"
              required
            />
          </div>
          <div>
            <input
              type="date"
              id="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Date"
              required
            />
          </div>
          <div>
            <input
              type="url"
              id="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Control Time"
              required
            />
          </div>
          <div>
            <input
              type="number"
              id="visitors"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Audit carried out by"
              required
            />
          </div>
          <div>
            <input
              type="text"
              id="website"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Amsterdam"
              required
            />
          </div>
          <div>
            <input
              type="text"
              id="visitors"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Present Client"
              required
            />
          </div>

          <div>
            <textarea
              id="message"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Your message..."
            ></textarea>
          </div>
          <div>
            <input type="file" />
          </div>
        </div>
        <div>
          <textarea
            id="message"
            rows="4"
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Your message..."
          ></textarea>
        </div>

        <div className="w-full border-1 border-gray-400 mt-4">
          Graphs
          <LineChart className="w-full" />
        </div>
        {/* </div>  */}
        <div className="w-full border-1 border-gray-400 mt-4 p-2">
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
                  {/* <th scope="col" className="px-6 py-3"></th> */}
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b ">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900  whitespace-nowrap"
                  >
                    Aastha
                  </th>
                  <td className="px-6 py-4"> Unnati</td>
                  <td className="px-6 py-4"> Ratnawat</td>
                  <td className="px-6 py-4">khfkeutkefksfjskfjsljflsjf</td>
                  <td className="px-6 py-4"> Yes </td>
                  <td className="px-6 py-4">
                    <ResetPassword />
                  </td>
                  {/* <td className="flex px-6 py-4 items-center">
              <EditAdmin />
              <button>
                <FaTrash className="text-red-500 text-base cursor-pointer" />{" "}
              </button>
            </td> */}
                </tr>
              </tbody>
            </table>
          </div>

          <p className="w-1/3 border-1 lg:font-medium border-gray-400 my-2 lg:text-base text-xs">
            LogBook Images
          </p>
          <div className="lg:flex lg:flex-row lg:justify-center lg:gap-20 w-full">
            <div className="border-1 border-sky-300 lg:h-96 lg:w-72 w-full h-96 lg:my-0 my-4">
              <p className="border-b-2 border-black  ">Photo</p>
            </div>
            <div className="border-1 border-sky-300 lg:h-96 lg:w-72 w-full h-96 lg:my-0 my-4">
              <p className="border-b-2 border-black  ">Photo</p>
            </div>
            <div className="border-1 border-sky-300 lg:h-96 lg:w-72 w-full h-96 lg:my-0 my-4">
              <p className="border-b-2 border-black  ">Photo</p>
            </div>
          </div>
        </div>

        <div className="w-full border-1 border-gray-400 mt-4 p-2">
          <p className="w-1/3 lg:font-medium text-xs border-1 lg:text-base border-gray-400 my-2">
            Technincal aspects
          </p>
          <div className="lg:flex lg:flex-row lg:justify-center lg:gap-20 w-full">
            <div className="border-1 border-sky-300 lg:h-96 lg:w-72 w-full h-96 lg:my-0 my-4">
              <p className="border-b-2 border-black  ">Photo</p>
            </div>
            <div className="border-1 border-sky-300 lg:h-96 lg:w-72 w-full h-96 lg:my-0 my-4">
              <p className="border-b-2 border-black  ">Photo</p>
            </div>
            <div className="border-1 border-sky-300 lg:h-96 lg:w-72 w-full h-96 lg:my-0 my-4">
              <p className="border-b-2 border-black  ">Photo</p>
            </div>
          </div>
        </div>

        <div className="w-full border-1 border-gray-400 mt-4 p-2">
          <p className="w-1/3 border-1 lg:font-medium lg:text-base text-xs border-gray-400 my-2">
            Observations
          </p>
          <div className="lg:flex lg:flex-row lg:justify-center lg:gap-20 w-full">
            <div className="border-1 border-sky-300 lg:h-96 lg:w-72 w-full h-96 lg:my-0 my-4">
              <p className="border-b-2 border-black  ">Photo</p>
            </div>
            <div className="border-1 border-sky-300 lg:h-96 lg:w-72 w-full h-96 lg:my-0 my-4">
              <p className="border-b-2 border-black  ">Photo</p>
            </div>
            <div className="border-1 border-sky-300 lg:h-96 lg:w-72 w-full h-96 lg:my-0 my-4">
              <p className="border-b-2 border-black  ">Photo</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default IccaNumber;
