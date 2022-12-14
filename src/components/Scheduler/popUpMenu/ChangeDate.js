/** @format */

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./popUpMenu.module.css";
import { ADD_DATE_LIST } from "../Todo/todoSlice";
import { resetState, setCalendarMenu } from "./popupMenuSlice";
import Calendar from "react-calendar";
import { POPUPVISIBILITY } from "../indexingSlice";
import { patchList } from "../apiScheduler/patchListSlice";
import getSimpleDateFormat from "../SimpleDateFormatter";
import { changeListDateInter } from "../apiScheduler/getListSlice";

const ChangeDate = () => {
  const dispatch = useDispatch();
  const indexingData = useSelector((store) => store.indexing.data);
  const subMenu = useSelector((store) => store.subMenu.data);
  const [calendarPick, setCalendarPick] = useState(new Date());
  const isLoggedIn = useSelector((store) => store.indexing.data.isLoggedIn);
  const listData = useSelector((store) => store.getList.data);
  const currentListId = isLoggedIn ? listData[indexingData.listIndex].id : null;

  useEffect(() => {
    addDate("calendar");
  }, [calendarPick]);

  Date.prototype.yyyymmdd = function () {
    var mm = this.getMonth() + 1;
    var dd = this.getDate();

    return [
      this.getFullYear(),
      (mm > 9 ? "" : "0") + mm,
      (dd > 9 ? "" : "0") + dd,
    ]
      .join("/")
      .substr(2);
  };

  const addDate = (opt) => {
    if (!isLoggedIn) {
      if (opt === "current") {
        dispatch(
          ADD_DATE_LIST({
            index: indexingData.listIndex,
            newData: `${new Date().yyyymmdd()} `,
          })
        );
      } else if (opt === "clear") {
        dispatch(
          ADD_DATE_LIST({
            index: indexingData.listIndex,
            newData: ``,
          })
        );
      } else if (opt === "calendar" && subMenu.confCalM) {
        dispatch(
          ADD_DATE_LIST({
            index: indexingData.listIndex,
            newData: `${calendarPick.yyyymmdd()} `,
          })
        );
      } else return;
    } else if (isLoggedIn) {
      if (opt === "current") {
        dispatch(
          patchList({
            title: currentListId,
            data: {
              reminder_at: getSimpleDateFormat(new Date()),
            },
          })
        );
        dispatch(
          changeListDateInter({
            index: indexingData.listIndex,
            data: getSimpleDateFormat(new Date()),
          })
        );
      } else if (opt === "clear") {
        dispatch(
          patchList({
            title: currentListId,
            data: {
              reminder_at: `0000-01-01T00:00:00+00:00`,
            },
          })
        );
        dispatch(
          changeListDateInter({
            index: indexingData.listIndex,
            data: ``,
          })
        );
      } else if (opt === "calendar" && subMenu.confCalM) {
        dispatch(
          patchList({
            title: currentListId,
            data: {
              reminder_at: getSimpleDateFormat(calendarPick),
            },
          })
        );
        dispatch(
          changeListDateInter({
            index: indexingData.listIndex,
            data: getSimpleDateFormat(calendarPick),
          })
        );
      } else return;
    }
    dispatch(resetState());
    dispatch(POPUPVISIBILITY(false));
  };

  return (
    <>
      <div
        className={`${styles.confirmTab} ${styles.confirmTabAd}`}
        style={{
          height: `auto`,
          padding: `10px 0px`,
          width: `auto`,
        }}
      >
        <div>
          <div
            className={styles.todaysDateButton}
            onClick={() => addDate("current")}
          >
            Add today's date
          </div>

          <div
            className={styles.pickDateButton}
            onClick={() => {
              dispatch(setCalendarMenu(!subMenu.confCalM));
            }}
          >
            Pick a date
          </div>
          <div
            className={styles.clearDateButton}
            onClick={() => addDate("clear")}
          >
            Clear Date
          </div>
          {subMenu.confCalM && (
            <div className={styles.calendar}>
              <Calendar onChange={setCalendarPick} value={calendarPick} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ChangeDate;
