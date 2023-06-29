// 此页面为主页页面
import { FC } from "react"
import { Link } from "react-router-dom"
import './index.css'
const Home:FC = ()=>{
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
            <div className="parallax-content baner-content" id="home">
                <div className="container">
                    <div className="text-content">
                        <h2><em>基于</em> <span>机器学习的</span> 分布式诊断系统</h2>
                        <p style={{marginTop:'10px'}}>基于机器学习、深度学习对分布式系统的故障数据进行分析，设计故障诊断模型，高效地分析并识别故障类别，实现分布式系统故障运维的智能化，快速恢复故障的同时大大降低分布式系统运维工作的难度，减少运维对人力资源的消耗。</p>
                        <div className="primary-white-button">
                            <Link to='/Detection' className="scroll-link" data-id="about">Let's Start</Link>
                        </div>
                    </div>
                </div>
            </div>
            <section id="about" className="page-section">
                <div className="container">
                    <div className="row" style={{display:'flex',margin:'8% 5% 0 5%'}}>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="service-item" style={{width:'90%'}}>
                                <div className="icon">
                                    <img src="./service_icon_03.png" alt="" style={{width:'60%',marginTop:'20%'}} />
                                </div>
                                <h4>便捷的交互</h4>
                                <div className="line-dec"></div>
                                <p>交互设计极为便捷，给您带来无尽便利。独特的交互方式和智能化的设计，使您与项目之间的互动变得轻松而自然。通过精心优化的用户界面和人性化的操作逻辑，您能够迅速熟悉并驾驭项目的各个功能，轻松实现您的目标。</p>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="service-item" style={{width:'90%'}}>
                                <div className="icon">
                                    <img src="./service_icon_02.png" alt="" style={{width:'60%',marginTop:'20%'}} />
                                </div>
                                <h4>简洁的页面</h4>
                                <div className="line-dec"></div>
                                <p>以简约和美观为特点，每个细节都经过精心雕琢。独特的设计风格鲜明而不张扬，完美融入您的生活场景。恰到好处的布局和精致的细节处理，展现出高贵而精致的品味。</p>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="service-item" style={{width:'90%'}}>
                                <div className="icon">
                                    <img src="./service_icon_01.png" alt="" style={{width:'60%',marginTop:'15%'}} />
                                </div>
                                <h4>智能的检测</h4>
                                <div className="line-dec"></div>
                                <p>智能超乎想象，智慧无处不在。科技驱动，智能引领，为您带来全新体验。以卓越的智能能力为您带来高效准确的检测结果，帮助您提高工作效率，节省大量的时间和精力。</p>
                            </div>
                        </div>
                        <div className="col-md-3 col-sm-6 col-xs-12">
                            <div className="service-item" style={{width:'90%'}}>
                                <div className="icon">
                                    <img src="./service_icon_04.png" alt="" style={{width:'60%',marginTop:'20%'}} />
                                </div>
                                <h4>超高的准确率</h4>
                                <div className="line-dec"></div>
                                <p>以卓越的技术和精准的算法为基础，能够准确捕捉和处理各种信息。通过深度学习和强大的数据处理能力，项目能够快速而准确地解读和解析复杂的数据模式。它的准确度不仅仅能满足您的需求，更能为您提供超出期望的结果。</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
export default Home