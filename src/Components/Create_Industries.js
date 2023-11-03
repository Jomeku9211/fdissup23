import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import axios from "axios";
import config from "../Config";

function CreateIndustry() {
  let [isOpen, setIsOpen] = useState(false);
  const [newIndustry, setNewIndustry] = useState("");

  //add new
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleApi = async (e) => {
    e.preventDefault();
    console.log(newIndustry);

    await axios
      .post(`http://18.192.51.153:4002/api/v1/dashboard/branch`, {
        BranchName: newIndustry,
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
        <button
          type="button"
          onClick={openModal}
          className="rounded-md bg-sky-400 px-4 py-2 text-base font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
          Create
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
                            value={newIndustry}
                            onChange={(e) => setNewIndustry(e.target.value)}
                          />
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white"
                        // onClick={closeModal}
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

export default CreateIndustry;
