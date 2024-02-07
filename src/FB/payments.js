import React from 'react';

export default function Payments() {

  const tableStyle = {
    width: '70%',
    margin: 'auto',
    borderCollapse: 'collapse',
    border: '1px solid #ddd',
  };

  const thCellStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  };

  const tdCellStyle = {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'left',
  };

  const theROW = {
    background: '#f8fafc',
  };

  const totalCellStyle = {
    ...tdCellStyle,
    fontSize: '18px',
    color: '#03c2fc',
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Payment</h2>
      <hr />
      <div style={tableStyle}>
        <table style={{ width: '100%' }}>
          <thead>
            <tr style={theROW}>
              <th style={thCellStyle} colSpan={4}>Delegate</th>
            </tr>
          </thead>
          <tbody>
            <tr style={theROW}>
              <th style={thCellStyle} data-label="Particulars">Particulars</th>
              <th style={thCellStyle} data-label="No. of Persons">No. of Persons</th>
              <th style={thCellStyle} data-label="Amount (Rs.)">Amount (Rs.)</th>
              <th style={thCellStyle} data-label="Total (Rs.)">Total (Rs.)</th>
            </tr>
            <tr>
              <td style={tdCellStyle} data-label="Particulars">Registration</td>
              <td style={tdCellStyle} data-label="No. of Persons">1</td>
              <td style={tdCellStyle} data-label="Amount (Rs.)">12711</td>
              <td style={tdCellStyle} data-label="Total (Rs.)">1212</td>
            </tr>
            <tr style={theROW}>
              <th style={thCellStyle} colSpan={4} data-label="Particulars">Accompanying Persons</th>
            </tr>
            <tr style={theROW}>
              <th style={thCellStyle} data-label="Particulars"></th>
              <th style={thCellStyle} data-label="No. of Persons"></th>
              <th style={thCellStyle} data-label="Amount (Rs.)">Subtotal</th>
              <th style={thCellStyle} data-label="Total (Rs.)">1221.90</th>
            </tr>
            <tr style={theROW}>
              <th style={thCellStyle} data-label="Particulars"></th>
              <th style={thCellStyle} data-label="No. of Persons"></th>
              <th style={thCellStyle} data-label="Amount (Rs.)">SGST(9%)</th>
              <th style={thCellStyle} data-label="Total (Rs.)">2121.80</th>
            </tr>
            <tr style={theROW}>
              <th style={thCellStyle} data-label="Particulars"></th>
              <th style={thCellStyle} data-label="No. of Persons"></th>
              <th style={thCellStyle} data-label="Amount (Rs.)">CGST (9%)</th>
              <th style={thCellStyle} data-label="Total (Rs.)">1211.08</th>
            </tr>
            <tr style={theROW}>
              <th style={thCellStyle} data-label="Particulars"></th>
              <th style={thCellStyle} data-label="No. of Persons"></th>
              <th style={totalCellStyle} data-label="Amount (Rs.)">TOTAL</th>
              <th style={totalCellStyle} data-label="Total (Rs.)">25000.00</th>
            </tr>
          </tbody>
        </table>
      </div>
      <br />
      <button className="ui green button">Make Payment and Complete Registration</button>
    </div>
  );
}
