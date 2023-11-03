import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import config from "../Config";

function ResetPassword(props) {
  let [isOpen, setIsOpen] = useState(false);
  const [successfull, setSuccessfull] = useState(false);
  const [failure, setFailure] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const [item, setItem] = useState({
    Password: "",
    conf_pwd: " ",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setItem({ ...item, [e.target.name]: e.target.value });
  };

  //Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (item.Password == item.conf_pwd) {
      await axios
        .patch(`${config.API_URL}/SuperClient/pass/${props.id}`, item.Password)
        .then((response) => {
          if (response.status === 200) {
            console.log(response);
            setSuccessfull(true);
          }
        });
    } else {
      setFailure(true);
      console.log("fail");
    }
    setTimeout(() => {
      setSuccessfull(false);
    }, 3000);
  };

  return (
    <>
      <div className="">
        <button type="button" onClick={openModal}>
          <p className="text-blue-600 font-medium hover:underline">
            resetpassword{" "}
          </p>
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
                    Forgot Password
                  </Dialog.Title>
                  <div className=" mt-4 ">
                    <form
                      className="grid place-content-center h-62 "
                      onSubmit={handleSubmit}
                    >
                      <div className="mb-6">
                        <label
                          htmlFor="password"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          New password
                        </label>
                        <input
                          type="password"
                          id="password"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                          name="Password"
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-6">
                        <label
                          htmlFor="repeat-password"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          Confirm password
                        </label>
                        <input
                          type="password"
                          id="repeat-password"
                          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                          name="conf_pwd"
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        onClick={closeModal}
                      >
                        Reset
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

export default ResetPassword;
