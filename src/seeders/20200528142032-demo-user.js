'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', [{
      id: '2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d',
      firstName: 'John',
      lastName: 'Doe',
      username: 'Doe',
      salt: 'Doe',
      password: 'Doe',
      createdAt: Sequelize.fn('now')
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
