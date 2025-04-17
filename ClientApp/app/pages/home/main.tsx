import logo from "app/images/logo.png"
import background from "app/images/artisan-salmon.jpg"
import { MenuCard } from "~/components/menu_card/menu_card"
import card_image from "app/images/artisan-food.jpg"
import { Button } from "reactstrap"

export function Main() {
    return (
        <div className="container-fluid">
            <div className="row">
                <div id="left-side" className="col align-items-center">
                    <div id="logo">
                        <img src={logo} alt="artisan-logo" 
                            style={{
                                width: '18rem'
                            }}
                        />
                    </div>
                    <div id="selection-buttons">
                        <Button>Dine-in</Button>
                        <Button>Pickup</Button>
                    </div>
                    <div id="line">
                        <hr 
                            style={{
                                color: 'grey',
                                backgroundColor: 'grey',
                                height: .5,
                                borderColor: 'grey'
                            }}
                        />
                    </div>
                    <div id="menu-selection">
                        {MenuCard("Food", card_image)}
                    </div>
                    <div id="company-info">
                        Artisan Cafe Canberra
                    </div>
                </div>
                <div id="right-side" className="col">
                    <img src={background} alt="salmon-salad"
                        style={{
                            width: '50vw'
                        }}
                    />
                </div>
            </div>
        </div>
    )
}