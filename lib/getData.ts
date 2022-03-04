import axios from 'axios';
import fs from 'fs';

type JsonRes = {
    id: string
    uid: string
    name: string
    type: string
    description: string
    review: string
    address: string
}

export async function getData() {

    const BASE_URI = "https://random-data-api.com/api";
    const API_ROUTE = "/restaurant/random_restaurant";
    
    const URI = BASE_URI + API_ROUTE;

    let array: any = [];

    for (let i = 0; i < 4; i++) {
        try {
            const params = i === 3 ? "?size=50" : "?size=100";
            const res = await axios.get(URI + params);
            array = array.concat(res.data);
        } catch (error) {
            throw new Error("GET DATA FAILED")
        }
    }

    const jsonArray = {
        data: <JsonRes[]>[],
        totalData: 0
    }

    for (let i in array) {
        let item = array[i];
        jsonArray.data.push({
            id: item.id,
            uid: item.uid,
            name: '#' + i + ' ' + item.name,
            type: item.type,
            address: item.address,
            description: item.description,
            review: item.review,
        })
    }

    jsonArray.totalData = jsonArray.data.length;

    fs.writeFile('data.json', JSON.stringify(jsonArray), (err) => {
        if (err) throw err;
    })
}