import { NextRequest, NextFetchEvent, NextResponse } from 'next/server';

export function middleware(req:NextRequest, ev:NextFetchEvent){

    const id= req.page.params?.id || '';
    
    const mongoDBRegExp= new RegExp('^[0-9a-fA-F]{24}$')

    if(!mongoDBRegExp.test(id)) return new Response(JSON.stringify({message:'Id inválido'}),{
        status:400,
        headers:{
            'Content-Type':'aplication/json'
        }
    })

    return NextResponse.next();

}
