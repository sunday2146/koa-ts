'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('category', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: ''
        },
        pid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
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
        tableName: 'category',
        charset: 'utf8mb4',
        collate: 'utf8mb4_bin',
        indexes: [
            {}
        ]
    });
    Category.associate = function (models) {
        this.hasMany(models['cookbook']);
    };
    return Category;
};
//# sourceMappingURL=category.js.map