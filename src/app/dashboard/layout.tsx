import React, { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;  // تحديد النوع المناسب للـ children
}

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            <div>Navbar</div>
            {children}
            <div>Footer</div>
        </>
    );
}
