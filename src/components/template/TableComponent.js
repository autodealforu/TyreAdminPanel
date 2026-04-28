import React from "react";
import number2text from "../../domain/util";
import moment from "moment";

const ComponentToPrint = React.forwardRef((props, ref) => (
  <div style={{ display: "none" }}>
    <div ref={ref}>
      <div
        className="main-wrapper"
        style={{
          maxWidth: "750px",
          margin: "20px auto",
          border: "1px solid #333",
          padding: "10px",
        }}
      >
        <div className="wrapper-content">
          <h2 style={{ color: "#000", textAlign: "center" }}>Tax Invoice</h2>
        </div>
        <div className="wrapper">
          <table
            className="table-bordered print-table-custom"
            style={{ width: "100%", padding: "20px" }}
            border={1}
            cellSpacing={0}
          >
            <tbody>
              <tr>
                <td colSpan={6} rowSpan={3} width="50%">
                  <strong>Luhaif Digitech LLP</strong> <br />
                  E-16 Greater Kailash-1
                  <br />
                  New Delhi-110048
                  <br />
                  GSTIN/UIN: 07AAJFL2919A1ZM
                  <br />
                  State Name : Delhi, Code : 07
                  <br />
                  E-Mail : accounts@luhaifdigitech.com
                </td>
                <td colSpan={3} width="25%">
                  Invoice No. <br />
                  <strong> {props.bill && props.bill.invoice_no} </strong>
                </td>
                <td colSpan={3} width="25%">
                  Dated <br />
                  <strong>
                    {" "}
                    {props.bill &&
                      props.bill.billing_date &&
                      moment(props.bill.billing_date).format("DD-MM-YYYY")}{" "}
                  </strong>
                </td>
              </tr>
              <tr>
                <td colSpan={3} width="25%">
                  Delivery Note <br />
                  {" -"}
                </td>
                <td colSpan={3} width="25%">
                  Mode/Terms of Payment <br />-
                </td>
              </tr>
              <tr>
                <td colSpan={3} width="25%">
                  Supplier's Ref. <br />
                  <strong> {props.bill && props.bill.suppliers_ref} </strong>
                </td>
                <td colSpan={3}>
                  Other Reference(s) <br />-
                </td>
              </tr>
              <tr>
                <td colSpan={6} rowSpan={3} width="50%">
                  Buyer <br />
                  <strong>
                    {props.bill.client && props.bill.client.name}
                  </strong>{" "}
                  <br />
                  {props.bill.client && (
                    <>
                      {props.bill.client.address} {props.bill.client.city}{" "}
                      {props.bill.client.state} {props.bill.client.pincode}{" "}
                      {props.bill.client.country}
                    </>
                  )}
                  <br />
                  E-Mail :{" "}
                  {props.bill && props.bill.client && props.bill.client.email}
                  <br />
                  GST No.{" "}
                  {props.bill && props.bill.client && props.bill.client.gst_no}
                </td>
                <td colSpan={3} width="25%">
                  Buyer’s Order No. <br />-
                </td>
                <td colSpan={3} width="25%">
                  Dated <br />
                  <strong>- </strong>
                </td>
              </tr>
              <tr>
                <td colSpan={3} width="25%">
                  Despatch Document No. <br />
                  {" -"}
                </td>
                <td colSpan={3} width="25%">
                  Delivery Note Date <br />-
                </td>
              </tr>
              <tr>
                <td colSpan={3} width="25%">
                  Despatched through <br />
                  <strong>- </strong>
                </td>
                <td colSpan={3} width="25%">
                  Destination <br />-
                </td>
              </tr>
            </tbody>
          </table>

          <table
            className="table-bordered print-table-custom"
            border={1}
            cellSpacing={0}
            style={{ width: "100%", padding: "20px" }}
          >
            <thead>
              <tr>
                <th width="5%">SI No</th>
                <th width="30%">Description of Service</th>
                <th width="10%">HSN/SAC</th>
                <th width="10%">GST Rate</th>
                <th width="10%">Quantity</th>
                <th width="10%">Rate</th>
                <th width="5%">per</th>
                <th width="20%">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td width="5%">1</td>
                <td width="30%">{props.bill && props.bill.description}</td>
                <td width="10%"></td>
                <td width="10%">18 %</td>
                <td width="10%"></td>
                <td width="10%"></td>
                <td width="5%"></td>
                <td width="20%">{props.bill && props.bill.amount}</td>
              </tr>
              <tr>
                <td width="5%">2</td>
                <td width="30%">Output-CGST</td>
                <td width="10%"></td>
                <td width="10%"></td>
                <td width="10%"></td>
                <td width="10%"></td>
                <td width="5%"></td>
                <td width="20%">
                  {" "}
                  {props.bill &&
                    parseFloat((props.bill.amount * 9) / 100).toFixed(2)}{" "}
                </td>
              </tr>
              <tr>
                <td width="5%">2</td>
                <td width="30%">Output-SGST</td>
                <td width="10%"></td>
                <td width="10%"></td>
                <td width="10%"></td>
                <td width="10%"></td>
                <td width="5%"></td>
                <td width="20%">
                  {props.bill &&
                    parseFloat((props.bill.amount * 9) / 100).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td width="5%"></td>
                <td width="30%">Total</td>
                <td width="10%"></td>
                <td width="10%"></td>
                <td width="10%"></td>
                <td width="10%"></td>
                <td width="5%"></td>
                <td width="20%">
                  ₹
                  {props.bill &&
                    parseFloat(
                      (
                        Number(props.bill.amount) +
                        (props.bill.amount * 18) / 100
                      ).toFixed(2)
                    )}
                </td>
              </tr>
            </tbody>
          </table>
          <table
            className="table-bordered print-table-custom"
            style={{ width: "100%", padding: "20px" }}
          >
            <thead>
              <tr>
                <td scope="row">
                  Amount Chargeable (in words) <br />
                  <strong>
                    INR{" "}
                    {number2text(
                      props.bill &&
                        parseFloat(
                          (
                            Number(props.bill.amount) +
                            (props.bill.amount * 18) / 100
                          ).toFixed(2)
                        )
                    )}
                  </strong>
                </td>
              </tr>
            </thead>
          </table>
          <table
            className="table-bordered print-table-custom"
            border={1}
            cellSpacing={0}
            style={{ width: "100%", padding: "20px" }}
          >
            <tbody>
              <tr>
                <th colSpan={3} rowSpan={2}>
                  HSN/SAC
                </th>
                <th rowSpan={2}>Taxable Value</th>
                <th colSpan={2}>Central Tax</th>
                <th colSpan={2}>State Tax</th>
                <th rowSpan={2}>Total Tax Amount</th>
              </tr>
              <tr>
                <td>Rate</td>
                <td>Amount</td>
                <td>Rate</td>
                <td>Amount</td>
              </tr>
              <tr>
                <td colSpan={3} />
                <th>{props.bill && props.bill.amount}</th>
                <td>9%</td>
                <td>
                  {" "}
                  {props.bill &&
                    parseFloat((props.bill.amount * 9) / 100).toFixed(2)}
                </td>
                <td>9%</td>
                <td>
                  {" "}
                  {props.bill &&
                    parseFloat((props.bill.amount * 9) / 100).toFixed(2)}
                </td>
                <td>
                  {" "}
                  {props.bill &&
                    parseFloat((props.bill.amount * 18) / 100).toFixed(2)}
                </td>
              </tr>
              <tr>
                <td colSpan={3}>
                  <strong>Total</strong>
                </td>
                <th>{props.bill && props.bill.amount}</th>
                <td />
                <td>
                  {" "}
                  {props.bill &&
                    parseFloat((props.bill.amount * 9) / 100).toFixed(2)}
                </td>
                <td />
                <td>
                  {" "}
                  {props.bill &&
                    parseFloat((props.bill.amount * 9) / 100).toFixed(2)}
                </td>
                <td>
                  {" "}
                  {props.bill &&
                    parseFloat((props.bill.amount * 18) / 100).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            Tax Amount (in words) :
            <strong>
              INR{" "}
              {number2text(
                props.bill &&
                  parseFloat(
                    (
                      Number(props.bill.amount) +
                      (props.bill.amount * 18) / 100
                    ).toFixed(2)
                  )
              )}
            </strong>
          </p>
          <table>
            <tbody>
              <tr>
                <td width="50%" colSpan={6} rowSpan={6}>
                  Remarks: <br />
                  {props.bill && props.bill.remarks} <br />
                </td>
              </tr>
              <tr>
                <td width="50%" colSpan={6} rowSpan={6}>
                  Company’s Bank Details <br />
                  Bank Name : <strong>
                    Icici Bank A/c No-002905017596
                  </strong>{" "}
                  <br />
                  A/c No. <strong>002905017596</strong> <br />
                  Branch &amp; IFS Code : <br />
                  <strong>Greater Kailash &amp; ICIC0000029</strong>
                </td>
              </tr>
            </tbody>
          </table>
          <table style={{ width: "100%" }}>
            <tbody>
              <tr>
                <td style={{ textAlign: "right" }}>
                  <strong>for Luhaif Digitech LLP</strong> <br />
                  <br />
                  <br />
                  Authorised Signatory
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <p style={{ textAlign: "center" }}>
        This is a Computer Generated Invoice
      </p>
    </div>
  </div>
));

export default ComponentToPrint;
