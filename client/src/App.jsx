import React from 'react';
import ReactDOM from 'react-dom';
import PromoCode from './components/PromoCode.jsx';
import ItemDetails from './components/ItemDetails.jsx';
import PickupSavings from './components/PickupSavings.jsx';
import Total from './components/Total.jsx';
import store from "./store/index";
import { addPromo } from "./actions/index";
import axios from 'axios';
import TaxesAndFees from './components/TaxesAndFees.jsx';

const pricingData = {
  blackChair: {
    chairName: 'The Black Chair', 
    chairDescription: 'This is the nicest chair',
    price: '$99.99', 
    chairImage: 'https://i5.walmartimages.com/asr/e9ae2e6e-e089-47c5-8572-6577ffe73d33_1.0e1bda9dfa25db3bb7e6bcd5214b9dbd.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF',
  },
  redChair: {
    chairName: 'Essentials by OFM ESS-3085 Racing Style Leather Gaming Chair, Red', 
    quantity: '1',
    price: '102.96', 
    chairImage: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfPmNJp8Eh_QjEj-CHXhpe645VDZBpDJH8-R_rW7-0nCNal9Jx',
  },
  blueChair: {
    chairName: 'The Blue Chair', 
    chairDescription: 'This is the least nice chair',
    price: '$79.99', 
    chairImage: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxESEhUSEhIVFRUXGBcWGRcVEhUXFhUXFxgXGhUVFRYYHiggGBolHhUVITIhJSkrLi4uGB8zODUtNygtLi0BCgoKDg0OGxAQGi0lHiUwNzItLjEtMzItLy0uLS0rLS0tLTAvLTctLy83NS0uLSstMC03LTctKy0tLS0tKy0tLf/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAEAAgIDAQAAAAAAAAAAAAAABgcEBQECAwj/xABLEAABAwIDAwcHBgkMAwAAAAABAAIDBBEFEiEGBzETQVFhcYGRFCIjMkKhsQhScoLB0SQzYpKis8LD8CU0Q0RTY3N0k7Lh8RUXg//EABoBAQADAQEBAAAAAAAAAAAAAAACBAUDAQb/xAAuEQEAAgEDAwIEBAcAAAAAAAAAAQIDBBExBRIhUXETIzJBFUJSsRQiM6HB4fD/2gAMAwEAAhEDEQA/ALxREQEREBEVZbzNtZopfIaR2R+UOllHrMaRoxnQ6xab82YWUqVm9orHMo3tFKzaeITHH9rKOj0nmAfa4jYC+U/UbqB1mw61BcS3sSHSmpQ0czp33d/pR6fpqAUtG5xIaC5xN3OJuST7T3nUnrK3NNgLeL3X6m6DxPH3LWx9PpWPmTvLIydQvb+nG0Paq28xOT+s8n1RRRtHi8OPvWrqNoK1/rVlT9WokZ7mELfRYdC3hG3vGb4rKawDgAOwKzGHDXikK85s1ubyiHlNQeMtQ7tmmPxcuplmHtyj68n3qZrldNsf6YQmb/qlDosVqWerU1DeypmHuzWW2o9t8SjOlS5w+bIxjwe0kZv0luXwtcPOaD2gFa+swSNwOUZXc1uHePuUZxYbc1h7GXNXi0pVs1vNa9wjrI2xk2AlYTyd/wAtp1jHXdw6bKxgV80SMLSWkWIuCPirr3Y4k6egYHG7onOhJPEhtjHc85yOYL9SzNbpa4trU4lp6LVWy71vylqIiz2gIiICIiAiIgIiICIiAiIgIiICIiAqC3iwOixefNwmZHI2/Rkaw274nq/VW2+zATJTMrYx6SmJLuuF1s/5pDXdQzrrgyfDyRb0cs+P4mOaeqMYXEGxt6SAT2nX/hZoWqwCrEkLSObT7vu7ls19DM7+Xz8Rt4ei5XUFc3XiTlc3XAKBeDsgXAXJXgiu0TAJj1hp+z7FY25kfg1R/mP3MKrbHZM0zuqw8B/2rU3RQ5aFzvnzSO8Axn7Cr9RnbDHusdOj50+3+YTdERYjbEREBERAREQEREBERAREQEREBERAXSaJr2lrgC1wIIOoIIsQR0LuiD55qsOdhWISUjr8i/z4XHnjcTYX53N1aenLf2lIAVLN7mzRq6MyxC89NeWO3FzR+Nj67tFwPnNaq42cxMSxt7NNePSO5bGhzd1OyeY/Zka3F2X744n9/wDbeBd7ryau91dU4dwUXW65XiWzuvOaQNaXHgAT4LutTtJUZYg3ncfcNT77eKR5lGfEI3JIXOLjxJJPaeKu/dfHlw2HrMzvzp5CPdZUYCr63dH+Tqe3zXfrH3VTqf0V91rpsfz29kkREWM2RERAREQEREBERAREQEREBERAREQEREHBC+c8fw04fiNRTt0ZmE8PQGSagDqBzN+ovo1U9vyo8s9FUD2hJC49OrXM/wB0niu+mydmWsuGpx9+K0MKiqA9od49R5wsm6j2z0+rmdV/DQ/EeC311vW5YtPMPS65uvLMgcop9r2uo3tU/wA5g/JPx/4C3+ZRLH63lJLD1WXA6z7R/joUqco3jwwA5XnuplzYbEOdr5mnvle4e5wVDZlcG5KrvT1EXzZQ/sD2AfGMqp1GN8UT6Ss6Dxkn2WSiKFbwKvGGFgw6HOwgl7mmLlA6+jQJTa1ucAnstritdNUXzZX7e4pHI6OaSojkYbOaXBpaesAdnaNeBXEG8yuH9alH0g13xBQfSiKgKPetXj+nY/qfEwf7Q0qQUG+KQfj6eNw53Rvcz9F2a/igt9Fh4RXtqII52hzWyMa8Bws4BwvYjpWYgIiICIiAiIgIiICIiAiIgKrt/dvJ6Tp8p0/033+xb7eZ/wCT5GM4eHOsXcqI3NEhFhky31t61wNeCo/aTFq4lsdcypBBzMbPn0PAuZn49oXtZ2mJeWjeNmx2efeQnob9ospGHKuaXGnRkltxfqB+K2cG1bufKe1pHwK1v47HM+d2dGjtWNvCahyZlHINqYz6zSPokH42Wzo8UilNmPubXtYg26dV2pnx34lC2G1eYd8ZreTjNvWdoPtPcPsWkwmh5Qm/qga9+gHjr3da8sYquUlIHBvmj7T4/BSDDoOTYBznU9p+7Qdys/TVW27reyIVcJjeWHiDbt6D3qxNxtR+EVDPnRMd+Y8j94oZtO9hkblNyBY2932qX7jacmqnl5mQhh6LyPBH6oqtrJ+TO/8A3l300bZY2XSiIsJrqc+UNhUfJ01UGgSZzC4j2mljntDumxYbfSKrHYfZWXE6kQMdkaBmkkIvkYLXsOdxJAA61b3yhv5jT/5lv6mZaH5Og9NWfQh97pb/AAHggsHBd2eFU8eTyVkxtq+oaJXuPT5ws3saAFsKXYjDI3h8dFA1wNwRE3Q9IHAFSBEHAC5REBERAREQEREBERAREQEREBfO29yv5fFZWjVsEbIuq9i9xHfK4fVX0SvlzbCmmhxCrE7XMe+WV7cwtnY57y1zD7TbEcOzmXbBEd8buWbft8Io8XNh7uPYpZh2DU8IBqC1z/mk3a3qt7R7dFGaWMmRoAJN9ABc35rKW0OyeIz/AIujnPW5nJg9jpcoPirGkpj2m95ctRe+8VpDl1TRt9WBp/8Am0D3ocdABDImtuLXFhbwCkVDukxF9jI6GIflSF7h3MBH6S8trN3LqKFpFQZZXkgBsWVoDRck3c4nm6FbnU4Kcf2V/g5rcoY2bW44g37wss4lPKcgc5xPssGp+q3Uq8sK3ZYZEAXQcq+wBMsj3Ann9HfJ+ipRQ4dBAMsMUcQ6I42sHg0LlbqMflqlXRT95UNgO7nEakguj8njPtz6G35MXrk9uUdaurZTZuGgg5GK5ucz3utmkfwzG3DQAAcwC2z5Wji4DtICwajHqRhs+pgaegzMB8LqnlzZc3iVmmPHibJFrItoKN2jaqAnoE0d/C6z4pmuF2uDh1EH4LjNbRzDrFqzxKq/lEyfgdM3pqL+EUg/aWl+Ts709YOmOE+DpPvXHyiq4OmpIAdWMllcP8Qtawn/AE3ry+Ty78KqB/cj3PH3lRSXwiIgIiICIiAiIgIiICIiAiIgIiICh29tzG4XUPc1pIDWtJaCWl72Nu0ngbE8FMVW2/uqyYa1n9pOxvcGvf8AFoQVNuurGw4nTyvIDQX3JNrB0b25u69/FfUN18hYJUGOQPaSCAbEGxHNoVu31z5NHvc63znOd2cSrum0fxq93dsqZ9V8Kdu3df2Obb0NLdr5c7x7EVnu7CfVae0hVvtPvCNS9higDOTvYyOzXva92ttbh0qFsAXoGrUxdNw1+ryzsnUMk8eEgrdv8Tl/rGQdEbGtA77F3vWmqMTqZPxlRM/6UryPAleeVc5Fdpp8dfprCpbUXtzLwy9Oq7tXpkXYNXXZxmzoF6RSOabtJaelpIPiEslkmEd3niEYnOaa8jrBuZ7nF1hwGa97Bbvd7isWGSySCNzxI1rSM9i0NJN26a3vznmWosuQ1cMmlw3+qsO9NVlp9NpXpgu2NHU2a2TI8+xJ5rj1A8HHsKkK+bmhWNu92tdmbSzuzA6RvcbkHmY484PN16c4tk6rpvZWb458ejS0vUu+0UyRz91loiLJawiIgIiICIiAiIgIiICIiAqt+ULETQQuHBtQ2/fHIB77K0lptsMBZX0ctK4gZ2+a4+xI05o3acwcBcc4uOdB8mxSZdVtqV2i8ccwWalkdDMwse3Qg/Fp9pp5iOKxabEMgAeO8HXwV/R6iuPxaVPVYZv5rDfMcsiN68KCCWUZo4pXDjcQyEW6b2svSE9K3MWWtuJY2XHNeYZTSvUBcMYu4CswpzIGplXa6XTdF1suC1di4LrmTc8ucqLo6RdHThRmUorMva6ysMzGWMM9flGZfpZhl99lhUNNNO8RwxukceZov3nmA6yrY2D2GNMRUVNnTey0G7Y785PtPt3Dr4qpqdVTFWd+fRa0+kvltG3HqniIi+YfTiIiAiIgIiICIiAiIgIiICIvCtrI4WGSV7Y2Di57g1o7SUHliOFwVDcs8McreiSNrx3ZgsXD9naGmu6Glgi5y5kTGnTpdZR3/wBkQzyugw6nmrZAPWZljhaf7yV5u0deU35rr3bstUVhz4pOHsvcUlOXMph0cq7R854cbN/JQd6jbEzOMOGQ+VvGjps2SjiOnrz/ANIdR5sebuWMzd8ydz5sQlM87xa8Q5GKLUkCJjdXEXtmeXE2UypqdkbQyNrWMaLNa1oa1o6ABoAvVSraazvE7PLVi0bTCmse3bVcBLqV3lEfzTZsoHZ6r+6x6lCp5nxuySRvY4ey9rmuHc4XX00oDvwNsJlI4h8Njzj0reBWhi6lkr4t5Z+Xp2O0718Kg8tC6msURjrJb+u7xv8AFcCtl+e5WPxWvpLh+GT6wlpqismjpKib8TDJJ/hxvd72jRSv5PeWR1YJGh7m8gWl4Di2/Kg5SeHAcFdgChbqk/lq6V6ZH3lReHbusRl9aNsQ6ZXgH81mY+NlMMH3U07LOqJXSn5rPRs7Cblx7iFYqKpk1+a/329lmmixV+2/uw8Nw2GnZkhjbG3oaAL9ZPEnrKzERVJmZneVqIiPECIi8eiIiAiIgIiICIiAiIgIiICiGMbvKSrqnVVU6aYHLkhdM4QxFoAJY1pBF7XIvbU9Kl6IMbD6CKBgjhjZGwcGsaGtHcFkoiAiIgKqvlC172UcMLfVllu/rEYzNHZmIP1QrVVO/KLd6OjH5Ux8BH96Cj47/wAf9q+N3WwGFVlBT1U1IDI4Oa708+Vxje5mYtDwLnLcgC1zoqLjX0vuZP8AJFP9Kb9dIgk2DYHS0jSymgjhadTkYAXEcC48XHtWxREBERAREQEREBERAREQEREBERAREQEREBERAQooNvJ2yqKHkoqamM0kgcXEh5ZGwWALi3gSSeJA80oPB22j6qrNLSXJBcLhthZpIc8yEWsCCPN4HTjosisqsQg1e15aPaBzN7yL2HaAoPsFtS6CUSS0sbIixwc+J/KkuvmBa5vo2gm9w5/P4y928kyHJS0vKOJtZ8o/cte3xcEHpgu3rpXPYYZH5DZzmszDuLL3PVa6gO/TH4KnyVkbruj5bO3nZm5LKD1+a7TiLKYPZiszi7LTwAngxln685JdI1x+qFQldIXyPzF2rnE5vWvc3zWA16dAgx419Abn9oIGYbHBmzSsdKXMHrAOkc5ptzizhwuqDFGey9iL84IBHuc096lG7kS+WNbESH5X5T7Is0k5hY3aQCLaakaoPoGTGpXXDGAdv8fYtXUYniZdaGFjx0mUtsexsZWsp8Rr4dZKaGo14jlIiB1MBmJPcFsqbeLADklp54yNDka2a31IiZQO1gQZWEbWtM3ktQ+NtRexjBIPURma3MNDw6LqWKgNo9pzNXS1EVE6Xk3s5MxvuSInNLXzxNHKM4GwNrZtRxvbewG0/wD5Gl5cx8m8PfG9gJIDm24EgHg5vYbhBJEREBERAREQEREBERAREQEREBERAWDiOKxQ+u7zjwaNSfuXONYi2ngknfwY0ntPADvJAUQwKiNeTM/M2K5DjqHzOvYgcwjAGhHG5sgxsZ26mc/kaSJz5OiNheW34EkDTt9y0Mux+LVbg+VrGG9w6okD3NPSwAPyH6IaraoaGKFuWJjWDj5o4npceJPWVkoKopt0T3uzVNaXfQYSezM9x07lNsE2SgpW5YjYni/K0vd2k3A7gFIUQYTcMj58zu1x+AsFBdrt0lNVyOmhlNPI83cMgfE53O7JcFpPPY24mysdY2JPLYpCOIY4jtsbIKWZu7NcRHHO2HkiASWF9wKajj0aCP7Pp51YGx27qloA5wc+WVwymR3m2HEhjW+qCQDqSdBqo3uixXl6iqPs8rMBrcWDacNt25CVayDWy4Mw8Hvb3gj3i/vUbx3d9HUnMZbOtYnJ61uGbXW3cpsiCncS3b4nGQYKiOdo1DJtbdTRIHBvcQsjDK/FKQ2qKaaIc8kd54Dw1e27nM7nWsOZW0iCNYVtXHJYPy68HMNwe5SOOQOFwbjqWlxnZiCe7wOSl/tI9CfpjhIO3XoIUfwvGJKOpZSVJ1eQ0OF8jydGOaT024cxBGt0E8REQEREBERAREQEREBERAWNiNbHBFJNKcrI2ue49DWgk9vBZKwsaw1lTBLTyXDZGOYSOIBHEdYQUdtJvfqahrmRU0LYy4ebK10pc0G4D7ENB0BsOHTzqW7mdrqmufVMmbGGx8m9oja4ZS/M0t1cdLRj3qqNp9jqyiqDAYpJAT6OSOJ7myg8MuUGzhwLeIt0WKujc7sk+hpXSTMLKichzmnixjb8kwjmOrnHn86x4ILAREQEREBa7aFxFNLbjlsO0kALYrUbWSObSyOaLkFht1B7cx8LoK93P4DLSSSB7XNY8RuZnFnE8l6VxHRmsrZUHwCrYaqLkXZ2PEpJ1uMrWkOJLje+e2luB6DacICIiAiIgL592m3k1TayqidDBKGTOZFnY70XIyHI6wPnEEXvprfqt9BL593xbFSw1Tqunhe6Cbz3lgL+TmJOfMALta7Qg8Llw00CCb7v955rZhTVEbGSOByOjzBrnAXLC11y02BIN+bsVlqiNzGxk75210zXRxRH0bXsLTM4tIzC+uRt+NtSeoq90BERAREQEREBERAREQEREBERAREQEREBRreLjbaOglmIa53mtYxxsJHOcPNFuewce5SVVX8oFj/JaZwBLRPY2HtOjeG3/SHegiG7/bWOGshj8nZDFJI4OkfK6RzGva7I1pytyjO4am+h16V9Br5FrqGqY30lNNHmORpfDIwF5BytaXAXcbGw46L61pWuDGh3rBov221QeqIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAiIgIiICIiAovvJ/mLv8SH9axEQcbe8KL/AD1P+2pSiICIiAiIgIiICIiAiIgIiICIiD//2Q==',
  }, 
};

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemName: pricingData.redChair.chairName,
      itemPrice: pricingData.redChair.price,
      itemImage: pricingData.redChair.chairImage,
      itemQuantity: pricingData.redChair.quantity,
      pickupSaving: '3.85',
      newPrice: 99.11,
      fees: 8.92, 
      shoppingcart: [],
    }
    this.getShoppingCartInfo.bind(this);
  }
  componentDidMount(){
    this.getShoppingCartInfo();
  }
  getShoppingCartInfo() {
  axios.post('/shoppingcart')
    .then(response => this.setState({ shoppingcart: response.data.shoppingcart[0] }))
  }
  render() {
    return (
     <div className="summary-container">
        <div className="item-container">
        Subtotal
        <span className="pricing-details">${this.state.shoppingcart.price}</span>
        </div>
        <PickupSavings shoppingcart={this.state.shoppingcart} savings={this.state.pickupSaving}/>
        <TaxesAndFees newPrice={this.state.newPrice}/>
        <div className="line-break"></div>
        <div className="item-container" style={{fontWeight:'bold', fontSize:'20px'}}>Est. total
        <span className="pricing-details">
        <Total
        shoppingcart={this.state.shoppingcart} 
        store={store}
        pickupSavings={this.state.pickupSaving}
        itemPrice={this.state.itemPrice}
        fees={this.state.fees}
        itemPrice={this.state.itemPrice}
        />
        </span>
        </div>
        <ItemDetails 
        shoppingcart={this.state.shoppingcart}
        pickupSavings={this.state.pickupSaving}
        image={this.state.itemImage}
        itemName={this.state.itemName}
        itemPrice={this.state.itemPrice}
        itemQuantity={this.state.itemQuantity}/>
        <div className="line-break"></div>
        <PromoCode store={store}/>
      </div>
    );
  }
}



ReactDOM.render(<App />, document.getElementById('app'));