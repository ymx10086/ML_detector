// 此页面为探测页面
import { FC,useEffect,useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import './index.css'
const Detection:FC = ()=>{
    const [check1,setCheck1] = useState(true)
    const [check2,setCheck2] = useState(false)
    // const [check3,setCheck3] = useState(false)
    // const [check4,setCheck4] = useState(false)
    const change1 = ()=>{
        setCheck1(true)
        setCheck2(false)
        // setCheck3(false)
        // setCheck4(false)
    }    
    const change2 = ()=>{
        setCheck1(false)
        setCheck2(true)
        // setCheck3(false)
        // setCheck4(false)
    }
    // const change3 = ()=>{
    //     setCheck1(false)
    //     setCheck2(false)
    //     setCheck3(true)
    //     setCheck4(false)
    // }
    // const change4 = ()=>{
    //     setCheck1(false)
    //     setCheck2(false)
    //     setCheck3(false)
    //     setCheck4(true)
    // }
    return (
        <>
            <div className={"header active"} >
                <div className="container">
                    <nav className="navbar navbar-inverse" style={{display:'flex'}} role="navigation">
                        <div className="navbar-header" style={{marginLeft:'5%'}}>
                            <Link to='/' className="navbar-brand scroll-top"><em>F</em>aster</Link>
                        </div>
                        <ul className="nav navbar-nav" style={{display:'flex',marginLeft:'70%'}}>
                            <li >
                                <Link to='/' className="scroll-top">Home</Link>
                            </li>
                            <li >
                                <Link to='/Detection' className="scroll-top">Detection</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
                <div className="tabs-content" id="blog">
                    <div className="container">
                        <div className="row">
                            <div className="wrapper" style={{display:'flex'}}>
                                <div className="col-md-4" style={{width:'40%'}}>
                                    <div className="section-heading">
                                        <h4 style={{marginLeft:'5%'}}>我们的产品</h4>
                                        <div className="line-dec"></div>
                                        <p style={{marginLeft:'5%'}}>支持用户上传训练数据并在线训练，训练完成后可下载训练模型；支持单条或者批量测试样本上传，并可视化分类结果，同时支持下载分类结果</p>
                                        <ul className="tabs clearfix" data-tabgroup="first-tab-group" style={{marginLeft:'5%'}}>
                                            <li><div onClick={()=>change1()} className={check1?"box active":"box"}>单条测试数据上传</div></li>
                                            <li><div onClick={()=>change2()} className={check2?"box active":"box"}>批量测试数据上传</div></li>
                                            {/* <li><div onClick={()=>change3()} className={check3?"box active":"box"}>Nulla eget convallis augue</div></li>
                                            <li><div onClick={()=>change4()} className={check4?"box active":"box"}>Nulla eget convallis augue</div></li> */}
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-8" style={{width:'50%',margin:'0 5%'}}>
                                    <section id="first-tab-group" className="tabgroup">
                                        <div id="tab1" style={check1?{display:''}:{display:'none'}}>
                                            <div className="text-content">
                                                <h4>单条测试数据上传</h4>
                                                <span>请点击下面上传文件按钮选择单个文件</span>
                                                
                                            </div>
                                        </div>
                                        <div id="tab2" style={check2?{display:''}:{display:'none'}}>
                                            <div className="text-content">
                                                <h4>批量测试数据上传</h4>
                                                <span>请点击下面上传文件按钮选择多个文件</span>
                                                
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Detection