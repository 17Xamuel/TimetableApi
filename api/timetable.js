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
    const random_arr = (i, v) => {
      if (v[0].i == 7) {
        return i[Math.floor(Math.random() * i.length)];
      } else if (v.length > 0 && v.length < 6) {
        let new_array = i.filter((el) =>
          Boolean(v.find((elem) => elem.i == i.indexOf(el)))
        );
        return new_array[Math.floor(Math.random() * new_array.length)];
      } else {
        return i[Math.floor(Math.random() * i.length)];
      }
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
            let day = random_arr(timetableWeekDay, teacher_days);

            let fillDay = threeCreditUnits(day, i);
            if (fillDay == "dayfull") {
              runDay3();
            } else {
              let day_index = timetableWeekDay.indexOf(day);
              timetableWeekDay[day_index] = fillDay;
            }
          }
          runDay3();
        }
        if (parseInt(credit_units) == 4) {
          let c_units = 4;
          function runDay4() {
            let day = random_arr(timetableWeekDay, teacher_days);
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
    function threeCreditUnits(day, room, teacher, cu) {
      if (cu == 1) {
        function checkFreePeriod(v) {
          if (
            !day[v].find((el) => el.course_unit_room === room) &&
            !day[v].find((el) => el.course_unit_teacher === teacher)
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
        function checkFreeTime(v) {
          if (
            !day[v[0]].find((el) => el.course_unit_room === room) &&
            !day[v[1]].find((el) => el.course_unit_room === room) &&
            !day[v[2]].find((el) => el.course_unit_room === room) &&
            !day[v[0]].find((el) => el.course_unit_teacher === teacher) &&
            !day[v[1]].find((el) => el.course_unit_teacher === teacher) &&
            !day[v[2]].find((el) => el.course_unit_teacher === teacher)
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
          return { v: fourCreditUnits(day, room, teacher), rem: 1 };
        }
        return { v: day, rem: 0 };
      }
    }
    function fourCreditUnits(day, room, teacher) {
      function checkFreeTime(v) {
        if (
          !day[v[0]].find((el) => el.course_unit_room === room) &&
          !day[v[1]].find((el) => el.course_unit_room === room) &&
          !day[v[0]].find((el) => el.course_unit_teacher === teacher) &&
          !day[v[1]].find((el) => el.course_unit_teacher === teacher)
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
    let tt_with_teacher_days = [];
    for (let i = 0; i < course_units.length; i++) {
      let teacher_days = JSON.parse(
        this.config.teachers.find(
          (v) => v.id == course_units[i].course_unit_teacher
        ).user_available_days
      );

      if (parseInt(teacher_days[0].i) == 7) {
        tt_with_teacher_days = tt;
      } else {
        for (let teacher_day; teacher_day < teacher_days.length; j++) {
          tt_with_teacher_days = [
            ...tt.filter((el, i) => i == teacher_days[teacher_day].i)[0],
          ];
        }
      }

      const credit_units = parseInt(course_units[i].credit_units);
      if (course_units[i].course_unit_room === "Field") {
      } else {
        if (credit_units == 3) {
          let c_units = 3;
          function runDay3(cu) {
            for (let k = 0; k < tt_with_teacher_days.length; k++) {
              let fillDay = threeCreditUnits(
                tt_with_teacher_days[k],
                course_units[i].course_unit_room,
                course_units[i].course_unit_teacher,
                cu
              );
              if (fillDay == "dayfull") {
                continue;
              } else {
                tt_with_teacher_days[k] = fillDay.v;
                c_units = c_units === 3 ? 1 : 0;
                break;
              }
            }
          }
          runDay3(c_units);

          if (c_units == 1) {
            runDay3(1);
          }
        }
        if (credit_units == 4) {
          let c_units = 4;
          function runDay4() {
            for (let k = 0; k < tt_with_teacher_days.length; k++) {
              let fillDay = fourCreditUnits(
                tt_with_teacher_days[k],
                course_units[i].course_unit_room,
                course_units[i].course_unit_teacher
              );
              if (fillDay == "dayfull") {
                continue;
              } else {
                tt_with_teacher_days[k] = fillDay;
                c_units = c_units === 4 ? c_units - 2 : 0;
                break;
              }
            }
          }
          runDay4();
          if (c_units == 2) {
            runDay4();
          }
        }
      }
    }
    return tt_with_teacher_days;
  }

  /**
   *
   * returns timetable for weekday
   */
  //   get timeTableWeekDay() {
  //     let tt = this.getTimetableForClassOne(this.config.classes[0]);
  //     for (let i = 1; i < this.config.classes.length; i++) {
  //       tt = this.getTimetableForClass(tt, this.config.classes[i]);
  //     }

  //     return tt;
  //   }
}

module.exports = { TimeTableWeekDay };
