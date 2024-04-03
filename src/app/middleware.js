'use server'
import { getUserSession } from "../lib/data";
import { NextResponse } from "next/server";

export default async function middleware(req, res, next) {
    const user = await getUserSession()

    if(!user) {
        return redirect('/');
    } 

    next();
}