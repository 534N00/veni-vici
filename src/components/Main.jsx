import React, { useState } from 'react';
import Bans from '../components/Bans';

const Main = () => {
    const url = `https://api.thecatapi.com/v1/images/search?limit=1&has_breeds=1&origin_country_codes=~US`;
    const api_key = "&api_key=live_JwMdDJdFzUQ2CIr762iAB190U37OfILFw3TRYcLta8snNoKKcrxL8Ato98xiTO3D";

    

    const [name, setName] = useState("");
    const [categories, setCategories] = useState([]);
    const [src, setSrc] = useState("");
    const [banList, setBanList] = useState([]);
    const [urlBans, setUrlBans] = useState([]);
    const [data, setData] = useState({});

    const getCat = async () => {
        console.log("click");
        try {
            let s = "";
            urlBans.forEach((item) => {s += item});
            const response = await fetch(url + s + api_key);
            const data = await response.json();
            setData(data);
            // console.log(data);
            setName(data[0].breeds[0].name);
            setCategories([data[0].breeds[0].weight.imperial, data[0].breeds[0].origin, data[0].breeds[0].life_span]); // weight, origin, life_span
            setSrc(data[0].url);
        } catch (error) {
            console.log(error);
        }
    };

    const handleBan = (toBan, n) => {
        setBanList([...banList, toBan]);
        if (n === 0) {
            setUrlBans([...urlBans, "&weight_imperial=~" + data[0].breeds[0].weight.imperial]);
        } else if (n === 1) {
            setUrlBans([...urlBans, "&origin_country_codes=~" + data[0].breeds[0].country_code]);
        } else {
            setUrlBans([...urlBans, "&life_span=~" + data[0].breeds[0].life_span]);
        }
        
    };

    const handleUnban = (toUnban) => {
        setBanList(banList.filter((item) => item !== toUnban));
    };

    return (
        <>
        <div className="Main">
            <h1>Cat Exposure Therapy</h1>
            <p>Cats are friendlier than you think. Let&rsquo;s meet some.</p>
            <h3>This is a(n) {name}.</h3>
            <img src={src}/>
            <div>
                <button onClick={() => handleBan(categories[0], 0)}>Weight: {categories[0]} lbs.</button>
                <button onClick={() => handleBan(categories[1], 1)}>Origin: {categories[1]}</button>
                <button onClick={() => handleBan(categories[2], 2)}>Lifespan: {categories[2]} yrs.</button>
            </div>
            
            <button id="meet" onClick={getCat}>Meet Another!</button>
        </div>
        <Bans list={banList} onClick={handleUnban}/>
        </>
    );
};

export default Main;
