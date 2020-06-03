'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      id: '2c5ea4c0-4067-11e9-8bad-9b1deb4d4b7d',
      firstName: 'Test',
      lastName: 'ing',
      username: 'Tester',
      salt: 'much',
      password: '123',
      createdAt: Sequelize.fn('now')
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
