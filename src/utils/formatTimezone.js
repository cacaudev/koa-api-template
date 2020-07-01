/*
  Author: cacaudev
  Date: 14/11/2019
  Description: Parse Basic Authorization Header
  and extract user credentials.
*/
"use strict";

import moment from "moment-timezone";
import config from "../../config";

/**
 * @desc Format timestamp accordingly with a timezone
 * @param {array} timestamp
 * @param {string} timezone
 */
const formatTimezone = async (timestamp, timezone) => {
  const raw_date = moment(timestamp);
  const format_date = ((date) => {
    // Brazil DST
    if (timezone == "America/Sao_Paulo" || timezone == "America/Bahia") {
      return date
        .tz(timezone)
        .add(1, "hours")
        .format(config.date_format_default);
    } else {
      return date
        .tz(timezone)
        .format(config.date_format_default);
    }
  });

  return format_date(raw_date);
};

export { formatTimezone };
