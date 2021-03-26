export const getProductImages = async(id) => {
    const response = await fetch(`/api/products/${id}/images`,{})
    return response.json();
}