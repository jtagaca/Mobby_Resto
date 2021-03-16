import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.yelp.com/v3/businesses',
    headers: {
        Authorization: 'Bearer PJFWe9gSJBNy3vLRPmeCOLQKoqaUMUD4sU6_KD54PV95i3J-bKerBJAdzr9mo62E1wVYk2JJpvI4xyBvO076IcTEtWcjZwPq6ZjJh_Ln7kLYyjy1HsZEFBGSQcWqX3Yx'
    }
});