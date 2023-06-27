"use client"
import React, { ChangeEvent, ChangeEventHandler, useState } from "react";
import box1img from "../images/box1.svg";
import box2img from "../images/box2.svg";
import Image from "next/image";

const Page1 = () => {
  const [selectedCard, setSelectedCard] = useState("");

  const handleCardSelection = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedCard(event.target.value);
  };

  return (
    <div>
      <main className="page1-wrap">
        <div className="container">
          <div className="page1-content">
            <h2>
              A few small steps for you.
              <br />
              One massive leap for your login box.
            </h2>
            <h5>Tell us about you and we can recommend the next steps.</h5>

            <div className="options_row">
              <label
                className={`box1 ${selectedCard === "card1" ? "selected" : ""}`}
              >
                <input
                  type="radio"
                  name="card-selection"
                  value="card1"
                  role="button"
                  onChange={handleCardSelection}
                />
                <div className="box1_content">
                  <div className="inside_content">
                    <Image
                      src={"/images/box1.svg"}
                      alt="option-first"
                      width={100}
                      height={100}
                    />

                    <h6>I am a new Auth0 user</h6>
                    <p>
                      You are new to Auth0, and want to learn and <br />
                      explore the core features.
                    </p>
                  </div>
                </div>
              </label>

              <label
                className={`box1 ${selectedCard === "card2" ? "selected" : ""}`}
              >
                <input
                  type="radio"
                  name="card-selection"
                  value="card2"
                  onChange={handleCardSelection}
                />
                <div className="box1_content">
                  <div className="inside_content">
                    <Image src={box2img} alt="option-second" />

                    <h6>I have used Auth0 before</h6>
                    <p>
                      You have used Auth0 before, <br />
                      and are ready to get started
                    </p>
                  </div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Page1;
