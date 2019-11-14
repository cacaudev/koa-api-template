/*
  Author: cacaudev
  Date: 14/11/2019
  Description: Parse Basic Authorization Header
  and extract user credentials.
*/

export async function BasicAuthParser(authHeader) {
  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  return { username, password };
}
