let imageContainer = document.querySelector(".image-container");
let loader = document.querySelector(".loader");

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray =[]
// import dotenv from 'dotenv';
// dotenv.config();

// let envData = process.env;

// Unsplash API
const count = 10;
const apiKey = "6AFbaT_CAd3CkmE_iHvr7IqIppmvA5YnZ6ynwP0MuGk";
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


// Check Image loading function
function imgLoad(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        console.log("ready , ", ready);
    }
}

// HelperFunction to set Attribute on DOM Elements
function setAttributes(element, attribute){
    for(const key in attribute){
        element.setAttribute(key, attribute[key]);
    }
}



// Create Elements For Links & photos, Add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    console.log("total images: ", totalImages);
    // Run function forEach object in photosArray
    photosArray.forEach(photo => {
        // Creating <a> to link to Unsplash
        const item = document.createElement("a");
        
        // item.setAttribute("href", photo.links.html);
        // item.setAttribute("target", "_blank");
        
        setAttributes(item,{
            href: photo.links.html,
            target: "_blank",
        })
        // Create <img> for photo
        const img = document.createElement("img");
        
        // img.setAttribute("src", photo.urls.regular);
        // img.setAttribute("alt", photo.alt_description);
        // img.setAttribute("title", photo.alt_description);
        
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        })
        // Event listener, check when each image is finished loading
        img.addEventListener("load", imgLoad)
        // put <img> inside <a> then put both in imageContainer
        item.appendChild(img);
        imageContainer.appendChild(item);
    });   
}

// fetch images via unsplash API 
async function getPhotos(){
    try {
        const response = await fetch(apiUrl);
        photosArray = await response.json();

        
        displayPhotos();
    } catch (error) {
        console.log(error);
    }
}



// console.log("hola");
// let imgNum = 1;
// // fetch images from local 
// function getPhotos(){
//     let img = document.createElement("img");
//     setAttributes(img, {
//         src: `./img/1 (${imgNum}).jpg`
//     })
//     imageContainer.appendChild(img)
// }







// Check to see if scrolling is near the bottom, load more photos


window.addEventListener("scroll", ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){

        // // logic for local images
        // if(imgNum < 31){
        //     imgNum++;
        //     getPhotos()
        // }

        // with api
        getPhotos();
        ready = false;
    }
})

// on load
getPhotos()