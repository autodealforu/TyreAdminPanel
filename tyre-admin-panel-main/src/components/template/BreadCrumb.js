import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const BreadCrumb = ({ title, mainLinkTitle, mainLinkUrl, activeLink }) => {
  return (
    <div>
      <div id="miniaresult" style={{ marginTop: "35px" }}>
        <div className="page-content">
          <div>
            {/* start page title */}
            <div className="row">
              <div className="col-12">
                <div
                  style={{
                    background: "#fff",
                    padding: "15px 20px 5px 20px",
                    marginBottom: "10px",
                    boxShadow: "rgb(227 233 243) 0px 4px 22px",
                    borderRadius: "5px",
                    border: "1px solid #f1f1f1",
                  }}
                >
                  <div
                    className="page-title-box d-sm-flex align-items-center
              justify-content-between"
                  >
                    <h4 className="mb-sm-0 font-size-18">{title}</h4>
                    <div className="page-title-right">
                      <ol className="breadcrumb m-0">
                        <li className="breadcrumb-item">
                          <Link to={`/${mainLinkUrl}`}>
                            {mainLinkTitle ? mainLinkTitle : "Dashboard"}
                          </Link>
                        </li>
                        <li className="breadcrumb-item active">{activeLink}</li>
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* end page title */}
          </div>{" "}
          {/* container-fluid */}
        </div>
        {/* End Page-content */}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(BreadCrumb);
