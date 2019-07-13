'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
module.exports = (sequelize, DataTypes) => {
    const Favorite = sequelize.define('favorite', {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        cookbookId: {
            type: DataTypes.INTEGER,
            field: 'cookbook_id',
            allowNull: false,
            defaultValue: 0,
            references: {
                model: 'cookbook',
                key: 'id'
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            field: 'user_id',
            allowNull: false,
            defaultValue: 0,
            references: {
                model: 'User',
                key: 'id'
            }
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
        tableName: 'favorite',
        charset: 'utf8mb4',
        collate: 'utf8mb4_bin',
        indexes: [
            {}
        ]
    });
    Favorite.associate = function (models) {
        this.belongsTo(models['user'], {
            foreignKey: 'userId'
        });
        this.belongsTo(models['cookbook'], {
            foreignKey: 'cookbookId'
        });
    };
    return Favorite;
};
//# sourceMappingURL=favorite.js.map