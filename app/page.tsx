import React, { FC, useCallback, useMemo } from 'react';

// Define common User interface
interface User {
  id: number;
}

// Define OrdinaryUser interface extending User
interface OrdinaryUser extends User {
  name: string;
  age: number;
}

// Define Employee interface extending User
interface Employee extends User {
  fullName: string;
  position: string;
}

// Define DataTableProps interface with generics for data and columns
interface DataTableProps<T extends User> {
  data: T[];
  columns: {
    Header: string;
    accessor: keyof T;
  }[];
}

// DataTable component
const DataTable: FC<DataTableProps<User>> = ({ data, columns }) => {
  const renderRows = useCallback(() => {
    return data.map((row) => (
      <tr key={row.id}>
        {columns.map((col) => (
          <td key={col.accessor}>{row[col.accessor]}</td> // Corrected accessor
        ))}
      </tr>
    ));
  }, [data, columns]);

  // Memoize the renderRows function
  const memoizedRenderRows = useMemo(() => renderRows, [renderRows]);

  return (
    <table>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.accessor}>{col.Header}</th>
          ))}
        </tr>
      </thead>
      <tbody>{memoizedRenderRows()}</tbody>
    </table>
  );
};

// Example usage for OrdinaryUsers
const ordinaryUserData = {
  ordinaryUsers: [
    { id: 1, name: 'John Doe', age: 25 },
    { id: 2, name: 'Alice Smith', age: 30 },
    { id: 3, name: 'Bob Johnson', age: 28 },
  ],
};

const ordinaryUserColumns = [
  { Header: 'ID', accessor: 'id' },
  { Header: 'Name', accessor: 'name' },
  { Header: 'Age', accessor: 'age' },
];

const OrdinaryUsersTable: FC = () => (
  <DataTable<OrdinaryUser> data={ordinaryUserData.ordinaryUsers} columns={ordinaryUserColumns} />
);

// Example usage for Employees
const employeeData = {
  employees: [
    { id: 101, fullName: 'Jane Doe', position: 'Software Engineer' },
    { id: 102, fullName: 'Charlie Brown', position: 'Product Manager' },
    { id: 103, fullName: 'Eva Williams', position: 'UI/UX Designer' },
  ],
};

const employeeColumns = [
  { Header: 'ID', accessor: 'id' },
  { Header: 'Full Name', accessor: 'fullName' },
  { Header: 'Position', accessor: 'position' },
];

const EmployeesTable: FC = () => (
  <DataTable<Employee> data={employeeData.employees} columns={employeeColumns} />
);

// Example usage
const App: FC = () => (
  <div>
    <h2>Ordinary Users Table</h2>
    <OrdinaryUsersTable />

    <h2>Employees Table</h2>
    <EmployeesTable />
  </div>
);

export default App;
