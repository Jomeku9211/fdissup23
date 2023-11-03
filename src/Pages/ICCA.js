import React from "react";
import AdminLayout from "../Layouts/admin.layout";
import img from "../images/img.png";
import LineChart from "../Components/LineChart";

const Icca = () => {
  return (
    <AdminLayout>
      <div className="w-full mt-4">
        <div>
          <img src={img} className="w-full h-full" />
        </div>

        <div class="grid gap-6 mb-6 md:grid-cols-2">
          <div>
            <input
              type="text"
              id="first_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Organization"
              required
            />
          </div>
          <div>
            <input
              type="text"
              id="last_name"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Project"
              required
            />
          </div>
          <div>
            <input
              type="text"
              id="company"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Report Number"
              required
            />
          </div>
          <div>
            <input
              type="date"
              id="date"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Date"
              required
            />
          </div>
          <div>
            <input
              type="url"
              id="text"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Control Time"
              required
            />
          </div>
          <div>
            <input
              type="number"
              id="visitors"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Audit carried out by"
              required
            />
          </div>
          <div>
            <input
              type="text"
              id="website"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Amsterdam"
              required
            />
          </div>
          <div>
            <input
              type="text"
              id="visitors"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Present Client"
              required
            />
          </div>

          <div>
            <textarea
              id="message"
              rows="4"
              class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
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
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Your message..."
          ></textarea>
        </div>

        <div className="w-full border-1 border-gray-400 mt-4">
        <p className="w-1/3 border-1 font-medium border-gray-400 my-2">
            Results of Audit
          </p>
          <LineChart className="w-full" />
        </div>
        {/* </div>  */}

        <div class=" mt-8 relative overflow-x-auto  sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500">
            <thead class="text-xs text-gray-700 bg-sky-200">
              <tr className="text-sm">
                <th scope="col" class="px-6 py-3">
                  Room no
                </th>
                <th scope="col" class="px-6 py-3">
                  Category
                </th>
                <th scope="col" class="px-6 py-3">
                  Element
                </th>
                <th scope="col" class="px-6 py-3">
                  Error type
                </th>
                <th scope="col" class="px-6 py-3">
                  Comment
                </th>
                <th scope="col" class="px-6 py-3">
                  Pict no.
                </th>
                {/* <th scope="col" class="px-6 py-3"></th> */}
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b ">
                <th
                  scope="row"
                  class="px-6 py-4 font-medium text-gray-900  whitespace-nowrap"
                >
                ...
                </th>
                <td class="px-6 py-4">...</td>
                <td class="px-6 py-4">...</td>
                <td class="px-6 py-4">...</td>
                <td className="px-6 py-4">...</td>
                <td class="px-6 py-4">...</td>
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

        <p className="w-1/3 border-1 mt-4 font-medium border-gray-400 my-2 lg:text-base text-xs">
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

        <div className="w-full border-1 border-gray-400 mt-4 p-2">
          <p className="w-1/3 border-1 font-medium border-gray-400 my-2">
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
          <p className="w-1/3 border-1 font-medium border-gray-400 my-2">
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

export default Icca;
