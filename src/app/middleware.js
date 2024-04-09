/* import { getUserSession } from "../lib/data";
import { NextResponse, NextRequest } from "next/server";


export default async function middleware(req, res, next) {
    const user = await getUserSession()

    if(!user) {
        return NextResponse.redirect(new URL('/', req.url))
    } 

    return NextResponse.next();
} */

/* import { getUserSession } from "../lib/data";
import { NextResponse } from "next/server";

export default async function middleware(req, res, next) {

    if(req.nextUrl.pathname.startsWith("/admin") || req.nextUrl.pathname.startsWith("/temp")) {
        const user = await getUserSession()

        if(!user) return NextResponse.redirect(new URL ('/', req.url));
    }
    return NextResponse.next();
}  */ 