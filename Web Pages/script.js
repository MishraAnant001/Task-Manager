let tname = document.getElementById("tname");
let tdesc = document.getElementById("tdesc");
let iscompleted = document.getElementById("iscompleted");
let divcomplete = document.getElementById("complete");
let btn = document.getElementById("submitbtn");
let tbody = document.getElementById("itemtbody");
let addbtn = document.getElementById("addbtn");
let selectedRow = null;
let form = document.getElementsByTagName("form")[0];
const url = "http://127.0.0.1:3000/api/v1/tasks"
let allData = [];

let globalid = null;

addbtn.onclick =()=>{
    form.reset("")
    selectedRow=null;
    divcomplete.classList.add("d-none");
    globalid=null;
}

const loadData =()=>{
    allData.forEach((data)=>{
        let textdecoration = "";
        let iscompleted = data.completed;
        if(iscompleted) {
            textdecoration ="text-decoration-line-through"
        }
        tbody.innerHTML+=`
        <tr class="rowdata">
            <td><i class="bi bi-info-circle showinfo" id="${data._id}"></i></td>
            <td class="${textdecoration}">${data.name} </td>
            <td><i class="bi bi-pencil-square edit btn btn-warning" id="${data._id}"  data-bs-toggle="modal" data-bs-target="#examplemodal"></i><i class="bi bi-trash3 delete btn btn-danger ms-2" id="${data._id}"></i></td>
            </tr>
        `
    })


    // console.log(tbody.innerHTML)
}
const getTasks = async () => {
    try {
        const response = await axios.get(url);
        // const data = await  JSON.parse(response)
        // console.log(response)
        if(response.status === 200){
            // console.log(response.data.response)
            allData= response.data.response;
            // console.log(allData)
            loadData();
        }
        // console.log(response.status)

        // console.log(response.data.response)
        // console.log(data);
    } catch (error) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!"
          });
        console.log(error.message)
    }
}
getTasks();
btn.onclick = async () => {
    if (tname.value == "") {
        Swal.fire({
            icon: "info",
            title: "Sorry",
            text: "Please provide task name"
        });
        return;
    }
    if (selectedRow == null) {
        try {
            const response = await axios.post(url,{
                name:tname.value,
                description:tdesc.value
            });
            // console.log(response)
            tbody.innerHTML+=`
            <tr class="rowdata">
            <td><i class="bi bi-info-circle showinfo" id="${response.data._id}"></i></td>
            <td>${response.data.name} </td>
            <td><i class="bi bi-pencil-square edit btn btn-warning" id="${response.data._id}"  data-bs-toggle="modal" data-bs-target="#examplemodal"></i><i class="bi bi-trash3 delete btn btn-danger ms-2" id="${response.data._id}"></i></td>
            </tr>
        `
        allData.push(response.data);
            Swal.fire({
                icon: "success",
                title: "task added successfully",
                showConfirmButton: false,
                timer: 1500
              });
            console.log(response)

            $("#examplemodal").modal('hide');
            // console.log(allData)
            form.reset("")
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!"
              });
            console.log(error.message);
        }

    }
    else{
        try {
            // console.log(iscompleted.checked)
            const response = await axios.patch(url+`/${globalid}`,{
                name:tname.value,
                description:tdesc.value,
                completed: iscompleted.checked
            });
            // console.log(response)
            let index = allData.findIndex(item=>item._id===globalid);
            // console.log(index)
            allData[index].name = tname.value;
            allData[index].description = tdesc.value;
            allData[index].completed = iscompleted.checked;

            // console.log("hi1")
            console.log(selectedRow.children[1].textContent)
            selectedRow.children[1].textContent = tname.value;
            if(iscompleted.checked){
                selectedRow.children[1].classList.add("text-decoration-line-through");
            }else{
                selectedRow.children[1].classList.remove("text-decoration-line-through");
            }
            // console.log("hi2")
            Swal.fire({
                icon: "success",
                title: "task updated successfully",
                showConfirmButton: false,
                timer: 1500
              });
              globalid=null;
              selectedRow=null;
              $("#examplemodal").modal('hide');
              form.reset("")
        //     console.log(response)

        //     $("#examplemodal").modal('hide');
        //     console.log(allData)
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!"
              });
            console.log(error.message);
        }
    }

}

tbody.onclick=(e)=>{
    let target = e.target;
    let tr = target.parentElement.parentElement;
    if(target.classList.contains("edit")){
        // console.log("inside edit")
        selectedRow=tr;
        let id = target.getAttribute("id");
        globalid=id;
        // console.log(id)
        let data = allData.find(item=>item._id===id);
        // console.log(data)
        tname.value = data.name;
        tdesc.value = data.description;
        iscompleted.checked = data.completed;
        divcomplete.classList.remove("d-none");
    }
    if(target.classList.contains("delete")){
        let id = target.getAttribute("id");
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then(async(result) => {
            if (result.isConfirmed) {
              try {
                const response = await axios.delete(url+`/${id}`)
                Swal.fire(
                    "Deleted!",
                    "task Deleted successfully",
                    "success"
                  );
                //   console.log(url+`/${id}`)
                let index = allData.findIndex(item=>item._id===id);
                allData.splice(index,1);
                tr.remove();
              } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!"
                  });
                console.log(error.message);
              }
            //   console.log(allData)
            //   loadData();
            }
          });
    }
    if(target.classList.contains("showinfo")) {
        let tr = target.parentElement.parentElement;
        let sibling = tr.nextElementSibling;
        let id = target.getAttribute("id");
        let data = allData.find(item=>item._id===id);
        let description = data.description;
        let trdesc = document.createElement("tr");
        trdesc.innerHTML = `
        <td>Details</td>
        <td colspan="2">${description}</td>
        `

        if(!sibling){
            tr.after(trdesc);
        }
        else if(!sibling.classList.contains("rowdata")) {
            sibling.remove();
        }
        else{
            tr.after(trdesc);
        }
    }

}
