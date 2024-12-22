import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/scss/image-gallery.scss";

const Simple = () => {

  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
  ];
  

  return (
    <div>
      <h1>Lorem, ipsum.</h1>
     <ImageGallery items={images}
     showPlayButton={false}
     slideInterval={1000}
     slideOnThumbnailOver={true}
     showIndex={true}
     /></div>
  );
};

export default Simple;