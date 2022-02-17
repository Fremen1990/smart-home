import React from 'react';

import './layout.css'

 const  Layout =({children, className}) => {



     return (
        <>
            <div className="container-fluid gradient-custom   p-0 m-0  vh-100   d-flex flex-column  justify-content-center" >
                    <div className={className}>{children}</div>
                </div>
        </>


    )
}



export default Layout;
