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
                    <p>SCANAPE is a website made for the Nutritionist. It has the ability to keep track of the grocery inventory wherever you are By using a barcode scanner toit lets you know what items your running low on. Your grocery list serves as a base and is used to show recipes that can be made with the items you currently have. If you really like how that meal came out you always have the option to favorite recipes so uou can reference them later. This application is a great tool for students, anyone interested in learning how to cook and people who really care about their nutritional intake. So register today and start scanning away.</p>
                </div>
                
                <div className="InfoCard-cont">
                    <div className="Img-InfoCard">
                    <img src='https://tls-bocasystems.com/foto/header/tls-boca-systems-div-barcode-reader.png' alt=""></img>
                    <p>First we scan our items so that we can kog what we have inside of our pantry.</p>
                    </div>

                    <div className="Img-InfoCard">
                    <img src='https://core-secure-graphics.grocerywebsite.com/GraphicsShoppingList/ShoppingListIcon_221x221.png' alt=""></img>
                    <p>Next those items get added to your grocery list where you can click which items you would like to incorporate in your recipe or simple print of your grocery list so you can go shopping.</p>
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