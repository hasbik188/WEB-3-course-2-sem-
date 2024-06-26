import React, { useState } from "react";

const TableComponent = ({ data }) => {
  // извлекаем названия всех столбцов
  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  // хук useState для создания состояния visibleColumns
  const [visibleColumns, setVisibleColumns] = useState(() => {
    const initialState = {};
    columns.forEach((column) => {
      initialState[column] = true;
    });
    return initialState;
  });

  // Обрабатываем изменение состояния чекбоксов
  const handleCheckboxChange = (column) => {
    setVisibleColumns((prevState) => {
      const updatedState = { ...prevState };
      updatedState[column] = !updatedState[column];
      return updatedState;
    });
  };






  
  return (
    <div>
      <div className="checkbox-container">
        {columns.map((column) => (
          <label key={column} className="checkbox-label">
            <input
              type="checkbox"
              checked={visibleColumns[column]}
              onChange={() => handleCheckboxChange(column)}
            />
            {column}
          </label>
        ))}
      </div>

      <table className="styled-table">
        <thead>
          <tr>
            {columns.map(
              (column) =>
                visibleColumns[column] && <th key={column}>{column}</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map(
                (column) =>
                  visibleColumns[column] && <td key={column}>{row[column]}</td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const App = () => {
  const data = [
    {
      Бренд: "Balenciaga",
      Директор: "Демна Гвасалия",
      Год: "1919",
    },
    {
      Бренд: "Rick Owens",
      Директор: "Рик Оуэнс",
      Год: "1994",
    },
    {
      Бренд: "Maison Margiela",
      Директор: "Гаэтано Скиуто",
      Год: "1988",
    },
  ];

  return <TableComponent data={data} />;
};

export default App;
