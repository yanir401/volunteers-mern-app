import React from "react";

const Section = ({ children }) => {
  return (
    <div className="center flex flex-row-align-center gap-4 paddingTb-6">
      {children}
    </div>
  );
};

export default Section;
