import React from 'react';
import {Tabs} from 'antd';
import MovieList from './MovieList';
import TheatresTable from './TheatresTable';

const tabItems = [
    {
        key:'1',
        label:"Movies",
        children:<MovieList/>
    },
    {
        key:'2',
        label:"Theatres",
        children: <TheatresTable/>,
    },
];

function Admin(){
    return (
        <div>
            <h1>Admin Page</h1> 
            <Tabs items={tabItems}/>
        </div>
    )
}
export default Admin;