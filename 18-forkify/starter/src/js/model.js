export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const res = await fetch(
      // 'https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcc40'
      `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
    );

    const data = await res.json();

    if (!res.ok)
      throw new Error(`${data.message} - Status code: (${res.status})`);

    const { recipe } = data.data;
    state.recipe = {
      title: recipe.title,
      cookingTime: recipe.cooking_time,
      id: recipe.id,
      imageUrl: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
    };
  } catch (err) {
    console.error(err);
  }
};
