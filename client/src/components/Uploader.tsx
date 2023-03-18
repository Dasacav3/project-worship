import { ApiUrl } from '../api/env_vars';
import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const Uploader = () => {
  const handleFile = (e: any) => {
    handleUpload(e.target.files[0], e);
  };

  const handleUpload = async (file: File, event: any) => {
    const formData = new FormData();

    formData.append('file', file);

    const response = await fetch(`${ApiUrl}/files`, {
      method: 'POST',
      body: formData
    });

    await response.json();

    if (response.status === 200) {
      Swal.fire({
        title: 'Success',
        text: 'File uploaded successfully',
        icon: 'success',
        showConfirmButton: false,
        timer: 1200
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Error uploading file',
        icon: 'error',
        showConfirmButton: false,
        timer: 1200
      });
    }

    event.target.value = null;
  };

  return (
    <div className="w-full h-full flex">
      <div className="extraOutline p-4 bg-white w-max bg-whtie m-auto rounded-lg">
        <div
          className="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg"
          style={{
            width: '450px'
          }}
        >
          <div className="flex w-full justify-center">
            <span className="material-icons text-yellow-700 text-6xl">upload_file</span>
          </div>
          <div className="input_field flex flex-col w-max mx-auto text-center">
            <label>
              <input className="text-sm cursor-pointer w-36 hidden" type="file" onChange={handleFile} />
              <div className="bg-yellow-700 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-yellow-600">
                Select
              </div>
            </label>

            <div className="title text-yellow-600 uppercase">or drop files here</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Uploader;
