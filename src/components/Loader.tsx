// src/components/Loader.tsx
import React from "react";
import { Spinner } from "reactstrap";

const Loader: React.FC = () => {
  return (
    <div className="text-center mt-5">
      <Spinner color="primary" />
    </div>
  );
};

export default Loader;
