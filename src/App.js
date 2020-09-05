import React, { useState } from "react";
import { useForm } from "react-hook-form";
import _ from "lodash";
import "./App.css";

import { Scrollbars } from "react-custom-scrollbars";

function App() {
  const { register, handleSubmit, errors } = useForm();
  const [shuffledItems, setShuffledItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  function onSubmit(data) {
    const from = data.from;
    const to = data.to;
    const delay = data.delay;

    const range = _.range(from, parseInt(to) + 1);
    const shuffledRange = _.shuffle(range);

    shuffledRange.map((number, index) => {
      setTimeout(() => {
        const audio = new Audio(`/data/${number}.mp3`);
        audio.play();
      }, delay * index);
    });

    setShuffledItems(shuffledRange);
  }

  function handleShowCharactersBtn() {
    setShowModal(true);
  }

  function handleModalCloseBtn() {
    setShowModal(false);
  }

  return (
    <React.Fragment>
      <div className="App mt-3 md:mt-0 max-h-screen">
        <h1 className="text-2xl md:text-5xl font-bold leading-tight text-indigo-800">
          Katakana
        </h1>
        <div className="container m-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="block text-sm md:text-xl font-serif mt-2 mb-2  text-gray-600">
              Range of Characters You want to practice:
            </label>
            <label className="text-gray-500 text-sm sm:text-base">
              from &nbsp;
            </label>
            <input
              id="from"
              type="number"
              name="from"
              ref={register({ required: "required" })}
              className="rounded-full border h-8 focus:shadow-outline focus:outline-none px-3 mr-3 w-16 md:w-32"
              placeholder="1"
            />
            <label className="text-gray-500 text-sm sm:text-base">
              to &nbsp;
            </label>
            <input
              id="to"
              type="number"
              name="to"
              ref={register({ required: "required" })}
              className="rounded-full border h-8 focus:shadow-outline focus:outline-none px-3 mr-3 w-16 md:w-32"
              placeholder="20"
            />
            <label className="text-gray-500 text-sm sm:text-base">
              delay &nbsp;
            </label>
            <select
              name="delay"
              ref={register()}
              className="rounded-full border h-8 focus:shadow-outline focus:outline-none px-3 mr-3 w-16"
            >
              <option value="3000">3s</option>
              <option value="5000">5s</option>
              <option value="7000">7s</option>
            </select>
            <input
              type="submit"
              value="&nbsp; Start &nbsp;"
              className="bg-indigo-500 text-white py-1 px-1 mt-2 md:mt-0 md:px-3 rounded-full hover:bg-indigo-700 cursor-pointer focus:shadow-outline focus:outline-none"
            />
            <span className="block text-gray-500 italic text-xs md:text-sm mt-3">
              If you want to practice from "a" to "o", specify
              <a
                onClick={() => handleShowCharactersBtn()}
                title="Click to see range"
                className="text-sm px-2 text-gray-500 cursor-pointer underline focus:shadow-outline focus:outline-none"
              >
                range
              </a>
              from 1 to 5.
            </span>
          </form>
          {/* <hr className="my-10" /> */}
          <div className="w-full h-128 mt-5 Center">
            <Scrollbars autoHide autoHideTimeout={1000}>
              {shuffledItems &&
                shuffledItems.map((item, index) => {
                  return (
                    <figure className="inline-block border p-2 w-16 md:w-20">
                      <img
                        key={item}
                        src={require(`../public/data/characters/${item}.png`)}
                      />
                      <figcaption>{index + 1}</figcaption>
                    </figure>
                  );
                })}
            </Scrollbars>
          </div>
        </div>
      </div>
      <div className="absolute w-full bottom-0 text-center mb-3 md:block hidden">
        <p className="italic text-gray-500 text-sm">
          Katakana - Version 1 <br />
          Practice your writing with digital teacher. <br />
        </p>
        <p className="italic text-gray-400 text-xs">
          mr.htetphyonaing@gmail.com
        </p>
      </div>

      {/* modal */}
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 bg-glass"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"></span>
            &#8203;
            <div
              className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="badge-check w-6 h-6 text-green-500"
                    >
                      <path
                        fillRule="evenodd"
                        d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg leading-6 font-medium text-gray-900"
                      id="modal-headline"
                    >
                      All Katakana Characters
                    </h3>
                    <div className="mt-2">
                      <img
                        src={
                          window.location.origin + "/data/characters/all.png"
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto">
                  <button
                    onClick={() => handleModalCloseBtn()}
                    type="button"
                    className="inline-flex justify-center w-full border border-transparent px-1 py-1 md:px-4 md:py-2 bg-green-200 text-green-600 text-base leading-6 font-medium rounded-full hover:text-white hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  >
                    Okay
                  </button>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* end modal */}
    </React.Fragment>
  );
}

export default App;
