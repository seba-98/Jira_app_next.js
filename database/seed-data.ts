import { ISeedEntry } from "../interfaces"

interface ISeedData{
    entries:ISeedEntry[]
}



export const seedData: ISeedData={
    entries:[
            {
            description: 'Hola mundo',
            createAt: Date.now(),
            status: 'pending'
            },
            {
            description: 'Hola world',
            createAt: Date.now(),
            status: 'finished'
            },
            {
            description: 'Hola aaaaaaaaaaa',
            createAt: Date.now()-100000000,
            status: 'in-progress'
            },
            {
            description: 'Hola aaaaaaaaaaaaaaaaaaaaaa',
            createAt: Date.now()-100000000,
            status: 'finished'
            },
    ]
}