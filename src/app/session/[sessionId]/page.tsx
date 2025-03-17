import TableFileList from "@/components/table/fileList";
import Image from "next/image";
import Header from "@/components/header";
import HeaderSession from "@/components/headerSession";
import moment from "moment";
import ChartDoughnutCompletion from "@/components/charts/doughnutCompletion";

const getData = async ()=>{
  try {
    const listFile:any = []
    return listFile
  } catch (error) {
    throw error
  }
}

export default async function SessionDetail() {
  
  const fileList = await getData().then(data=>{
    return data.Contents
  }).catch(err=>{
    console.error(err)
  })
  return (
    <>
      <HeaderSession pageTitle={'Session 1'} />
      <div className="w-full h-full px-3 relative">
        <div className="grid grid-cols-5 w-full gap-3 mb-3">
          <div className="bg-white p-3 rounded-lg">
            <h2 className="font-bold">
              Date
            </h2>
            <div>
              {moment().format('DD MMMM YYYY')}
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <h2 className="font-bold">
              Time
            </h2>
            <div>
              {moment().format('H:mm:ss')} - {moment().format('H:mm:ss')}
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <h2 className="font-bold">
              Participants
            </h2>
            <div>
              7
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <h2 className="font-bold">
              Score
            </h2>
            <div>
              8
            </div>
          </div>
          <div className="bg-white p-3 rounded-lg">
            <h2 className="font-bold">
              Image Uploaded remove
            </h2>
            <div>
              2
            </div>
          </div>
        </div>
        <div className="flex gap-3 w-full">
          <div className="w-1/5 bg-white p-3 rounded-lg">
            <h2 className="font-bold">Participants</h2>
            <table className="w-full">
              <thead>
                <tr>
                  <th>No.</th>
                  <th className="text-left">Username</th>
                </tr>
              </thead>
              <tbody>
                <tr>
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
                </tr>
              </tbody>
            </table>
          </div>
          <div className="bg-white rounded-lg p-3 w-2/5">
            <h2 className="font-bold">Task Completion 11</h2>
            <div>
              <ChartDoughnutCompletion progress={7} />
            </div>
          </div>
          <div className="bg-white rounded-lg p-3 w-2/5">
            <h2 className="font-bold">Image Uploaded remove 2</h2>
          </div>
        </div>
        {/* <TableFileList data={fileList}/> */}
      </div>
    </>
  );
}
