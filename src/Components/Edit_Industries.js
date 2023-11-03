import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { FaTrash, FaEdit } from "react-icons/fa";

function EditIndustry(props) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  //get by id
  const [name, setName] = useState("");

  const fetchData = async () => {
    try {
      axios
        .get(`http://18.192.51.153:4002/api/v1/dashboard/branch/${props.id}`)
        .then((response) => {
          const values = response.data.data;
          setName(values);
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(async () => {
    fetchData();
  }, []);

  //edit Industry
  // const [industryName, setIndustryName] = useState("")

  const handleApi = async (e) => {
    e.preventDefault();
    console.log(name);

    await axios
      .patch(`http://18.192.51.153:4002/api/v1/dashboard/branch/${props.id}`, {
        BranchName: name,
      })
      .then((res) => {
        console.log("RESPONSE RECEIVED:", res);
        closeModal();
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      });
  };

  return (
    <>
      <div className="mt-4">
        <button type="button" onClick={openModal}>
          <FaEdit className="text-blue-600 text-base" />
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Add new Industry
                  </Dialog.Title>
                  <div className="mt-2">
                    <form>
                      <div className="grid gap-6 mb-6 lg:grid-cols-2">
                        <div>
                          <label
                            for="first_name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            id="first_name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            placeholder="John"
                            defaultValue={name.BranchName}
                            // value={industryName}
                            onChange={(e) => {
                              setName(e.target.value);
                            }}
                            required
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white"
                        onClick={handleApi}
                      >
                        Save
                      </button>
                    </form>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default EditIndustry;
