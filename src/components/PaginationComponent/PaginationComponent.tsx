'use client';

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";


interface IPaginationParams{
    arrayCount: number;
    arrayTotal: number;
}

const PaginationComponent = ({arrayCount, arrayTotal}:IPaginationParams) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    let skip = Number(searchParams.get('skip') || '0');
    let limit = Number(searchParams.get('limit') || '30');
    const searchStr = searchParams.get('q') || '';

    const selectedValue = limit.toString();

    const handleSelectOnChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
        limit = Number(event.target.value);
        const params = new URLSearchParams(searchParams);
        params.set('limit', (limit).toString());
        if (searchStr) {params.set('q', searchStr);}
        router.push(`?${params.toString()}`);       
    }

    const handleBtnPrevOnClick = async () => {
        const params = new URLSearchParams(searchParams);
        if (skip<limit) {skip = 0} else {skip = skip-limit}
        params.set('skip', (skip).toString());
        if (searchStr) {params.set('q', searchStr);}
        router.push(`?${params.toString()}`);
    }
    const handleBtnNextOnClick = async () => {
        if ((skip+limit)<arrayTotal) {
            const params = new URLSearchParams(searchParams);
            params.set('skip', (skip+limit).toString());
            if (searchStr) {params.set('q', searchStr);}
            router.push(`?${params.toString()}`);
        }
    }

    return(
        <div className="pag_panel flex items-center gap-4 pl-4">
            <button onClick={handleBtnPrevOnClick}
            className="underline border border-orange-600 rounded-sm px-4" 
            >Prev</button>

            <button onClick={handleBtnNextOnClick}
            className="underline border border-orange-600 rounded-sm px-4" 
            >Next</button>

            <h2>{skip+1} - {skip+arrayCount} / {arrayTotal}</h2>

            <select value={selectedValue} onChange={handleSelectOnChange}>
                <option value="30">30</option>
                <option value="20">20</option>
                <option value="10">10</option>
            </select>
        </div>
    )
}

export default PaginationComponent;