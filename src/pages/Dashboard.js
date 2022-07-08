import React, { useEffect } from 'react';
import { Info, Repos, User, Search, Navbar } from '../components';
import loadingImage from '../images/preloader.gif';
import { useDispatch, useSelector } from 'react-redux';
import { checkRequests } from '../context/features/userSlice';
const Dashboard = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(checkRequests());
  }, [dispatch]);

  if (isLoading) {
    return (
      <main>
        <Navbar />
        <Search />
        <img className='loading-img' src={loadingImage} alt='loader' />
      </main>
    );
  }

  return (
    <main>
      <Navbar />
      <Search />
      <Info />
      <User />
      <Repos />
    </main>
  );
};

export default Dashboard;
