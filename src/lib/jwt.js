import { SignJWT, decodeJwt, jwtVerify  } from "jose";

export function getJwtSecret() {
    return process.env.JWT_SECRET || ''
}

export async function generateAccessToken(userId) {
    return await new SignJWT({
        userId
    })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(new TextEncoder().encode(getJwtSecret()))
}

export async function verifyToken(token) {
    if (!token) return false;

    try {
        await jwtVerify(token, new TextEncoder().encode(getJwtSecret()));
        
        return true;
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return false;
        }

        return false;
    }
}

export async function decodeToken(token) {
    const isValid = await verifyToken(token);

    if(!isValid) return false;

    return decodeJwt(token)
}