import React from 'react';
import './ProductList.css';
import './GetProducts.js';




const ProductList = () => {
  return (
    <div className='product_list'>
        <div className='list_container'>
           <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                    <tr>
                        <th className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>Tên SP</th>
                        <th className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>Loại SP</th>
                        <th className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>Số Lượng</th>
                        <th className='px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider'>Ngày Nhập</th>
                    </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200' id='tbody'>

                </tbody>
           </table>
        </div>
    </div>
  )
}

export default ProductList