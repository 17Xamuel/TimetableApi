const e = require("express");

/**
 *
 * overral timetable manupilation done here
 */
class TimeTable {
  constructor(config) {
    this.config = config;
  }

  get errors() {
    return {
      class_error: "Error With class List",
    };
  }

  /**
   *
   * Describes the day and the periods available on the day
   */
  day() {
    let day = {
      8_9: {},
      9_10: {},
      10_11: {},
      11_12: {},
      12_1: {},
      1_2: {},
      2_3: {},
      3_4: {},
      4_5: {},
    };
    return day;
  }

  /**
   *
   * combines days to make one week for day lectures
   */
  dayWeek() {
    let week = {
      monday: this.day(),
      tuesday: this.day(),
      wednesday: this.day(),
      thursday: this.day(),
      friday: this.day(),
    };

    return week;
  }
  /**
   *
   * combines days to make one week for weekend lectures
   */
  weekendWeek() {
    let week = {
      saturday: this.day(),
      sunday: this.day(),
    };

    return week;
  }

  /**
   * Checks correct data type
   */
  datatype(i) {
    return typeof i == "object" && i.length > 1;
  }
  random(i) {}
  random_arr(i) {
    return i[Math.floor(Math.random() * i.length)];
  }

  /**
   *
   * @param {array} i
   * @returns classes not checked on the timetable
   */
  getRandomClass(i) {
    const items = i.filter((el) => el.done == false);
    return items[Math.floor(Math.random() * items.length)];
  }

  /**
   *
   * @param {array} i
   * @returns course units for a given class
   */
  getCourseUnitsForRandomClass(i) {
    const course_units = this.config.course_units || [];
    return course_units.filter((e) =>
      e.classes.find((el) => el.class_code === i.class_code)
    );
  }

  /**
   *
   * @param {object} c class
   * @param {array} cu course unit
   * @param {array} tt current timetable
   */
  getTimetableForClass(c, cu, tt) {
    if (tt.length === 5) {
      let random_day = this.random_arr(tt);

      for (let i = 0; i < cu.length; i++) {
        let teacher = cu[i].course_unit_teacher;
        let teacher_available = this.config.teachers.find(
          (el) => el.id == teacher
        );
        if (teacher_available.days.includes(tt.indexOf(random_day))) {
        }
      }
    }
  }
  /**
   * General Timetable for all classes.
   */
  get timetable() {
    /**
     * check and get classes
     */
    const classes = this.config.classes || [];
    let random_class, active_class;

    if (!this.datatype(classes)) {
      return ["Error", this.errors.class_error];
    } else {
      random_class = this.random(classes);
    }

    /**
     * check and get course-units for a class
     */

    /**
     *
     * Manupilate the course units
     */
    random_class_course_units.forEach((el) => {
      let day = this.random_arr(timetableWeekDay);
      const doneDays = [];
      doneDays.push(day);
    });

    const timetableWeekDay = [
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
    ];
    const timetableWeekend = [
      [[], [], [], [], [], [], [], [], []],
      [[], [], [], [], [], [], [], [], []],
    ];

    return;
  }
}

module.exports = TimeTable;
