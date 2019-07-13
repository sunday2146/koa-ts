"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const md5 = require("md5");
'use strict';
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('user', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        username: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false,
            defaultValue: ''
        },
        password: {
            type: DataTypes.CHAR(32),
            allowNull: false,
            defaultValue: '',
            set(val) {
                return md5(val);
            }
        },
        disabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        mobile: {
            type: DataTypes.CHAR(12),
            unique: true,
            allowNull: false,
            defaultValue: ''
        },
        email: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false,
            defaultValue: ''
        },
        createdIpAt: {
            type: DataTypes.CHAR(15),
            allowNull: false,
            field: 'created_ip_at',
            defaultValue: ''
        },
        updatedIpAt: {
            type: DataTypes.CHAR(15),
            allowNull: false,
            field: 'updated_ip_at',
            defaultValue: ''
        },
        createdAt: {
            allowNull: false,
            type: DataTypes.DATE,
            field: 'created_at'
        },
        updatedAt: {
            allowNull: false,
            type: DataTypes.DATE,
            field: 'updated_at'
        }
    }, {
        tableName: 'user',
        charset: 'utf8mb4',
        collate: 'utf8mb4_bin',
        indexes: [
            {}
        ],
        defaultScope: {
            attributes: {
                exclude: ['password']
            }
        },
        scopes: {
            zmouse: {
                limit: 1
            }
        }
    });
    User.associate = function (models) {
        this.hasOne(models['user-profile']);
        this.hasMany(models['login-log']);
        this.hasMany(models['favorite']);
        this.hasMany(models['cookbook']);
        this.hasMany(models['comment']);
    };
    return User;
};
//# sourceMappingURL=user.js.map