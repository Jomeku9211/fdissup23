import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState, useEffect } from "react";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import config from "../Config";

function EditAdmin({id}) {
  let [isOpen, setIsOpen] = useState(false);
  console.log("id" , id)
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  //get admin by id
  const [superAdmin, setSuperAdmin] = useState([]);

  const fetchData = async () => {
    await axios
      .get(`http://18.192.51.153:4002/api/v1/dashboard/SuperAdmin/Administrator/${id}`)
      .then((res) => {
        const response = res.data.data[0];
        setSuperAdmin(response);

        // Populate the newAdmin state with the retrieved data
        setNewAdmin({
          FirstName: response.FirstName || "",
          LastName: response.LastName || "",
          UserName: response.UserName || "",
          Email: response.Email || "",
          IsAnonymous: response.IsAnonymous || false,
          Password: "", // Leave the password field empty for security reasons
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log( "superadmin", superAdmin)

  //update admin
  const [newAdmin, setNewAdmin] = useState({
    UserName: " ",
    LoweredUserName: " ",
    MobileAlias: " ",
    IsAnonymous: "",
    LastActivityDate: " ",
    Password: " ",
    PasswordFormat: " ",
    PasswordSalt: " ",
    MobilePIN: " ",
    Email: " ",
    LoweredEmail: " ",
    PasswordQuestion: " ",
    PasswordAnswer: " ",
    IsApproved: " ",
    IsLockedOut: " ",
    CreateDate: " ",
    LastLoginDate: " ",
    LastPasswordChangedDate: " ",
    LastLockoutDate: " ",
    FailedPasswordAttemptCount: " ",
    FailedPasswordAttemptWindowStart: " ",
    FailedPasswordAnswerAttemptCount: " ",
    FailedPasswordAnswerAttemptWindowStart: " ",
    Comment: " ",
    FirstName: " ",
    LastName: " ",
    ProfileImage: " ",
    EmailAddress: " ",
    Ordinal: " ",
    Verified: " ",
    Date: " ",
    VerificationCode: " ",
    HavingProblems: " ",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setNewAdmin({ ...newAdmin, [e.target.name]: e.target.value });
  };

  const formData = {
    UserName: newAdmin.UserName,
    LoweredUserName: newAdmin.UserName.toLowerCase(),
    MobileAlias: "hh",
    IsAnonymous: 1,
    LastActivityDate: new Date().toISOString(),
    Password: newAdmin.Password,
    PasswordFormat: 1,
    PasswordSalt: "",
    MobilePIN: "+91",
    Email: newAdmin.Email,
    LoweredEmail: newAdmin.Email.toLowerCase(),
    PasswordQuestion: null,
    PasswordAnswer: null,
    IsApproved: false,
    IsLockedOut: false,
    CreateDate: new Date().toISOString(),
    LastLoginDate: new Date().toISOString(),
    LastPasswordChangedDate: new Date().toISOString(),
    LastLockoutDate: new Date().toISOString(),
    FailedPasswordAttemptCount: 0,
    FailedPasswordAttemptWindowStart: new Date().toISOString(),
    FailedPasswordAnswerAttemptCount: 0,
    FailedPasswordAnswerAttemptWindowStart: new Date().toISOString(),
    Comment: null,
    FirstName: newAdmin.FirstName,
    LastName: newAdmin.LastName,
    ProfileImage: null,
    EmailAddress: newAdmin.Email,
    Ordinal: 0,
    Verified: true,
    Date: new Date().toISOString(),
    VerificationCode: "00000000-0000-0000-0000-000000000000",
    HavingProblems: null,
  };

  const handleApi = async (e) => {
    e.preventDefault();
    console.log(formData);

    await axios
      .patch(
        `http://18.192.51.153:4002/api/v1/dashboard/SuperAdmin/Administrator/${id}`,
        formData
      )
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
      <div className="">
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
                <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    update Admin
                  </Dialog.Title>
                  <div className="mt-2">
                    <form onSubmit={handleApi}>
                      <div className="grid gap-6 mb-6 lg:grid-cols-2">
                        <div>
                          <label
                            for="first_name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            First name
                          </label>
                          <input
                            type="text"
                            id="first_name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            value={newAdmin?.FirstName}
                            name="FirstName"
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div>
                          <label
                            for="last_name"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Last name
                          </label>
                          <input
                            type="text"
                            id="last_name"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            value={newAdmin?.LastName}
                            name="LastName"
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div>
                          <label
                            for="user"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            User name
                          </label>
                          <input
                            type="text"
                            id="user"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            value={newAdmin?.UserName}
                            name="UserName"
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="mb-4">
                          <label
                            for="email"
                            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            E-mail address
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            value={newAdmin?.Email}
                            name="Email"
                            onChange={handleChange}
                            required
                          />
                        </div>
                      </div>

                      {/* <div>
                        <label
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          for="small_size"
                        >
                          {" "}
                          profile picture
                        </label>
                        <input
                          className="block mb-5 w-full text-xs text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer "
                          id="small_size"
                          type="file"
                        />
                      </div> */}

                      <div className=" grid gap-6 mb-6 lg:grid-cols-2">
                        <div className=" mb-6">
                          <label
                            for="password"
                            className="block mb-2 text-sm font-medium text-gray-900"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            id="password"
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                            name="Password"
                            onChange={handleChange}
                            required
                          />
                        </div>

                        <div className="block items-center">
                          <label
                            className=" text-sm font-medium text-gray-900 dark:text-gray-400"
                            for="IsAnonymous"
                          >
                            Active
                          </label>
                          <select
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt"
                            name="IsAnonymous"
                            onChange={(e) => {
                setNewAdmin({
                  ...newAdmin,
                  IsAnonymous: e.target.value === "true" , // Convert to boolean
                });
              }}
              value={newAdmin?.IsAnonymous ? "true" : "false"}
                        >
                          <option value="false">No</option>
                          <option value="true">Yes</option> {/* Correct the spelling to "Yes" */}
                          </select>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-sm font-medium text-white"
                        onClick={closeModal}
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

export default EditAdmin;
