/*
 * @Author: cacaudev
 * @Date: 2020-07-07 11:47:32
 * @Last Modified by: cacaudev
 * @Last Modified time: 2020-07-08 09:36:04
 */
"use strict";
import moment from "moment-timezone";
import config from "../config";

class DateFormatter {
  /**
   * @class
   * @desc Format date with moment.js and selected timezone
   * @param {*} timestamp
   * @param {*} timezone
   */
  constructor(timestamp = new Date(), timezone = "America/Sao_Paulo") {
    this.date = moment.utc(timestamp);
    this.timezone = timezone;
  }

  isDateWithoutTime() {
    return this.date.format("HH") == "00" ? true : false;
  }

  /**
   * @desc Format timestamp accordingly with or by a timezone
   */
  formatDate() {
    if (this.isDateWithoutTime())
      return this.formatWithTimezone();
    else
      return this.formatByTimezone();
  }

  formatByTimezone() {
    let finalDate = null;
    // add one hour because of bug on momentjs with this timezone
    if (this.timezone == "America/Sao_Paulo" || this.timezone == "America/Bahia") {
      finalDate = this.date
        .tz(this.timezone)
        .add(1, "hours")
        .format();
    } else {
      finalDate = this.date
        .tz(this.timezone)
        .format();
    }
    return finalDate;
  }

  formatWithTimezone() {
    let serverDate = this.date.format();
    const date = serverDate.substring(0, 10).split("-");
    const year = date[0];
    const month = date[1] - 1;
    const day = date[2];
    const dateArray = [year, month, day];
    return moment
      .tz(dateArray, this.timezone)
      .format(config.date_format_default);
  }
}

module.exports = { DateFormatter };
