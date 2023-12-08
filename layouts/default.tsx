import React from "react";

const DefaultLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default DefaultLayout;
