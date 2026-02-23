export const SETTINGS = {
    PORT: process.env.PORT || 5003,
    // Приоритет переменной из Vercel
    MONGO_URL: process.env.MONGO_URL || 'mongodb+srv://fljx:DMtDKmIa9Flan8h5@cluster0.kkaodex.mongodb.net/h03_database?retryWrites=true&w=majority&appName=Cluster0',
    DB_NAME: process.env.DB_NAME || 'h03_database',
};