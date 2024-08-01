import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import '../app/globals.css';
import Menu from '../components/menu';


export default function Dashboard() {

    const router = useRouter();


    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-custom p-4">
            <Menu />
            <h1 className="text-3xl font-extrabold mb-4 text-center text-blue-600 drop-shadow-lg">
                Chào mừng bạn đến với trang của Ngân
            </h1>

        </div>
    );
}
