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
    data:any
}

const SessionDetailComponent = (props: Props)=>{
    // console.log(props.data, "data")
     console.log(props.data.task.data, "task")


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
{ /*
            <Accordion.Content>

            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> 1. Safety Shoes      </div>   <Chip size="sm"  color="success" style={{width:"30%", height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Complete</Chip.Label></Chip> </div>
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> 2. Coverall / Jacket       </div>   <Chip size="sm"  color="success" style={{width:"30%", height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px"}}><Chip.Label>Complete</Chip.Label></Chip> </div>
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> 3. Safety Helmet      </div>   <Chip  size="sm" color="warning" style={{width:"30%", height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Incomplete</Chip.Label></Chip> </div>
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> 4. Hand Gloves     </div>   <Chip size="sm"  color="warning" style={{width:"30%", height:"25px", textAlign:"right",  display: "flex" ,marginBottom:"2px"}}><Chip.Label>Incomplete</Chip.Label></Chip> </div>
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> 5. Ear protection      </div>   <Chip size="sm"  color="warning" style={{width:"30%", height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Incomplete</Chip.Label></Chip> </div>

            
            
            </Accordion.Content>
*/}
            <Accordion.Content>
                        {
                                props.data.task.data.length > 0 ? (
                                                                    props.data.task.data.map((item:any, index:number)=>{
                                                                        return(

                                                                            <tr key={`${index}name`} className="text-center">
                                                                                
                                                                                    {  item.name == "PPE-Shoes" && <td><div style={{ width:"400px", textAlign:"left",display: "flex"  }}>1. Safety Shoes </div></td> }
                                                                                    {  item.name == "PPE-Cover" && <td><div style={{ width:"400px", textAlign:"left",display: "flex"  }}>2. Coverall / Jacket    </div></td> }
                                                                                    {  item.name == "PPE-Helmet" && <td><div style={{ width:"400px", textAlign:"left",display: "flex"  }}>3. Safety helmet    </div></td> }
                                                                                    {  item.name == "PPE-Gloves" && <td><div style={{ width:"400px", textAlign:"left",display: "flex"  }}>4. Hand gloves   </div></td> }
                                                                                    {  item.name == "PPE-Harness" && <td><div style={{ width:"400px", textAlign:"left",display: "flex"  }}>5. Safety harness    </div></td> }
                                                                                   
                                                                                    <td className="text-right" style={{ width:"100%", textAlign:"right",display: "flex"  }}>

                                                                                    {item.status === "Completed" ? <Chip size="sm"  color="success"><Chip.Label >Completed</Chip.Label></Chip> : <Chip size="sm"  color="warning"><Chip.Label >Incomplete</Chip.Label></Chip>}

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
                                                                )
                            
                            
                            
                        
                        }          

            </Accordion.Content>



            </Accordion.Item>



        <Accordion.Item value="ToolsandEquipment">

                <Accordion.Trigger color="primary" className="flex w-full flex-col gap-4 border-primary bg-primary text-white mb-2 rounded-lg border border-surface p-3">

                <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>
                    <div  style={{ width:"92%", textAlign:"left",display: "flex" }}>
                    &nbsp;Tools and Equipment
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

                                                                                <tr key={`${index}name`} className="text-center">
                                                                                    <td>
                                                                                        {  item.name == "Tools-Cam" && <div style={{ width:"400px", textAlign:"left",display: "flex"  }}>1. Camera </div> }
                                                                                        {  item.name == "Tools-Cam" && <div style={{ width:"400px", textAlign:"left",display: "flex"  }}>2. Barricade tape   </div>}
                                                                                        {  item.name == "Tools-Tape" && <div style={{ width:"400px", textAlign:"left",display: "flex"  }}>3. Measuring tape    </div>}
                                                                                        {  item.name == "Tools-Mark" && <div style={{ width:"400px", textAlign:"left",display: "flex"  }}>4. Marker pens  </div>}
                                                                                        {  item.name == "Tools-Label" && <div style={{ width:"400px", textAlign:"left",display: "flex"  }}>5. Label numbers    </div>}
                                                                                    


                                                                                    </td>
                                                                                    { item.status == "Completed" &&   <td className="text-right" style={{ width:"100%", textAlign:"right",display: "flex"  }}><div ><Chip size="sm"  color="success"><Chip.Label >Completed</Chip.Label></Chip></div> </td> }
                                                                                    { item.status == "Available" &&   <td className="text-right" style={{ width:"100%", textAlign:"right",display: "flex"  }}><div ><Chip size="sm"  color="warning"><Chip.Label >Incomplete</Chip.Label></Chip></div> </td> } 
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
                                                                    )
                                
                                
                                
                            
                            }          

                </Accordion.Content>

                </Accordion.Item>






          <Accordion.Item value="Witness1">

                <Accordion.Trigger color="primary" className="flex w-full flex-col gap-4 border-primary bg-primary text-white mb-2 rounded-lg border border-surface p-3">

                <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>
                    <div  style={{ width:"92%", textAlign:"left",display: "flex" }}>
                    &nbsp;Witness 1
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

                                                                <tr key={`${index}name`} className="text-center">
                                                                    <td>
                                                                        {  item.name == "Witness-1-1" && <div style={{ width:"400px", textAlign:"left",display: "flex"  }}>1. Question 1 </div> }
                                                                        {  item.name == "Witness-1-2" && <div style={{ width:"400px", textAlign:"left",display: "flex"  }}>2. Question 2  </div>}
                                                                        {  item.name == "Witness-1-3" && <div style={{ width:"400px", textAlign:"left",display: "flex"  }}>3. Question 3    </div>}
                                                                        {  item.name == "Witness-1-4" && <div style={{ width:"400px", textAlign:"left",display: "flex"  }}>4. Question 4  </div>}
                                                                        {  item.name == "Witness-1-5" && <div style={{ width:"400px", textAlign:"left",display: "flex"  }}>5. Question 5    </div>}
                                                                        {  item.name == "Witness-1-6" && <div style={{ width:"400px", textAlign:"left",display: "flex"  }}>6. Question 6    </div>}
                                                                    


                                                                    </td>
                                                                    { item.status == "Completed" &&   <td className="text-right" style={{ width:"100%", textAlign:"right",display: "flex"  }}><div ><Chip size="sm"  color="success"><Chip.Label >Completed</Chip.Label></Chip></div> </td> }
                                                                    { item.status == "Available" &&   <td className="text-right" style={{ width:"100%", textAlign:"right",display: "flex"  }}><div ><Chip size="sm"  color="warning"><Chip.Label >Incomplete</Chip.Label></Chip></div> </td> } 
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

                                                <tr key={`${index}name`} className="text-center">
                                                    <td>
                                                        {  item.name == "Witness-2-1" && <div style={{ width:"400px", textAlign:"left",display: "flex"  }}>1. Question 1 </div> }
                                                        {  item.name == "Witness-2-2" && <div style={{ width:"400px", textAlign:"left",display: "flex"  }}>2. Question 2  </div>}
                                                        {  item.name == "Witness-2-3" && <div style={{ width:"400px", textAlign:"left",display: "flex"  }}>3. Question 3    </div>}
                                                        {  item.name == "Witness-2-4" && <div style={{ width:"400px", textAlign:"left",display: "flex"  }}>4. Question 4  </div>}
                                                        {  item.name == "Witness-2-5" && <div style={{ width:"400px", textAlign:"left",display: "flex"  }}>5. Question 5    </div>}
                                                        {  item.name == "Witness-2-6" && <div style={{ width:"400px", textAlign:"left",display: "flex"  }}>6. Question 6    </div>}
                                                    


                                                    </td>
                                                    { item.status == "Completed" &&   <td className="text-right" style={{ width:"100%", textAlign:"right",display: "flex"  }}><div ><Chip size="sm"  color="success"><Chip.Label >Completed</Chip.Label></Chip></div> </td> }
                                                    { item.status == "Available" &&   <td className="text-right" style={{ width:"100%", textAlign:"right",display: "flex"  }}><div ><Chip size="sm"  color="warning"><Chip.Label >Incomplete</Chip.Label></Chip></div> </td> } 
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
                                    )


    

}          

</Accordion.Content>


</Accordion.Item>




<Accordion.Item value="barricadetape">

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

                                                <tr key={`${index}name`} className="text-center">
                                                    <td>
                                                        {  item.name == "Barricade-1" && <div style={{ width:"400px", textAlign:"left",display: "flex"  }}>1. Barricade Line 1 </div> }
                                                        {  item.name == "Barricade-2" && <div style={{ width:"400px", textAlign:"left",display: "flex"  }}>2. Barricade Line 2 </div>}
                                                        {  item.name == "Barricade-3" && <div style={{ width:"400px", textAlign:"left",display: "flex"  }}>3. Barricade Line 3    </div>}
                                                        {  item.name == "Barricade-Picarea" && <div style={{ width:"400px", textAlign:"left",display: "flex"  }}>4. Picture of the barricade area  </div>}
                                                        {  item.name == "Barricade-Snaparea" && <div style={{ width:"400px", textAlign:"left",display: "flex"  }}>5. Snapshot of the surrounding area    </div>}
                                                     
                                                    


                                                    </td>
                                                  
                                                        { item.status == "Completed" &&   <td className="text-right" style={{ width:"100%", textAlign:"right",display: "flex"  }}><div ><Chip size="sm"  color="success"><Chip.Label >Completed</Chip.Label></Chip></div> </td> }
                                                        { item.status == "Available" &&   <td className="text-right" style={{ width:"100%", textAlign:"right",display: "flex"  }}><div ><Chip size="sm"  color="warning"><Chip.Label >Incomplete</Chip.Label></Chip></div> </td> } 
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
                                    )


    

}          

</Accordion.Content>


</Accordion.Item>








            

            <Accordion.Item value="html">

            <Accordion.Trigger color="primary" className="flex w-full flex-col gap-4 border-primary bg-primary text-white mb-2 rounded-lg border border-surface p-3">

            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>
                    <div  style={{ width:"92%", textAlign:"left",display: "flex" }}>
                    &nbsp;Tools
                    </div>


                <div  style={{ width:"8%", textAlign:"right",  display: "flex" }}>
                +&nbsp;
                </div>
            </div>
            

            </Accordion.Trigger>

            <Accordion.Content>
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> 1. Camera      </div>   <Chip size="sm" color="success" style={{width:"30%", height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Complete</Chip.Label></Chip> </div>
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> 2. Barricade tape       </div>   <Chip size="sm"  color="success" style={{width:"30%", height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Complete</Chip.Label></Chip> </div>
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> 3. Measuring tape      </div>   <Chip size="sm" color="success" style={{width:"30%", height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Incomplete</Chip.Label></Chip> </div>
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> 4. Marker pens     </div>   <Chip size="sm"  color="success" style={{width:"30%", height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Complete</Chip.Label></Chip> </div>
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> 5. Label numbers      </div>   <Chip size="sm"  color="warning" style={{width:"30%", height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Incomplete</Chip.Label></Chip> </div>

            
            
            </Accordion.Content>

            </Accordion.Item>

            <Accordion.Item value="vue1">

            <Accordion.Trigger color="primary" className="flex w-full flex-col gap-4 border-primary bg-primary text-white mb-2 rounded-lg border border-surface p-3">

            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>
                    <div  style={{ width:"92%", textAlign:"left",display: "flex" }}>
                    &nbsp;People Witness 1
                    </div>


                <div  style={{ width:"8%", textAlign:"right",  display: "flex" }}>
                +&nbsp;
                </div>
            </div>
            
            </Accordion.Trigger>

            <Accordion.Content>
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> 1. Who was the worker involved in the stamping machine accident?      </div>   <Chip size="sm"  color="success" style={{width:"30%", height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Complete</Chip.Label></Chip> </div>
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> 2. What tasks was the employee at the stamping machine performing?       </div>   <Chip  size="sm" color="success" style={{width:"30%", height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Complete</Chip.Label></Chip> </div>
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> 3. When did the hand injury happened (date & time)?      </div>   <Chip size="sm"  color="success"style={{width:"30%", height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Incomplete</Chip.Label></Chip> </div>
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> 4. Where exactly the stamping machine that caused the injury?     </div>   <Chip size="sm" color="success" style={{width:"30%", height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Incomplete</Chip.Label></Chip> </div>
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> 5. Why did the worker injured during stamping?     </div>   <Chip  size="sm"color="success" style={{width:"30%", height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Incomplete</Chip.Label></Chip> </div>
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> 6. How did the stamping machine operated?     </div>   <Chip  size="sm" color="success" style={{width:"30%", height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Incomplete</Chip.Label></Chip> </div>

            
            
            </Accordion.Content>

            </Accordion.Item>


            <Accordion.Item value="vue2">

            <Accordion.Trigger color="primary" className="flex w-full flex-col gap-4 border-primary bg-primary text-white mb-2 rounded-lg border border-surface p-3">

            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>
                    <div  style={{ width:"92%", textAlign:"left",display: "flex" }}>
                    &nbsp;People Witness 2
                    </div>


                <div  style={{ width:"8%", textAlign:"right",  display: "flex" }}>
                +&nbsp;
                </div>
            </div>
            
            </Accordion.Trigger>

            <Accordion.Content>
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> 1. Who else was present at the time happen?     </div>   <Chip size="sm"  color="success" style={{ width:"30%",height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Complete</Chip.Label></Chip> </div>
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> 2. What was the stamping machine condition before the accident happen?       </div>   <Chip  size="sm" color="success" style={{ width:"30%",height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Complete</Chip.Label></Chip> </div>
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> 3. When were the safety measures (curtain sensor & dual button mode) maintained and inspected along the stamping machine operation?     </div>   <Chip size="sm"  color="warning" style={{ width:"30%", height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Incomplete</Chip.Label></Chip> </div>
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> 4. Where was the witness during the event?    </div>   <Chip size="sm" color="success" style={{ width:"30%", height:"25px",textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Incomplete</Chip.Label></Chip> </div>
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> 5. Why were the appropriate safety measures (curtain sensor & dual button mode) not effective in preventing the injury?   </div>   <Chip  size="sm" color="success" style={{ width:"30%",height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Incomplete</Chip.Label></Chip> </div>
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> 6. How did the injury happen?    </div>   <Chip  size="sm" color="success" style={{ width:"30%",height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Incomplete</Chip.Label></Chip> </div>

            
            
            </Accordion.Content>

            </Accordion.Item>




            <Accordion.Item value="vue3">

            <Accordion.Trigger color="primary" className="flex w-full flex-col gap-4 border-primary bg-primary text-white mb-2 rounded-lg border border-surface p-3">

            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>
                    <div  style={{ width:"92%", textAlign:"left",display: "flex" }}>
                    &nbsp;Position
                    </div>


                <div  style={{ width:"8%", textAlign:"right",  display: "flex" }}>
                +&nbsp;
                </div>
            </div>
            

            </Accordion.Trigger>

            <Accordion.Content>
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> 1. Barricade Line 1      </div>   <Chip size="sm" color="success" style={{width:"30%", height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Complete</Chip.Label></Chip> </div>
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> 2. Barricade Line 2       </div>   <Chip size="sm" color="success" style={{width:"30%", height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Complete</Chip.Label></Chip> </div>
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> 3. Barricade Line 3      </div>   <Chip  size="sm" color="success" style={{width:"30%", height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Incomplete</Chip.Label></Chip> </div>
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> 4. Barricade Line 4    </div>   <Chip size="sm"  color="success" style={{width:"30%", height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Complete</Chip.Label></Chip> </div>
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> 5. Picture of the stamping machine      </div>   <Chip size="sm" color="success" style={{width:"30%", height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Incomplete</Chip.Label></Chip> </div>
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> 6. Picture of the barricade area      </div>   <Chip size="sm"  color="success" style={{width:"30%", height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Complete</Chip.Label></Chip> </div>
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> 7. Snapshot of the surrounding area      </div>   <Chip size="sm"  color="success" style={{width:"30%", height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Complete</Chip.Label></Chip> </div>
            
            </Accordion.Content>

            </Accordion.Item>

            <Accordion.Item value="vue4">

            <Accordion.Trigger color="primary" className="flex w-full flex-col gap-4 border-primary bg-primary text-white mb-2 rounded-lg border border-surface p-3">

            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>
                    <div  style={{ width:"92%", textAlign:"left",display: "flex" }}>
                    &nbsp;Part
                    </div>


                <div  style={{ width:"8%", textAlign:"right",  display: "flex" }}>
                +&nbsp;
                </div>
            </div>
            

            </Accordion.Trigger >

            <Accordion.Content>
            Numbering placement on evidences:
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> 1. Numbering label near the product sample      </div>   <Chip size="sm"  color="success" style={{width:"30%", height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Complete</Chip.Label></Chip> </div>
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> 2. Numbering label near the taped press button       </div>   <Chip size="sm"  color="success" style={{width:"30%", height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Complete</Chip.Label></Chip> </div>
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> 3. Numbering label near the stamping machine      </div>   <Chip size="sm"  color="warning" style={{width:"30%", height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Incomplete</Chip.Label></Chip> </div>
            Photo capture of the evidences:
            Picture of the product sample
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> a. Overview Shots     </div>   <Chip size="sm"  color="warning" style={{width:"30%", height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Incomplete</Chip.Label></Chip> </div>
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> b. Mid-Range Shot     </div>   <Chip size="sm" color="success" style={{width:"30%", height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Incomplete</Chip.Label></Chip> </div>
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> c. Close-Up Shot      </div>   <Chip size="sm"color="success" style={{width:"30%", height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Incomplete</Chip.Label></Chip> </div>
            

            Picture of the taped press button
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> a. Overview Shots     </div>   <Chip size="sm"  color="warning" style={{width:"30%", height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Incomplete</Chip.Label></Chip> </div>
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> b. Mid-Range Shot     </div>   <Chip size="sm"color="success" style={{width:"30%", height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Incomplete</Chip.Label></Chip> </div>
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> c. Close-Up Shot      </div>   <Chip size="sm" color="warning" style={{width:"30%", height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Incomplete</Chip.Label></Chip> </div>
            

            Picture of the stamping machine
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> a. Overview Shots     </div>   <Chip size="sm" color="success" style={{width:"30%", height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Incomplete</Chip.Label></Chip> </div>
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> b. Mid-Range Shot     </div>   <Chip size="sm" color="success" style={{width:"30%", height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Incomplete</Chip.Label></Chip> </div>
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> c. Close-Up Shot      </div>   <Chip size="sm" color="success" style={{width:"30%", height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Incomplete</Chip.Label></Chip> </div>
            

            
            </Accordion.Content>

            </Accordion.Item>


            <Accordion.Item value="vue5">

            <Accordion.Trigger color="primary" className="flex w-full flex-col gap-4 border-primary bg-primary text-white mb-2 rounded-lg border border-surface p-3">

            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>
                    <div  style={{ width:"92%", textAlign:"left",display: "flex" }}>
                    &nbsp;Paper
                    </div>


                <div  style={{ width:"8%", textAlign:"right",  display: "flex" }}>
                +&nbsp;
                </div>
            </div>
            

            </Accordion.Trigger>

            <Accordion.Content>
            Paper
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> 1. SOP paper evidence report from witnesses.    </div>   <Chip size="sm" color="success" style={{width:"30%", height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Complete</Chip.Label></Chip> </div>
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> 2. Picture of the warning sign      </div>   <Chip size="sm" color="success" style={{width:"30%", height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Complete</Chip.Label></Chip> </div>
            
            Process
            <div style={{ width:"100%", textAlign:"center",display: "flex"  }}>  <div  style={{ width:"70%", textAlign:"left",display: "flex" }}> 1. Picture of the stamping machine      </div>   <Chip size="sm" color="success" style={{width:"30%", height:"25px", textAlign:"right",  display: "flex",marginBottom:"2px" }}><Chip.Label>Incomplete</Chip.Label></Chip> </div>
            
            

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
                          <ChartDoughnutCompletion totalCount={100} progress={50} />
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