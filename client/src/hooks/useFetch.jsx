import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_GIPHY_API;

const useFetch = ({keyword}) => {
    const [gifUrl, setgifUrl] = useState("");

    const fetchGifs = async () =>{
        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${keyword.split(" ").join("")}&limit=1`);
            const { data } = await response.json();
            console.log('data : ', data, keyword);
            if(data[0]){
                setgifUrl(data[0]?.images?.downsized_medium?.url);
            }else{
                setgifUrl('https://i.pinimg.com/originals/73/d3/a1/73d3a14d212314ab1f7268b71d639c15.gif')
            }
        } catch (error) {
            setgifUrl('https://i.pinimg.com/originals/68/a0/9e/68a09e774e98242871c2db0f99307420.gif')
        }
    }
    useEffect(() => {
       if(keyword) fetchGifs();
    }, [keyword]);
    return gifUrl;
}

export default useFetch;