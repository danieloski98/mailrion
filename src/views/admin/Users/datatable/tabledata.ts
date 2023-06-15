interface IColumnHeader {
    Header: string;
    accessor: string;
  }
  
  type Columns = IColumnHeader[];

export const columnsUsers: Columns = [
    {
      Header: "Username",
      accessor: "username",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Hostname",
      accessor: "hostnam",
    },
  ];