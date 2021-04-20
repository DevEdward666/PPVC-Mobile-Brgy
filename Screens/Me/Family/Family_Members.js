import React, {useEffect, useState} from 'react';
import {List} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import Lists from './Lists';
import {action_getmembers} from '../../../Services/Actions/ResidentsActions';
const Family_Members = () => {
  const dispatch = useDispatch();
  const users_reducers = useSelector((state) => state.UserInfoReducers.data);
  useEffect(() => {
    let mounted = true;
    const index = () => {
      dispatch(action_getmembers(users_reducers?.resident_pk));
    };
    mounted && index();
    return () => (mounted = false);
  }, [dispatch]);
  return <Lists />;
};

export default Family_Members;
