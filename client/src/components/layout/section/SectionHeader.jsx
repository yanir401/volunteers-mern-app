import React from "react";

const SectionHeader = ({ children, style }) => {
  return (
    <header className="center flex flex-row-align-center gap-4 paddingTb-6">
      {children}
    </header>
  );
};

export default SectionHeader;
