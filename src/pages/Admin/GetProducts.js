

let tbody = document.getElementById("tbody")



// fetch function 
fetch('http://localhost:3004/product')
    .then(res => res.json())
    .then(json => {
        json.map(data => {
            console.log(data)
            tbody.append(td_fun(data));
        })
    })

// create td
function td_fun({productName, productCate, productNum, productDate}) {
  let td = document.createElement("tr");
  td.innerHTML = `
    <td className='px-6 py-4 whitespace-nowrap'>
        <div className='flex items-center'>
            <div className='text-base font-medium'>
                ${productName}
            </div>
        </div>
    </td>
    <td className='px-6 py-4 '>
        <div className='flex items-center'>
                <div className='text-base font-medium text-center'>
                    ${productCate}
                </div>
            </div>
    </td>
    <td className='px-6 py-4 whitespace-nowrap'>
        <div className='flex items-center'>
                <div className='text-base font-medium'>
                    ${productNum}
                </div>
            </div>
    </td>
    <td className='px-6 py-4 whitespace-nowrap'>
        <div className='flex items-center'>
                <div className='text-base font-medium'>
                    ${productDate}
                </div>
            </div>
    </td>
    `;
    return td;
}
