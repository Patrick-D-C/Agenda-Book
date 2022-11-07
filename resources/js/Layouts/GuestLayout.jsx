import React from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/inertia-react';
import { MenuBook } from '@mui/icons-material';

export default function Guest({ children }) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
            <div className='sm:py-5'>
                <Link href="/" title='Voltar ao início'>
                    <MenuBook sx={{fontSize:'6rem'}} color="info" />
                </Link>
            </div>

            <div className="w-full sm:max-w-md mt-6 px-4 sm:px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
