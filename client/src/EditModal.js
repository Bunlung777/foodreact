import './App.css';
import Axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from 'flowbite';
var Buffer = require('buffer/').Buffer


const EditModal = ({ openModal, setOpenModal, editData,updateFoodList})  => {
  const [ImgFood, setImg] = useState();
  const [FoodName, setFoodName] = useState("");
  const [Price, setPrice] = useState(0);
  const [Detail, setDetail] = useState("");
  const [Calories, setCalories] = useState(0);
  const [imagePreview, setImagePreview] = useState();
  const [foodList, setFoodList] = useState([]);
  const [NewFoodName, setNewFoodName] = useState("");
  const [NewPrice, setNewPrice] = useState(0);
  const [NewDetail, setNewDetail] = useState("");
  const [NewCalories, setNewCalories] = useState(0);
  const [editFood, setEditFood] = useState([]);
  const [ImgNewFood, setNewImg] = useState();
  

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

  const updateFood = (Id, updatedFoodName, updatedDetail, updatedPrice, updatedCalories) => {
    const data = new FormData();
    data.append('Id', Id);
    data.append('updatedFoodName', updatedFoodName);
    data.append('updatedDetail', updatedDetail);
    data.append('updatedPrice', updatedPrice);
    data.append('updatedCalories', updatedCalories);
    data.append('updatedImg', ImgFood);
    
    Axios.put("http://localhost:3001/update", data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then(response => {
      // Handle success if needed
      console.log('Food updated successfully:',(ImgFood), response.data);
      updateFoodList({ // Call the updateFoodList function with the updated food data
        Id: Id,
        FoodName: updatedFoodName,
        Detail: updatedDetail,
        Price: updatedPrice,
        Calories: updatedCalories,
        ImgFood: ImgFood, 
      });
    })
      .catch(error => {
        // Handle error if needed
        console.error('Error updating food: ', error);
      });
  };
  
  
  





  // Rest of your code...

  return (
    <div >
      <div className={`bg-gray-900 bg-opacity-50 fixed inset-0 z-40 ${openModal ? 'block' : 'hidden'}`}>
<div
        id="EditModal"
        tabIndex="-1"
        aria-hidden="true"
        className={`fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full justify-center items-center flex ${openModal ? 'block' : 'hidden'}`}
      >
            <div className="relativel max-w-lg max-h-full"  style={{ width: '25%'}}>
        
        <div className="relative bg-white rounded-lg shadow ">
        <div className="flex items-start justify-between p-4 border-b rounded-t ">
                <h3 className="text-xl font-normal text-gray-900 dark:text-white">
                    แก้ไขข้อมูล
                </h3>
                
                <button
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
          onClick={() => {
            setOpenModal(false); // Set openModal to false to close the modal
          }}
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close modal</span>
        </button>
            </div>
            <div className="px-6 py-6 lg:px-8">

                <form className="space-y-6" action="#">
                <div>
      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        ชื่ออาหาร
      </label>
      <input
        type="text"
        defaultValue={editData.FoodName}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        onChange={(event) => { 
            setNewFoodName(event.target.value);
          }}
      />
    </div>
    <div>
  <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
    รูปภาพสำรับอาหาร
  </label>
  <input
    type="file"
    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
    onChange={handleFileInput}
  />

  {/* Display the current image or the newly selected image */}
  {imagePreview || (editData && editData.ImgFood && editData.ImgFood.data) ? (
    <img
      src={imagePreview ? imagePreview : `data:image/jpeg;base64,${Buffer.from(editData.ImgFood.data).toString('base64')}`}
      alt='Food'
      width={550}
      height={100}
      className='rounded-lg'
    />
  ) : null}
</div>

                    <div>
                        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">รายละเอียดอาหาร</label>
                        <input type="text"   
                        defaultValue={editData.Detail}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                       
                        onChange={(event)=>{
                          setNewDetail(event.target.value)
                        }}/>
                    </div>
                    <div>
                        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ราคาอาหาร</label>
                        <input type="number"
                        defaultValue={editData.Price}
                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                        
                         onChange={(event)=>{
                          setNewPrice(event.target.value)
                        }}/>
                    </div>
                    <div>
                        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">จำนวนพลังงาน</label>
                        <input type="number"
                        defaultValue={editData.Calories}
                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                         
                         onChange={(event)=>{
                          setNewCalories(event.target.value)
                        }}/>
                    </div>
                    <div class="flex justify-end space-x-4">
                        <div>
                     <button type="submit" name="submit" class="h-12 px-6 text-white bg-gradient-to-r from-red-400 via-Neutral-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-normal rounded-lg text-sm py-2.5 text-center" onClick={() => {
             setOpenModal(false); // Set openModal to false to close the modal
                }}>Close</button>
                    </div> 
                    <div>
                    <button type="submit" name="submit" class=" h-12 px-6 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-normal rounded-lg text-sm py-2.5 text-center" 
                      onClick={() => {
                        // check if values are empty, set them to the default values if they are
                        const updatedFoodName = NewFoodName || editData.FoodName;
                        const updatedDetail = NewDetail || editData.Detail;
                        const updatedPrice = NewPrice || editData.Price;
                        const updatedCalories = NewCalories || editData.Calories;
                        const updatedImg = ImgNewFood || editData.ImgFood.data
                    
                        updateFood(editData.Id, updatedFoodName, updatedDetail, updatedPrice, updatedCalories,updatedImg);
                        setOpenModal(false);
                        setEditFood(editData.Id);
                      }} >Submit</button>
                    </div>   
                </div>
                </form>
            </div>
        </div>
    </div>
</div> 
        </div>
  </div>
  );
}

export default EditModal;