module.exports = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { timestamps: false, tableName: 'BlogPosts' });
  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, {
      as: 'user', //  nome dado a essa relação
      foreignKey: 'userId', // que não precisa usar aqui em cima
    });
  };

  return BlogPost;
};
