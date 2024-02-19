import React, { useState } from 'react';
import './AllProduct.css';
import {MdCloudUpload, MdDelete} from 'react-icons/md';
import {AiFillFileImage} from 'react-icons/ai';
import {toast} from "react-toastify";
import ProductList from './ProductList';



const AllProduct = () => {

  // left
  const [productName, productNameChange] = useState("");
  const [productCate, productCateChange] = useState("");
  const [productNum, productNumChange] = useState("");
  const [productDate, productDateChange] = useState("");

  // middle
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState("Chưa chọn hình ảnh");

  // right
  const [productDecs, productDecsChange] = useState("");

  const handleSubmit = event => {

    // stop page reload when submit
    event.preventDefault();

    let prodlist = {productName, productCate, productNum, productDate, productDecs};
    
    console.log (prodlist);

    fetch("http://localhost:3004/product", {
      method: "POST",
      headers: {'content-type':'application/json'},
      body: JSON.stringify(prodlist),
    }).then((res) => {
         toast.success('Thêm sản phẩm thành công!');
    }).catch((err)=> {
         toast.error('Thất bại:' + err.massage)
    });
  }

  return (
    <div className="products">
      <div className='content'>
        <div className='addProduct'>
          <div className='title'>
            <div className='title_head text-center mt-16'>
              <h1>Nhập Thông Tin</h1>
            </div>
            <form className='card mt-5' onSubmit={handleSubmit}>
              <div className='card_content'>
                <div className='card-body'>
                  <div className='left mr-9'>
                    {/* Tên sp */}
                    <div className='form-group'>
                      <label
                      for="productName"
                      className='block py-2 text-gray-600 font-bold'
                      > Tên sản phẩm <span className='msgerr'> * </span> 
                      </label>
                      <div className='relative max-w-xs text-gray-500'>
                        <input
                        value={productName}
                        onChange={event => productNameChange(event.target.value)}
                        type='text'
                        placeholder='Dây đai màu'
                        className='w-full pr-12 pl-3 py-2 text-gray-500 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg'
                        />
                      </div>
                    </div>

                    {/* Loại sp */}
                    <div className='form-group mt-3'>
                      <label
                      for="productName"
                      className='block py-2 text-gray-600 font-bold'
                      > Loại sản phẩm <span className='msgerr'> * </span> 
                      </label>
                      <div className='relative max-w-xs text-gray-500'>
                        <input
                        value={productCate}
                        onChange={event => productCateChange(event.target.value)}
                        type='text'
                        placeholder='Dây đai'
                        className='w-full pr-12 pl-3 py-2 text-gray-500 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg'
                        />
                      </div>
                    </div>

                    {/* Số lượng */}
                    <div className='form-group mt-3'>
                      <label
                      for="productName"
                      className='block py-2 text-gray-600 font-bold'
                      > Số lượng <span className='msgerr'> * </span> 
                      </label>
                      <div className='relative max-w-xs text-gray-500'>
                        <input
                        value={productNum}
                        onChange={event => productNumChange(event.target.value)}
                        type='number'
                        placeholder='20'
                        className='w-full pr-12 pl-3 py-2 text-gray-500 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg'
                        />
                      </div>
                    </div>

                    {/* Ngày nhập */}
                    <div className='form-group mt-3'>
                      <label
                      for="productName"
                      className='block py-2 text-gray-600 font-bold'
                      > Ngày nhập <span className='msgerr'> * </span> 
                      </label>
                      <div className='relative max-w-xs text-gray-500'>
                        <input
                        value={productDate}
                        onChange={event => productDateChange(event.target.value)}
                        type='datetime-local'
                        date
                        placeholder='dd/mm/yyyy'
                        className='w-full pr-12 pl-3 py-2 text-gray-500 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg'
                        />
                      </div>
                    </div>
                  </div>
                  <div className='middle mr-9'>
                    {/* Hình ảnh */}
                    <div className='form-group' id='pic'>
                      <label
                      for="productName"
                      className='block py-2 text-gray-600 font-bold'
                      > Hình ảnh <span className='msgerr'> * </span> 
                      </label>
                        <div className=' pic_pg text-gray-500' onClick={() => document.querySelector(".picInput").click()}>
                          <input
                          
                          type='file'
                          placeholder=''
                          accept="image/jpeg, image/png, image/webp"
                          className='picInput'
                          hidden
                          onChange={({target: {files}}) => {
                            files[0] && setFileName(files[0].name)
                            if(files) {
                              setImage(URL.createObjectURL(files[0]));                          
                            }
                          }}
                          />
                          {image ?
                            <img src={image} alt={fileName}/>
                            :
                            <>
                            <MdCloudUpload color='#808080' size={60} id='cloud'/>
                            <p className=''>Click để chọn hình ảnh</p>
                            </>
                          }
                        </div>
                        <section className='pic_bottom'>
                          <AiFillFileImage color='white'/>
                          <span className='text-white'>{fileName}</span>
                        </section>
                    </div>
                  </div>
                  <div className='right '>
                    {/* Chi tiết sản phẩm */}
                    <div className='form-group'>
                      <label
                        for="productName"
                        className='block py-2 text-gray-600 font-bold'
                        > Chi tiết sản phẩm <span className='msgerr'> * </span> 
                      </label>
                      {/* <input
                      type='text'
                      placeholder='Điền thông tin sản phẩm tại đây'
                      className='pr-12 pl-3 py-2 bg-white outline-none border focus:border-indigo-600 shadow-sm rounded-lg'
                      /> */}
                      <textarea
                      value={productDecs}
                      onChange={event => productDecsChange(event.target.value)}
                      >Điền thông tin sản phẩm...</textarea>
                    </div>
                  </div>
                </div>
                <div className='card_footer text-center'>
                  <button type='submit' className='mt-10'>
                    Thêm sản phẩm
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className='table pt-10'>
            <div className='table_title text-center'>
              <h1>List Sản Phẩm</h1>
            </div>
            <div className='table_content'>
              <ProductList/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AllProduct