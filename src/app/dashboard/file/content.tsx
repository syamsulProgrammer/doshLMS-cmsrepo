"use client"
import apiService from "@/apiService"
import TableFileList from "@/components/table/fileList"
import { useState } from "react"

interface Props{
    rows: Array<any>,
    // statistics: any,
    pagination: {
        totalRow: number,
        totalPage: number,
    },
    statistics: {
        countAll: number,
        total_media: number,
        total_document: number
    }
}

const Content = (props: Props)=>{
    const [fileList, setFileList] = useState(props.rows)
    const [categoryView, setCategoryView] = useState('all')
    const [countAll, setCountAll] = useState(props.statistics?.countAll)
    const [total_media, setTotal_media] = useState(props.statistics?.total_media)
    const [total_document, setTotal_document] = useState(props.statistics?.total_document)

    const handleChangeCatView = async(name:string)=>{
        try {
            setCategoryView(name)
            const data = await apiService.fileManager.list(1, 20, "", name)
            setFileList(data.rows)
        } catch (error) {
            console.error(error)
        }
    }

    return(
        <div className="flex flex-col overflow-hidden h-full w-full mb-5">
            <div className="flex w-full gap-5">
                <div className={`${categoryView === 'all' ? "bg-primary text-white" : 'bg-white' } font-bold text-center rounded-lg px-3 py-8 text-lg w-1/3 cursor-pointer`}
                    onClick={()=>handleChangeCatView('all')}
                >
                    <h2>Total Files</h2>
                    <h3>{countAll || "-"}</h3>
                </div>
                <div className={`${categoryView === 'media' ? "bg-primary text-white" : 'bg-white' } font-bold text-center rounded-lg px-3 py-8 text-lg w-1/3 cursor-pointer`}
                    onClick={()=>handleChangeCatView('media')}
                >
                    <h2>Total Media</h2>
                    <h3>{total_media || "-"}</h3>
                </div>
                <div className={`${categoryView === 'document' ? "bg-primary text-white" : 'bg-white' } font-bold text-center rounded-lg px-3 py-8 text-lg w-1/3 cursor-pointer`}
                    onClick={()=>handleChangeCatView('document')}
                >
                    <h2>Total Documents</h2>
                    <h3>{total_document || "-"}</h3>
                </div>
            </div>
            <TableFileList data={fileList} pagination={props.pagination} statistic={props.statistics} handleChangeCard={(cardData:any)=>{
                setTotal_media(cardData.total_media)
                setTotal_document(cardData.total_document)
                setCountAll(cardData.countAll)
            }}/>
        </div>
    )
}


export default Content