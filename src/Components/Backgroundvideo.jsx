import React from "react";

const Backgroundvideo = () => {
  return (
    <div>
      {" "}
      <video autoPlay loop muted playsInline className="bg-video">
        <source src="/videos/bg-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
       <div className="video-overlay"></div>
    </div>
  );
};

export default Backgroundvideo;
