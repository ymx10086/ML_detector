// 此页面为探测页面
import { FC,useState } from "react"
import { Link } from "react-router-dom"
import { InboxOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { message, Upload } from 'antd'
import './index.css'
const { Dragger } = Upload

const Detection:FC = ()=>{
    const [check1,setCheck1] = useState(true)
    const [check2,setCheck2] = useState(false)
    const change1 = ()=>{
        setCheck1(true)
        setCheck2(false)
    }    
    const change2 = ()=>{
        setCheck1(false)
        setCheck2(true)
    }
    const [istrained,setIstrained] = useState(true)
    const props: UploadProps = {
        name: 'file',
        multiple: true,
        action: '/upload',
        onChange(info) {
          const { status } = info.file
          if (status !== 'uploading') {
            console.log(info.file, info.fileList)
            message.success(`训练成功!`)
            setIstrained(true)
          }
          if (status === 'done') {
            message.success(`训练成功!`)
            setIstrained(true)
          }
        },
        onDrop(e) {
          console.log('Dropped files', e.dataTransfer.files);
        },
        progress: {
            strokeColor: {
              '0%': '#108ee9',
              '100%': '#87d068',
            },
            strokeWidth: 3,
            format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
        }
    }
    const [istested,setIstested] = useState(true)
    const propss: UploadProps = {
        name: 'file',
        multiple: true,
        action: '/upload2',
        onChange(info) {
          const { status,response } = info.file
          if (status !== 'uploading') {
            console.log(info.file, info.fileList)
            message.success(`测试成功!`)
            setIstrained(true)
          }
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`)
            // 处理
            message.success(`测试成功!`)
            setIstrained(true)
          } 
        },
        onDrop(e) {
          console.log('Dropped files', e.dataTransfer.files);
        },
        progress: {
            strokeColor: {
              '0%': '#108ee9',
              '100%': '#87d068',
            },
            strokeWidth: 3,
            format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
        }
    }
    const downloadFile = ()=> {
        // 发送GET请求到服务器端下载文件
        // console.log(1)
        fetch('/download')
        .then(response => response.blob())
        .then(blob => {
            // 创建一个临时的URL，用于下载文件
            const url = window.URL.createObjectURL(blob);
            
            // 创建一个a标签，并设置其href属性为临时URL
            const link = document.createElement('a');
            link.href = url;
            
            // 设置下载的文件名
            link.download = 'model_param.pth';
            
            // 模拟点击a标签来触发文件下载
            link.click();
            
            // 释放临时URL资源
            window.URL.revokeObjectURL(url);
        })
    }
    const downloadFile2 = ()=> {
        // 发送GET请求到服务器端下载文件
        // console.log(1)
        fetch('/test1')
        .then(response => response.blob())
        .then(blob => {
            // 创建一个临时的URL，用于下载文件
            const url = window.URL.createObjectURL(blob);
            
            // 创建一个a标签，并设置其href属性为临时URL
            const link = document.createElement('a');
            link.href = url;
            
            // 设置下载的文件名
            link.download = 'model_param.pth';
            
            // 模拟点击a标签来触发文件下载
            link.click();
            
            // 释放临时URL资源
            window.URL.revokeObjectURL(url);
        })
    }
    const [src,setSrc] = useState("./about-bg.jpg")
    const previewphoto = ()=>{
        console.log(11111)
        fetch('/tmp/test_src/类别分析.png')
            .then(response => response.blob())
            .then(blob => {
                // 将获取的图片数据设置为<img>标签的src属性
                const img = document.getElementById('preview-image');
                setSrc(URL.createObjectURL(blob))
         })
    }
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
            </div>
            <div className="tabs-content" id="blog">
                    <div className="container">
                        <div className="row">
                            <div className="wrapper" style={{display:'flex'}}>
                                <div className="col-md-4" style={{width:'30%'}}>
                                    <div className="section-heading">
                                        <h4 style={{marginLeft:'5%'}}>我们的产品</h4>
                                        <div className="line-dec" style={{marginLeft:'5%'}}></div>
                                        <p style={{marginLeft:'5%'}}>支持用户上传训练数据并在线训练，训练完成后可下载训练模型；支持单条或者批量测试样本上传，并可视化分类结果，同时支持下载分类结果</p>
                                        <ul className="tabs clearfix" data-tabgroup="first-tab-group" style={{marginLeft:'5%'}}>
                                            <li><div onClick={()=>change1()} className={check1?"box active":"box"}>训练数据上传</div></li>
                                            <li><div onClick={()=>change2()} className={check2?"box active":"box"}>测试数据上传</div></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-md-8" style={{width:'60%',margin:'0 5%'}}>
                                    <section id="first-tab-group" className="tabgroup">
                                        <div id="tab1" style={check1?{display:''}:{display:'none'}}>
                                            <div className="text-content">
                                                <h4>训练数据上传</h4>
                                                <span>请点击或拖拽上传训练数据并开始训练</span>
                                                <Dragger {...props}>
                                                    <p className="ant-upload-drag-icon">
                                                    <InboxOutlined />
                                                    </p>
                                                    <p className="ant-upload-text">点击或拖拽上传文件并训练</p>
                                                </Dragger>
                                                <div style={istrained?{display:'flex'}:{display:'none'}}>
                                                    <button className="download" onClick={downloadFile}>点击下载训练模型</button>
                                                </div>
                                            </div>
                                        </div>
                                        <div id="tab2" style={check2?{display:''}:{display:'none'}}>
                                            <div className="text-content">
                                                <h4>测试数据上传</h4>
                                                <span>请点击或拖拽上传测试数据并开始测试</span>
                                                <Dragger {...propss}>
                                                    <p className="ant-upload-drag-icon">
                                                    <InboxOutlined />
                                                    </p>
                                                    <p className="ant-upload-text">点击或拖拽上传文件并测试</p>
                                                </Dragger>
                                                <div style={istrained?{display:'flex'}:{display:'none'}}>
                                                    <button className="download" onClick={downloadFile2}>点击下载分类结果</button>
                                                    <button className="download" onClick={previewphoto}>点击查看分类图片</button>
                                                </div>
                                                <div>
                                                    <img className={src === ""?"hidephoto":"showphoto"} src={src} alt="Preview Image" />
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </>
    )
}
export default Detection