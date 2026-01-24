const API_URL = 'https://rickandmortyapi.com/api/character'

export const getCharacters = async (page = 1) => {
  try {
    const response = await fetch(`${API_URL}?page=${page}`)
    if (!response.ok) throw new Error(response.status);
    const data = await response.json()
    return data;
  } catch (error) {
    console.log(error.message)
    throw error
  }
}

export const getSingleCharacter = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    if (!response.ok) throw new Error(response.status);
    return await response.json();
  } catch (error) {
    console.log(error.message)
    throw error
  }
}
