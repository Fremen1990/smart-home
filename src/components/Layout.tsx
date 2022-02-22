import React from 'react';

import './layout.css'

interface ChildrenEntity{
    children:string| {} ;
    className?:string;
    header?:string
}

 const  Layout =({children, className}:ChildrenEntity)  => {

     return (
        <>
            <div className="container-fluid gradient-custom   p-0 m-0  vh-100   d-flex flex-column  justify-content-center" >
                    <div className={className}>{children}</div>
                </div>
        </>

    )
}
export default Layout;
