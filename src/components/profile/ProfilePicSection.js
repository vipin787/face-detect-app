import React, { useState, useEffect, useRef } from "react";

function ProfilePicSection() {
  //   const videoRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [cameraStream, setCameraStream] = useState(null);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef(null);
  const videoRef = React.createRef();

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleIdentifyUser = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (stream) {
        setCameraStream(stream);
        console.log("heii in if");
      } else {
        console.log("hei in else");
      }
    } catch (error) {
      console.log("hei in catch");
      console.error("Error accessing the camera:", error);
    }
  };

  const handleStopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
      setCameraStream(null);
    }
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  const handleUploadImage = () => {
    if (selectedImage) {
      const formData = new FormData();
      formData.append("image", selectedImage);

      fetch("API ENDPOINT", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Image uploaded successfully!");
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
      console.log("formdata =>", formData);
    }
  };

  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [cameraStream]);

  // className='choose-file'

  return (
    <div className="profilePicSectionStyles">
      <div>
        {selectedImage ? (
          <div style={{ position: "relative" }}>
            <img
              src={selectedImage}
              alt="Profile"
              className="imageStyles"
              style={{ maxWidth: "200px" }}
            />
            <button
              onClick={handleCloseImage}
              style={{
                position: "absolute",
                top: "-12px",
                left: "195px",
                background: "none",
                border: "none",
                color: "red",
                cursor: "pointer",
              }}
            >
              X
            </button>
          </div>
        ) : (
          <div>No image selected</div>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        ref={fileInputRef}
        // style={{ display: 'none' }}
      />
      <br />
      {/* <button className="" onClick={() => fileInputRef.current.click()}>Upload</button> */}

      {/* <button onClick={() => fileInputRef.current.click()}>
         Select Image
       </button> */}
      <button
        className="button"
        onClick={handleUploadImage}
        disabled={!selectedImage || uploading}
      >
        {uploading ? "Uploading..." : "Upload"}
      </button>
      {cameraStream ? (
        <button className="button" onClick={handleStopCamera}>
          Close Camera
        </button>
      ) : (
        <button className="camera" onClick={handleIdentifyUser}>
          Camera
        </button>
      )}
      {cameraStream && (
        <video ref={videoRef} autoPlay style={{ width: "20%" }} />
      )}
    </div>
  );
}

export default ProfilePicSection;
