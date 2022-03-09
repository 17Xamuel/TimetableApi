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
    const timetableWeekDay = [
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
    ];
    const course_units = JSON.parse(c.class_course_units);
    for (let i = 0; i < course_units.length; i++) {
      const credit_units = course_units[i].credit_units;
      if (course_units[i].course_unit_room !== "Field") {
      } else {
        if (parseInt(credit_units) == 3) {
          function runDay3() {
            let day = random_arr(timetableWeekDay);
            let fillDay = threeCreditUnits(day);
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
            let day = random_arr(timetableWeekDay);
            let fillDay = fourCreditUnits(day);
            if (fillDay == "dayfull") {
              runDay4();
            } else {
              let day_index = timetableWeekDay.indexOf(day);
              timetableWeekDay[day_index] = fillDay;
              c_units = c_units == 4 ? c_units - 2 : 0;
              if (c_units == 2) {
                runDay4();
              }
            }
          }
          runDay4();
        }
      }
    }

    /**
     *
     * functions for class one
     */
    const random_arr = (i) => {
      return i[Math.floor(Math.random() * i.length)];
    };
    function threeCreditUnits(day) {
      if (day[0].length == 0 && day[1].length == 0 && day[2].length == 0) {
        day[0].push({ course_unit: course_units[i].id });
        day[1].push({ course_unit: course_units[i].id });
        day[2].push({ course_unit: course_units[i].id });
      } else if (
        day[3].length == 0 &&
        day[4].length == 0 &&
        day[5].length == 0
      ) {
        day[3].push({ course_unit: course_units[i].id });
        day[4].push({ course_unit: course_units[i].id });
        day[5].push({ course_unit: course_units[i].id });
      } else if (
        day[6].length == 0 &&
        day[7].length == 0 &&
        day[8].length == 0
      ) {
        day[6].push({ course_unit: course_units[i].id });
        day[7].push({ course_unit: course_units[i].id });
        day[8].push({ course_unit: course_units[i].id });
      } else if (
        day[2].length == 0 &&
        day[3].length == 0 &&
        day[4].length == 0
      ) {
        day[2].push({ course_unit: course_units[i].id });
        day[3].push({ course_unit: course_units[i].id });
        day[4].push({ course_unit: course_units[i].id });
      } else {
        return "dayfull";
      }
      return day;
    }
    function fourCreditUnits(day) {
      if (day[0].length == 0 && day[1].length == 0) {
        day[0].push({ course_unit: course_units[i].id });
        day[1].push({ course_unit: course_units[i].id });
      } else if (day[2].length == 0 && day[3].length == 0) {
        day[2].push({ course_unit: course_units[i].id });
        day[3].push({ course_unit: course_units[i].id });
      } else if (day[4].length == 0 && day[5].length == 0) {
        day[4].push({ course_unit: course_units[i].id });
        day[5].push({ course_unit: course_units[i].id });
      } else if (day[6].length == 0 && day[7].length == 0) {
        day[6].push({ course_unit: course_units[i].id });
        day[7].push({ course_unit: course_units[i].id });
      } else if (day[3].length == 0 && day[4].length == 0) {
        day[3].push({ course_unit: course_units[i].id });
        day[4].push({ course_unit: course_units[i].id });
      } else if (day[7].length == 0 && day[8].length == 0) {
        day[7].push({ course_unit: course_units[i].id });
        day[8].push({ course_unit: course_units[i].id });
      } else if (day[5].length == 0 && day[6].length == 0) {
        day[5].push({ course_unit: course_units[i].id });
        day[6].push({ course_unit: course_units[i].id });
      } else {
        return "dayfull";
      }
      return day;
      /**
       *
       * functions for class one
       */
    }

    return timetableWeekDay;
  }

  /**
   * @param {array} tt
   * returns timetable for other classes apart from the first one...
   */
  getTimetableForClass(tt) {
    return tt;
  }

  /**
   *
   * returns timetable for weekday
   */
  get timeTableWeekDay() {
    return this.getTimetableForClassOne(this.config.classes[0]);
  }
}

module.exports = { TimeTableWeekDay };
