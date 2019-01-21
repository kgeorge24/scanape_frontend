import React, { Component } from 'react';


export default class LandingPage extends Component {


    render(){
        return(
            <div>
                <header className="landing">
                    <h1 className="App-Name">SCANAPE</h1>
                    <h5 className="App-Sub-Name">You know the deal. Just scan and you've got a meal</h5>
                </header>

                <div className={this.props.class} >
                    <img width="40" height="40" alt="" src="https://www.myndshftdirect.com/wp-content/uploads/2017/10/white-down-arrow-png-2-300x300.png" />
                </div>
                <div className="About-page">
                <div className="About">
                    <h1>What is SCANAPE?</h1>
                    <p>SCANAPE is a website made for Nutritionists. It has the ability to log your grocery inventory by using a barcode scanner. Your grocery list serves as a base and is used to help you search recipes that can be made with the items you currently have. This application is a great tool for students and anyone interested in learning how to cook. So register today and start scanning away.</p>
                </div>
                
                <div className="InfoCard-cont">
                    <div className="Img-InfoCard">
                    <img src='https://tls-bocasystems.com/foto/header/tls-boca-systems-div-barcode-reader.png' alt=""></img>
                    <p>First we scan our items so that we can log what groceries we have inside of our pantry.</p>
                    </div>

                    <div className="Img-InfoCard">
                    <img src='https://core-secure-graphics.grocerywebsite.com/GraphicsShoppingList/ShoppingListIcon_221x221.png' alt=""></img>
                    <p>Next those items get added to your grocery list where you can click which items you would like to incorporate in your recipe.</p>
                    </div>

                    <div className="Img-InfoCard">
                    <img src='http://www.pngmart.com/files/7/Groceries-PNG-Transparent.png' alt=""></img>
                    <p>Then you come back with your groceries and start making your next 5 star meal for you and your family.</p> 
                    </div>
                </div>
                </div>
            </div>
            
        )
    }
}