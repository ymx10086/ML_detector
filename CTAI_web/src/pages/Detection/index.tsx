// 此页面为探测页面
import { FC,useState } from "react"
import { Link } from "react-router-dom"
import { InboxOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'
import { message, Upload } from 'antd'
import * as echarts from 'echarts'
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/title'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/markPoint'
import axios from "axios"
import ReactEcharts from 'echarts-for-react'
import './index.css'
const { Dragger } = Upload
interface data {
    name:string,
    value:number
}
const initdata:data[] = []
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
    // const [istrained,setIstrained] = useState(false)
    const props: UploadProps = {
        name: 'file',
        multiple: true,
        action: '/upload',
        onChange(info) {
          const { status } = info.file
          if (status !== 'uploading') {
            console.log(info.file, info.fileList)
            message.success(`训练成功!`)
            // setIstrained(true)
          }
          if (status === 'done') {
            message.success(`训练成功!`)
            // setIstrained(true)
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
    const [istested,setIstested] = useState(false)
    const propss: UploadProps = {
        name: 'file',
        multiple: true,
        action: '/upload2',
        onChange(info) {
          const { status,response } = info.file
          if (status !== 'uploading') {
            console.log(info.file, info.fileList)
            message.success(`测试成功!`)
            setIstested(true)
            // setUrl(response.image_url)
          }
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`)
            // 处理
            message.success(`测试成功!`)
            setIstested(true)
            // setUrl(response.image_url)
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
    // const [url,setUrl] = useState("")
    // const downloadFile = ()=> {
    //     // 发送GET请求到服务器端下载文件
    //     // console.log(1)
    //     fetch('/download')
    //     .then(response => response.blob())
    //     .then(blob => {
    //         // 创建一个临时的URL，用于下载文件
    //         const url = window.URL.createObjectURL(blob);
            
    //         // 创建一个a标签，并设置其href属性为临时URL
    //         const link = document.createElement('a');
    //         link.href = url;
            
    //         // 设置下载的文件名
    //         link.download = 'model_param.pth';
            
    //         // 模拟点击a标签来触发文件下载
    //         link.click();
            
    //         // 释放临时URL资源
    //         window.URL.revokeObjectURL(url);
    //     })
    // }
    const downloadFile = ()=> {
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
            link.download = 'submit.json';
            
            // 模拟点击a标签来触发文件下载
            link.click();
            
            // 释放临时URL资源
            window.URL.revokeObjectURL(url);
        })
    }
    const [datas,setDatas] = useState(initdata)
    const getOption = ()=>{
        // todo 处理数据
        let option = {
            title: {
                text: '分类结果饼状图',
                x: 'left'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                top: 20,
                right: 5,
                data: ['label0','label1','label2','label3','label4','label5']
            },
            series : [
                {
                    name:'分类占比',
                    type:'pie',
                    radius: ['30%', '80%'],
                    label: {
                        normal: {
                            show: true,
                            position: 'insideRight',
                            formatter: '{d}%'
                        }
                    },
                    data:datas,
                }
            ]
        }
        return option
    }
    const getOptions = ()=>{
        // 设置绘图
        let option = {
            title: {
                text: '分类结果柱状图'
            },
            tooltip:{
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data:['label0','label1','label2','label3','label4','label5'],
                axisTick:{
                    alignWithlabel:true
                },
                axisLabel: {
                    interval:0,// 代表显示所有x轴标签显示
                }
            },
            yAxis: {
                type: 'value'
            },
            series : [
                {
                    name:'数量',
                    type:'bar',
                    barWidth: '50%',
                    data: datas,
                    itemStyle:{
                        normal:{
                            color: new echarts.graphic.LinearGradient(
                                0, 1, 0, 0, //4个参数用于配置渐变色的起止位置, 这4个参数依次对应右/下/左/上四个方位. 而0 1 0 0则代表渐变色从正下方开始
                                [
                                    {offset: 0, color: '#a8edea'},
                                    {offset: 0.5, color: '#fed6e3'},
                                ] //数组, 用于配置颜色的渐变过程. 每一项为一个对象, 包含offset和color两个参数. offset的范围是0 ~ 1, 用于表示柱状图的位置
                            )
                        }
                    }
                }
            ]
        }
        return option
    }
    const [show,setShow] = useState(false)
    const previewphoto = ()=>{
        console.log(11111)
        // 请求数据，绘制图像
        fetch('/download')
        .then(response => response.json())
        .then(data => {
            // 在这里处理接收到的JSON数据
            console.log(data);
                const newdata = [
                {
                    name:'label0',
                    value:data[0]
                },
                {
                    name:'label1',
                    value:data[1]
                },
                {
                    name:'label2',
                    value:data[2]
                },
                {
                    name:'label3',
                    value:data[3]
                },
                {
                    name:'label4',
                    value:data[4]
                },
                {
                    name:'label5',
                    value:data[5]
                }
            ]
            setDatas(newdata)
            setShow(true)
        })
        .catch(error => {
            // 处理错误情况
            console.error('Error:', error);
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
            <div className="tabs-content" id="blog" style={{minHeight:'100vh'}}>
                    <div className="container">
                        <div className="row">
                            <div className="wrapper" style={{display:'flex'}}>
                                <div className="col-md-4" style={{width:'30%',position:'fixed'}}>
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
                                <div className="col-md-8" style={{width:'60%',margin:'0 5% 0 40%',}}>
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
                                                {/* <div style={istrained?{display:'flex'}:{display:'none'}}>
                                                    <button className="download" onClick={downloadFile}>点击下载训练模型</button>
                                                </div> */}
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
                                                <div style={istested?{display:'flex'}:{display:'none'}}>
                                                    <button className="download" onClick={downloadFile}>点击下载分类结果</button>
                                                    <button className="download" onClick={previewphoto}>点击查看分类图片</button>
                                                </div>
                                                {/* <div>
                                                    <img className={src === ""?"hidephoto":"showphoto"} src={src} alt="Preview Image" />
                                                </div> */}
                                                {/* <div ref={chartRef} style={{ width: '100%', height: '400px' }} /> */}
                                                <ReactEcharts style={show?{display:'flex',marginTop:'6%'}:{display:'none'}} theme={"light"} option={getOption()}/>
                                                <ReactEcharts style={show?{display:'flex',marginTop:'6%'}:{display:'none'}} theme={"light"} option={getOptions()}/>
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