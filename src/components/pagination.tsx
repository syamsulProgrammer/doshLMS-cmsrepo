import { ChevronLeft, ChevronRight } from "react-feather"

interface Props{
    currentPage:number,
    totalRow: number,
    totalPage: number,
    handleChangePage(page:number):void
}

const Pagination = (props:Props)=>{
    const PageItems = (totalPage:any)=>{
        let pageArr:Array<any> = []
        let startPage = 1
        if (props.totalPage > 10) {
            if (props.totalPage - props.currentPage < 10) {
                for (let index = props.totalPage - 10; index < props.totalPage; index++) {
                    pageArr.push(index + startPage)
                }
            } else {
                let first4 = []
                let last4 = []
                

                if (props.currentPage <= 4 ) {
                    for (let index = 1; index <= 4; index++) {
                        first4.push(index)
                    }
                } else {
                    for (let index = props.currentPage - 3; index <= props.currentPage; index++) {
                        first4.push(index)
                    }
                }
                
                first4.push('x')
                for (let index = props.totalPage - 3; index <= props.totalPage; index++) {
                    last4.push(index)                
                }
                pageArr = first4.concat(last4)
            }

                // startPage = totalPage - 10;
        } else {
            // console.log(props, "total page")
            for (let index = 0; index < props.totalPage; index++) {
                pageArr.push(index + startPage)
            }
        }

        return(
            <ul className="flex text-sm items-center ">
            {pageArr.map((item)=>{
                return(
                    <li key={item} className={`px-2 rounded-lg ${props.currentPage == item ? 'bg-gray-200' : ""}`}>
                        {item === "x" ? (
                            <button>...</button>
                        ) : (
                            <button className={`${props.currentPage == item ? 'active' :''}`} onClick={()=>props.handleChangePage(item)}>{item}</button>
                        )}
                    </li>
                )
            })}
            </ul>
        )
    }
    return(
        <div className="flex justify-between pt-3 border-t border-stone-500 text-[#646464]">
            {props.currentPage === 1 ? (<button disabled className="pr-3 py-1 rounded-lg border flex"><ChevronLeft />Prev</button>) : (<button onClick={()=>props.handleChangePage(props.currentPage - 1)} className="pr-3 py-1 py-1 rounded-lg border flex"><ChevronLeft /> Prev</button>)}
            {/* <ul className="pagination bg-white"> */}
            {/* {props.currentPage === 1 ? (<li><button disabled>Prev</button></li>) : (<li><button onClick={()=>props.handleChangePage(props.currentPage - 1)}>Prev</button></li>)} */}
                <PageItems/>
                {/* {props.currentPage === props.totalPage ? (<li><button disabled>Next</button></li>) : (<li><button onClick={()=>props.handleChangePage(props.currentPage + 1)}>Next</button></li>)} */}
            {/* </ul> */}
            {props.currentPage === props.totalPage ? (<button disabled className="pl-3 py-1  rounded-lg border flex">Next <ChevronRight /></button>) : (<button onClick={()=>props.handleChangePage(props.currentPage + 1)} className="pl-3 py-1 rounded-lg border flex">Next <ChevronRight /></button>)}
        </div>
    )
}


export default Pagination