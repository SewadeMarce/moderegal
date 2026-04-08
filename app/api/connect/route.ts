import pool from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request:NextRequest) {
    const {rows} = await pool.query('SELECT * FROM User;')
return NextResponse.json({
    rows
})
}