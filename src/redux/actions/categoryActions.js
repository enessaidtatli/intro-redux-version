import * as actionTypes from "./actionTypes";

export function changeCategories(category) {
  console.log("categoryAction / changeCategories");
  return {
    type: actionTypes.CHANGE_CATEGORY,
    payload: category,
  };
}

export function getCategoriesSuccess(categories) {
  console.log("categoryAction / getCategoriesSuccess");
  return {
    type: actionTypes.GET_CATEGORIES_SUCCESS,
    payload: categories,
  };
}

export function getCategories() {
  console.log("categoryAction / getCategories");
  return function (dispatch) {
    let url = "http://localhost:3004/categories";
    return fetch(url)
      .then((response) => response.json())
      .then((result) => dispatch(getCategoriesSuccess(result)));
  };
}
