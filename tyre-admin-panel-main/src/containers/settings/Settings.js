import React from "react";
import BreadCrumb from "../../components/template/BreadCrumb";
import Header from "../../components/template/Header";
function Settings() {
  return (
    <div className="pace-done">
      <Header />
      <BreadCrumb
        title={`Settings`}
        mainLinkTitle={"Settings"}
        mainLinkUrl={"/dashboard"}
        activeLink="Home"
      />
    </div>
  );
}

export default Settings;
