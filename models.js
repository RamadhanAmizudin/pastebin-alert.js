var m = require('moment-timezone');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('paste', {
                pastebin_id: {
                    type: DataTypes.STRING,
                    unique: true
                },
                title: DataTypes.STRING,
                author: DataTypes.STRING,
                ispro_account: {
                    type: DataTypes.BOOLEAN,
                    defaultValue: false
                },
                size: DataTypes.STRING,
                expires: DataTypes.STRING,
                syntax: DataTypes.STRING,
                content: {
                    type: DataTypes.TEXT,
                    allowNull: true
                },
                created: {
                    type: DataTypes.STRING,
                    set: function(val) {
                        this.setDataValue('created', m.tz(val, "dddd do of MMMM YYYY HH:mm:ss", "Asia/Kuala_Lumpur").format());
                    }
                }
        }, {
            underscored: true,
            engine: 'MYISAM'
        });
};
