// import Cookies from 'js-cookie';
// import jwt from 'jsonwebtoken'; // Assuming you're using jwt for decoding

export const getUserIdFromToken = () => {
    const token = Cookies.get('token');
    console.log(token);

    if (!token) {
        throw new Error('No token found');
    }

    try {
        const decodedToken = jwt.decode(token);
        if (!decodedToken || !decodedToken.userId) {
            throw new Error('Invalid token structure');
        }
        return decodedToken.userId;
    } catch (error) {
        console.error('Error decoding token:', error);
        throw new Error('Invalid token');
    }
};


// const getUserIdFromToken = () => {
//     const token = Cookies.get('token');

//     if (!token) {
//         throw new Error('No token found');
//     }

//     const payload = token.split('.')[1];
//     const decoded = JSON.parse(atob(payload));
    
//     if (!decoded || !decoded.userId) {
//         throw new Error('Invalid token structure');
//     }
//     return decoded.userId;
// };
