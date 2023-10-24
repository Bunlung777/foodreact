
import './App.css';
import Axios from "axios";
import { Modal } from 'flowbite';
import { useEffect, useState } from "react";
import InsertModal from './insertModal';
import EditModal from './EditModal';
var Buffer = require('buffer/').Buffer



function App() {
  const [ImgFood, setImg] = useState();
  const [FoodName, setFoodName] = useState("");
  const [Price, setPrice] = useState(0);
  const [Detail, setDetail] = useState("");
  const [Calories, setCalories] = useState(0);
  const [imagePreview, setImagePreview] = useState();
  const [foodList, setFoodList] = useState([]);
  const [openModal , setOpenModal] = useState(false);
  const [openModalInsert , setOpenModalInsert] = useState(false);
  const [editData, setEditData] = useState(); 
  const [NewFoodName, setNewFoodName] = useState("");
  const [NewPrice, setNewPrice] = useState(0);
  const [NewDetail, setNewDetail] = useState("");
  const [NewCalories, setNewCalories] = useState(0);

  const updateFoodList = (updatedFood) => {
    const updatedList = foodList.map((food) =>
      food.Id === updatedFood.Id ? updatedFood : food
    );
    setFoodList(updatedList);
  };

  const handleUpdateFoodList = (newFoodItem) => {
    setFoodList([...foodList, newFoodItem]); // Add the new food item to the food list
  };

  const getFood = () => {
    Axios.get("http://localhost:3001/allfood").then((response) => {
      setFoodList(response.data);
    });
  };

  useEffect(() => {
    fetch('http://localhost:3001/allfood')
      .then(res => res.json())
      .then(data => {
        setFoodList(data);
      });
  }, []);

  const handleFileInput = (e) => {
    const file = e.target.files[0]
    setImg(e.target.files[0]);
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };


  // // Check if foodList is not undefined or null before using the length property
  // if (!foodList || foodList.length === 0) {
  //   return <div>Loading...</div>;
  // }



  function convertToBase64 (e) {
    console.log(e);
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImg(reader.result);
    };
    reader.onerror = error => {
      console.log("Error" , error);
    };
  }

  const deleteEmployee = (Id) => {
    Axios.delete(`http://localhost:3001/delete/${Id}`).then((response) => {
      setFoodList(
        foodList.filter((val) => {
          return val.Id != Id;
        })
      );
    });

    
  };
  
  

  return (
    <div>
    <div >
 
    

<div className="flex flex-col mt-6 container ">
           <div className="-mx-4 -my-2  sm:-mx-6 lg:-mx-8">
            <div className="inline-block w-full py-2 align-middle md:px-6 lg:px-8 ">
                <div className="overflow-hidden md:rounded-lg shadow p-3">
                <div className="container ">
                <div className="grid grid-cols-2 gap-4 ">
        <div  className="mt-3">
            <p className="text-3xl prompt">รายการสำรับอาหาร</p>
        </div>
        <div className="flex justify-end ">
        <button
                type="button"
                className="h-12 px-8 m-2 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 focus:ring-4  focus:ring-green-300  rounded-lg text-sm py-2.5 text-center mr-2 mb-2"
                onClick={() => {
                  setOpenModalInsert(true);
                }}
              >
                เพิ่มข้อมูลอาหาร
              </button>
              {/* Pass the openModal state to InsertModal component */}
              {openModalInsert && <InsertModal openModalInsert={openModalInsert} setOpenModalInsert={setOpenModalInsert}  handleUpdateFoodList={handleUpdateFoodList} />}
            </div>
        </div>
        </div>
    
    <hr/>
    <div className="relative flex justify-end mb-3">
            <div className="mr-4 text-l font-medium  text-gray-500 dark:text-gray-400 mt-2">
                <label for="">Seach: </label>
            </div>
            <input type="text" placeholder="" className="shadow-md block w-[15rem] py-2 text-gray-700 bg-white border border-gray-300 rounded-lg placeholder-gray-400 focus:border-blue-400 focus:ring-blue-500  focus:ring-2 focus:ring-opacity-40" name="search"/>
        </div>
                    <table className="w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead className=" bg-gray-100 dark:bg-gray-900">
                            <tr>
                    <th scope="col" className="px-6 py-3  text-l font-normal  text-gray-500 dark:text-gray-400">Id</th>
                    <th scope="col" className="px-6 py-3  text-l font-normal  text-gray-500 dark:text-gray-400">รูปภาพสำรับอาหาร</th>
                    <th scope="col" className="px-6 py-3  text-l font-normal  text-gray-500 dark:text-gray-400">ชื่ออาหาร</th>
                    <th scope="col" className="px-6 py-3  text-l font-normal  text-gray-500 dark:text-gray-400">รายละเอียดอาหาร</th>
                    <th scope="col" className="px-6 py-3  text-l font-normal  text-gray-500 dark:text-gray-400">ราคาอาหาร</th>
                    <th scope="col" className="px-6 py-3  text-l font-normal  text-gray-500 dark:text-gray-400">จำนวนพลังงาน</th>
                    <th></th>
                </tr>
        </thead>
        <tbody>
        {foodList.map((food) => {
  let imgSrc = '';

  if (food.ImgFood && food.ImgFood.data) {
    const bufferData = food.ImgFood.data;
    const base64String = Buffer.from(bufferData).toString('base64');
    imgSrc = `data:image/jpeg;base64,${base64String}`;
  } 
  return (
    <tr className='"bg-white border-b dark:bg-gray-800 dark:border-gray-700 mt-5' >
      <td className='px-6 py-3 font-normal text-gray-60'>{food.Id}</td>
      <td className='px-4 py-2 font-normal text-gray-60'>
      <img src={imgSrc} alt='Food' width={150} height={100} className='rounded-lg thumbnail' />
      </td>
      <td className='px-6 py-3 font-normal text-gray-60'>{food.FoodName}</td>
      <td className='px-6 py-3 font-normal text-gray-60'>{food.Detail}</td>
      <td className='px-6 py-3 font-normal text-gray-60'>{food.Price}</td>
      <td className='px-6 py-3 font-normal text-gray-60'>{food.Calories}</td>
      <td>
        <button
          type="button"
          className=" px-3 m-2 text-white bg-yellow-300  focus:ring-4 focus:ring-yellow-300 rounded-lg text-sm py-2.5 text-center mr-2 mb-2"
          onClick={() => {
            setOpenModal(true);
            setEditData(food);
          }}
        >
        <i class="fa-solid fa-pen-to-square"></i>
        </button>
        
        <button
          className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2 shadow"
          onClick={() => {
            deleteEmployee(food.Id);
          }}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  );
})}
{openModal && (
  <EditModal openModal={openModal} setOpenModal={setOpenModal} editData={editData} updateFoodList={updateFoodList}   handleUpdateFoodList={handleUpdateFoodList}  />
)}


        </tbody>



                        </table>
</div>
  </div>
  </div>
  </div>
  </div>
  </div>
  );

}

export default App;


