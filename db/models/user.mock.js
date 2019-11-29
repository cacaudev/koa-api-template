'use strict';

module.exports = (sequelizeMock) => {
  const User = sequelizeMock.define('User',
    {
      id: 'JqBj5Rwe0Z8H4U05wU9yxZE9YeT2X5Bhy2po',
      username: 'testdev',
      password: '$2a$10$pGA9QcTBlIIibT9DcTIHQ.IftaPVQ9GAcXyJURhQYAP97vdFRW1x.',
      name: 'test',
      surname: 'dev',
      age: 26,
      timezone: 'America/Sao_Paulo',
      updatedAt: '2019-11-27T19:06:26.373Z',
      createdAt: '2019-11-27T19:06:26.373Z'
    },
    {
      id: 'fQBXIMXF9AkffJhprKEFob0ONN5pUQTeeoka',
      username: 'thisisatest',
      password: '$2a$12$MOjaG6HbCkTB966I4Qkr7.TJlHdN.RDHPnkxJSkLyc0uymsRhXnqi',
      name: 'Cacau',
      surname: 'Developer',
      age: 26,
      timezone: 'America/Sao_Paulo',
      updatedAt: '2019-11-28T19:06:26.373Z',
      createdAt: '2019-11-28T19:06:26.373Z'
    }
  );

  return User;
};