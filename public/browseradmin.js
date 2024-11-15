const emp = document.getElementById("emp");

window.onload = fxn;

function fxn() {
    empdata();

    async function empdata() {
        try {
            const response = await axios.get('/employeedata');
            let arr = response.data.data;
            console.log(arr);
            
            emp.innerHTML = ""
            arr.forEach(user => {
                // Create a container div for each user
                const userDiv = document.createElement('div');
                userDiv.style.cssText = "border: 1px solid #4b0082; padding: 10px; margin-bottom: 10px; border-radius: 5px; background: #e6e6fa; font-family: Arial, sans-serif; box-shadow: 0 4px 8px rgba(0,0,0,0.2);";
                if(user.role=='admin'){
                    return;
                }

                // Create and append user details
                userDiv.innerHTML = `
                    <p style="color: #4b0082; font-weight: bold;contenteditable=true;">Name:<b  contenteditable="true">${user.name}</b></p>
                    <p style="color: #333;">Email: <b contenteditable="true">${user.email}</b></p>
                     <p style="color: #555;">Role: <b contenteditable="true">${user.role}</b></p>
                    <p style="color: #777;contenteditable=true;">Password: <b contenteditable="true">${user.password}</b></p>
                    <button _id=${user._id} class="add">Submit</button>
                    <button _id=${user._id} class="del">Delete</button>
                `;

                emp.appendChild(userDiv);
            });
        } catch (error) {
            console.error("Error fetching employee data:", error);
        }
    }
}

document.addEventListener('click', (e) => {
    const btn = e.target; // Target the clicked element

   

    if (btn.classList.contains('del')) { // Handle 'delete' button click
        const _id = btn.getAttribute('_id');
        console.log(`Deleting user with ID: ${_id}`);
      
        console.log(btn.parentElement);
        const div=btn.parentElement;
        div.remove();
        
        
        
        
        async function deleteUser() {
            // try {
            //     const response = await axios.post('/deleteuser', { _id });
            //     return
            // } catch (error) {
            //     console.error('Error deleting user:', error);
            // }
        }

        deleteUser();
    }
});


