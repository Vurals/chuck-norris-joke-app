import React from "react";
import { SmileOutlined  } from '@ant-design/icons';
import { Menu } from 'antd';
import MenuItem from "antd/lib/menu/MenuItem";

const { SubMenu } = Menu;

function MenuComp ({categories, setCategory}) {
    
     /* 
     * Function that creates menu items
    * */
     const createCategories = () => {
        const categoryList = [];
        
        for (let i = 0; i < categories.length; i++) {
            categoryList.push(
                <MenuItem key={categories[i]}  onClick={() => setCategory(categories[i])} icon={<SmileOutlined />}> 
                    {categories[i]}
                </MenuItem>        
            )
        }
        return categoryList;
    }
    return (
        <Menu
            theme="dark"
            mode="inline"
            style={{
                textAlign: 'center',
            }}
            
        >
        {createCategories()}
                      
        </Menu>
    );
};

export default MenuComp;