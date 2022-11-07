import React from "react";
import SectionHeader from "./SectionHeader";
import { FaPrayingHands } from "react-icons/fa";

const Section = () => {
  return (
    <section>
      <div className="container">
        <SectionHeader>
          <div className="left-content flex center gap-3 ">
            <h2 className="text-left">
              <span style={{ color: "#F8B24F" }}>O</span>
              NE <br />
              &ensp;
              <span style={{ color: "#beaea7" }}> B</span>IG <br />
              &emsp;
              <span style={{ color: "#EA9A96" }}> F</span>AMILY
            </h2>
            <FaPrayingHands
              className="icon"
              style={{ alignSelf: "flex-end", color: "#EA9A96" }}
            />
            <br />
          </div>

          <p className="font-16 line-height text-left">
            Join us on our mission to create a brighter future.
            <br />
            suscipit odio ea quasi nam ducimus mollitia rerum placeat quos,{" "}
            <br />
            exercitationem expedita ipsum ut minima itaque saepe incidunt. Quae,
            <br />
            est. Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim,
            odit?
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae,
          </p>
        </SectionHeader>
      </div>
    </section>
  );
};

export default Section;
