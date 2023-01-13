import React, { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hook/useTypedSelector';
import { getProfile } from '../store/slices/userSlice';

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const auth = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (!auth.data) {
      dispatch(getProfile())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.isAuthenticate])

  return (
    <>Hello, {user.data?.name}</>
  )
}

export default Dashboard;