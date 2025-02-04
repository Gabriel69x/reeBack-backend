const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    try {
        // Obtener token del header
        const token = req.header('Authorization');
        console.log("🟢 Token recibido en el middleware:", token);

        if (!token) {
            console.log("🔴 No se recibió token en la solicitud");
            return res.status(401).json({ message: 'Acceso no autorizado, token requerido' });
        }

        // Validar el formato del token (Debe ser "Bearer <token>")
        const tokenParts = token.split(" ");
        if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
            console.log("🔴 Formato de token inválido:", tokenParts);
            return res.status(401).json({ message: "Formato de token inválido" });
        }

        const extractedToken = tokenParts[1];
        console.log("🔍 Token extraído:", extractedToken);

        // Validar que JWT_SECRET esté definido
        if (!process.env.JWT_SECRET) {
            console.log("🔴 ERROR: JWT_SECRET no está definido en el entorno");
            return res.status(500).json({ message: "Error interno: JWT_SECRET no está configurado" });
        }

        // Decodificar el token
        const decoded = jwt.verify(extractedToken, process.env.JWT_SECRET);
        console.log("✅ Token decodificado correctamente:", decoded);

        // Asegurar que req.user tiene los datos correctos
        if (!decoded || !decoded.id) {
            console.log("🔴 Error: Token decodificado pero sin ID válido");
            return res.status(401).json({ message: "Token inválido o corrupto" });
        }

        req.User = decoded;
        console.log("📌 req.user asignado correctamente:", req.User);
        next();
    } catch (error) {
        console.error("🔴 Error al verificar el token:", error.message);
        return res.status(401).json({ message: 'Token inválido', error: error.message });
    }
};

module.exports = { authMiddleware };
