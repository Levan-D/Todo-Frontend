/** @format */

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ADD_LIST } from "./Todo/todoSlice";
import styles from "./createList.module.css";
import { createList } from "./apiScheduler/createListSlice";
import { pushNewList } from "./apiScheduler/getListSlice";

const CreateList = () => {
  const isLoggedIn = useSelector((store) => store.indexing.data.isLoggedIn);
  const listData = useSelector((store) => store.getList.data);
  const createListData = useSelector((store) => store.createList);
  const isLoading = useSelector((store) => store.indexing.data.isLoading);
  const dispatch = useDispatch();

  const handleAddList = () => {
    if (!isLoggedIn && !createListData.loading) {
      dispatch(ADD_LIST());
    } else if (isLoggedIn) {
      dispatch(
        createList({
          title: `List ${listData.length}`,
        })
      );
    }
  };

  useEffect(() => {
    if (
      createListData.success &&
      !createListData.loading &&
      createListData.data.id
    ) {
      if (listData.find((list) => list.id === createListData.data.id)) {
        return;
      } else {
        dispatch(pushNewList(createListData.data));
      }
    }
  }, [createListData.loading]);

  return (
    <div>
      <h2 className={styles.header}>Your Lists:</h2>
      <div
        className={`${styles.newListButton} ${isLoading && "isLoading"}`}
        onClick={handleAddList}
      >
        +
      </div>
    </div>
  );
};

export default CreateList;
