import React from 'react';
import { ExampleProps } from "../../types/types";
import convertTableHeaders from '../../utils/convertTableHeaders';
import './example.css';

const Example: React.FC<ExampleProps> = ({ name, certificates }) => {
  const tableHeaders: string[] = certificates ? Object.keys(certificates[0]).map(convertTableHeaders) : [];
  
  return (
    <section className="table">
      <h2 className="table__title">{name}</h2>
      {
        certificates ? (
          <section className='table__container'>
         <table className="table__content">
        <thead className="table__head">
          <tr></tr>
          <tr className="table__row">
            <th className="table__header"></th>
            {
              tableHeaders.map((tableHeader, index) => (
                <th key={index} className="table__header">{tableHeader}</th>
              ))
            }
          </tr>
        </thead>
        <tbody className="table__body">
          {
            certificates.map((certificate, index) => (
              <tr key={index} className="table__row">
                <td className="table__cell"></td>
                <td className="table__cell">{certificate.supplier}</td>
                <td className="table__cell">{certificate.certificateType}</td>
                <td className="table__cell">{certificate.validFrom}</td>
                <td className="table__cell">{certificate.validTo}</td>
              </tr>
            ))
          }
        </tbody>
            </table>
            </section>
        ) : null
      }
    </section>
  );
}

export default Example;
