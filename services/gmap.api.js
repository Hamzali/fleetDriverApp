import axios from "axios";

const MAP_API_KEY = "AIzaSyDFz1mFqY6E2oiw5X661_Xnah9Wmofh1Ag";
const MODE = 'driving';
const BASE_URL = "https://maps.googleapis.com/maps/api";


/**
 * Google API route parser for poly line method on the map.
 */
const decode = (t,e) => {for(var n,o,u=0,l=0,r=0,d= [],h=0,i=0,a=null,c=Math.pow(10,e||5);u<t.length;){a=null,h=0,i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);n=1&i?~(i>>1):i>>1,h=i=0;do a=t.charCodeAt(u++)-63,i|=(31&a)<<h,h+=5;while(a>=32);o=1&i?~(i>>1):i>>1,l+=n,r+=o,d.push([l/c,r/c])}return d=d.map(function(t){return{latitude:t[0],longitude:t[1]}})};

export const getRoute = async (origin, destination) => {
    const url = `${BASE_URL}/directions/json?origin=${origin}&destination=${destination}&key=${MAP_API_KEY}&mode=${MODE}`;
    const {data} = await axios(url);
    return decode(data.routes[0].overview_polyline.points);
};
