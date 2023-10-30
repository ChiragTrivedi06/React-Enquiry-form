import React from 'react'

import axios, { toFormData } from 'axios';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap/Form';
import { Table } from 'react-bootstrap/Table';

export default function Userform() {


    let [userData, setuserData] = useState([]);

    let getData = () => {
        let apiurl = 'https://raipradeep.in/form-api/viewUser.php';
        axios.get(apiurl)
            .then((response) => {

                setuserData(response.data.dataList)
            })
    }
    useEffect(() => {
        getData();
    }, [])

    let deleteRow=((id)=>{
        let apiurl ='https://raipradeep.in/form-api/deleteUser.php?enid=10';
        if(window.confirm("Are you want to delete this data?")){
            axios.get(apiurl,{
                params:{
                    enid:id
                }
            })
            .then(function(response){
                getData();
            })
        }



    })

    let saveData=(e)=>{
        e.preventDefault();  // it is used to not reload web-page
        let uData={
            name: e.target.name.value,
            email: e.target.email.value,
            mobile: e.target.mobile.value,
            password: e.target.password.value,
            //id:input.id,
        }

        axios.post("https://raipradeep.in/form-api/saveUser.php",toFormData(uData))
        .then(function(response){
            getData();
        })
        .catch(function(error){
            console.log(error);
        });
    }
    // let updateRow=((id)=>{
    //     let apiurl='https://raipradeep.in/form-api/viewUser.php?editId=96';
    //     if(window.confirm("Are you want to updat"))
    // })

    let [input,setInput]=useState({
        name :"chirag",
        email:"",
        monile:"",
        password:"",
        id:"",
    })

    let getInput=(e)=>{
        let data={...input};
        data[e.target.name]=e.target.value;
        setInput(data);
    }
     let [editupData,seteditupData]=useState([]);

     let editData=((upd)=>{
        let apiurl='https://raipradeep.in/form-api/viewUser.php';
        axios.get(apiurl,{
            params:{
                editId:upd
            }
        })
        .then((finalresess)=>{
            seteditupData(finalresess.data.dataList)
            setInput({
                name:finalresess.data.dataList.en_name,
                email:finalresess.data.dataList.en_email,
                mobile:finalresess.data.dataList.en_contact,
                password:finalresess.data.dataList.en_password,
                id:finalresess.data.dataList.en_id,
            })
        })
     })
    return (
        <>
            <div className="m-4" >
                <h2 className='text-center'>Form</h2>
                <form onSubmit={saveData}>

                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Name</label>
                        <input type="text" class="form-control" id="exampleInputPassword1" name='name' placeholder='Enter Name' onChange={getInput} value={input.name}/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Email address</label>
                        <input type="email" class="form-control" id="exampleInputEmail1" placeholder='Enter Email' aria-describedby="emailHelp" name='email' onChange={getInput} value={input.email}/>
                        <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Mobile Number</label>
                        <input type="password" class="form-control" placeholder='Enter Mobile Number' id="exampleInputPassword1" name='mobile' onChange={getInput} value={input.mobile}/>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Password</label>
                        <input type="password" class="form-control" placeholder='Enter Password' id="exampleInputPassword1" name='password' onChange={getInput} value={input.password} />
                    </div>

                    <button type="submit" class="btn btn-primary" >Submit</button>
                </form>

                <h2 className='my-2 text-center'>Table</h2>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email </th>
                            <th scope="col">Mobile</th>
                            <th scope='col'>Password</th>
                            <th scope='col'>Delete</th>
                            <th scope='col'>Edit</th>
                        </tr>
                    </thead>


                    <tbody>

                        {userData.length >= 1 ?
                            userData.map((v, i) => {
                                return (
                                    <tr>
                                        <td>{i+1}</td>
                                        <td>{v.en_name}</td>
                                        <td>{v.en_email}</td>
                                        <td>{v.en_contact}</td>
                                        <td>{v.en_password}</td>
                                        <th><button onClick={()=>deleteRow(v.en_id)} className='btn btn-primary '>Delete</button></th>
                                        <th><buttonbtn className="btn-primary btn" onClick={()=>editData(v.en_id)} >Edit</buttonbtn></th>
                                    </tr>

                                )




                            })


                            :
                            <tr><td>Data not found</td></tr>
                        }






                    </tbody>
                </table>

            </div >
        </>
    )
}
