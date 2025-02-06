import React, { useEffect, useState } from 'react';
import UserTable from '@/components/AdminPage/UserManagement/UserTable';
import Pagination from '@/components/commons/Pagination';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 5;

  useEffect(() => {
    fetch('/api/users')
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <div>
      <h1>유저 목록</h1>
      <UserTable users={users} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default UserList;
