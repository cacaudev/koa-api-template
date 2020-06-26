/*
 * @Author: cacaudev
 * @Date: 2020-06-26 16:23:23
 * @Last Modified by: cacaudev
 * @Last Modified time: 2020-06-26 16:32:40
 */
"use strict";

/**
 * @des Generate pagination range
 * @param {*} pageNumber
 * @param {*} pageSize
 * @returns {Object.offset} Offset -  Beginning of records range
 * @returns {Object.limit} Limit - Limit of records per page
 */
const Paginate = async (pageNumber, pageSize) => {
  // Page index starts from 1 not 0
  if (pageNumber == 0) pageNumber = 1;
  const limit = pageSize;
  const offset = pageSize * (pageNumber - 1);
  return { offset, limit };
};

export { Paginate };
