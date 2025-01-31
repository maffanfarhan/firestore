
import { collection, addDoc , getDocs , Timestamp , query, orderBy , deleteDoc , doc , updateDoc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js"; 
import {db} from "./firebaseconfig.js";


const input = document.querySelector('#input');
const textarea = document.querySelector('#textarea')
const btn = document.querySelector('#btn')
const data = []
const container = document.querySelector('.container')




// Todo Add Button

btn.addEventListener('click' , async(event)=>{

   event.preventDefault();

    console.log(input.value);
    console.log(textarea.value);

    try {
  
        const docRef = await addDoc(collection(db, "todos"), {
          title:input.value ,
          descriptioin:textarea.value ,
          date:Timestamp.fromDate(new Date())
        });
        console.log("Document written with ID: ", docRef.id);


        data.push({id: docRef.id, title: input.value, descriptioin: textarea.value});
        renderData();


        } catch (e) {
        console.error("Error adding document: ", e);
        }

      input.value = '';
      textarea.value = '';


})




// Get Stored Data From Firestore

async function readData() {

    const q = query(collection(db, "todos"), orderBy("date" , "desc"));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((item) => {
    // console.log(`${item.id} => ${JSON.stringify(item.data())}`);
    // data.push(item.id ,item.data())
    data.push({ id:item.id, ...item.data() });
    });

    renderData();

}

readData();

console.log(data);




// Show Data on Page

function renderData(){

  container.innerHTML = '';

  data.map(item => {


    container.innerHTML += ` <div class="box">
        <p><span>TITLE  : </span> ${item.title}</p>
        <p><span>Description : </span> ${item.descriptioin}.</p>
        <div class="bTn">
          <button class="edit-Btn">Edit</button>
          <button class="delete-Btn" >Delete</button>
        </div>
       </div>
      `


      const editBtn = document.querySelectorAll('.edit-Btn');

      // For Edit BUTTON
      editBtn.forEach((editBtns , index) =>{

        editBtns.addEventListener('click' , async(event)=>{

          event.preventDefault();
          console.log('edit called');

          // get Index Of Selected Button

          console.log(data[index]); 
        

          // Change The Title
          const updatedTitle = prompt("ENTER NEW TITLE" , data[index].title);
          
          // Change The Description

          const updatedDes = prompt("Add new description " , data[index].descriptioin);


              await updateDoc(doc(db, "todos",data[index].id), {
                title : updatedTitle ,
                descriptioin : updatedDes 
              });

              // Replace The Text From Older To NEw

              data[index].title = updatedTitle ;
        
              data[index].descriptioin = updatedDes ;

              // Again Call The function To reload The data

              renderData();

              console.log("TITLE UPDATED : " + updatedTitle);
              console.log("Description Updated : " + updatedDes);
              
              
      });
      })

      const deleteBtn = document.querySelectorAll('.delete-Btn');

      // For Delete Button
      deleteBtn.forEach((deleteBtns , index) =>{

        deleteBtns.addEventListener('click' , async(event)=>{

          event.preventDefault();
          console.log('delete called');

      
        
            await deleteDoc(doc(db, "todos", data[index].id));

            data.splice(index, 1);

            console.log("Data deleted");

            renderData();
      
      })
      })


  })
}

  


