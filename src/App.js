import React, { useState } from "react";
import { useForm } from "react-hook-form";
import _ from "lodash";
import playAudio from "./utils/playAudio";
import "./App.css";
import gallery1 from "./assets/gallery-1.jpg";

import InputNumber from "./components/inputNumber";

import { Scrollbars } from "react-custom-scrollbars";
import Label from "./components/label";
import Select from "./components/select";
import Button from "./components/button";
import IonIcon from "./components/ionIcon";

function App() {
  const { register, handleSubmit } = useForm();
  const [shuffledItems, setShuffledItems] = useState([]);
  const [showModal, setShowModal] = useState(false);

  function onSubmit(data) {
    const from = data.from;
    const to = data.to;
    const delay = data.delay;

    const range = _.range(from, parseInt(to) + 1);
    const shuffledRange = _.shuffle(range);

    shuffledRange.forEach((name, index) => {
      setTimeout(() => playAudio(name), delay * index);
    });

    setShuffledItems(shuffledRange);
  }

  function handleViewRangeBtnClick() {
    setShowModal(true);
  }

  function handleModalCloseBtnClick() {
    setShowModal(false);
  }

  function handleCharacterClick(name) {
    playAudio(name);
  }

  return (
    <React.Fragment>
      <div className="App mt-3 md:mt-0 object-cover">
        <h1 className="--gradient text-2xl md:text-5xl font-bold leading-tight text-indigo-800">
          Katakana
        </h1>
        <div className="container m-auto">
          <form onSubmit={handleSubmit(onSubmit)}>
            <span className="block text-sm md:text-xl font-serif  text-gray-600">
              Range of Characters You want to practice:
            </span>

            <Label
              text="from &nbsp;"
              htmlFor="from"
              styles="text-gray-500 text-sm sm:text-base"
            />
            <InputNumber
              id="from"
              name="from"
              registerObj={{ register, rules: { required: "required" } }}
              placeholder="1"
            />

            <Label
              text="to &nbsp;"
              htmlFor="to"
              styles="text-gray-500 text-sm sm:text-base"
            />
            <InputNumber
              id="to"
              name="to"
              registerObj={{ register, rules: { required: "required" } }}
              placeholder="45"
            />

            <Label
              text="delay &nbsp;"
              htmlFor="delay"
              styles="text-gray-500 text-sm sm:text-base"
            />
            <Select
              id="delay"
              name="delay"
              registerObj={{ register }}
              options={[
                { text: "3s", value: "3000" },
                { text: "5s", value: "5000" },
                { text: "7s", value: "7000" },
              ]}
            />

            <Button
              type="submit"
              Icon={<IonIcon name="megaphone-outline" styles="align-middle" />}
              title="Start Listening!"
              styles="bg-indigo-500 text-white py-1 px-1 mt-2 md:mt-0 md:px-3 md:py-1 shadow-lg hover:shadow-xs rounded-full hover:bg-indigo-700 cursor-pointer focus:shadow-outline focus:outline-none"
            />

            <span className="block text-gray-500 italic text-xs">
              If you want to practice from "a" to "o", specify range from 1 to
              5.
            </span>

            <Button
              type="button"
              text="View Range"
              title="Click to see range"
              styles="text-xs px-2 text-gray-600 cursor-pointer border bg-gray-200 rounded-full focus:shadow-outline focus:outline-none"
              onClick={handleViewRangeBtnClick}
            />
          </form>
          <div className="w-full h-128 mt-3 --center" style={{ zIndex: 99 }}>
            <Scrollbars autoHide autoHideTimeout={1000}>
              {shuffledItems &&
                shuffledItems.map((item, index) => {
                  return (
                    <React.Fragment key={item}>
                      <figure
                        onClick={() => handleCharacterClick(item)}
                        title="Click to listen"
                        className="inline-block border p-2 w-16 md:w-24 cursor-pointer"
                      >
                        <img
                          alt={item}
                          src={require(`../public/data/characters/${item}.png`)}
                        />
                        <figcaption className="text-gray-400">
                          {index + 1}
                        </figcaption>
                      </figure>
                      {(index + 1) % 5 === 0 && <br />}
                    </React.Fragment>
                  );
                })}
            </Scrollbars>
          </div>
        </div>
      </div>
      <div
        className="absolute w-full bottom-0 text-center mb-1 md:block hidden"
        style={{ zIndex: -1 }}
      >
        <p className="italic text-gray-500 text-sm">
          Katakana - Version 1 <br />
          Practice your writing with digital teacher. <br />
        </p>
        <p className="italic text-gray-500 text-xs">
          &#169; mr.htetphyonaing@gmail.com
        </p>
      </div>
      <img
        src={gallery1}
        alt="Abstract"
        className="fixed bottom-0 opacity-10"
        style={{ zIndex: -10 }}
      />
      <svg
        className="bottom-0 hidden md:block fixed"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        style={{ zIndex: -5 }}
      >
        <path
          fill="#f3f4f5"
          fillOpacity="0.8"
          d="M0,160L24,165.3C48,171,96,181,144,202.7C192,224,240,256,288,256C336,256,384,224,432,229.3C480,235,528,277,576,288C624,299,672,277,720,245.3C768,213,816,171,864,133.3C912,96,960,64,1008,64C1056,64,1104,96,1152,138.7C1200,181,1248,235,1296,213.3C1344,192,1392,96,1416,48L1440,0L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"
        ></path>
      </svg>

      {/* modal */}
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity">
              <div className="absolute inset-0 --bg-glass"></div>
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
                        alt="All Katakana Characters"
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
                  <Button
                    type="button"
                    text="Okay"
                    title="Click to see range"
                    styles="inline-flex justify-center w-full border border-transparent px-1 py-1 md:px-4 md:py-2 bg-green-200 text-green-600 text-base leading-6 font-medium rounded-full hover:text-white hover:bg-green-500 focus:outline-none focus:border-green-700 focus:shadow-outline-green transition ease-out sm:text-sm sm:leading-5"
                    onClick={handleModalCloseBtnClick}
                  />
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
