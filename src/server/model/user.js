import bcrypt from 'bcrypt';

module.exports = (sequelize, DataTypes) => {
    var Users = sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: DataTypes.STRING(200),
        phone_number: DataTypes.STRING(12),
        email:
        {
            type: DataTypes.STRING(45),
            required: true

        },
        password:
        {
            type: DataTypes.STRING(150),
            //required: true

        },
        address: DataTypes.TEXT,
        city: DataTypes.STRING(100),
        state: DataTypes.STRING(100),
        description: DataTypes.TEXT,
        created_by: DataTypes.INTEGER,
        user_type: {
            type: DataTypes.ENUM,
            values: ['Admin']
        },
        status: {
            type: DataTypes.ENUM,
            values: ['active', 'inactive', 'deleted']
        }
    }, {
            timestamps: false,
            underscored: true
        },

    );

    return Users;
}

