export const getRoaster = async (id) => {
    const response = await fetch(`/api/roasters/${id}`, {});
    return response.json();
}