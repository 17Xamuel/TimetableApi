/**
 *
 * Constructor for timetable generation.
 * Initiates with the Config parameter
 */

class TimeTableWeekDay_1 {
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
        ).teacher_available_days
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
        ).teacher_available_days
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
  get timeTableWeekDay() {
    let tt = this.getTimetableForClassOne(this.config.classes[0]);
    for (let i = 1; i < this.config.classes.length; i++) {
      tt = this.getTimetableForClass(tt, this.config.classes[i]);
    }

    return tt;
  }
}

class TimeTableWeekDay {
  constructor(config) {
    this.config = config;
  }

  pushCourseUnit(c, tt) {
    let tt_error_check = tt;
    try {
      const random_arr = (i) => {
        return i[Math.floor(Math.random() * i.length)];
      };

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

          let loop_stop = false;
          for (let loop_value = 0; loop_value < 9; loop_value++) {
            if (checkFreePeriod(loop_value)) {
              day[loop_value].push(c);
              loop_stop = true;
              break;
            }
          }
          if (loop_stop) {
            return { v: day, rem: 0 };
          } else {
            return { v: "dayfull", rem: 1 };
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
            day[0].push(c);
            day[1].push(c);
            day[2].push(c);
          } else if (checkFreeTime([3, 4, 5])) {
            day[3].push(c);
            day[4].push(c);
            day[5].push(c);
          } else if (checkFreeTime([6, 7, 8])) {
            day[6].push(c);
            day[7].push(c);
            day[8].push(c);
          } else if (checkFreeTime([2, 3, 4])) {
            day[2].push(c);
            day[3].push(c);
            day[4].push(c);
          } else if (checkFreeTime([1, 2, 3])) {
            day[1].push(c);
            day[2].push(c);
            day[3].push(c);
          } else if (checkFreeTime([4, 5, 6])) {
            day[4].push(c);
            day[5].push(c);
            day[6].push(c);
          } else if (checkFreeTime([5, 6, 7])) {
            day[5].push(c);
            day[6].push(c);
            day[7].push(c);
          } else {
            let rem_ = fourCreditUnits(day, room, teacher);
            return {
              v: rem_,
              rem: rem_ == "dayfull" ? 3 : 1,
            };
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
          day[0].push(c);
          day[1].push(c);
        } else if (checkFreeTime([2, 3])) {
          day[2].push(c);
          day[3].push(c);
        } else if (checkFreeTime([4, 5])) {
          day[4].push(c);
          day[5].push(c);
        } else if (checkFreeTime([6, 7])) {
          day[6].push(c);
          day[7].push(c);
        } else if (checkFreeTime([3, 4])) {
          day[3].push(c);
          day[4].push(c);
        } else if (checkFreeTime([7, 8])) {
          day[7].push(c);
          day[8].push(c);
        } else if (checkFreeTime([5, 6])) {
          day[5].push(c);
          day[6].push(c);
        } else if (checkFreeTime([1, 2])) {
          day[1].push(c);
          day[2].push(c);
        } else {
          return "dayfull";
        }
        return day;
        /**
         *
         * functions for class proceeding
         */
      }

      let teacher_days = JSON.parse(
        this.config.teachers.find((v) => v.id == c.course_unit_teacher)
          .teacher_available_days
      );

      let tt_days =
        parseInt(teacher_days[0].i) == 7
          ? tt
          : tt.filter((el, i) => Boolean(teacher_days.find((el) => el.i == i)));
      const credit_units = parseInt(c.credit_units);
      if (credit_units == 3) {
        let c_units = 3;
        function runDay3(cu) {
          let random_day = random_arr(tt_days);
          let fillDay = threeCreditUnits(
            random_day,
            c.course_unit_room,
            c.course_unit_teacher,
            cu
          );
          if (fillDay.v == "dayfull") {
            runDay3(cu);
          } else {
            tt_days[tt_days.indexOf(random_day)] = fillDay.v;
            c_units = fillDay.rem;
          }
          if (c_units == 1) {
            runDay3(1);
          }
        }
        runDay3(c_units);
      }
      if (credit_units == 4) {
        let c_units = 4;
        function runDay4() {
          const random_day = random_arr(tt_days);
          let fillDay = fourCreditUnits(
            random_day,
            c.course_unit_room,
            c.course_unit_teacher
          );
          if (fillDay == "dayfull") {
            runDay4();
          } else {
            tt_days[tt_days.indexOf(random_day)] = fillDay;
            c_units = c_units === 4 ? c_units - 2 : 0;
          }
          if (c_units == 2) {
            runDay4();
          }
        }
        runDay4();
      }

      for (let i = 0; i < tt_days; i++) {
        tt[tt.indexOf(tt_days[i])] = tt_days[i];
      }

      return { timetable: tt, err: false };
    } catch (error) {
      console.log(error);
      return { timetable: tt_error_check, err: true };
    }
  }

  get timeTableWeekDay() {
    let course_units = this.config.course_units.filter(
      (el) => el.course_unit_semester === this.config.semester
    );
    let missed_course_units = [];
    let tt = this.pushCourseUnit(course_units[0], [
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
    ]);
    for (let i = 1; i < course_units.length; i++) {
      if (tt.err) {
        missed_course_units.push(course_units[i - 1]);
      } else {
        tt = this.pushCourseUnit(course_units[i], tt.timetable);
      }
    }
    return { timetable: tt, missed_course_units };
  }
}
module.exports = { TimeTableWeekDay };
