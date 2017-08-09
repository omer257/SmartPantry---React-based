import React, {Component} from 'react';
import {Link} from 'react-router-dom'; //Calling link to bind with router

class App extends Component {
    // Initialize state
    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }
    render() {
        return (
            <div style={{
                height: '100%'
            }}>
                <header>
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-7">
                                <div className="header-content">
                                    <div className="header-content-inner">
                                        <h1>
                                            SMART PANTRY</h1>
                                        <h3>Tired of planning your meals?<br/>Want to know what you have at your pantry<br/>And do it in a cool way?</h3>
                                        <a href="#download" className="btn btn-outline btn-xl page-scroll">Start Now for Free!</a>
                                    </div>
                                </div>
                            </div>
                            <div className="col-sm-5">
                                <div className="device-container">
                                    <div className="device-mockup iphone6_plus portrait white">
                                        <div className="device">
                                            <div className="screen">
                                                <img src="img/demo-screen-1.jpg" className="img-responsive" alt=""/>
                                            </div>
                                            <div className="button"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>

                <section id="download" className="download bg-primary text-center">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-8 col-md-offset-2">
                                <h2 className="section-heading">Discover what all the buzz is about!</h2>
                                <p>Our app is available on all devices! No need to download!</p>
                                Follow this link - goo.gl/8Hz1Hz
                                <br/><br/>
                                <img
                                    src="https://meridiangrindhouse.files.wordpress.com/2011/01/barcode.png"
                                    style={{
                                    width: '200px'
                                }}
                                    alt=""/> {/*<div className="badges">
                        <a className="badge-link" href="#"><img src="img/google-play-badge.svg" alt="" /></a>
                        <a className="badge-link" href="#"><img src="img/app-store-badge.svg" alt="" /></a>
                    </div>*/}
                            </div>
                        </div>
                    </div>
                </section>

                <section id="features" className="features">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <div className="section-heading">
                                    <h2>Unlimited Features, Unlimited cooking!</h2>
                                    <p className="text-muted">Check out what our app can do?</p>
                                    <hr/>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="device-container">
                                    <div className="device-mockup iphone6_plus portrait white">
                                        <div className="device">
                                            <div className="screen">
                                                <img src="img/demo-screen-1.jpg" className="img-responsive" alt=""/>
                                            </div>
                                            <div className="button"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-8">
                                <div className="container-fluid">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="feature-item">
                                                <i className="icon-screen-smartphone text-primary"></i>
                                                <h3>Manage Ingredients</h3>
                                                <p className="text-muted">You can add all the Ingredients you have via any device</p>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="feature-item">
                                                <i className="icon-camera text-primary"></i>
                                                <h3>Image recognition</h3>
                                                <p className="text-muted">Tired of typing? try our automated recognition</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="feature-item">
                                                <i className="icon-present text-primary"></i>
                                                <h3>Free to Use</h3>
                                                <p className="text-muted">Free no cash no dinero no NADA!<br/>
                                                    (for now! :)</p>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="feature-item">
                                                <i className="icon-lock-open text-primary"></i>
                                                <h3>Open Source</h3>
                                                <p className="text-muted">Since this theme is MIT licensed, you can use it commercially!<br/>
                                                    (for now! :)</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="cta">
                    <div className="cta-content">
                        <div className="container">
                            <h2>Stop looking.<br/>Start cooking!</h2>
                            <Link to="/RegLogin" className="btn btn-outline btn-xl page-scroll">Let's Get Started!</Link>
                        </div>
                    </div>
                    <div className="overlay"></div>
                </section>

                <section id="contact" className="contact bg-primary">
                    <div className="container">
                        <h2>We
                            <i className="fa fa-heart"></i>
                            new friends!</h2>
                        <ul className="list-inline list-social">
                            <li className="social-twitter">
                                <a href="http://www.ynet.co.il/home/0,7340,L-8,00.html">
                                    <i className="fa fa-twitter"></i>
                                </a>
                            </li>
                            <li className="social-facebook">
                                <a href="http://www.ynet.co.il/home/0,7340,L-8,00.html">
                                    <i className="fa fa-facebook"></i>
                                </a>
                            </li>
                            <li className="social-google-plus">
                                <a href="http://www.ynet.co.il/home/0,7340,L-8,00.html">
                                    <i className="fa fa-google-plus"></i>
                                </a>
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        );
    }
}

export default App;