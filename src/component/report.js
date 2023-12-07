
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './appp.css';

const Report = () => {
  const [reports, setReports] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [reportsPerPage] = useState(30); // Display 30 items per page
  const [sortDirection, setSortDirection] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [percentageIncrease, setPercentageIncrease] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/reports');
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  const indexOfLastReport = currentPage * reportsPerPage;
  const indexOfFirstReport = indexOfLastReport - reportsPerPage;
  const currentReports = reports.slice(indexOfFirstReport, indexOfLastReport);

 
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const sortByTotalWorth = () => {
    const sortedReports = [...reports];
    if (sortDirection === 'asc') {
      sortedReports.sort((a, b) => a.TOTAL_WORTH - b.TOTAL_WORTH);
      setSortDirection('desc');
    } else {
      sortedReports.sort((a, b) => b.TOTAL_WORTH - a.TOTAL_WORTH);
      setSortDirection('asc');
    }
    setReports(sortedReports);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredReports = reports.filter((report) =>
    report.REGION.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalSales = reports.reduce((total, report) => total + report.TOTAL_WORTH, 0);

  useEffect(() => {
    const calculatePercentageIncrease = () => {
      const sortedReports = [...reports].sort(
        (a, b) => new Date(a.TRANSACTION_DATE) - new Date(b.TRANSACTION_DATE)
      );

      const groupedByMonth = sortedReports.reduce((acc, report) => {
        const transactionDate = new Date(report.TRANSACTION_DATE);
        const year = transactionDate.getFullYear();
        const month = transactionDate.getMonth();

        const key = `${year}-${month}`;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(report);
        return acc;
      }, {});

      const months = Object.keys(groupedByMonth);

      let totalWorthCurrentMonth = 0;
      let totalWorthPreviousMonth = 0;

      if (months.length >= 2) {
        const latestMonth = months[months.length - 1];
        const previousMonth = months[months.length - 2];

        groupedByMonth[latestMonth].forEach(report => {
          totalWorthCurrentMonth += report.TOTAL_WORTH;
        });

        groupedByMonth[previousMonth].forEach(report => {
          totalWorthPreviousMonth += report.TOTAL_WORTH;
        });

        const percentage = (((totalWorthCurrentMonth - totalWorthPreviousMonth) / totalWorthPreviousMonth) * 100).toFixed(2);

        setPercentageIncrease(percentage);
      } else {
        setPercentageIncrease(null);
      }
    };

    calculatePercentageIncrease();
  }, [reports]);

  return (
    <div className="card">
      <div className="card-content">
        <h1>Reports</h1>
        <div className="total-sales-box">
          <h2>Total Sales</h2>
          <div className="total-sales-value">${totalSales}</div>
        </div>
        <h2>Percentage Increase from Last Month: {percentageIncrease}%</h2>
        <h2>Search by Region</h2>
        <input
          type="text"
          placeholder="Search by Region"
          value={searchTerm}
          onChange={handleSearch}
        />
        <table className="report-table">
          <thead>
          <tr>
            <th>ID</th>
            <th>IS_MORTGAGE</th>
            <th>PROP_TYPE</th>
            <th>REGION</th>
            <th>PROP_SUB_TYPE</th>
            <th>BUILDING</th>
            <th>IS_OFFPLAN</th>
            <th>TRANSACTION_DATE</th>
            <th>AREA_ID</th>
            <th>PROJECT_ID</th>
            <th>CAT</th>
            <th>SIZE_SQFT</th>
            <th>LOCATION_ID</th>
            <th>ROOM</th>
            <th>IS_FIRST</th>
            <th>UPDATED_BY</th>
            <th>UPDATED</th>
            <th>CREATED_BY</th>
            <th>CREATED</th>
            <th>ID</th>
            <th>SIZE_SQMT</th>
            <th onClick={sortByTotalWorth}>
              TOTAL_WORTH{' '}
              {sortDirection === 'asc' ? <>&uarr;</> : <>&darr;</>}
            </th>
            <th>PRICE2</th>
          </tr>
          </thead>
          <tbody>
            {currentReports.map((report) => (
              <tr key={report._id}>
              <td>{report.ID}</td>
              <td>{report.IS_MORTGAGE}</td>
              <td>{report.PROP_TYPE}</td>
              <td>{report.REGION}</td>
              <td>{report.PROP_SUB_TYPE}</td>
              <td>{report.BUILDING}</td>
              <td>{report.IS_OFFPLAN}</td>
              <td>{report.TRANSACTION_DATE}</td>
              <td>{report.AREA_ID}</td>
              <td>{report.PROJECT_ID}</td>
              <td>{report.CAT}</td>
              <td>{report.SIZE_SQFT}</td>
              <td>{report.LOCATION_ID}</td>
              <td>{report.ROOM}</td>
              <td>{report.IS_FIRST}</td>
              <td>{report.UPDATED_BY}</td>
              <td>{report.UPDATED}</td>
              <td>{report.CREATED_BY}</td>
              <td>{report.CREATED}</td>
              <td>{report.ID}</td>
              <td>{report.SIZE_SQMT}</td>
              <td>{report.TOTAL_WORTH}</td>
              <td>{report.PRICE2}</td>
            </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="pagination">
          {currentPage > 1 && (
            <button onClick={() => paginate(currentPage - 1)}>{'<'}</button>
          )}
          {Array.from({ length: Math.ceil(reports.length / reportsPerPage) }, (_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))}
          {currentPage < Math.ceil(reports.length / reportsPerPage) && (
            <button onClick={() => paginate(currentPage + 1)}>{'>'}</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Report;
