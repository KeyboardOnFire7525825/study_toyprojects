const API_URL = 'https://trip-wiki-api.vercel.app';

export const request = async(startIdx, region, sortBy, searchWord) => {
  try{
    let url = `${API_URL}`;
    if(region && region !== 'ALL'){
      url += `${region}?start=${startIdx}`;
    }else{
      url += `?start=${startIdx}`;
    }

    if(sortBy){
      url += `&sort=${sortBy}`;
    }

    if(searchWord){
      url += `&sort=${searchWord}`;
    }

    const response = await fetch(url);

    if(response){
      let data = await response.json();

      return data;
    }

  }catch(err){
    console.log(err);
  }

}