/**
 * Author: cacaudev
 * Date: 29/11/19
 */
'use strict';

/**
 * @des Generate pagination range
 * @param {*} pageNumber
 * @param {*} pageSize
 * @returns {Object.offset} Offset -  Beginning of records range
 * @returns {Object.limit} Limit - Limit of records per page
 */
export async function Paginate(pageNumber, pageSize) {
  // Page index starts from 1 not 0
  if (pageNumber == 0) pageNumber = 1;
  const limit = pageSize;
  const offset = pageSize * (pageNumber - 1);
  return { offset, limit };
}
