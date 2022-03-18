/**
 *
 * Constructor for timetable generation.
 * Initiates with the Config parameter
 */

class TimeTableWeekDay {
  constructor(config) {
    this.config = config;
  }

  /**
   * Methods used in the instance
   */
  random_arr(i) {
    return i[Math.floor(Math.random() * i.length)];
  }

  getTimetableForClassOne(c) {
    /**
     *
     * functions for class one
     */
    const random_arr = (i) => {
      return i[Math.floor(Math.random() * i.length)];
    };
    function threeCreditUnits(day, i) {
      if (day[0].length == 0 && day[1].length == 0 && day[2].length == 0) {
        day[0].push(course_units[i]);
        day[1].push(course_units[i]);
        day[2].push(course_units[i]);
      } else if (
        day[3].length == 0 &&
        day[4].length == 0 &&
        day[5].length == 0
      ) {
        day[3].push(course_units[i]);
        day[4].push(course_units[i]);
        day[5].push(course_units[i]);
      } else if (
        day[6].length == 0 &&
        day[7].length == 0 &&
        day[8].length == 0
      ) {
        day[6].push(course_units[i]);
        day[7].push(course_units[i]);
        day[8].push(course_units[i]);
      } else if (
        day[2].length == 0 &&
        day[3].length == 0 &&
        day[4].length == 0
      ) {
        day[2].push(course_units[i]);
        day[3].push(course_units[i]);
        day[4].push(course_units[i]);
      } else {
        return "dayfull";
      }
      return day;
    }
    function fourCreditUnits(day, i) {
      if (day[0].length == 0 && day[1].length == 0) {
        day[0].push(course_units[i]);
        day[1].push(course_units[i]);
      } else if (day[2].length == 0 && day[3].length == 0) {
        day[2].push(course_units[i]);
        day[3].push(course_units[i]);
      } else if (day[4].length == 0 && day[5].length == 0) {
        day[4].push(course_units[i]);
        day[5].push(course_units[i]);
      } else if (day[6].length == 0 && day[7].length == 0) {
        day[6].push(course_units[i]);
        day[7].push(course_units[i]);
      } else if (day[3].length == 0 && day[4].length == 0) {
        day[3].push(course_units[i]);
        day[4].push(course_units[i]);
      } else if (day[7].length == 0 && day[8].length == 0) {
        day[7].push(course_units[i]);
        day[8].push(course_units[i]);
      } else if (day[5].length == 0 && day[6].length == 0) {
        day[5].push(course_units[i]);
        day[6].push(course_units[i]);
      } else {
        return "dayfull";
      }
      return day;
      /**
       *
       * functions for class one
       */
    }

    const timetableWeekDay = [
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
    ];
    const course_units = JSON.parse(c.class_course_units);
    for (let i = 0; i < course_units.length; i++) {
      const teacher_days = JSON.parse(
        this.config.teachers.find(
          (v) => v.id == course_units[i].course_unit_teacher
        ).user_available_days
      );
      const credit_units = course_units[i].credit_units;
      if (course_units[i].course_unit_room === "Field") {
      } else {
        if (parseInt(credit_units) == 3) {
          function runDay3() {
            let day = random_arr(timetableWeekDay);
            if (
              !teacher_days.find((el) => el.i == timetableWeekDay.indexOf(day))
            ) {
              runDay3();
            } else {
              let fillDay = threeCreditUnits(day, i);
              if (fillDay == "dayfull") {
                runDay3();
              } else {
                let day_index = timetableWeekDay.indexOf(day);
                timetableWeekDay[day_index] = fillDay;
              }
            }
          }
          runDay3();
        }
        if (parseInt(credit_units) == 4) {
          let c_units = 4;
          function runDay4() {
            let day = random_arr(timetableWeekDay);
            if (
              !teacher_days.find((el) => el.i == timetableWeekDay.indexOf(day))
            ) {
              runDay4();
            } else {
              let fillDay = fourCreditUnits(day, i);
              if (fillDay == "dayfull") {
                runDay4();
              } else {
                let day_index = timetableWeekDay.indexOf(day);
                timetableWeekDay[day_index] = fillDay;
                c_units = c_units === 4 ? c_units - 2 : 0;
                if (c_units == 2) {
                  runDay4();
                }
              }
            }
          }
          runDay4();
        }
      }
    }

    return timetableWeekDay;
  }

  /**
   * @param {array} tt
   * returns timetable for other classes apart from the first one...
   */
  getTimetableForClass(tt, c) {
    const random_arr = (i) => {
      return i[Math.floor(Math.random() * i.length)];
    };
    function threeCreditUnits(day, i, cu) {
      const room = course_units[i].course_unit_room;
      const teacher = course_units[i].course_unit_teacher;
      if (cu == 1) {
        function checkFreePeriod(v, r = room, t = teacher) {
          if (
            !day[v].find((el) => el.r === course_units[i].r) ||
            !day[v].find((el) => el.t === course_units[i].t)
          ) {
            return true;
          } else {
            return false;
          }
        }

        let loop_stop = "";
        for (let loop_value = 0; loop_value < 9; loop_value++) {
          if (checkFreePeriod(loop_value)) {
            day[loop_value].push(course_units[i]);
            loop_stop = true;
            break;
          }
        }
        if (loop_stop) {
          return { v: day, rem: 0 };
        } else {
          return "dayfull";
        }
      } else {
        function checkFreeTime(v, r = room, t = teacher) {
          if (
            (!day[v[0]].find((el) => el.r === course_units[i].r) &&
              !day[v[1]].find((el) => el.r === course_units[i].r) &&
              !day[v[2]].find((el) => el.r === course_units[i].r)) ||
            (!day[v[0]].find((el) => el.t === course_units[i].t) &&
              !day[v[1]].find((el) => el.t === course_units[i].t) &&
              !day[v[2]].find((el) => el.t === course_units[i].t))
          ) {
            return true;
          } else {
            return false;
          }
        }

        if (checkFreeTime([0, 1, 2])) {
          day[0].push(course_units[i]);
          day[1].push(course_units[i]);
          day[2].push(course_units[i]);
        } else if (checkFreeTime([3, 4, 5])) {
          day[3].push(course_units[i]);
          day[4].push(course_units[i]);
          day[5].push(course_units[i]);
        } else if (checkFreeTime([6, 7, 8])) {
          day[6].push(course_units[i]);
          day[7].push(course_units[i]);
          day[8].push(course_units[i]);
        } else if (checkFreeTime([2, 3, 4])) {
          day[2].push(course_units[i]);
          day[3].push(course_units[i]);
          day[4].push(course_units[i]);
        } else {
          return { v: fourCreditUnits(day, i), rem: 1 };
        }
        return { v: day, rem: 0 };
      }
    }
    function fourCreditUnits(day, i) {
      const room = course_units[i].course_unit_room;
      const teacher = course_units[i].course_unit_teacher;
      function checkFreeTime(v, r = room, t = teacher) {
        if (
          (!day[v[0]].find((el) => el.r === course_units[i].r) &&
            !day[v[1]].find((el) => el.r === course_units[i].r)) ||
          (!day[v[0]].find((el) => el.t === course_units[i].t) &&
            !day[v[1]].find((el) => el.t === course_units[i].t))
        ) {
          return true;
        } else {
          return false;
        }
      }

      if (checkFreeTime([0, 1])) {
        day[0].push(course_units[i]);
        day[1].push(course_units[i]);
      } else if (checkFreeTime([2, 3])) {
        day[2].push(course_units[i]);
        day[3].push(course_units[i]);
      } else if (checkFreeTime([4, 5])) {
        day[4].push(course_units[i]);
        day[5].push(course_units[i]);
      } else if (checkFreeTime([6, 7])) {
        day[6].push(course_units[i]);
        day[7].push(course_units[i]);
      } else if (checkFreeTime([3, 4])) {
        day[3].push(course_units[i]);
        day[4].push(course_units[i]);
      } else if (checkFreeTime([7, 8])) {
        day[7].push(course_units[i]);
        day[8].push(course_units[i]);
      } else if (checkFreeTime([5, 6])) {
        day[5].push(course_units[i]);
        day[6].push(course_units[i]);
      } else {
        return "dayfull";
      }
      return day;
      /**
       *
       * functions for class proceeding
       */
    }

    const course_units = JSON.parse(c.class_course_units);
    for (let i = 0; i < course_units.length; i++) {
      const teacher_days = JSON.parse(
        this.config.teachers.find(
          (v) => v.id == course_units[i].course_unit_teacher
        ).user_available_days
      );
      const credit_units = course_units[i].credit_units;
      if (course_units[i].course_unit_room === "Field") {
      } else {
        if (parseInt(credit_units) == 3) {
          function runDay3(cu = 3) {
            let day = random_arr(tt);
            if (!teacher_days.find((el) => parseInt(el.i) == tt.indexOf(day))) {
              runDay3(cu);
            } else {
              let fillDay = threeCreditUnits(day, i, cu);
              if (fillDay == "dayfull") {
                runDay3(cu);
              } else {
                let day_index = tt.indexOf(day);
                tt[day_index] = fillDay.v;
                if (fillDay.rem == 1) {
                  runDay3(1);
                }
              }
            }
          }
          runDay3();
        }
        if (parseInt(credit_units) == 4) {
          let c_units = 4;
          function runDay4() {
            let day = random_arr(tt);
            if (!teacher_days.find((el) => parseInt(el.i) == tt.indexOf(day))) {
              runDay4();
            } else {
              let fillDay = fourCreditUnits(day, i);
              if (fillDay == "dayfull") {
                runDay4();
              } else {
                let day_index = tt.indexOf(day);
                tt[day_index] = fillDay;
                c_units = c_units === 4 ? c_units - 2 : 0;
                if (c_units == 2) {
                  runDay4();
                }
              }
            }
          }
          runDay4();
        }
      }
    }
    return tt;
  }

  /**
   *
   * returns timetable for weekday
   */
  get timeTableWeekDay() {
    let tt = this.getTimetableForClassOne(this.config.classes[0]);
    for (let i = 1; i < this.config.classes.length; i++) {
      tt = this.getTimetableForClass(tt, this.config.classes[i]);
    }

    return tt;
  }
}

module.exports = { TimeTableWeekDay };
