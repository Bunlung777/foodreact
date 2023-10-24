import './App.css';
import Axios from "axios";
import { useEffect, useState } from "react";
import { Modal } from 'flowbite';

const InsertModal = ({ openModalInsert, setOpenModalInsert,handleUpdateFoodList })  => {
  const [ImgFood, setImg] = useState();
  const [FoodName, setFoodName] = useState("");
  const [Price, setPrice] = useState(0);
  const [Detail, setDetail] = useState("");
  const [Calories, setCalories] = useState(0);
  const [imagePreview, setImagePreview] = useState();
  const [foodList, setFoodList] = useState([]);
  

  
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

  const upload = () => {
    if (FoodName && Detail && Price && Calories && ImgFood) {
      const formData = new FormData();
      formData.append('image', ImgFood);
      formData.append('FoodNames', FoodName);
      formData.append('Detail', Detail);
      formData.append('Price', Price);
      formData.append('Calories', Calories);

      Axios.post('http://localhost:3001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log('Data uploaded successfully', response);

        // Construct the new food item
        const newFoodItem = {
          FoodName: FoodName,
          Detail: Detail,
          Price: Price,
          Calories: Calories,
          ImgFood: ImgFood,
        };

        // Pass the new food item to the parent component
        handleUpdateFoodList(newFoodItem);

        // Close the modal
        setOpenModalInsert(false);
      })
      .catch((error) => {
        console.error('Error while uploading data:', error);
        // Handle error appropriately
      });
  } else {
    console.log('Please fill all fields before submitting.');
  }
};

  return (
    <div >
      <div className={`bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40 ${openModalInsert ? 'block' : 'hidden'}`}  >
<div
        id="FoodModal"
        tabIndex="-1"
        aria-hidden="true"
        className={`fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full justify-center items-center flex ${openModalInsert ? 'block' : 'hidden'} `}>
        <div className="relativel max-w-lg max-h-full"  style={{ width: '25%'}}>
        
        <div className="relative bg-white rounded-lg shadow ">
        <div className="flex items-start justify-between p-4 border-b rounded-t ">
                <h3 className="text-xl font-normal text-gray-900 dark:text-white">
                    เพิ่มข้อมูลอาหาร
                </h3>
                
                <button
          type="button"
          className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
          onClick={() => {
            setOpenModalInsert(false); // Set openModal to false to close the modal
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

                <form className="space-y-6 " action="#">
                    <div>
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ชื่ออาหาร</label>
                        <input type="text" 
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                        required
                        onChange={(event)=>{
                          setFoodName(event.target.value)
                          console.log(event)
                        }}
                        />
                    </div>
                    <div>
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">รูปภาพสำรับอาหาร</label>
                        <input type="file" 
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 " 
                        required
                        onChange={handleFileInput}
                        />
                      {imagePreview =="" || imagePreview == null ? "" : <img width={500} height={100} src={imagePreview} className='rounded-lg'/>}
                    </div>
                    <div>
                        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">รายละเอียดอาหาร</label>
                        <input type="text"   
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                        required
                        onChange={(event)=>{
                          setDetail(event.target.value)
                        }}/>
                    </div>
                    <div>
                        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">ราคาอาหาร</label>
                        <input type="number"
                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                         require
                         onChange={(event)=>{
                          setPrice(event.target.value)
                        }}/>
                    </div>
                    <div>
                        <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">จำนวนพลังงาน</label>
                        <input type="number"
                         className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 " 
                         require
                         onChange={(event)=>{
                          setCalories(event.target.value)
                        }}/>
                    </div>
                    <div class="flex justify-end space-x-4">
                        <div>
                     <button type="submit" name="submit" class="h-12 px-6 text-white bg-gradient-to-r from-red-400 via-Neutral-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-gray-300 dark:focus:ring-gray-800 font-normal rounded-lg text-sm py-2.5 text-center" onClick={() => {
            setOpenModalInsert(false); // Set openModal to false to close the modal
                }}>Close</button>
                    </div> 
                    <div>
                    <button type="submit" name="submit" class=" h-12 px-6 text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-normal rounded-lg text-sm py-2.5 text-center" onClick={upload} >Submit</button>
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

export default InsertModal;
