"use client"
import TableFileList from "@/components/table/fileList";
import Image from "next/image";
import Header from "@/components/header";
import HeaderSession from "@/components/headerSession";
import moment from "moment";
import ChartDoughnutCompletion from "@/components/charts/doughnutCompletion";
import { getApiUrl } from "@/helpers/urls";
import Pagination from "../pagination";
import { useEffect, useState } from "react";

import { Accordion, Button,Chip   } from "@material-tailwind/react";
import { AlignCenter } from "react-feather";


interface Props{
    show:boolean,
    onClose():void,
    data:any,
    
}

const SessionDetailComponent = (props: Props)=>{
    // console.log(props.data, "data")
     console.log(props.data.task.data, "task")
     var [complete] = useState(1)

    const [currentPage, setCurrentPage] = useState(1)
    const [totalRow, setTotalRow] = useState(props.data.pagination?.totalRow || 1)
    const [totalPage, setTotalPage] = useState(props.data.pagination?.totalPage || 1)
    const [limitPage, setLimitPage] = useState(5)
    const [taskData, setTaskData] = useState(props.data.task.data)
    const [taskDataAll, setTaskDataAll] = useState(props.data.task.data)
    const [dataLoaded, setDataLoaded] = useState(false)
    useEffect(()=>{
        if (!dataLoaded) {
            setTotalRow(props.data.task.data.length)
            var tempPage = props.data.task.data.length / 5
            if (props.data.task.data.length > 0) {
                setTaskData(taskDataAll.slice(0,5))            
            }
    
            // console.log(tempPage)
            setTotalPage(Math.ceil(tempPage))
            setDataLoaded(true)   
        }
    },[])
  return (
    <div className={`${props.show ? 'block' : 'hidden'} fixed top-0 left-0 bottom-0 bg-black/25 w-full p-3 justify-center flex items-center`}>
        <div className="bg-[#EDEDED] rounded-lg w-4/5 pb-3 max-h-[90vh] overflow-hidden">
            <HeaderSession pageTitle={props.data.session_name} data={props.data} status={props.data.status_session} onClose={()=>{
                props.onClose()
                setDataLoaded(false)
            }} />
            <div className="w-full px-3 flex flex-col">
                <div className="grid grid-cols-5 w-full gap-3 mb-3">
                    <div className="bg-white p-3 rounded-lg">
                        <h2 className="font-bold">
                        Date
                        </h2>
                        <div>
                        {moment(props.data.start_date).format('DD MMMM YYYY')}
                        </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                        <h2 className="font-bold">
                        Time
                        </h2>
                        <div>
                            {props.data.time}
                        </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                        <h2 className="font-bold">
                        Participants
                        </h2>
                        <div>
                        {props.data.participantCount}
                        </div>
                    </div>
                    <div className="bg-white p-3 rounded-lg">
                        <h2 className="font-bold">
                        Score
                        </h2>
                        <div>
                        {props.data.score}
                        </div>
                    </div>
                   {/*    removed by syamsul
                   <div className="bg-white p-3 rounded-lg">
                      <h2 className="font-bold">
                       Image Uploaded 3
                        </h2>
                     <div>
                      {props.data.imageCount}
                      </div>
                  </div>
                    */}
                   
                </div>
                <div className="flex gap-3 w-full">
                    <div className="w-1/5 bg-white p-3 rounded-lg">
                        <h2 className="font-bold">Participants</h2>
                        <div className="overflow-scroll scrollbar-none">
                            <table className="w-full">
                                <thead>
                                    <tr>
                                        <th>No.</th>
                                        <th className="text-left">Username</th>
                                    </tr>
                                </thead>
                                <tbody>
                                {props.data.participantData.length > 0 ? (
                                            props.data.participantData.map((item:any, index:number)=>{
                                                return(
                                                    <tr key={`${index}participant`} className="text-center">
                                                        <td>
                                                            {index + 1}
                                                        </td>
                                                        <td className="text-left">
                                                            {item.fullname}
                                                        </td>
                                                        {/* <td>
                                                            {item.status}
                                                        </td> */}
                                                    </tr>
                                                )
                                            })
                                        ) : (
                                            <tr className="text-center">
                                                <td colSpan={3}>No Data Found</td>
                                            </tr>
                                        )}
                                    {/* <tr>
                                        <td>1</td>
                                        <td>Username 1</td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Username 2</td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Username 3</td>
                                    </tr> */}
                                </tbody>
                            </table>
                        </div>
                    </div>
    <div  style={{ height: '200px', overflow: 'scroll' }} className="bg-white rounded-lg p-3 w-2/5 min-h-[60vh] ">

        <h2 className="font-bold">Task Completion </h2>
        {/* Added by Syamsul */}
        
        

     <Accordion defaultValue="PPE">

         <Accordion.Item value="PPE">

                <Accordion.Trigger color="primary" className="flex w-full flex-col gap-4 border-primary bg-primary text-white mb-2 rounded-lg border border-surface p-3">

                <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>
                    <div  style={{ width:"92%", textAlign:"left",display: "flex" }}>
                    &nbsp;PPE
                    </div>


                <div  style={{ width:"8%", textAlign:"right",  display: "flex" }}>
                +&nbsp;
                </div>
                </div>

                </Accordion.Trigger>

                <Accordion.Content>
                {
                    props.data.task.data.length > 0 ? (                                                             
                        props.data.task.data.map((item:any, index:number)=>{
                            return(

                                <tr style={{ width:"100%",display: "block" }}  key={`${index}name`} className="text-center">

                              
                                        
                                  {      item.name.split("-")[0] === "PPE" && ( 
                                          
                                      <div> 
                                         <td style={{ width:"80%", textAlign:"left" }}> 
                                       { item.name === "PPE-Shoes" && (<div> Safety Shoes  </div>)} 
                                       { item.name === "PPE-Cover" && (<div> Coverall/jacket  </div>)} 
                                       { item.name === "PPE-Helmet" && (<div> Safety helmet  </div>)} 
                                       { item.name === "PPE-Gloves" && (<div> Hand gloves  </div>)} 
                                       { item.name === "PPE-Harness" && (<div> Safety harness  </div>)} 
                                       
                                        </td>

                                       {  item.status === "Completed" ? ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="success"><Chip.Label >Completed</Chip.Label></Chip></td> ) :
                                        ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="warning"><Chip.Label >Incomplete</Chip.Label></Chip></td> )
                                        }
                                     </div> 
                                       
                                        ) 

                                }
    
                               
                               
                                </tr>


                            )
                        })                      
                    
                    
                    
                    
                    ) : (
                                                        
                                                    
                            <tr className="text-center">
                            <td colSpan={3}>No Data Found</td>
                            </tr>                          
                                                    
                                                    
                                                    
                                                    
                         )
                
                            
                            
                        
                    }          
      

                    </Accordion.Content>
           </Accordion.Item>



            <Accordion.Item value="Tools">

            <Accordion.Trigger color="primary" className="flex w-full flex-col gap-4 border-primary bg-primary text-white mb-2 rounded-lg border border-surface p-3">

            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>
                <div  style={{ width:"92%", textAlign:"left",display: "flex" }}>
                &nbsp;Tools and equipment
                </div>


            <div  style={{ width:"8%", textAlign:"right",  display: "flex" }}>
            +&nbsp;
            </div>
            </div>

            </Accordion.Trigger>

            <Accordion.Content>
            {
                props.data.task.data.length > 0 ? (                                                             
                    props.data.task.data.map((item:any, index:number)=>{
                        return(

                            <tr style={{ width:"100%",display: "block" }}  key={`${index}name`} className="text-center">

                        
                                    
                            {      item.name.split("-")[0] === "Tools" && ( 
                                    
                                <div> 
                                    <td style={{ width:"80%", textAlign:"left" }}> 
                                { item.name === "Tools-Cam" && (<div>Camera </div>)} 
                                { item.name === "Tools-Bar" && (<div>Barricade tape  </div>)} 
                                { item.name === "Tools-Tape" && (<div>Measuring tape  </div>)} 
                                { item.name === "Tools-Mark" && (<div>Marker pens  </div>)} 
                                { item.name === "Tools-Label" && (<div>Label numbers  </div>)} 
                                { item.name === "Tools-Bot" && (<div>Bottle for sample collection  </div>)} 

                                </td>

                                {  item.status === "Completed" ? ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="success"><Chip.Label >Completed</Chip.Label></Chip></td> ) :
                                    ( <td style={{width:"20%", textAlign:"right"}}><Chip size="sm"  color="warning"><Chip.Label >Incomplete</Chip.Label></Chip></td> )
                                    }
                                </div> 
                                
                                    ) 

                            }

                        
                        
                            </tr>


                        )
                    })                      
                
                
                
                ) : (
                                                    
                                                
                        <tr className="text-center">
                        <td colSpan={3}>No Data Found</td>
                        </tr>                          
                                                
                                                
                                                
                                                
                    )

                        
                        
                    
                }          


                </Accordion.Content>
            </Accordion.Item>








    <Accordion.Item value="Witness1">

            <Accordion.Trigger color="primary" className="flex w-full flex-col gap-4 border-primary bg-primary text-white mb-2 rounded-lg border border-surface p-3">

            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>
                <div  style={{ width:"92%", textAlign:"left",display: "flex" }}>
                &nbsp;Witness 1c
                </div>


            <div  style={{ width:"8%", textAlign:"right",  display: "flex" }}>
            +&nbsp;
            </div>
            </div>

            </Accordion.Trigger>

            <Accordion.Content>
            {
                props.data.task.data.length > 0 ? (                                                             
                    props.data.task.data.map((item:any, index:number)=>{
                        return(

                            <tr style={{ width:"100%",display: "block" }}  key={`${index}name`} className="text-center">

                        
                                    
                            {      (item.name.split("-")[0] === "Witness" && item.name.split("-")[1] === "1") && ( 
                                    
                                <div> 
                                    <td style={{ width:"80%", textAlign:"left" }}> 
                                { item.name === "Witness-1-1" && (<div>1. Question 1 </div>)} 
                                { item.name === "Witness-1-2" && (<div>2. Question 2  </div>)} 
                                { item.name === "Witness-1-3" && (<div>3. Question 3  </div>)} 
                                { item.name === "Witness-1-4" && (<div>4. Question 4  </div>)} 
                                { item.name === "Witness-1-5" && (<div>5. Question 5  </div>)} 
                                { item.name === "Witness-1-6" && (<div>6. Question 6  </div>)} 
                                
                                </td>

                                {  item.status === "Completed" ? ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="success"><Chip.Label >Completed</Chip.Label></Chip></td> ) :
                                    ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="warning"><Chip.Label >Incomplete</Chip.Label></Chip></td> )
                                    }
                                </div> 
                                
                                    ) 

                            }

                        
                        
                            </tr>


                        )
                    })                      
                
                
                
                ) : (
                                                    
                                                
                        <tr className="text-center">
                        <td colSpan={3}>No Data Found</td>
                        </tr>                          
                                                
                                                
                                                
                                                
                    )

                        
                        
                    
                }          


                </Accordion.Content>
            </Accordion.Item>




       <Accordion.Item value="Witness2">

                <Accordion.Trigger color="primary" className="flex w-full flex-col gap-4 border-primary bg-primary text-white mb-2 rounded-lg border border-surface p-3">

                <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>
                    <div  style={{ width:"92%", textAlign:"left",display: "flex" }}>
                    &nbsp;Witness 2
                    </div>


                <div  style={{ width:"8%", textAlign:"right",  display: "flex" }}>
                +&nbsp;
                </div>
                </div>

                </Accordion.Trigger>

                <Accordion.Content>
                {
                    props.data.task.data.length > 0 ? (                                                             
                        props.data.task.data.map((item:any, index:number)=>{
                            return(

                                <tr style={{ width:"100%",display: "block" }}  key={`${index}name`} className="text-center">

                            
                                        
                                {      (item.name.split("-")[0] === "Witness" && item.name.split("-")[1] === "2") && ( 
                                        
                                    <div> 
                                        <td style={{ width:"80%", textAlign:"left" }}> 
                                    { item.name === "Witness-2-1" && (<div>1. Question 1 </div>)} 
                                    { item.name === "Witness-2-2" && (<div>2. Question 2  </div>)} 
                                    { item.name === "Witness-2-3" && (<div>3. Question 3  </div>)} 
                                    { item.name === "Witness-2-4" && (<div>4. Question 4  </div>)} 
                                    { item.name === "Witness-2-5" && (<div>5. Question 5  </div>)} 
                                    { item.name === "Witness-2-6" && (<div>6. Question 6  </div>)} 
                                    
                                    </td>

                                    {  item.status === "Completed" ? ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="success"><Chip.Label >Completed</Chip.Label></Chip></td> ) :
                                        ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="warning"><Chip.Label >Incomplete</Chip.Label></Chip></td> )
                                        }
                                    </div> 
                                    
                                        ) 

                                }

                            
                            
                                </tr>


                            )
                        })                      
                    
                    
                    
                    ) : (
                                                        
                                                    
                            <tr className="text-center">
                            <td colSpan={3}>No Data Found</td>
                            </tr>                          
                                                    
                                                    
                                                    
                                                    
                        )

                            
                            
                        
                    }          


                    </Accordion.Content>
                </Accordion.Item>





    <Accordion.Item value="instalbarricade">

                <Accordion.Trigger color="primary" className="flex w-full flex-col gap-4 border-primary bg-primary text-white mb-2 rounded-lg border border-surface p-3">

                <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>
                    <div  style={{ width:"92%", textAlign:"left",display: "flex" }}>
                    &nbsp;Installation of the barricade tape
                    </div>


                <div  style={{ width:"8%", textAlign:"right",  display: "flex" }}>
                +&nbsp;
                </div>
                </div>

                </Accordion.Trigger>

                <Accordion.Content>
                {
                    props.data.task.data.length > 0 ? (                                                             
                        props.data.task.data.map((item:any, index:number)=>{
                            return(

                                <tr style={{ width:"100%",display: "block" }}  key={`${index}name`} className="text-center">

                            
                                        
                                {      (item.name.split("-")[0] === "Barricade") && ( 
                                        
                                    <div> 
                                        <td style={{ width:"80%", textAlign:"left" }}> 
                                    { item.name === "Barricade-1" && (<div>Barricade Line 1 </div>)} 
                                    { item.name === "Barricade-2" && (<div>Barricade Line 2 </div>)} 
                                    { item.name === "Barricade-3" && (<div>Barricade Line 3 </div>)} 
                                    { item.name === "Barricade-4" && (<div>Barricade Line 4 </div>)} 
                                    { item.name === "Barricade-Noentry" && (<div>Picture of No entry sign  </div>)} 
                                    { item.name === "Barricade-Picarea" && (<div>Picture of the barricade area  </div>)} 
                                    { item.name === "Barricade-Snaparea" && (<div>Snapshot of the surrounding area  </div>)} 

                                    { item.name === "Barricade-Pictrench" && (<div>Picture of the trench </div>)} 

                                    
                                    </td>

                                    {  item.status === "Completed" ? ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="success"><Chip.Label >Completed</Chip.Label></Chip></td> ) :
                                        ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="warning"><Chip.Label >Incomplete</Chip.Label></Chip></td> )
                                        }
                                    </div> 
                                    
                                        ) 

                                }

                            
                            
                                </tr>


                            )
                        })                      
                    
                    
                    
                    ) : (
                                                        
                                                    
                            <tr className="text-center">
                            <td colSpan={3}>No Data Found</td>
                            </tr>                          
                                                    
                                                    
                                                    
                                                    
                        )

                            
                            
                        
                    }          


                    </Accordion.Content>
       </Accordion.Item>





       <Accordion.Item value="numplace">

            <Accordion.Trigger color="primary" className="flex w-full flex-col gap-4 border-primary bg-primary text-white mb-2 rounded-lg border border-surface p-3">

            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>
                <div  style={{ width:"92%", textAlign:"left",display: "flex" }}>
                &nbsp;Numbering placement on evidences
                </div>


            <div  style={{ width:"8%", textAlign:"right",  display: "flex" }}>
            +&nbsp;
            </div>
            </div>

            </Accordion.Trigger>

            <Accordion.Content>
            {
                props.data.task.data.length > 0 ? (                                                             
                    props.data.task.data.map((item:any, index:number)=>{
                        return(

                            <tr style={{ width:"100%",display: "block" }}  key={`${index}name`} className="text-center">

                        
                                    
                            {      (item.name.split("-")[0] === "NumPlace") && ( 
                                    
                                <div> 
                                    <td style={{ width:"80%", textAlign:"left" }}> 
                                { item.name === "NumPlace-Red" && (<div>Numbering label near the red bricks </div>)} 
                                { item.name === "NumPlace-Hp" && (<div>Numbering label near the handphone </div>)} 
                                { item.name === "NumPlace-Wheel" && (<div>Numbering label near the wheelbarrow </div>)} 
                                { item.name === "NumPlace-Brick" && (<div>Numbering label near the tripping brick </div>)} 

                                { item.name === "NumPlace-scaff" && (<div>Numbering label near the scaffold railling </div>)} 
                                { item.name === "NumPlace-plaster" && (<div>Numbering label near the plastering tool </div>)} 
                                { item.name === "NumPlace-blood" && (<div>Numbering label near the pool of blood </div>)} 
                                { item.name === "NumPlace-helmet" && (<div>Numbering label near the safety helmet </div>)} 
                              
                                { item.name === "NumPlace-Power" && (<div>Numbering label near the power source box</div>)} 
                                { item.name === "NumPlace-Roller" && (<div>Numbering label near the roller conveyor</div>)} 
                                { item.name === "NumPlace-Tool" && (<div>Numbering label near the toolbox</div>)} 
                                
                                </td>

                                {  item.status === "Completed" ? ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="success"><Chip.Label >Completed</Chip.Label></Chip></td> ) :
                                    ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="warning"><Chip.Label >Incomplete</Chip.Label></Chip></td> )
                                    }
                                </div> 
                                
                                    ) 

                            }

                        
                        
                            </tr>


                        )
                    })                      
                
                
                
                ) : (
                                                    
                                                
                        <tr className="text-center">
                        <td colSpan={3}>No Data Found</td>
                        </tr>                          
                                                
                                                
                                                
                                                
                    )

                        
                        
                    
                }          


                </Accordion.Content>
        </Accordion.Item>





        <Accordion.Item value="photocapture">

                <Accordion.Trigger color="primary" className="flex w-full flex-col gap-4 border-primary bg-primary text-white mb-2 rounded-lg border border-surface p-3">

                <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>
                    <div  style={{ width:"92%", textAlign:"left",display: "flex" }}>
                    &nbsp;Photo capture of the evidences:
                    </div>


                <div  style={{ width:"8%", textAlign:"right",  display: "flex" }}>
                +&nbsp;
                </div>
                </div>

                </Accordion.Trigger>

                  <Accordion.Content>
         
                  <Accordion defaultValue="photocapture">

                         <Accordion.Item value="PicScaff">

                                    <Accordion.Trigger color="primary"  style={{ width:"90%",  textAlign:"center",display: "flex"}} className="flex flex-col gap-4 border-primary bg-primary text-white mb-2 rounded-lg border border-surface p-3">

                                    <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>
                                        <div  style={{ width:"92%", textAlign:"left",display: "flex" }}>
                                        &nbsp;Picture of the scaffold railling
                                        </div>


                                    <div  style={{ width:"8%", textAlign:"right",  display: "flex" }}>
                                    +&nbsp;
                                    </div>
                                    </div>

                                    </Accordion.Trigger>

                                    <Accordion.Content>
                                    {
                                        props.data.task.data.length > 0 ? (                                                             
                                            props.data.task.data.map((item:any, index:number)=>{
                                                return(

                                                    <tr style={{ width:"100%",display: "block" }}  key={`${index}name`} className="text-center">

                                                
                                                            
                                                    {      (item.name.split("-")[0] === "PicScaff") && ( 
                                                            
                                                        <div> 
                                                            <td style={{ width:"80%", textAlign:"left" }}> 
                                                        { item.name === "PicScaff-Overview" && (<div>1. Overview Shot </div>)} 
                                                        { item.name === "PicScaff-Mid" && (<div>2. Mid-Range Shot </div>)} 
                                                        { item.name === "PicScaff-Close" && (<div>3. Close-Up Shot </div>)} 
                                                
                                                        
                                                       </td>

                                                        {  item.status === "Completed" ? ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="success"><Chip.Label >Completed</Chip.Label></Chip></td> ) :
                                                            ( <td style={{width:"20%", textAlign:"right"}}><Chip size="sm"  color="warning"><Chip.Label >Incomplete</Chip.Label></Chip></td> )
                                                            }
                                                        </div> 
                                                        
                                                            ) 

                                                    }

                                                
                                                
                                                    </tr>


                                                )
                                            })                      
                                        
                                        
                                        
                                        ) : (
                                                                            
                                                                        
                                                <tr className="text-center">
                                                <td colSpan={3}>No Data Found</td>
                                                </tr>                          
                                                                        
                                                                        
                                                                        
                                                                        
                                            )

                                                
                                                
                                            
                                        }          


                                        </Accordion.Content>
                                    </Accordion.Item>




                                    <Accordion.Item value="PicRed">

                                    <Accordion.Trigger color="primary"  style={{ width:"90%",  textAlign:"center",display: "flex"}} className="flex flex-col gap-4 border-primary bg-primary text-white mb-2 rounded-lg border border-surface p-3">

                                    <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>
                                        <div  style={{ width:"92%", textAlign:"left",display: "flex" }}>
                                        &nbsp;Picture of the red bricks
                                        </div>


                                    <div  style={{ width:"8%", textAlign:"right",  display: "flex" }}>
                                    +&nbsp;
                                    </div>
                                    </div>

                                    </Accordion.Trigger>

                                    <Accordion.Content>
                                    {
                                        props.data.task.data.length > 0 ? (                                                             
                                            props.data.task.data.map((item:any, index:number)=>{
                                                return(

                                                    <tr style={{ width:"100%",display: "block" }}  key={`${index}name`} className="text-center">

                                                
                                                            
                                                    {      (item.name.split("-")[0] === "Pic" && item.name.split("-")[1] === "Red") && ( 
                                                            
                                                        <div> 
                                                            <td style={{ width:"80%", textAlign:"left" }}> 
                                                        { item.name === "Pic-Red-Overview" && (<div>1. Overview Shot </div>)} 
                                                        { item.name === "Pic-Red-Mid" && (<div>2. Mid-Range Shot </div>)} 
                                                        { item.name === "Pic-Red-Close" && (<div>3. Close-Up Shot </div>)} 
                                                
                                                        
                                                    </td>

                                                        {  item.status === "Completed" ? ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="success"><Chip.Label >Completed</Chip.Label></Chip></td> ) :
                                                            ( <td style={{width:"20%", textAlign:"right"}}><Chip size="sm"  color="warning"><Chip.Label >Incomplete</Chip.Label></Chip></td> )
                                                            }
                                                        </div> 
                                                        
                                                            ) 

                                                    }

                                                
                                                
                                                    </tr>


                                                )
                                            })                      
                                        
                                        
                                        
                                        ) : (
                                                                            
                                                                        
                                                <tr className="text-center">
                                                <td colSpan={3}>No Data Found</td>
                                                </tr>                          
                                                                        
                                                                        
                                                                        
                                                                        
                                            )

                                                
                                                
                                            
                                        }          


                                        </Accordion.Content>
                                    </Accordion.Item>




                                    <Accordion.Item value="PicHp">

                                    <Accordion.Trigger color="primary"  style={{ width:"90%",  textAlign:"center",display: "flex"}} className="flex flex-col gap-4 border-primary bg-primary text-white mb-2 rounded-lg border border-surface p-3">

                                    <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>
                                        <div  style={{ width:"92%", textAlign:"left",display: "flex" }}>
                                        &nbsp;Picture of the handphone
                                        </div>


                                    <div  style={{ width:"8%", textAlign:"right",  display: "flex" }}>
                                    +&nbsp;
                                    </div>
                                    </div>

                                    </Accordion.Trigger>

                                    <Accordion.Content>
                                    {
                                        props.data.task.data.length > 0 ? (                                                             
                                            props.data.task.data.map((item:any, index:number)=>{
                                                return(

                                                    <tr style={{ width:"100%",display: "block" }}  key={`${index}name`} className="text-center">

                                                
                                                            
                                                    {      (item.name.split("-")[0] === "Pic" && item.name.split("-")[1] === "Red") && ( 
                                                            
                                                        <div> 
                                                            <td style={{ width:"80%", textAlign:"left" }}> 
                                                        { item.name === "Pic-Hp-Overview" && (<div>1. Overview Shot </div>)} 
                                                        { item.name === "Pic-Hp-Mid" && (<div>2. Mid-Range Shot </div>)} 
                                                        { item.name === "Pic-Hp-Close" && (<div>3. Close-Up Shot </div>)} 
                                                
                                                        
                                                    </td>

                                                        {  item.status === "Completed" ? ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="success"><Chip.Label >Completed</Chip.Label></Chip></td> ) :
                                                            ( <td style={{width:"20%", textAlign:"right"}}><Chip size="sm"  color="warning"><Chip.Label >Incomplete</Chip.Label></Chip></td> )
                                                            }
                                                        </div> 
                                                        
                                                            ) 

                                                    }

                                                
                                                
                                                    </tr>


                                                )
                                            })                      
                                        
                                        
                                        
                                        ) : (
                                                                            
                                                                        
                                                <tr className="text-center">
                                                <td colSpan={3}>No Data Found</td>
                                                </tr>                          
                                                                        
                                                                        
                                                                        
                                                                        
                                            )

                                                
                                                
                                            
                                        }          


                                        </Accordion.Content>
                                    </Accordion.Item>

















                                    <Accordion.Item value="PicPlas">

                                    <Accordion.Trigger color="primary"  style={{ width:"90%",  textAlign:"center",display: "flex"}} className="flex flex-col gap-4 border-primary bg-primary text-white mb-2 rounded-lg border border-surface p-3">

                                    <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>
                                        <div  style={{ width:"92%", textAlign:"left",display: "flex" }}>
                                        &nbsp;Picture of the plastering tool
                                        </div>


                                    <div  style={{ width:"8%", textAlign:"right",  display: "flex" }}>
                                    +&nbsp;
                                    </div>
                                    </div>

                                    </Accordion.Trigger>

                                    <Accordion.Content>
                                    {
                                        props.data.task.data.length > 0 ? (                                                             
                                            props.data.task.data.map((item:any, index:number)=>{
                                                return(

                                                    <tr style={{ width:"100%",display: "block" }}  key={`${index}name`} className="text-center">

                                                
                                                            
                                                    {      (item.name.split("-")[0] === "Pic" && item.name.split("-")[1] === "Plas") && ( 
                                                            
                                                        <div> 
                                                            <td style={{ width:"80%", textAlign:"left" }}> 
                                                        { item.name === "Pic-Plas-Overview" && (<div>1. Overview Shot </div>)} 
                                                        { item.name === "Pic-Plas-Mid" && (<div>2. Mid-Range Shot </div>)} 
                                                        { item.name === "Pic-Plas-Close" && (<div>3. Close-Up Shot </div>)} 
                                                
                                                        
                                                        </td>

                                                        {  item.status === "Completed" ? ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="success"><Chip.Label >Completed</Chip.Label></Chip></td> ) :
                                                            ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="warning"><Chip.Label >Incomplete</Chip.Label></Chip></td> )
                                                            }
                                                        </div> 
                                                        
                                                            ) 

                                                    }

                                                
                                                
                                                    </tr>


                                                )
                                            })                      
                                        
                                        
                                        
                                        ) : (
                                                                            
                                                                        
                                                <tr className="text-center">
                                                <td colSpan={3}>No Data Found</td>
                                                </tr>                          
                                                                        
                                                                        
                                                                        
                                                                        
                                            )

                                                
                                                
                                            
                                        }          


                                        </Accordion.Content>
                                    </Accordion.Item>


                                    <Accordion.Item value="PicBlood">

                                    <Accordion.Trigger color="primary"  style={{ width:"90%",  textAlign:"center",display: "flex"}} className="flex flex-col gap-4 border-primary bg-primary text-white mb-2 rounded-lg border border-surface p-3">

                                    <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>
                                        <div  style={{ width:"92%", textAlign:"left",display: "flex" }}>
                                        &nbsp;Picture of the pool of blood
                                        </div>


                                    <div  style={{ width:"8%", textAlign:"right",  display: "flex" }}>
                                    +&nbsp;
                                    </div>
                                    </div>

                                    </Accordion.Trigger>

                                    <Accordion.Content>
                                    {
                                        props.data.task.data.length > 0 ? (                                                             
                                            props.data.task.data.map((item:any, index:number)=>{
                                                return(

                                                    <tr style={{ width:"100%",display: "block" }}  key={`${index}name`} className="text-center">

                                                
                                                            
                                                    {      (item.name.split("-")[0] === "Pic" && item.name.split("-")[1] === "Blood"  ) && ( 
                                                            
                                                        <div> 
                                                            <td style={{ width:"80%", textAlign:"left" }}> 
                                                        { item.name === "Pic-Blood-Overview" && (<div>1. Overview Shot </div>)} 
                                                        { item.name === "Pic-Blood-Mid" && (<div>2. Mid-Range Shot </div>)} 
                                                        { item.name === "Pic-Blood-Close" && (<div>3. Close-Up Shot </div>)} 
                                                
                                                        
                                                       </td>

                                                        {  item.status === "Completed" ? ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="success"><Chip.Label >Completed</Chip.Label></Chip></td> ) :
                                                            ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="warning"><Chip.Label >Incomplete</Chip.Label></Chip></td> )
                                                            }
                                                        </div> 
                                                        
                                                            ) 

                                                    }

                                                
                                                
                                                    </tr>


                                                )
                                            })                      
                                        
                                        
                                        
                                        ) : (
                                                                            
                                                                        
                                                <tr className="text-center">
                                                <td colSpan={3}>No Data Found</td>
                                                </tr>                          
                                                                        
                                                                        
                                                                        
                                                                        
                                            )

                                                
                                                
                                            
                                        }          


                                        </Accordion.Content>
                                    </Accordion.Item>

                                    <Accordion.Item value="PicHelmet">

                                    <Accordion.Trigger color="primary"  style={{ width:"90%",  textAlign:"center",display: "flex"}} className="flex flex-col gap-4 border-primary bg-primary text-white mb-2 rounded-lg border border-surface p-3">

                                    <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>
                                        <div  style={{ width:"92%", textAlign:"left",display: "flex" }}>
                                        &nbsp;Picture of the safety helmet
                                        </div>


                                    <div  style={{ width:"8%", textAlign:"right",  display: "flex" }}>
                                    +&nbsp;
                                    </div>
                                    </div>

                                    </Accordion.Trigger>

                                    <Accordion.Content>
                                    {
                                        props.data.task.data.length > 0 ? (                                                             
                                            props.data.task.data.map((item:any, index:number)=>{
                                                return(

                                                    <tr style={{ width:"100%",display: "block" }}  key={`${index}name`} className="text-center">

                                                
                                                            
                                                    {      (item.name.split("-")[0] === "Pic" && item.name.split("-")[1] === "Helmet"  )&& ( 
                                                            
                                                        <div> 
                                                            <td style={{ width:"80%", textAlign:"left" }}> 
                                                        { item.name === "Pic-Helmet-Overview" && (<div>1. Overview Shot </div>)} 
                                                        { item.name === "Pic-Helmet-Mid" && (<div>2. Mid-Range Shot </div>)} 
                                                        { item.name === "Pic-Helmet-Close" && (<div>3. Close-Up Shot </div>)} 
                                                
                                                        
                                                        </td>

                                                        {  item.status === "Completed" ? ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="success"><Chip.Label >Completed</Chip.Label></Chip></td> ) :
                                                            ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="warning"><Chip.Label >Incomplete</Chip.Label></Chip></td> )
                                                            }
                                                        </div> 
                                                        
                                                            ) 

                                                    }

                                                
                                                
                                                    </tr>


                                                )
                                            })                      
                                        
                                        
                                        
                                        ) : (
                                                                            
                                                                        
                                                <tr className="text-center">
                                                <td colSpan={3}>No Data Found</td>
                                                </tr>                          
                                                                        
                                                                        
                                                                        
                                                                        
                                            )

                                                
                                                
                                            
                                        }          


                                        </Accordion.Content>
                                    </Accordion.Item>



                                    <Accordion.Item value="PhotoEvProd">

                                        <Accordion.Trigger color="primary"  style={{ width:"90%",  textAlign:"center",display: "flex"}} className="flex flex-col gap-4 border-primary bg-primary text-white mb-2 rounded-lg border border-surface p-3">

                                        <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>
                                            <div  style={{ width:"92%", textAlign:"left",display: "flex" }}>
                                            &nbsp;Picture of the product sample
                                            </div>


                                        <div  style={{ width:"8%", textAlign:"right",  display: "flex" }}>
                                        +&nbsp;
                                        </div>
                                        </div>

                                        </Accordion.Trigger>

                                        <Accordion.Content>
                                        {
                                            props.data.task.data.length > 0 ? (                                                             
                                                props.data.task.data.map((item:any, index:number)=>{
                                                    return(

                                                        <tr style={{ width:"100%",display: "block" }}  key={`${index}name`} className="text-center">

                                                    
                                                                
                                                        {      (item.name.split("-")[0] === "PhotoEv" && item.name.split("-")[1] === "Prod"  )&& ( 
                                                                
                                                            <div> 
                                                                <td style={{ width:"80%", textAlign:"left" }}> 
                                                            { item.name === "PhotoEv-Prod-Overview" && (<div>1. Overview Shot </div>)} 
                                                            { item.name === "PhotoEv-Prod-Mid" && (<div>2. Mid-Range Shot </div>)} 
                                                            { item.name === "PhotoEv-Prod-Close" && (<div>3. Close-Up Shot </div>)} 
                                                    
                                                            
                                                            </td>

                                                            {  item.status === "Completed" ? ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="success"><Chip.Label >Completed</Chip.Label></Chip></td> ) :
                                                                ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="warning"><Chip.Label >Incomplete</Chip.Label></Chip></td> )
                                                                }
                                                            </div> 
                                                            
                                                                ) 

                                                        }

                                                    
                                                    
                                                        </tr>


                                                    )
                                                })                      
                                            
                                            
                                            
                                            ) : (
                                                                                
                                                                            
                                                    <tr className="text-center">
                                                    <td colSpan={3}>No Data Found</td>
                                                    </tr>                          
                                                                            
                                                                            
                                                                            
                                                                            
                                                )

                                                    
                                                    
                                                
                                            }          


                                            </Accordion.Content>
                                        </Accordion.Item>




                                        <Accordion.Item value="PhotoEvTaped">

                                        <Accordion.Trigger color="primary"  style={{ width:"90%",  textAlign:"center",display: "flex"}} className="flex flex-col gap-4 border-primary bg-primary text-white mb-2 rounded-lg border border-surface p-3">

                                        <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>
                                            <div  style={{ width:"92%", textAlign:"left",display: "flex" }}>
                                            &nbsp;Picture of the taped press button
                                            </div>


                                        <div  style={{ width:"8%", textAlign:"right",  display: "flex" }}>
                                        +&nbsp;
                                        </div>
                                        </div>

                                        </Accordion.Trigger>

                                        <Accordion.Content>
                                        {
                                            props.data.task.data.length > 0 ? (                                                             
                                                props.data.task.data.map((item:any, index:number)=>{
                                                    return(

                                                        <tr style={{ width:"100%",display: "block" }}  key={`${index}name`} className="text-center">

                                                    
                                                                
                                                        {      (item.name.split("-")[0] === "PhotoEv" && item.name.split("-")[1] === "Taped"  )&& ( 
                                                                
                                                            <div> 
                                                                <td style={{ width:"80%", textAlign:"left" }}> 
                                                            { item.name === "PhotoEv-Taped-Overview" && (<div>1. Overview Shot </div>)} 
                                                            { item.name === "PhotoEv-Taped-Mid" && (<div>2. Mid-Range Shot </div>)} 
                                                            { item.name === "PhotoEv-Taped-Close" && (<div>3. Close-Up Shot </div>)} 
                                                    
                                                            
                                                            </td>

                                                            {  item.status === "Completed" ? ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="success"><Chip.Label >Completed</Chip.Label></Chip></td> ) :
                                                                ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="warning"><Chip.Label >Incomplete</Chip.Label></Chip></td> )
                                                                }
                                                            </div> 
                                                            
                                                                ) 

                                                        }

                                                    
                                                    
                                                        </tr>


                                                    )
                                                })                      
                                            
                                            
                                            
                                            ) : (
                                                                                
                                                                            
                                                    <tr className="text-center">
                                                    <td colSpan={3}>No Data Found</td>
                                                    </tr>                          
                                                                            
                                                                            
                                                                            
                                                                            
                                                )

                                                    
                                                    
                                                
                                            }          


                                            </Accordion.Content>
                                        </Accordion.Item>



                                        <Accordion.Item value="PhotoEvStamp">

                                        <Accordion.Trigger color="primary"  style={{ width:"90%",  textAlign:"center",display: "flex"}} className="flex flex-col gap-4 border-primary bg-primary text-white mb-2 rounded-lg border border-surface p-3">

                                        <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>
                                            <div  style={{ width:"92%", textAlign:"left",display: "flex" }}>
                                            &nbsp;Picture of the stamping machine
                                            </div>


                                        <div  style={{ width:"8%", textAlign:"right",  display: "flex" }}>
                                        +&nbsp;
                                        </div>
                                        </div>

                                        </Accordion.Trigger>

                                        <Accordion.Content>
                                        {
                                            props.data.task.data.length > 0 ? (                                                             
                                                props.data.task.data.map((item:any, index:number)=>{
                                                    return(

                                                        <tr style={{ width:"100%",display: "block" }}  key={`${index}name`} className="text-center">

                                                    
                                                                
                                                        {      (item.name.split("-")[0] === "PhotoEv" && item.name.split("-")[1] === "Stamp"  )&& ( 
                                                                
                                                            <div> 
                                                                <td style={{ width:"80%", textAlign:"left" }}> 
                                                            { item.name === "PhotoEv-Stamp-Overview" && (<div> Overview Shot </div>)} 
                                                            { item.name === "PhotoEv-Stamp-Mid" && (<div> Mid-Range Shot </div>)} 
                                                            { item.name === "PhotoEv-Stamp-Close" && (<div>Close-Up Shot </div>)} 
                                                    
                                                            
                                                            </td>

                                                            {  item.status === "Completed" ? ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="success"><Chip.Label >Completed</Chip.Label></Chip></td> ) :
                                                                ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="warning"><Chip.Label >Incomplete</Chip.Label></Chip></td> )
                                                                }
                                                            </div> 
                                                            
                                                                ) 

                                                        }

                                                    
                                                    
                                                        </tr>


                                                    )
                                                })                      
                                            
                                            
                                            
                                            ) : (
                                                                                
                                                                            
                                                    <tr className="text-center">
                                                    <td colSpan={3}>No Data Found</td>
                                                    </tr>                          
                                                                            
                                                                            
                                                                            
                                                                            
                                                )

                                                    
                                                    
                                                
                                            }          


                                            </Accordion.Content>
                                        </Accordion.Item>





















                        </Accordion>


                    </Accordion.Content>






                </Accordion.Item>







                <Accordion.Item value="PaperEvReport">

                        <Accordion.Trigger color="primary" className="flex w-full flex-col gap-4 border-primary bg-primary text-white mb-2 rounded-lg border border-surface p-3">

                        <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>
                            <div  style={{ width:"92%", textAlign:"left",display: "flex" }}>
                            &nbsp;Paper evidence reports
                            </div>


                        <div  style={{ width:"8%", textAlign:"right",  display: "flex" }}>
                        +&nbsp;
                        </div>
                        </div>

                        </Accordion.Trigger>

                        <Accordion.Content>
                        {
                            props.data.task.data.length > 0 ? (                                                             
                                props.data.task.data.map((item:any, index:number)=>{
                                    return(

                                        <tr style={{ width:"100%",display: "block" }}  key={`${index}name`} className="text-center">

                                    
                                                
                                        {      (item.name.split("-")[0] === "PaperEv") && ( 
                                                
                                            <div> 
                                                <td style={{ width:"80%", textAlign:"left" }}> 
                                            { item.name === "PaperEv-Report" && (<div> Paper evidence report from witnesses.</div>)} 
                                            { item.name === "PaperEv-SOP" && (<div>SOP paper evidence report from witnesses.</div>)} 
                                            { item.name === "PaperEv-PTW" && (<div>Picture of the warning sign</div>)} 
                                            
                                            </td>

                                            {  item.status === "Completed" ? ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="success"><Chip.Label >Completed</Chip.Label></Chip></td> ) :
                                                ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="warning"><Chip.Label >Incomplete</Chip.Label></Chip></td> )
                                                }
                                            </div> 
                                            
                                                ) 

                                        }

                                    
                                    
                                        </tr>


                                    )
                                })                      
                            
                            
                            
                            ) : (
                                                                
                                                            
                                    <tr className="text-center">
                                    <td colSpan={3}>No Data Found</td>
                                    </tr>                          
                                                            
                                                            
                                                            
                                                            
                                )

                                    
                                    
                                
                            }          


                            </Accordion.Content>
                        </Accordion.Item>




                        <Accordion.Item value="photoevidences">

            <Accordion.Trigger color="primary" className="flex w-full flex-col gap-4 border-primary bg-primary text-white mb-2 rounded-lg border border-surface p-3">

            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>
                <div  style={{ width:"92%", textAlign:"left",display: "flex" }}>
                &nbsp;Photo of the evidences:
                </div>


            <div  style={{ width:"8%", textAlign:"right",  display: "flex" }}>
            +&nbsp;
            </div>
            </div>

            </Accordion.Trigger>

            <Accordion.Content>

            <Accordion defaultValue="photocaphotoevidencespture">

                    <Accordion.Item value="PicPlaster">

                                <Accordion.Trigger color="primary"  style={{ width:"90%",  textAlign:"center",display: "flex"}} className="flex flex-col gap-4 border-primary bg-primary text-white mb-2 rounded-lg border border-surface p-3">

                                <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>
                                    <div  style={{ width:"92%", textAlign:"left",display: "flex" }}>
                                    &nbsp;Picture of the plastering activity
                                    </div>


                                <div  style={{ width:"8%", textAlign:"right",  display: "flex" }}>
                                +&nbsp;
                                </div>
                                </div>

                                </Accordion.Trigger>

                                <Accordion.Content>
                                {
                                    props.data.task.data.length > 0 ? (                                                             
                                        props.data.task.data.map((item:any, index:number)=>{
                                            return(

                                                <tr style={{ width:"100%",display: "block" }}  key={`${index}name`} className="text-center">

                                            
                                                        
                                                {      (item.name.split("-")[0] === "PhotoEv") && ( 
                                                        
                                                    <div> 
                                                        <td style={{ width:"80%", textAlign:"left" }}> 
                                                    { item.name === "PhotoEv-Plaster" && (<div>Picture of the plastering activity </div>)} 
                                              
                                                    
                                                </td>

                                                    {  item.status === "Completed" ? ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="success"><Chip.Label >Completed</Chip.Label></Chip></td> ) :
                                                        ( <td style={{width:"20%", textAlign:"right"}}><Chip size="sm"  color="warning"><Chip.Label >Incomplete</Chip.Label></Chip></td> )
                                                        }
                                                    </div> 
                                                    
                                                        ) 

                                                }

                                            
                                            
                                                </tr>


                                            )
                                        })                      
                                    
                                    
                                    
                                    ) : (
                                                                        
                                                                    
                                            <tr className="text-center">
                                            <td colSpan={3}>No Data Found</td>
                                            </tr>                          
                                                                    
                                                                    
                                                                    
                                                                    
                                        )

                                            
                                            
                                        
                                    }          


                                    </Accordion.Content>
                                </Accordion.Item>




                                <Accordion.Item value="PicRed">

                                <Accordion.Trigger color="primary"  style={{ width:"90%",  textAlign:"center",display: "flex"}} className="flex flex-col gap-4 border-primary bg-primary text-white mb-2 rounded-lg border border-surface p-3">

                                <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>
                                    <div  style={{ width:"92%", textAlign:"left",display: "flex" }}>
                                    &nbsp;Picture of the wheelbarrow
                                    </div>


                                <div  style={{ width:"8%", textAlign:"right",  display: "flex" }}>
                                +&nbsp;
                                </div>
                                </div>

                                </Accordion.Trigger>

                                <Accordion.Content>
                                {
                                    props.data.task.data.length > 0 ? (                                                             
                                        props.data.task.data.map((item:any, index:number)=>{
                                            return(

                                                <tr style={{ width:"100%",display: "block" }}  key={`${index}name`} className="text-center">

                                            
                                                        
                                                {      (item.name.split("-")[0] === "PhotoEv" && item.name.split("-")[1] === "Wheel") && ( 
                                                        
                                                    <div> 
                                                        <td style={{ width:"80%", textAlign:"left" }}> 
                                                    { item.name === "PhotoEv-Wheel" && (<div>Picture of the wheelbarrow</div>)} 
                                                   
                                            
                                                    
                                                </td>

                                                    {  item.status === "Completed" ? ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="success"><Chip.Label >Completed</Chip.Label></Chip></td> ) :
                                                        ( <td style={{width:"20%", textAlign:"right"}}><Chip size="sm"  color="warning"><Chip.Label >Incomplete</Chip.Label></Chip></td> )
                                                        }
                                                    </div> 
                                                    
                                                        ) 

                                                }

                                            
                                            
                                                </tr>


                                            )
                                        })                      
                                    
                                    
                                    
                                    ) : (
                                                                        
                                                                    
                                            <tr className="text-center">
                                            <td colSpan={3}>No Data Found</td>
                                            </tr>                          
                                                                    
                                                                    
                                                                    
                                                                    
                                        )

                                            
                                            
                                        
                                    }          


                                    </Accordion.Content>
                                </Accordion.Item>




                                <Accordion.Item value="PhotoEvTrench">

                                <Accordion.Trigger color="primary"  style={{ width:"90%",  textAlign:"center",display: "flex"}} className="flex flex-col gap-4 border-primary bg-primary text-white mb-2 rounded-lg border border-surface p-3">

                                <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>
                                    <div  style={{ width:"92%", textAlign:"left",display: "flex" }}>
                                    &nbsp;Picture of the trench pipe
                                    </div>


                                <div  style={{ width:"8%", textAlign:"right",  display: "flex" }}>
                                +&nbsp;
                                </div>
                                </div>

                                </Accordion.Trigger>

                                <Accordion.Content>
                                {
                                    props.data.task.data.length > 0 ? (                                                             
                                        props.data.task.data.map((item:any, index:number)=>{
                                            return(

                                                <tr style={{ width:"100%",display: "block" }}  key={`${index}name`} className="text-center">

                                            
                                                        
                                                {      (item.name.split("-")[0] === "PhotoEv" && item.name.split("-")[1] === "Trench") && ( 
                                                        
                                                    <div> 
                                                        <td style={{ width:"80%", textAlign:"left" }}> 
                                                    { item.name === "PhotoEv-Trench" && (<div>Picture of the trench pipe </div>)} 
                                                
                                            
                                                    
                                                </td>

                                                    {  item.status === "Completed" ? ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="success"><Chip.Label >Completed</Chip.Label></Chip></td> ) :
                                                        ( <td style={{width:"20%", textAlign:"right"}}><Chip size="sm"  color="warning"><Chip.Label >Incomplete</Chip.Label></Chip></td> )
                                                        }
                                                    </div> 
                                                    
                                                        ) 

                                                }

                                            
                                            
                                                </tr>


                                            )
                                        })                      
                                    
                                    
                                    
                                    ) : (
                                                                        
                                                                    
                                            <tr className="text-center">
                                            <td colSpan={3}>No Data Found</td>
                                            </tr>                          
                                                                    
                                                                    
                                                                    
                                                                    
                                        )

                                            
                                            
                                        
                                    }          


                                    </Accordion.Content>
                                </Accordion.Item>





                                <Accordion.Item value="PhotoEvExc">

                                <Accordion.Trigger color="primary"  style={{ width:"90%",  textAlign:"center",display: "flex"}} className="flex flex-col gap-4 border-primary bg-primary text-white mb-2 rounded-lg border border-surface p-3">

                                <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>
                                    <div  style={{ width:"92%", textAlign:"left",display: "flex" }}>
                                    &nbsp;Picture of the Picture of the trench pipe
                                    </div>


                                <div  style={{ width:"8%", textAlign:"right",  display: "flex" }}>
                                +&nbsp;
                                </div>
                                </div>

                                </Accordion.Trigger>

                                <Accordion.Content>
                                {
                                    props.data.task.data.length > 0 ? (                                                             
                                        props.data.task.data.map((item:any, index:number)=>{
                                            return(

                                                <tr style={{ width:"100%",display: "block" }}  key={`${index}name`} className="text-center">

                                          
                                                        
                                {      (item.name.split("-")[0] === "PhotoEv" && item.name.split("-")[1] === "Trench") && ( 
                                                        
                                                        <div> 
                                                            <td style={{ width:"80%", textAlign:"left" }}> 
                                                        { item.name === "PhotoEv-Trench" && (<div>Picture of the trench pipe</div>)} 
                                                      
                                                
                                                        
                                                    </td>
    
                                                        {  item.status === "Completed" ? ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="success"><Chip.Label >Completed</Chip.Label></Chip></td> ) :
                                                            ( <td style={{width:"20%", textAlign:"right"}}><Chip size="sm"  color="warning"><Chip.Label >Incomplete</Chip.Label></Chip></td> )
                                                            }
                                                        </div> 
                                                        
                                                            ) 
    
                                                    }
    
                                            
                                                </tr>


                                            )
                                        })                      
                                    
                                    
                                    
                                    ) : (
                                                                        
                                                                    
                                            <tr className="text-center">
                                            <td colSpan={3}>No Data Found</td>
                                            </tr>                          
                                                                    
                                                                    
                                                                    
                                                                    
                                        )

                                            
                                            
                                        
                                    }          


                                    </Accordion.Content>
                                </Accordion.Item>



                                <Accordion.Item value="PhotoEvExc">

                                <Accordion.Trigger color="primary"  style={{ width:"90%",  textAlign:"center",display: "flex"}} className="flex flex-col gap-4 border-primary bg-primary text-white mb-2 rounded-lg border border-surface p-3">

                                <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>
                                    <div  style={{ width:"92%", textAlign:"left",display: "flex" }}>
                                    &nbsp;Picture of the excavator
                                    </div>


                                <div  style={{ width:"8%", textAlign:"right",  display: "flex" }}>
                                +&nbsp;
                                </div>
                                </div>

                                </Accordion.Trigger>

                                <Accordion.Content>
                                {
                                    props.data.task.data.length > 0 ? (                                                             
                                        props.data.task.data.map((item:any, index:number)=>{
                                            return(

                                                <tr style={{ width:"100%",display: "block" }}  key={`${index}name`} className="text-center">

                                        
                                                        
                                {      (item.name.split("-")[0] === "PhotoEv" && item.name.split("-")[1] === "Exc") && ( 
                                                        
                                                        <div> 
                                                            <td style={{ width:"80%", textAlign:"left" }}> 
                                                      { item.name === "PhotoEv-Exc" && (<div>Picture of the excavator</div>)} 
                                                
                                                        
                                                    </td>

                                                        {  item.status === "Completed" ? ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="success"><Chip.Label >Completed</Chip.Label></Chip></td> ) :
                                                            ( <td style={{width:"20%", textAlign:"right"}}><Chip size="sm"  color="warning"><Chip.Label >Incomplete</Chip.Label></Chip></td> )
                                                            }
                                                        </div> 
                                                        
                                                            ) 

                                                    }

                                            
                                                </tr>


                                            )
                                        })                      
                                    
                                    
                                    
                                    ) : (
                                                                        
                                                                    
                                            <tr className="text-center">
                                            <td colSpan={3}>No Data Found</td>
                                            </tr>                          
                                                                    
                                                                    
                                                                    
                                                                    
                                        )

                                            
                                            
                                        
                                    }          


                                    </Accordion.Content>
                                </Accordion.Item>












                                <Accordion.Item value="PhotoEvToolbox">

                                <Accordion.Trigger color="primary"  style={{ width:"90%",  textAlign:"center",display: "flex"}} className="flex flex-col gap-4 border-primary bg-primary text-white mb-2 rounded-lg border border-surface p-3">

                                <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>
                                    <div  style={{ width:"92%", textAlign:"left",display: "flex" }}>
                                    &nbsp;Picture of the toolbox
                                    </div>


                                <div  style={{ width:"8%", textAlign:"right",  display: "flex" }}>
                                +&nbsp;
                                </div>
                                </div>

                                </Accordion.Trigger>

                                <Accordion.Content>
                                {
                                    props.data.task.data.length > 0 ? (                                                             
                                        props.data.task.data.map((item:any, index:number)=>{
                                            return(

                                                <tr style={{ width:"100%",display: "block" }}  key={`${index}name`} className="text-center">

                                            
                                                        
                                                {      (item.name.split("-")[0] === "PhotoEv" && item.name.split("-")[1] === "Toolbox"  ) && ( 
                                                        
                                                    <div> 
                                                        <td style={{ width:"80%", textAlign:"left" }}> 
                                                    { item.name === "PhotoEv-Toolbox" && (<div> Picture of the toolbox </div>)} 
                                                
                                                    
                                                </td>

                                                    {  item.status === "Completed" ? ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="success"><Chip.Label >Completed</Chip.Label></Chip></td> ) :
                                                        ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="warning"><Chip.Label >Incomplete</Chip.Label></Chip></td> )
                                                        }
                                                    </div> 
                                                    
                                                        ) 

                                                }

                                            
                                            
                                                </tr>


                                            )
                                        })                      
                                    
                                    
                                    
                                    ) : (
                                                                        
                                                                    
                                            <tr className="text-center">
                                            <td colSpan={3}>No Data Found</td>
                                            </tr>                          
                                                                    
                                                                    
                                                                    
                                                                    
                                        )

                                            
                                            
                                        
                                    }          


                                    </Accordion.Content>
                                </Accordion.Item>

                                <Accordion.Item value="PhotoEvForklift">

                                <Accordion.Trigger color="primary"  style={{ width:"90%",  textAlign:"center",display: "flex"}} className="flex flex-col gap-4 border-primary bg-primary text-white mb-2 rounded-lg border border-surface p-3">

                                <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>
                                    <div  style={{ width:"92%", textAlign:"left",display: "flex" }}>
                                    &nbsp;Picture of the forklift load
                                    </div>


                                <div  style={{ width:"8%", textAlign:"right",  display: "flex" }}>
                                +&nbsp;
                                </div>
                                </div>

                                </Accordion.Trigger>

                                <Accordion.Content>
                                {
                                    props.data.task.data.length > 0 ? (                                                             
                                        props.data.task.data.map((item:any, index:number)=>{
                                            return(

                                                <tr style={{ width:"100%",display: "block" }}  key={`${index}name`} className="text-center">

                                            
                                                {      (item.name.split("-")[0] === "PhotoEv" && item.name.split("-")[1] === "Forklift"  ) && ( 
                                                        
                                                        <div> 
                                                            <td style={{ width:"80%", textAlign:"left" }}> 
                                                        { item.name === "PhotoEv-Forklift" && (<div> Picture of the forklift load</div>)} 
                                                    
                                                        
                                                    </td>
    
                                                        {  item.status === "Completed" ? ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="success"><Chip.Label >Completed</Chip.Label></Chip></td> ) :
                                                            ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="warning"><Chip.Label >Incomplete</Chip.Label></Chip></td> )
                                                            }
                                                        </div> 
                                                        
                                                            ) 
    
                                                    }
    

                                            
                                            
                                                </tr>


                                            )
                                        })                      
                                    
                                    
                                    
                                    ) : (
                                                                        
                                                                    
                                            <tr className="text-center">
                                            <td colSpan={3}>No Data Found</td>
                                            </tr>                          
                                                                    
                                                                    
                                                                    
                                                                    
                                        )

                                            
                                            
                                        
                                    }          


                                    </Accordion.Content>
                                </Accordion.Item>

                                <Accordion.Item value="PhotoEvForklift">

                                    <Accordion.Trigger color="primary"  style={{ width:"90%",  textAlign:"center",display: "flex"}} className="flex flex-col gap-4 border-primary bg-primary text-white mb-2 rounded-lg border border-surface p-3">

                                    <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>
                                        <div  style={{ width:"92%", textAlign:"left",display: "flex" }}>
                                        &nbsp;Picture of the warning sign
                                        </div>


                                    <div  style={{ width:"8%", textAlign:"right",  display: "flex" }}>
                                    +&nbsp;
                                    </div>
                                    </div>

                                    </Accordion.Trigger>

                                    <Accordion.Content>
                                    {
                                        props.data.task.data.length > 0 ? (                                                             
                                            props.data.task.data.map((item:any, index:number)=>{
                                                return(

                                                    <tr style={{ width:"100%",display: "block" }}  key={`${index}name`} className="text-center">

                                                
{                                               (item.name.split("-")[0] === "Pic" && item.name.split("-")[1] === "Warning" )&& ( 
                                                        
                                                        <div> 
                                                            <td style={{ width:"80%", textAlign:"left" }}> 
                                                        { item.name === "Pic-Warning-Overview" && (<div>Overview Shot</div>)} 
                                                        { item.name === "Pic-Warning-Mid" && (<div>Mid-Range Shot</div>)} 
                                                        { item.name === "Pic-Warning-Close" && (<div>Close-Up Shot</div>)} 
                                                    

                                                        </td>
    
                                                        {  item.status === "Completed" ? ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="success"><Chip.Label >Completed</Chip.Label></Chip></td> ) :
                                                            ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="warning"><Chip.Label >Incomplete</Chip.Label></Chip></td> )
                                                            }
                                                        </div> 
                                                        
                                                            ) 
    
                                                    }
    


                                                
                                                
                                                    </tr>


                                                )
                                            })                      
                                        
                                        
                                        
                                        ) : (
                                                                            
                                                                        
                                                <tr className="text-center">
                                                <td colSpan={3}>No Data Found</td>
                                                </tr>                          
                                                                        
                                                                        
                                                                        
                                                                        
                                            )

                                                
                                                
                                            
                                        }          


                                        </Accordion.Content>
                                    </Accordion.Item>













                         <Accordion.Item value="PhotoEvStamp">

                                <Accordion.Trigger color="primary"  style={{ width:"90%",  textAlign:"center",display: "flex"}} className="flex flex-col gap-4 border-primary bg-primary text-white mb-2 rounded-lg border border-surface p-3">

                                <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>
                                    <div  style={{ width:"92%", textAlign:"left",display: "flex" }}>
                                    &nbsp;Picture of the stamping machine
                                    </div>


                                <div  style={{ width:"8%", textAlign:"right",  display: "flex" }}>
                                +&nbsp;
                                </div>
                                </div>

                                </Accordion.Trigger>

                                <Accordion.Content>
                                {
                                    props.data.task.data.length > 0 ? (                                                             
                                        props.data.task.data.map((item:any, index:number)=>{
                                            return(

                                                <tr style={{ width:"100%",display: "block" }}  key={`${index}name`} className="text-center">

                                            
                                                        
                                                {      (item.name.split("-")[0] === "PhotoEv" && item.name.split("-")[1] === "Stamp" )&& ( 
                                                        
                                                    <div> 
                                                        <td style={{ width:"80%", textAlign:"left" }}> 
                                                    { item.name === "PhotoEv-Stamp" && (<div>Picture of the stamping machine</div>)} 
                                                  
                                            
                                                    
                                                    </td>

                                                    {  item.status === "Completed" ? ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="success"><Chip.Label >Completed</Chip.Label></Chip></td> ) :
                                                        ( <td style={{width:"20%", textAlign:"right"}}> <Chip size="sm"  color="warning"><Chip.Label >Incomplete</Chip.Label></Chip></td> )
                                                        }
                                                    </div> 
                                                    
                                                        ) 

                                                }

                                            
                                            
                                                </tr>


                                            )
                                        })                      
                                    
                                    
                                    
                                    ) : (
                                                                        
                                                                    
                                            <tr className="text-center">
                                            <td colSpan={3}>No Data Found</td>
                                            </tr>                          
                                                                    
                                                                    
                                                                    
                                                                    
                                        )

                                            
                                            
                                        
                                    }          


                                    </Accordion.Content>
                                </Accordion.Item>


                    </Accordion>


                </Accordion.Content>






</Accordion.Item>























                </Accordion>



                                {/* Added by Syamsul */}

                                {/*
                                //edited by syamsul

                                    
                                    <div className="flex justify-center">
                                        <ChartDoughnutCompletion totalCount={props.data.task?.task_score} progress={props.data.task?.task_completed} />
                                    </div>
                                    <div className="overflow-scroll scrollbar-none">
                                        <table className="w-full">
                                            <thead>
                                                <tr>
                                                    <th>No.</th>
                                                    <th>Task</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {props.data.task.data.length > 0 ? (
                                                    taskData.map((item:any, index:number)=>{
                                                        return(
                                                            <tr key={item.name} className="text-center">
                                                                <td>
                                                                    {(index + 1) + ((currentPage - 1) * limitPage)}
                                                                </td>
                                                                <td className="text-left">
                                                                    {item.name}
                                                                </td>
                                                                <td className={`${item.status === 'Completed' ? 'text-green-400' : ''} font-medium`}>
                                                                    {item.status}
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                ) : (
                                                    <tr>
                                                        <td colSpan={3} className="text-center">No Data Found</td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                        {props.data.task.data.length > 0 ? (
                                            <Pagination currentPage={currentPage} totalRow={totalRow} totalPage={totalPage} handleChangePage={(p)=>{
                                                setTaskData([])
                                                var newArray:any = []
                                                if (p > 1) {
                                                    newArray = taskDataAll.slice(((limitPage * (p - 1)) - 1),(limitPage * p) -1)                                        
                                                } else {
                                                    newArray = taskDataAll.slice(0,5) 
                                                }

                                                setTimeout((()=>{
                                                    setTaskData(newArray)
                                                }),500)
                                                setCurrentPage(p)
                                                console.log(taskDataAll.slice(((limitPage * (p - 1)) - 1),(5 * p) -1))
                                                // setTaskData(taskDataAll.slice(((limitPage * (p - 1)) - 1),(5 * p) -1))
                                            }}/>
                                        ) : null}
                                    </div>

                                */} 


    </div>




                    <div className="bg-white rounded-lg p-3 w-2/5">
                        <h2 className="font-bold">Total Score</h2>
                        {/* Added by Syamsul */}
                        <div className="flex justify-center">
                          {/* <ChartDoughnutCompletion totalCount={props.data.task?.task_score} progress={props.data.task?.task_completed} /> */}   
                        
                                                                    

                          <ChartDoughnutCompletion totalCount={100 - props.data.score} progress= {props.data.score } />


                        </div>
                         {/* Added by Syamsul */}

                        {/* Removed by syamsul
                        <div className={`${props.data.imageData ? "grid grid-cols-2 gap-3 mt-3" : "w-full"} overflow-scroll scrollbar-none`}>
                            {props.data.imageData ? (
                                props.data.imageData.map((item:any, index:number)=>{
                                    return(
                                        <div key={`image${index}`} className="bg-gray-200 text-center items-start justify-center rounded h-auto max-w-full">
                                            <Image 
                                                alt=""
                                                width={0}
                                                height={0}
                                                sizes="100vw"
                                                style={{ width: '100%', height: 'auto' }}
                                                // layout="fill"
                                                src={getApiUrl()+item.images_url}
                                            />
                                        </div>
                                    )
                                })
                            ) : (
                                <div className='flex justify-center p-5 bg-gray-100 mt-3 rounded-lg'>
                                    No Data Found
                                </div>
                            )}
                        </div>
                        
                        */}
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}


export default SessionDetailComponent