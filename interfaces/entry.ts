
export type Status='pending' | 'in-progress' | 'finished';
            

export interface Entry{
    _id: string,
    description: string,
    createAt: number,
    status: Status
} 
export interface ISeedEntry{
    description: string,
    createAt: number,
    status: Status
}