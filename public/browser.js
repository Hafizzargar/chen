const top1 = document.getElementById("top1");
const top2 = document.getElementById("top2");


window.onload = fxncallall;  // Make sure to pass the function reference, not call it immediately.

function fxncallall() {
  const readfxn1 = async () => {
    try {
      const res = await axios.get('/readtop1');
      const arr = res.data.data;
      console.log(arr);
      arr.map((item) => {
        // Create a container div to hold the image, heading, and paragraph
        const container = document.createElement('div');
        container.style.border = "1px solid #ddd"; // Example border for the container
        container.style.margin = "10px";           // Margin around the container
        container.style.padding = "10px";          // Padding inside the container
        container.style.display = "flex";          // Use flexbox to align elements
        container.style.flexDirection = "column"; // Stack elements vertically
        container.style.alignItems = "center";    // Center content horizontally

        // Create an image element
        const img = document.createElement('img');
        img.src = item.image; // Assuming item.image is a valid image URL or base64
        img.style.maxWidth = "170px";  // Set a max width for the image
        img.style.height = "140px";    // Maintain aspect ratio

        // Create a heading element (h2)
        const h2 = document.createElement("h2");
        h2.innerText = item._doc.head;
        h2.style.textAlign = "center"; // Center the heading

        // Create a paragraph element (h6)
        const h6 = document.createElement("h6");
        h6.innerHTML = item._doc.textbody; // Assuming the text is HTML-safe
        h6.style.textAlign = "center"; // Center the text

        // Append all the created elements to the container
        container.appendChild(img);  // Append image
        container.appendChild(h2);   // Append heading (h2)
        container.appendChild(h6);   // Append paragraph (h6)

        // Append the container to the top1 element
        top1.appendChild(container);
      });

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const readfxn2=async()=>{
    const res = await axios.get('/readtop2');
    const arr = res.data.data;
    console.log(arr);
    arr.map((item) => {
        // Create a container div to hold the image, heading, and paragraph
        const container = document.createElement('div');
        container.style.border = "1px solid #ddd"; // Example border for the container
        container.style.margin = "10px";           // Margin around the container
        container.style.padding = "10px";          // Padding inside the container
        container.style.display = "flex";          // Use flexbox to align elements
        container.style.flexDirection = "column"; // Stack elements vertically
        container.style.alignItems = "center";    // Center content horizontally

        // Create an image element
        const img = document.createElement('img');
        img.src = item.image; // Assuming item.image is a valid image URL or base64
        img.style.maxWidth = "170px";  // Set a max width for the image
        img.style.height = "140px";    // Maintain aspect ratio

        // Create a heading element (h2)
        const h2 = document.createElement("h2");
        h2.innerText = item._doc.head;
        h2.style.textAlign = "center"; // Center the heading

        // Create a paragraph element (h6)
        const h6 = document.createElement("h6");
        h6.innerHTML = item._doc.textbody; // Assuming the text is HTML-safe
        h6.style.textAlign = "center"; // Center the text

        // Append all the created elements to the container
        container.appendChild(img);  // Append image
        container.appendChild(h2);   // Append heading (h2)
        container.appendChild(h6);   // Append paragraph (h6)

        // Append the container to the top1 element
        top2.appendChild(container);
    });

    
    

  }


  readfxn1();
  readfxn2();
}

