import React from "react";
import App from "./task.jsx";

const Content = () => {
  return (
    <div className="content">
      <h1>PARIS FASHION WEEK</h1>
      <div className="content-table">
        <h3>Участники</h3>
        <App />
        <button className="join">Присоедениться</button>
      </div>
      
    </div>
  );
};

export default Content;
