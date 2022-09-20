'use strict';

module.exports = {
  async up (queryInterface, Sequelize) { 
     await queryInterface.createTable('users',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement:true,
        },
        name: {
          allowNull:false,
          type:Sequelize.STRING,
        },
        email: {
          allowNull:false,
          type:Sequelize.STRING,
          field: 'email_un',
          unique: true,       
        },
        password: {
          allowNull:false,
          type:Sequelize.STRING,
        },
        role: {
          allowNull:false,
          type:Sequelize.STRING,
        },
      });     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');     
  }
};
