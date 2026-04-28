import { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  register,
  resetPassword,
  login,
  logout,
  forgetPassword,
  loadUser,
  updateProfile,
} from '../../store/actions/auth';

export const useRegisterUser = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth);
  const registerUser = async (data) => {
    await dispatch(register(data));
  };
  return [registerUser];
};
export const useUpdateUser = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth);
  const updateUser = async (data) => {
    await dispatch(updateProfile(data));
  };
  return [updateUser];
};
export const useLoadUser = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(loadUser());
  }, []);
  return [data];
};
export const useLoggedInUser = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth);
  // useEffect(() => {
  //   dispatch(loadUser());
  // }, []);
  return [data];
};

export const useLoginUser = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth);
  const loginUser = async (data) => {
    await dispatch(login(data));
  };
  return [loginUser];
};

export const useForgetPassword = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth);
  const forgetUserPassword = async (data) => {
    await dispatch(forgetPassword(data));
  };
  return [forgetUserPassword];
};
export const useResetPassword = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth);
  const resetUserPassword = async (data) => {
    await dispatch(resetPassword(data));
  };
  return [resetUserPassword];
};

export const useLogoutUser = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.auth);
  const logoutUser = async () => {
    await dispatch(logout());
  };
  return [logoutUser];
};
