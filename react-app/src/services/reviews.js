export const deleteUserReview = async(id) => {
    const response = await fetch(`/api/reviews/${id}`,{
        method: "DELETE"
    });
    return response;
}

export const updateUserReview = async({id, product_id, user_id, content, roast_rating}) => {

    const form = new FormData();
    form.append("product_id", product_id)
    form.append("user_id",user_id)
    form.append("content",content)
    form.append("roast_rating",roast_rating)

    const response = await fetch(`/api/reviews/${id}`,{
        method: "PATCH",
        body: form
    });
    return response;
}

export const getProductReviews = async (id) => {
    const response = await fetch(`/api/products/${id}/reviews`, {});
    return response.json();
}

export const createUserReview = async({ product_id, user_id, content, roast_rating}) => {
    const form = new FormData();
    form.append("product_id", product_id)
    form.append("user_id", user_id)
    form.append("content", content)
    form.append("roast_rating", roast_rating)
    const response = await fetch(`/api/reviews`, {
        method: "POST",
        body: form
    });
    return response;
}