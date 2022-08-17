module.exports = (sequelize, _ataTypes) => {
  const PostsCategory = sequelize.define('PostsCategory', 
  {},
  { timestamps: false, tableName: 'PostsCategories' });

  PostsCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      foreignKey: 'postId',
      otherKey: 'categoryId',
      through: PostsCategory,
      as: 'categories',
    });
    models.Category.belongsToMany(models.BlogPost, {
      foreignKey: 'categoryId',
      otherKey: 'postId',
      through: PostsCategory,
      as: 'blogPosts',
    });
  };
  
  return PostsCategory;
};
