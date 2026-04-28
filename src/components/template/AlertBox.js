import React from "react";
import { connect } from "react-redux";
import { removeAlert } from "../../store/actions/alert";
const AlertBox = ({ alert, removeAlert }) => {
  return (
    <div>
      {alert.map((item, index) => {
        return (
          <div className="alert-box" key={`alert-${index}`}>
            <div
              className={`alert alert-${item.alertType} alert-dismissible alert-label-icon label-arrow fade show`}
              role="alert"
            >
              <i
                class={
                  item.alertType === "success"
                    ? "fa fa-check label-icon"
                    : "fa fa-ban label-icon"
                }
              ></i>
              <strong>
                {item.alertType === "success" ? "Success" : "FAILED"}
              </strong>
              - {item.msg}
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
                onClick={() => removeAlert(item.id)}
              ></button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const mapStateToProps = (state) => ({ alert: state.alert });

const mapDispatchToProps = { removeAlert };

export default connect(mapStateToProps, mapDispatchToProps)(AlertBox);
