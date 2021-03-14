export const getUserProfile = async(username) => {
    const response = await fetch(`/api/profile/${username}`,{
    })
    return await response.json();
}