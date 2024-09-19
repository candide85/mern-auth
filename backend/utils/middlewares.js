export const errorHandler = (statusCode, messgae) => {
    const error = new Error()
    error.statusCode = statusCode
    error.message = messgae

    return error
}



export default function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust to your needs
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
    if (req.method === 'OPTIONS') {
      res.status(204).end();
      return;
    }
  
    // Your actual response logic here
    res.status(200).json({ message: 'Hello World' });
  }