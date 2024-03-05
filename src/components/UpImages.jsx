import axios from 'axios';
export default function UpImages() {
  // In case of multiple file upload:
  // const [imageUrls, setImageUrls] = useState([]);
  // const [imgForUser, setImgForUser] = useState([]);
const handleUploadImg  = async (e) => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/child/Upload`, uploadData);  
    } catch (error) {
      console.error(error);
    }
  }; 
  return (
    <div>
      <form>      
        <input type="file" onChange={(e)=>{handleUploadImg(e)}} />
        <button type="submit">Save</button>   
      </form>
    </div>
  )
}
    