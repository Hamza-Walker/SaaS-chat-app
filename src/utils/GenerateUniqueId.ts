// Function to generate unique id
export const generateUniqueId = (length = 16) => {
    return parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(length).toString().replace(".", ""));
   };
   